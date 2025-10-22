import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const CardStats: React.FC = () => (
  <Row gutter={16}>
    <Col span={6}>
      <Card>
        <Statistic
          title="Total Employees"
          value={112}
          prefix={<UserOutlined />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic
          title="Present Today"
          value={98}
          prefix={<CheckCircleOutlined />}
          valueStyle={{ color: "#3f8600" }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic
          title="Late Arrivals"
          value={8}
          prefix={<ClockCircleOutlined />}
          valueStyle={{ color: "#faad14" }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic
          title="Absent"
          value={6}
          prefix={<CloseCircleOutlined />}
          valueStyle={{ color: "#cf1322" }}
        />
      </Card>
    </Col>
  </Row>
);
export default CardStats;
