import React from 'react';
import SEO from '../components/SEO';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <SEO 
        title="이용약관 - 정호그룹"
        description="정호그룹의 이용약관을 확인하세요."
        keywords={['이용약관', '정호그룹', '서비스 약관']}
      />
      
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              이용약관
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-gray-700 leading-relaxed">
                
                {/* 제1조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제1조 (목적)</h2>
                  <p>
                    이 약관은 ㈜정호그룹(이하 "회사")이 제공하는 웹사이트 서비스의 이용조건 및 절차, 
                    회사와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                  </p>
                </section>

                {/* 제2조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제2조 (정의)</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>"서비스"란 회사가 웹사이트를 통해 제공하는 모든 서비스를 말합니다.</li>
                    <li>"이용자"란 이 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
                    <li>"콘텐츠"란 회사가 서비스에 게시한 모든 정보(텍스트, 이미지, 동영상 등)를 말합니다.</li>
                  </ul>
                </section>

                {/* 제3조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제3조 (약관의 게시 및 변경)</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</li>
                    <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
                    <li>약관이 변경되는 경우, 회사는 변경 내용을 시행일 7일 전부터 서비스 공지사항에 게시합니다.</li>
                  </ol>
                </section>

                {/* 제4조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제4조 (서비스의 제공 및 변경)</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>회사는 다음과 같은 서비스를 제공합니다:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>회사 및 계열사 정보 제공</li>
                        <li>사업 분야 및 프로젝트 소개</li>
                        <li>뉴스 및 홍보자료 제공</li>
                        <li>고객 지원 서비스</li>
                      </ul>
                    </li>
                    <li>회사는 서비스의 내용을 변경할 수 있으며, 변경 시 사전에 공지합니다.</li>
                  </ol>
                </section>

                {/* 제5조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제5조 (서비스의 중단)</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>회사는 다음 각 호에 해당하는 경우 서비스 제공을 일시적으로 중단할 수 있습니다:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>시스템 점검, 보수, 교체 등의 경우</li>
                        <li>천재지변, 정전 등 불가항력적인 경우</li>
                        <li>기타 회사가 서비스 중단이 필요하다고 판단하는 경우</li>
                      </ul>
                    </li>
                    <li>회사는 서비스 중단 시 사전에 공지하며, 불가피한 경우 사후에 공지할 수 있습니다.</li>
                  </ol>
                </section>

                {/* 제6조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제6조 (이용자의 의무)</h2>
                  <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>타인의 정보를 도용하는 행위</li>
                    <li>서비스에 게시된 정보를 무단으로 변경하는 행위</li>
                    <li>회사 또는 제3자의 저작권 등 지적재산권을 침해하는 행위</li>
                    <li>회사 또는 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                    <li>기타 관련 법령에 위반되는 행위</li>
                  </ul>
                </section>

                {/* 제7조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제7조 (저작권의 귀속)</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>서비스에 게시된 모든 콘텐츠에 대한 저작권은 회사에 귀속됩니다.</li>
                    <li>이용자는 회사의 사전 서면 동의 없이 콘텐츠를 복제, 배포, 전송, 출판할 수 없습니다.</li>
                  </ol>
                </section>

                {/* 제8조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제8조 (면책조항)</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>회사는 천재지변, 전쟁, 기타 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
                    <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임지지 않습니다.</li>
                    <li>회사는 서비스에 게재된 정보의 신뢰도, 정확성에 대해 보증하지 않습니다.</li>
                  </ol>
                </section>

                {/* 제9조 */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">제9조 (분쟁해결)</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>회사와 이용자 간에 발생한 분쟁에 대해서는 대한민국 법률을 적용합니다.</li>
                    <li>서비스 이용과 관련하여 분쟁이 발생한 경우 회사의 본사 소재지 관할 법원을 제1심 관할 법원으로 합니다.</li>
                  </ol>
                </section>

                {/* 부칙 */}
                <section className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">부칙</h2>
                  <p>이 약관은 2024년 1월 1일부터 시행합니다.</p>
                </section>

                {/* 문의처 */}
                <section className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">약관 관련 문의</h2>
                  <div className="space-y-2 text-gray-700">
                    <p>㈜정호그룹 그룹 총무부</p>
                    <p>전화: 070-4688-5203</p>
                    <p>이메일: jihye724@junghocorp.com</p>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

