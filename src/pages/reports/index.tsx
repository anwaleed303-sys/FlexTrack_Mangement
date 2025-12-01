import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import ExportModal from "../../components/Reports/ExportModal";

export default function Reports() {
  return (
    <>
      <Head>
        <title>Reports | FlexTrack</title>
        <meta name="description" content="Generate and export reports" />
      </Head>

      <MainLayout>
        <h1>Analytics & Reports Generation</h1>
        <br />
        <br />
        <ExportModal />
      </MainLayout>
    </>
  );
}
