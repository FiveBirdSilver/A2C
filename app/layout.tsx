import TanstackProvider from "./provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>[TDD] NextJS</title>
      </head>
      <body>
        <TanstackProvider>
          <div>헤더입니다</div>
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
