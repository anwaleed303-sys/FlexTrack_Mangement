import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ConfigProvider, App as AntApp } from "antd";
import { store } from "../redux/store";
import "../styles/globals.css";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0066FF",
            borderRadius: 8,
          },
        }}
      >
        <AntApp
          message={{
            top: 24,
            duration: 3,
            maxCount: 3,
          }}
        >
          <Component {...pageProps} />
        </AntApp>
      </ConfigProvider>
    </Provider>
  );
}
