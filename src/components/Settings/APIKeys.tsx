import React from "react";
import { Card, Button, Table, Typography } from "antd";

const APIKeys: React.FC = () => {
  const data = [
    {
      key: "1",
      name: "Production API",
      apiKey: "sk_live_***************",
      created: "2025-10-01",
      status: "Active",
    },
  ];
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "API Key",
      dataIndex: "apiKey",
      key: "apiKey",
      render: (text: string) => <Typography.Text code>{text}</Typography.Text>,
    },
    { title: "Created", dataIndex: "created", key: "created" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];
  return (
    <Card
      title="API Keys"
      extra={<Button type="primary">Generate New Key</Button>}
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};
export default APIKeys;
