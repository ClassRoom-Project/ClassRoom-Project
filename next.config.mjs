/** @type {import('next').NextConfig} */
const nextConfig = {
  // 외부 image 파일을 불러와서 쓰려면 이미지 호스트 허용 목록에 추가해야함.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: ''
      },
      {
        protocol: 'http',
        hostname: '**',
        port: ''
      }
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
