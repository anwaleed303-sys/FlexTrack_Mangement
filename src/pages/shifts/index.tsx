// src/pages/shifts/index.tsx
import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import ShiftForm from "../../components/Shifts/ShiftForm";
import ShiftList from "../../components/Shifts/ShiftList";

export default function Shifts() {
  return (
    <>
      <Head>
        <title>Shift Management | FlexTrack</title>
        <meta name="description" content="Manage work shifts" />
      </Head>

      <MainLayout>
        <ShiftForm />
        <ShiftList />
      </MainLayout>
    </>
  );
}
