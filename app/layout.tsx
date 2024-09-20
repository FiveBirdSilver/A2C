import Script from "next/script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import "../assets/styles/global.css";
import Providers from "./provider";
import Wrapper from "@/app/components/layouts/Wrapper.tsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>A2C</title>
      </head>
      <body>
        <Providers>
          <AppRouterCacheProvider>
            <Wrapper>{children}</Wrapper>
          </AppRouterCacheProvider>
        </Providers>
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_ID}`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
