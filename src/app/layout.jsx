import "./globals.css";

export const metadata = {
  title: "Player Card",
  description: "Player Card",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  className="mdl-js">
      <body
      >
        <main>
          <div> {children}</div>
        </main>
      </body>
    </html>
  );
}
