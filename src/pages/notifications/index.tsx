// src/pages/notifications/index.tsx
import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import NotificationsCenter from "../../components/Notifications/NotificationsCenter";

export default function Notifications() {
  return (
    <>
      <Head>
        <title>Notifications | FlexTrack</title>
        <meta name="description" content="View notifications" />
      </Head>

      <MainLayout>
        <NotificationsCenter />
      </MainLayout>
    </>
  );
}
