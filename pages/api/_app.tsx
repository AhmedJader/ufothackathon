import Navbar from "@/components/Navbar"; // Import Navbar component
import { useRouter } from "next/router";
import "@/styles/globals.css"; // Import global styles
import type { AppProps } from "next/app"; // Import AppProps type for proper typing

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Exclude Navbar on sign-in and sign-up pages
  const noNavbarRoutes = ["/sign-in", "/sign-up"];
  const showNavbar = !noNavbarRoutes.includes(router.pathname);

  return (
    <>
      {showNavbar && <Navbar userId={null} />} {/* Show Navbar only if needed */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
