import "@/assets/scss/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import "remixicon/fonts/remixicon.css";

import { ApplicationProvider } from "@/context";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const AuthenticatedLayout = dynamic(
  () => import("@/shared/layouts/authenticated-layout"),
  { ssr: false }
);
const GuestLayout = dynamic(() => import("@/shared/layouts/guest-layout"), {
  ssr: false,
});

// const fontInter = localFont({
//   src: "../assets/fonts/inter-variable.ttf",
//   variable: "--font-inter",
// });
const displaySans = localFont({
  src: "../assets/fonts/comfortaa-bold.ttf",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-inter",
});

const layouts = {
  GuestLayout,
  AuthenticatedLayout,
};

function App({ Component, pageProps }) {
  const { user } = useAuth();

  const Layout =
    layouts[Component.layout] ||
    ((pageProps) => <Component>{pageProps}</Component>);

  return (
    <div className={`${inter.variable} font-inter ${displaySans.variable}`}>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        <ApplicationProvider>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </ApplicationProvider>
      </GoogleOAuthProvider>
      <div id="dialog-portal" className="portal"></div>
    </div>
  );
}

export default App;
