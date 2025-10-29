import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Tag,
  Button,
  Badge,
  Avatar,
  message,
  Space,
  Typography,
  Divider,
  Modal,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

interface EmployeeData {
  name?: string;
  fullName?: string;
  email: string;
  specificRole: string;
  shift: string;
  profileImage?: string;
}

interface ShiftRequestData {
  employeeName: string;
  employeeEmail: string;
  profileImage?: string;
  currentDepartment: string;
  currentShift: string;
  currentEmploymentType: string;
  requestedShift: string;
  requestedEmploymentType: string;
  dateRange: [string, string];
  reason: string;
  requestDate: string;
  status: string;
  decisionTime?: number; // ✅ Add this line
}

const ShiftTypes: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeData | null>(
    null
  );
  const [shiftRequests, setShiftRequests] = useState<ShiftRequestData[]>([]);
  const [userRequests, setUserRequests] = useState<ShiftRequestData[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<ShiftRequestData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const employeesData = JSON.parse(localStorage.getItem("employees") || "[]");

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);

      if (userData.userRole === "admin") {
        setIsAdmin(true);
        loadPendingRequests();
      } else {
        const employee = employeesData.find(
          (emp: EmployeeData) => emp.email === userData.email
        );
        if (employee) {
          setCurrentEmployee(employee);
          loadUserRequests(employee.email);
        }
      }
    }
  }, []);

  const loadPendingRequests = () => {
    const requests = JSON.parse(localStorage.getItem("shiftRequests") || "[]");
    setShiftRequests(
      requests.filter((req: ShiftRequestData) => req.status === "pending")
    );
  };

  const loadUserRequests = (email: string) => {
    const requests = JSON.parse(localStorage.getItem("shiftRequests") || "[]");
    const oneDay = 24 * 60 * 60 * 1000;

    // ✅ Remove expired approved/rejected requests permanently
    const cleanedRequests = requests.filter((req: ShiftRequestData) => {
      // Keep requests of other employees untouched
      if (req.employeeEmail !== email) return true;

      // Keep pending always
      if (req.status === "pending") return true;

      // Keep approved/rejected only if within 1 day
      return req.decisionTime && Date.now() - req.decisionTime < oneDay;
    });

    // ✅ Save cleaned list back to local storage
    localStorage.setItem("shiftRequests", JSON.stringify(cleanedRequests));

    // ✅ Now filter to show only logged-in user's requests
    setUserRequests(
      cleanedRequests.filter(
        (req: ShiftRequestData) => req.employeeEmail === email
      )
    );
  };

  const handleRequestClick = (req: ShiftRequestData) => {
    setSelectedRequest(req);
    setIsModalVisible(true);
  };

  const handleApprove = () => {
    if (!selectedRequest) return;
    const requests = JSON.parse(localStorage.getItem("shiftRequests") || "[]");

    const updated = requests.map((r: ShiftRequestData) =>
      r.requestDate === selectedRequest.requestDate &&
      r.employeeEmail === selectedRequest.employeeEmail
        ? { ...r, status: "approved", decisionTime: Date.now() }
        : r
    );

    localStorage.setItem("shiftRequests", JSON.stringify(updated));
    message.success("Request Approved");
    setIsModalVisible(false);
    loadPendingRequests();
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    const requests = JSON.parse(localStorage.getItem("shiftRequests") || "[]");

    const updated = requests.map((r: ShiftRequestData) =>
      r.requestDate === selectedRequest.requestDate &&
      r.employeeEmail === selectedRequest.employeeEmail
        ? { ...r, status: "rejected", decisionTime: Date.now() }
        : r
    );

    localStorage.setItem("shiftRequests", JSON.stringify(updated));
    message.info("Request Rejected");
    setIsModalVisible(false);
    loadPendingRequests();
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };

  return (
    <div style={{ padding: 0, marginTop: "24px", overflowX: "hidden" }}>
      {" "}
      <Row gutter={[16, 16]}>
        {/* Admin – Pending Requests */}
        {isAdmin && (
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <Text strong>Pending Shift Requests</Text>
                  <Badge count={shiftRequests.length} />
                </Space>
              }
              bordered={false}
              style={{ borderRadius: 12 }}
            >
              <Row gutter={[16, 16]}>
                {shiftRequests.map((request, index) => (
                  <Col xs={24} sm={12} lg={8} key={index}>
                    <Card
                      hoverable
                      bodyStyle={{ padding: 16 }}
                      style={{
                        background: "#fafafa",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                      onClick={() => handleRequestClick(request)}
                    >
                      <Space
                        direction="vertical"
                        size={12}
                        style={{ width: "100%" }}
                      >
                        <Row gutter={8} align="middle">
                          <Avatar
                            src={request.profileImage}
                            icon={<UserOutlined />}
                            size={40}
                          />
                          <Col flex={1}>
                            <Text strong>{request.employeeName}</Text>
                            <Text
                              type="secondary"
                              style={{ fontSize: 12, display: "block" }}
                            >
                              {request.currentDepartment}
                            </Text>
                          </Col>
                        </Row>

                        <Divider style={{ margin: "4px 0" }} />

                        <Row justify="space-between">
                          <Text type="secondary">Current:</Text>
                          <Tag color="blue">{request.currentShift}</Tag>
                        </Row>

                        <Row justify="space-between">
                          <Text type="secondary">Requested:</Text>
                          <Tag color="green">{request.requestedShift}</Tag>
                        </Row>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        )}

        {/* Employee – Their Requests */}
        {!isAdmin && userRequests.length > 0 && (
          <Col xs={24}>
            <Card
              title="My Shift Change Requests"
              bordered={false}
              style={{ borderRadius: 12 }}
            >
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                {userRequests.map((req, index) => (
                  <Card
                    key={index}
                    style={{ background: "#fafafa", borderRadius: 8 }}
                    bodyStyle={{ padding: 16 }}
                  >
                    <Row justify="space-between">
                      <Text strong>
                        {req.currentShift} → {req.requestedShift}
                      </Text>
                      <Tag color={getStatusColor(req.status)}>
                        {req.status.toUpperCase()}
                      </Tag>
                    </Row>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {dayjs(req.requestDate).format("MMM D, YYYY")}
                    </Text>
                  </Card>
                ))}
              </Space>
            </Card>
          </Col>
        )}
      </Row>
      {/* Modal */}
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={650}
        title={
          <Space>
            <CalendarOutlined style={{ color: "#20c997" }} />
            <Text strong>Shift Change Request</Text>
          </Space>
        }
      >
        {selectedRequest && (
          <Space direction="vertical" size={20} style={{ width: "100%" }}>
            <Card bodyStyle={{ padding: 16 }} style={{ background: "#f9fafb" }}>
              <Row gutter={12} align="middle">
                <Avatar
                  src={selectedRequest.profileImage}
                  size={60}
                  icon={<UserOutlined />}
                />
                <Space direction="vertical">
                  <Text strong>{selectedRequest.employeeName}</Text>
                  <Text type="secondary">{selectedRequest.employeeEmail}</Text>
                </Space>
              </Row>
            </Card>

            <Card bodyStyle={{ padding: 16 }}>
              <Row justify="space-between">
                <Tag color="blue">{selectedRequest.currentShift}</Tag>
                <Tag color="green">{selectedRequest.requestedShift}</Tag>
              </Row>

              <Divider />

              <Text strong>
                {dayjs(selectedRequest.dateRange[0]).format("MMM D")} -{" "}
                {dayjs(selectedRequest.dateRange[1]).format("MMM D, YYYY")}
              </Text>

              <Divider />

              <Text>{selectedRequest.reason}</Text>
            </Card>

            <Row gutter={12}>
              <Col span={12}>
                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<CheckCircleOutlined />}
                  onClick={handleApprove}
                >
                  Approve
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  danger
                  block
                  size="large"
                  icon={<CloseCircleOutlined />}
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </Col>
            </Row>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default ShiftTypes;
