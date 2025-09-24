/** @type {import('next').NextConfig} */
const nextConfig = {
  // React 앱이므로 Next.js 설정은 사용하지 않음
  // 이 파일은 Vercel이 자동으로 인식할 수 있도록 생성
  trailingSlash: true,
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
