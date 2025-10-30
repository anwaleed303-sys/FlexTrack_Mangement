// src/pages/settings/index.tsx
import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import Profile from "../../components/Settings/Profile";
import { Typography } from "antd";

const { Title } = Typography;

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings | FlexTrack</title>
        <meta name="description" content="Manage your settings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <MainLayout>
        <div style={{ padding: "0 16px" }}>
          <Title
            level={2}
            style={{
              marginBottom: "24px",
              fontSize: "28px",
              fontWeight: 600,
            }}
          >
            Profile Details
          </Title>
          <Profile />
        </div>
      </MainLayout>
    </>
  );
}
