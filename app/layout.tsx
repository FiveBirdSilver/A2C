import TanstackProvider from "./provider";
import "../styles/global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>[TDD] NextJS</title>
      </head>
      <body>
        <TanstackProvider>
          <div className="flex content-center px-2 py-2 mb-4 bg-black">
            <span className="text-white ">FIVEBIRDSILVER</span>
          </div>
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
