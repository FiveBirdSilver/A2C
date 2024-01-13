export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>[TDD] NextJS</title>
      </head>
      <body>
        <div>헤더입니다</div>
        {children}
      </body>
    </html>
  );
}
