import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import { ReactQueryProvider } from "./utils/ReactQueryProvider";
import AuthSessionProvider from "./utils/AuthSessionProvider";
import { getUserSession } from "./utils/GetUserSession";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getUserSession();
  return (
    <html lang="en">
      <ReactQueryProvider>
        <AuthSessionProvider>
          <body className={font.className}>
            <Navbar currentUser={currentUser} />
            {children}
          </body>
        </AuthSessionProvider>
      </ReactQueryProvider>
    </html>
  );
}
