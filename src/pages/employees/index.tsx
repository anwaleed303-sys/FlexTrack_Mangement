import { useState } from "react";
import Head from "next/head";
import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MainLayout from "../../components/Layout/MainLayout";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import EmployeeFormModal from "../../components/Employees/EmployeeFormModal";

export default function Employees() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = (id: string) => {
    console.log("Editing employee:", id);
    setIsModalVisible(true);
  };

  return (
    <>
      <Head>
        <title>Employees | FlexTrack</title>
      </Head>
      <MainLayout>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Employees</h1>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Add Employee
            </Button>
          </div>
          <EmployeeTable onEdit={handleEdit} />
          <EmployeeFormModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
        </Space>
      </MainLayout>
    </>
  );
}
