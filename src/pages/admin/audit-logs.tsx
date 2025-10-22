// src/pages/admin/audit-logs.tsx
import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import AuditLogTable from "../../components/Admin/AuditLogTable";

export default function AuditLogs() {
  return (
    <>
      <Head>
        <title>Audit Logs | FlexTrack Admin</title>
        <meta name="description" content="View system audit logs" />
      </Head>

      <MainLayout>
        <AuditLogTable />
      </MainLayout>
    </>
  );
}
