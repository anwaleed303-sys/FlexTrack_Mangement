import Head from "next/head";
import { Space, Row, Col } from "antd";
import MainLayout from "../../components/Layout/MainLayout";
import CheckInPanel from "../../components/Attendance/CheckInPanel";
import AttendanceTable from "../../components/Attendance/AttendanceTable";

export default function Attendance() {
  return (
    <>
      <Head>
        <title>Attendance | FlexTrack</title>
      </Head>
      <MainLayout>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <h1>Attendance</h1>
          <Row gutter={16}>
            <Col span={8}>
              <CheckInPanel />
            </Col>
          </Row>
          <AttendanceTable />
        </Space>
      </MainLayout>
    </>
  );
}
