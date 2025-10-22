// src/pages/reports/index.tsx
import Head from "next/head";
import { useState } from "react";
import { Button } from "antd";
import MainLayout from "../../components/Layout/MainLayout";
import ExportModal from "../../components/Reports/ExportModal";

export default function Reports() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Head>
        <title>Reports | FlexTrack</title>
        <meta name="description" content="Generate and export reports" />
      </Head>

      <MainLayout>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Export Report
        </Button>

        <ExportModal
        //   visible={isModalVisible}
        //   onClose={() => setIsModalVisible(false)}
        />
      </MainLayout>
    </>
  );
}
