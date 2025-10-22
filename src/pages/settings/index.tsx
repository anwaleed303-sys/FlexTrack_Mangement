// src/pages/settings/index.tsx
import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import Profile from "../../components/Settings/Profile";
import TwoFA from "../../components/Settings/TwoFA";
import Webhooks from "../../components/Settings/Webhooks";
import APIKeys from "../../components/Settings/APIKeys";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings | FlexTrack</title>
        <meta name="description" content="Manage your settings" />
      </Head>

      <MainLayout>
        <Profile />
        <TwoFA />
        <Webhooks />
        <APIKeys />
      </MainLayout>
    </>
  );
}
