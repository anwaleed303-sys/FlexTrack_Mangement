"use client";
import React from "react";
import { Card, Row, Col, Button, Typography, Select, Divider } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const ExportModal: React.FC = () => {
  const cards = [
    {
      icon: <CalendarOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Attendance Report",
      buttonText: "View",
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Overtime Report",
      buttonText: "View",
    },
    {
      icon: <FileTextOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Pay Roll Report",
      buttonText: "View",
    },
    {
      icon: <RiseOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Productivity Report",
      buttonText: "View",
    },
  ];

  return (
    <>
      {/* Cards */}
      <Row gutter={[16, 16]} justify="start">
        {cards.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={6}>
            <Card
              variant="outlined"
              style={{ textAlign: "center" }}
              styles={{ body: { padding: 24 } }}
            >
              {card.icon}
              <Text strong style={{ display: "block", marginTop: 12 }}>
                {card.title}
              </Text>

              <Button
                style={{
                  marginTop: 16,
                  backgroundColor: "#10b981",
                  borderRadius: "20px",
                  borderColor: "#10b981",
                  color: "white",
                  width: "150px",
                }}
              >
                {card.buttonText}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ Select Report Section + Recent Reports Side by Side */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {/* ✅ Left Card — Select Report Type */}
        <Col xs={24} md={14}>
          <Card
            style={{
              borderRadius: "12px",
              width: "100%",
            }}
          >
            {/* Title Row */}
            <Row align="middle" style={{ marginBottom: 12 }}>
              <CalendarOutlined style={{ fontSize: 20, color: "#10b981" }} />
              <Text strong style={{ marginLeft: 8 }}>
                Select Report Type
              </Text>
            </Row>

            <Divider />

            {/* Dropdown Fields */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Select
                  placeholder="Department"
                  style={{ width: "100%", borderRadius: 8 }}
                  options={[
                    { label: "HR", value: "hr" },
                    { label: "Finance", value: "finance" },
                    { label: "IT", value: "it" },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="Report Rules"
                  style={{ width: "100%", borderRadius: 8 }}
                  options={[
                    { label: "Attendance Report", value: "Attendance Report" },
                    { label: "Overtime Report", value: "Overtime Report" },
                    { label: "Pay Roll Report", value: "Pay Roll Report" },
                    {
                      label: "Productivity Report",
                      value: "Productivity Report",
                    },
                  ]}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* ✅ Right Card — Recent Reports */}
        <Col xs={24} md={10}>
          <Card style={{ borderRadius: "12px", width: "100%" }}>
            <Text strong style={{ fontSize: 16 }}>
              Recent Reports
            </Text>

            {/* Report Item */}
            <div style={{ marginTop: 16 }}>
              {[
                {
                  name: "Attendance_Summary.pdf",
                  date: "2012-07 - 265",
                },
                {
                  name: "Attsdnance_Summary_June.pdf",
                  date: "207 - 2043",
                },
                {
                  name: "Overdanve_Summary_Q2.csv",
                  date: "2012 - 187",
                },
                {
                  name: "Attandance_Summary_Q2.csv",
                  date: "2012 - 184",
                },
              ].map((file, i) => (
                <Row
                  key={i}
                  justify="space-between"
                  align="middle"
                  style={{
                    padding: "10px 0",
                    borderBottom: i < 3 ? "1px solid #f0f0f0" : "",
                  }}
                >
                  <Row align="middle">
                    <FileTextOutlined
                      style={{ fontSize: 20, marginRight: 8, color: "#10b981" }}
                    />
                    <div>
                      <Text>{file.name}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {file.date}
                      </Text>
                    </div>
                  </Row>

                  <Button
                    type="text"
                    className="download-btn"
                    icon={
                      <DownloadOutlined
                        style={{ fontSize: 18, color: "#10b981" }}
                      />
                    }
                    style={{ padding: 0 }}
                  />
                </Row>
              ))}
            </div>
          </Card>
        </Col>
        {/* ✅ Report Builder Card (Below Select Report Type) */}
        <Col xs={24} md={14} style={{ marginTop: -178 }}>
          <Card
            style={{
              borderRadius: "12px",
              width: "100%",
            }}
          >
            {/* Header */}
            <Row align="middle" style={{ marginBottom: 12 }}>
              <FileTextOutlined style={{ fontSize: 20, color: "#10b981" }} />
              <Text strong style={{ marginLeft: 8 }}>
                Report Builder
              </Text>
            </Row>

            <Divider />

            {/* Fields */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Select
                  placeholder="From: 2021"
                  style={{ width: "100%", borderRadius: 8 }}
                  options={[
                    { label: "2021", value: "2021" },
                    { label: "2022", value: "2022" },
                    { label: "2023", value: "2023" },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="To: 2022"
                  style={{ width: "100%", borderRadius: 8 }}
                  options={[
                    { label: "2021", value: "2021" },
                    { label: "2022", value: "2022" },
                    { label: "2023", value: "2023" },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="Morning"
                  style={{ width: "100%", borderRadius: 8 }}
                  options={[
                    { label: "Morning", value: "morning" },
                    { label: "Evening", value: "evening" },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="Tide"
                  style={{ width: "100%", borderRadius: 8 }}
                  options={[
                    { label: "Tide", value: "tide" },
                    { label: "Night", value: "night" },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="Report Format"
                  style={{ width: "100%", borderRadius: 8 }}
                  options={[
                    { label: "PDF", value: "pdf" },
                    { label: "CSV", value: "csv" },
                    { label: "Excel", value: "excel" },
                  ]}
                />
              </Col>
            </Row>

            {/* Button */}
            <Row justify="center" style={{ marginTop: 24 }}>
              <Button
                style={{
                  backgroundColor: "#10b981",
                  borderColor: "#10b981",
                  borderRadius: "20px",
                  color: "white",
                  width: "180px",
                }}
              >
                Generate Report
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ExportModal;
