/** @type {import('next').NextConfig} */
const nextConfig = {
  // 외부 image 파일을 불러와서 쓰려면 이미지 호스트 허용 목록에 추가해야함.
  images: {
    domains: [
      'img.freepik.com',
      'hdurwturhsczrdeugmon.supabase.co',
      'd1x9f5mf11b8gz.cloudfront.net',
      'http://localhost:3000/messages',
      'encrypted-tbn3.gstatic.com',
      'encrypted-tbn0.gstatic.com',
      'lh3.googleusercontent.com'
    ]
  }
};

export default nextConfig;
