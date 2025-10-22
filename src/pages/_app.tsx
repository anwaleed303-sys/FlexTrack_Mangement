import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
