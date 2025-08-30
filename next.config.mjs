/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/auth/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.crosscopy.ir",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
