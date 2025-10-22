import React from "react";
import { Card, Button, Space, Typography } from "antd";
import {
  ClockCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const CheckInPanel: React.FC = () => (
  <Card>
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Typography.Title level={4}>
        <ClockCircleOutlined /> Quick Check-In
      </Typography.Title>
      <Typography.Text>
        Current Time: {new Date().toLocaleTimeString()}
      </Typography.Text>
      <Space>
        <Button type="primary" icon={<LoginOutlined />}>
          Check In
        </Button>
        <Button icon={<LogoutOutlined />}>Check Out</Button>
      </Space>
    </Space>
  </Card>
);
export default CheckInPanel;
