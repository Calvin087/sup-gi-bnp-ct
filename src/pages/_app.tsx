import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Pixelify_Sans } from "next/font/google";
const pixelFont = Pixelify_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={pixelFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
