/**
 * Excel (CSV) 데이터를 Firebase에 업로드하는 스크립트
 * 
 * 사용법:
 * node scripts/upload-excel-to-firebase.js projects data/projects-20241103.csv images/projects/
 * node scripts/upload-excel-to-firebase.js news data/news-20241103.csv images/news/
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, updateDoc, query, where, getDocs } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Firebase 설정 (환경변수에서 읽기)
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// 명령행 인자
const [,, dataType, csvFilePath, imagesFolderPath] = process.argv;

// 사용법 체크
if (!dataType || !csvFilePath) {
  console.error('❌ 사용법: node upload-excel-to-firebase.js <dataType> <csvFilePath> [imagesFolderPath]');
  console.error('   dataType: projects 또는 news');
  console.error('   예: node upload-excel-to-firebase.js projects data/projects.csv images/projects/');
  process.exit(1);
}

if (!['projects', 'news'].includes(dataType)) {
  console.error('❌ dataType은 "projects" 또는 "news"여야 합니다.');
  process.exit(1);
}

if (!fs.existsSync(csvFilePath)) {
  console.error(`❌ 파일을 찾을 수 없습니다: ${csvFilePath}`);
  process.exit(1);
}

/**
 * 이미지 파일 업로드
 */
async function uploadImage(imagePath, fileName) {
  try {
    if (!imagePath || !fs.existsSync(imagePath)) {
      console.log(`   ⚠️  이미지 파일 없음: ${fileName}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const storageRef = ref(storage, `${dataType}/${Date.now()}_${fileName}`);
    
    await uploadBytes(storageRef, imageBuffer);
    const downloadURL = await getDownloadURL(storageRef);
    
    console.log(`   ✅ 이미지 업로드 성공: ${fileName}`);
    return downloadURL;
  } catch (error) {
    console.error(`   ❌ 이미지 업로드 실패: ${fileName}`, error.message);
    return null;
  }
}

/**
 * 프로젝트 데이터 변환
 */
function transformProjectData(row) {
  return {
    title: {
      ko: row['프로젝트명(한글)'],
      en: row['프로젝트명(영문)']
    },
    client: row['클라이언트'],
    category: row['카테고리'],
    location: row['위치'],
    completionYear: parseInt(row['완공연도']),
    description: {
      ko: row['프로젝트설명(한글)'],
      en: row['프로젝트설명(영문)']
    },
    technologies: row['사용기술'] ? row['사용기술'].split(',').map(t => t.trim()) : [],
    controlPoints: row['제어포인트수'] ? parseInt(row['제어포인트수']) : 0,
    achievements: [
      row['주요성과1'],
      row['주요성과2'],
      row['주요성과3']
    ].filter(Boolean),
    imageFileNames: {
      main: row['대표이미지파일명'],
      additional: [
        row['추가이미지1'],
        row['추가이미지2'],
        row['추가이미지3']
      ].filter(Boolean)
    },
    notes: row['비고'] || '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * 뉴스 데이터 변환
 */
function transformNewsData(row) {
  return {
    title: {
      ko: row['제목(한글)'],
      en: row['제목(영문)']
    },
    category: row['카테고리'],
    publishedAt: new Date(row['발행일']),
    author: row['작성자'],
    summary: {
      ko: row['요약(한글)'],
      en: row['요약(영문)']
    },
    content: {
      ko: row['본문(한글)'],
      en: row['본문(영문)']
    },
    featuredImageFileName: row['대표이미지파일명'] || '',
    notes: row['비고'] || '',
    viewCount: 0,
    readTime: '3분', // 기본값
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * 기존 데이터 확인 (중복 방지)
 */
async function findExistingDocument(collectionName, titleKo) {
  const q = query(
    collection(db, collectionName),
    where('title.ko', '==', titleKo)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty ? null : querySnapshot.docs[0];
}

/**
 * 프로젝트 업로드
 */
async function uploadProjects() {
  const results = [];
  let successCount = 0;
  let updateCount = 0;
  let errorCount = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // 빈 행 건너뛰기
        if (!row['프로젝트명(한글)']) return;
        results.push(row);
      })
      .on('end', async () => {
        console.log(`\n📊 총 ${results.length}개의 프로젝트 발견\n`);

        for (let i = 0; i < results.length; i++) {
          const row = results[i];
          const projectData = transformProjectData(row);
          
          console.log(`[${i + 1}/${results.length}] 처리 중: ${projectData.title.ko}`);

          try {
            // 이미지 업로드
            if (imagesFolderPath && projectData.imageFileNames.main) {
              const mainImagePath = path.join(imagesFolderPath, projectData.imageFileNames.main);
              projectData.featuredImageUrl = await uploadImage(mainImagePath, projectData.imageFileNames.main);
            }

            // 추가 이미지 업로드
            projectData.additionalImages = [];
            if (imagesFolderPath && projectData.imageFileNames.additional.length > 0) {
              for (const fileName of projectData.imageFileNames.additional) {
                const imagePath = path.join(imagesFolderPath, fileName);
                const imageUrl = await uploadImage(imagePath, fileName);
                if (imageUrl) {
                  projectData.additionalImages.push({ url: imageUrl, caption: '' });
                }
              }
            }

            // 파일명 정보는 제거 (URL만 유지)
            delete projectData.imageFileNames;

            // 기존 문서 확인
            const existingDoc = await findExistingDocument('projects', projectData.title.ko);

            if (existingDoc) {
              // 업데이트
              await updateDoc(existingDoc.ref, {
                ...projectData,
                updatedAt: new Date()
              });
              console.log(`   ✅ 업데이트 완료\n`);
              updateCount++;
            } else {
              // 새로 추가
              await addDoc(collection(db, 'projects'), projectData);
              console.log(`   ✅ 추가 완료\n`);
              successCount++;
            }
          } catch (error) {
            console.error(`   ❌ 오류 발생:`, error.message);
            console.error(`   상세:`, error);
            errorCount++;
          }
        }

        console.log('\n' + '='.repeat(50));
        console.log('📊 최종 결과');
        console.log('='.repeat(50));
        console.log(`✅ 새로 추가: ${successCount}개`);
        console.log(`🔄 업데이트: ${updateCount}개`);
        console.log(`❌ 오류: ${errorCount}개`);
        console.log(`📊 총 처리: ${results.length}개`);
        console.log('='.repeat(50) + '\n');

        resolve();
      })
      .on('error', (error) => {
        console.error('❌ CSV 파일 읽기 오류:', error);
        reject(error);
      });
  });
}

/**
 * 뉴스 업로드
 */
async function uploadNews() {
  const results = [];
  let successCount = 0;
  let updateCount = 0;
  let errorCount = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // 빈 행 건너뛰기
        if (!row['제목(한글)']) return;
        results.push(row);
      })
      .on('end', async () => {
        console.log(`\n📊 총 ${results.length}개의 뉴스 발견\n`);

        for (let i = 0; i < results.length; i++) {
          const row = results[i];
          const newsData = transformNewsData(row);
          
          console.log(`[${i + 1}/${results.length}] 처리 중: ${newsData.title.ko}`);

          try {
            // 이미지 업로드
            if (imagesFolderPath && newsData.featuredImageFileName) {
              const imagePath = path.join(imagesFolderPath, newsData.featuredImageFileName);
              newsData.featuredImageUrl = await uploadImage(imagePath, newsData.featuredImageFileName);
            }

            // 파일명 정보는 제거
            delete newsData.featuredImageFileName;

            // 기존 문서 확인
            const existingDoc = await findExistingDocument('news', newsData.title.ko);

            if (existingDoc) {
              // 업데이트
              await updateDoc(existingDoc.ref, {
                ...newsData,
                updatedAt: new Date()
              });
              console.log(`   ✅ 업데이트 완료\n`);
              updateCount++;
            } else {
              // 새로 추가
              await addDoc(collection(db, 'news'), newsData);
              console.log(`   ✅ 추가 완료\n`);
              successCount++;
            }
          } catch (error) {
            console.error(`   ❌ 오류 발생:`, error.message);
            errorCount++;
          }
        }

        console.log('\n' + '='.repeat(50));
        console.log('📊 최종 결과');
        console.log('='.repeat(50));
        console.log(`✅ 새로 추가: ${successCount}개`);
        console.log(`🔄 업데이트: ${updateCount}개`);
        console.log(`❌ 오류: ${errorCount}개`);
        console.log(`📊 총 처리: ${results.length}개`);
        console.log('='.repeat(50) + '\n');

        resolve();
      })
      .on('error', (error) => {
        console.error('❌ CSV 파일 읽기 오류:', error);
        reject(error);
      });
  });
}

/**
 * 메인 실행
 */
async function main() {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Excel → Firebase 업로드 시작');
  console.log('='.repeat(50));
  console.log(`📁 파일: ${csvFilePath}`);
  console.log(`📂 타입: ${dataType}`);
  if (imagesFolderPath) {
    console.log(`🖼️  이미지: ${imagesFolderPath}`);
  }
  console.log('='.repeat(50) + '\n');

  try {
    if (dataType === 'projects') {
      await uploadProjects();
    } else if (dataType === 'news') {
      await uploadNews();
    }

    console.log('✅ 모든 작업이 완료되었습니다!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

// 실행
main();

