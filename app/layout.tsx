import "../styles/global.css";
import TanstackProvider from "./provider";
import Header from "./components/layout/header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>[TDD] NextJS</title>
      </head>
      <body>
        <TanstackProvider>
          <AppRouterCacheProvider>
            <Header />
            {children}
          </AppRouterCacheProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
