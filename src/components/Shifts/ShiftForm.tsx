// import { useState, useEffect } from "react";
// import {
//   Card,
//   Row,
//   Col,
//   Tag,
//   Button,
//   Badge,
//   Avatar,
//   message,
//   Space,
//   Typography,
//   Divider,
//   Modal,
// } from "antd";
// import {
//   CalendarOutlined,
//   UserOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
// } from "@ant-design/icons";
// import dayjs from "dayjs";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
// import {
//   reviewShiftRequestAsync,
//   fetchShiftRequests,
// } from "../../redux/slices/shiftsSlice";

// const { Text } = Typography;

// interface EmployeeData {
//   name?: string;
//   fullName?: string;
//   email: string;
//   specificRole: string;
//   shift: string;
//   profileImage?: string;
// }

// interface ShiftRequestData {
//   id?: string; //
//   employeeName: string;
//   employeeEmail: string;
//   profileImage?: string;
//   currentDepartment: string;
//   currentShift: string;
//   currentEmploymentType: string;
//   requestedShift: string;
//   requestedEmploymentType: string;
//   dateRange: [string, string];
//   reason: string;
//   requestDate: string;
//   status: string;
//   decisionTime?: number; // ✅ Add this line
// }

// const ShiftTypes: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>(); // ← Add <AppDispatch> type
//   const [isAdmin, setIsAdmin] = useState<boolean>(false);
//   const [currentEmployee, setCurrentEmployee] = useState<EmployeeData | null>(
//     null
//   );
//   const [shiftRequests, setShiftRequests] = useState<ShiftRequestData[]>([]);
//   const [userRequests, setUserRequests] = useState<ShiftRequestData[]>([]);
//   const [selectedRequest, setSelectedRequest] =
//     useState<ShiftRequestData | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("loggedInUser");
//     const employeesData = JSON.parse(localStorage.getItem("employees") || "[]");

//     if (loggedInUser) {
//       const userData = JSON.parse(loggedInUser);

//       if (userData.userRole === "admin") {
//         setIsAdmin(true);
//         loadPendingRequests();
//       } else {
//         const employee = employeesData.find(
//           (emp: EmployeeData) => emp.email === userData.email
//         );
//         if (employee) {
//           setCurrentEmployee(employee);
//           loadUserRequests(employee.email);
//         }
//       }
//     }
//   }, []);

//   const loadPendingRequests = () => {
//     const requests = JSON.parse(localStorage.getItem("shiftRequests") || "[]");
//     setShiftRequests(
//       requests.filter((req: ShiftRequestData) => req.status === "pending")
//     );
//   };

//   const loadUserRequests = (email: string) => {
//     const requests = JSON.parse(localStorage.getItem("shiftRequests") || "[]");
//     const oneDay = 24 * 60 * 60 * 1000;

//     // ✅ Remove expired approved/rejected requests permanently
//     const cleanedRequests = requests.filter((req: ShiftRequestData) => {
//       // Keep requests of other employees untouched
//       if (req.employeeEmail !== email) return true;

//       // Keep pending always
//       if (req.status === "pending") return true;

//       // Keep approved/rejected only if within 1 day
//       return req.decisionTime && Date.now() - req.decisionTime < oneDay;
//     });

//     // ✅ Save cleaned list back to local storage
//     localStorage.setItem("shiftRequests", JSON.stringify(cleanedRequests));

//     // ✅ Now filter to show only logged-in user's requests
//     setUserRequests(
//       cleanedRequests.filter(
//         (req: ShiftRequestData) => req.employeeEmail === email
//       )
//     );
//   };

//   const handleRequestClick = (req: ShiftRequestData) => {
//     setSelectedRequest(req);
//     setIsModalVisible(true);
//   };

//   const handleApprove = async (requestId: string) => {
//     try {
//       await dispatch(
//         reviewShiftRequestAsync({
//           id: requestId,
//           data: { status: "approved", adminNotes: "" },
//         })
//       ).unwrap();

//       message.success("Request Approved");
//       dispatch(fetchShiftRequests("pending")); // Refresh list
//     } catch (error: any) {
//       message.error(error || "Failed to approve request");
//     }
//   };

//   const handleReject = async (requestId: string) => {
//     try {
//       await dispatch(
//         reviewShiftRequestAsync({
//           id: requestId,
//           data: { status: "rejected", adminNotes: "" },
//         })
//       ).unwrap();

//       message.info("Request Rejected");
//       dispatch(fetchShiftRequests("pending")); // Refresh list
//     } catch (error: any) {
//       message.error(error || "Failed to reject request");
//     }
//   };

//   // const handleReject = () => {
//   //   if (!selectedRequest) return;
//   //   const requests = JSON.parse(localStorage.getItem("shiftRequests") || "[]");

//   //   const updated = requests.map((r: ShiftRequestData) =>
//   //     r.requestDate === selectedRequest.requestDate &&
//   //     r.employeeEmail === selectedRequest.employeeEmail
//   //       ? { ...r, status: "rejected", decisionTime: Date.now() }
//   //       : r
//   //   );

//   //   localStorage.setItem("shiftRequests", JSON.stringify(updated));
//   //   message.info("Request Rejected");
//   //   setIsModalVisible(false);
//   //   loadPendingRequests();
//   // };

//   const getStatusColor = (status: string) => {
//     if (status === "approved") return "success";
//     if (status === "rejected") return "error";
//     return "warning";
//   };

//   return (
//     <div style={{ padding: 0, marginTop: "24px", overflowX: "hidden" }}>
//       {" "}
//       <Row gutter={[16, 16]}>
//         {/* Admin – Pending Requests */}
//         {isAdmin && (
//           <Col xs={24}>
//             <Card
//               title={
//                 <Space>
//                   <Text strong>Pending Shift Requests</Text>
//                   <Badge count={shiftRequests.length} />
//                 </Space>
//               }
//               bordered={false}
//               style={{ borderRadius: 12 }}
//             >
//               <Row gutter={[16, 16]}>
//                 {shiftRequests.map((request, index) => (
//                   <Col xs={24} sm={12} lg={8} key={index}>
//                     <Card
//                       hoverable
//                       bodyStyle={{ padding: 16 }}
//                       style={{
//                         background: "#fafafa",
//                         borderRadius: 8,
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleRequestClick(request)}
//                     >
//                       <Space
//                         direction="vertical"
//                         size={12}
//                         style={{ width: "100%" }}
//                       >
//                         <Row gutter={8} align="middle">
//                           <Avatar
//                             src={request.profileImage}
//                             icon={<UserOutlined />}
//                             size={40}
//                           />
//                           <Col flex={1}>
//                             <Text strong>{request.employeeName}</Text>
//                             <Text
//                               type="secondary"
//                               style={{ fontSize: 12, display: "block" }}
//                             >
//                               {request.currentDepartment}
//                             </Text>
//                           </Col>
//                         </Row>

//                         <Divider style={{ margin: "4px 0" }} />

//                         <Row justify="space-between">
//                           <Text type="secondary">Current:</Text>
//                           <Tag color="blue">{request.currentShift}</Tag>
//                         </Row>

//                         <Row justify="space-between">
//                           <Text type="secondary">Requested:</Text>
//                           <Tag color="green">{request.requestedShift}</Tag>
//                         </Row>
//                       </Space>
//                     </Card>
//                   </Col>
//                 ))}
//               </Row>
//             </Card>
//           </Col>
//         )}

//         {/* Employee – Their Requests */}
//         {!isAdmin && userRequests.length > 0 && (
//           <Col xs={24}>
//             <Card
//               title="My Shift Change Requests"
//               bordered={false}
//               style={{ borderRadius: 12 }}
//             >
//               <Space direction="vertical" size={16} style={{ width: "100%" }}>
//                 {userRequests.map((req, index) => (
//                   <Card
//                     key={index}
//                     style={{ background: "#fafafa", borderRadius: 8 }}
//                     bodyStyle={{ padding: 16 }}
//                   >
//                     <Row justify="space-between">
//                       <Text strong>
//                         {req.currentShift} → {req.requestedShift}
//                       </Text>
//                       <Tag color={getStatusColor(req.status)}>
//                         {req.status.toUpperCase()}
//                       </Tag>
//                     </Row>
//                     <Text type="secondary" style={{ fontSize: 12 }}>
//                       {dayjs(req.requestDate).format("MMM D, YYYY")}
//                     </Text>
//                   </Card>
//                 ))}
//               </Space>
//             </Card>
//           </Col>
//         )}
//       </Row>
//       {/* Modal */}
//       <Modal
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//         centered
//         width={650}
//         title={
//           <Space>
//             <CalendarOutlined style={{ color: "#20c997" }} />
//             <Text strong>Shift Change Request</Text>
//           </Space>
//         }
//       >
//         {selectedRequest && (
//           <Space direction="vertical" size={20} style={{ width: "100%" }}>
//             <Card bodyStyle={{ padding: 16 }} style={{ background: "#f9fafb" }}>
//               <Row gutter={12} align="middle">
//                 <Avatar
//                   src={selectedRequest.profileImage}
//                   size={60}
//                   icon={<UserOutlined />}
//                 />
//                 <Space direction="vertical">
//                   <Text strong>{selectedRequest.employeeName}</Text>
//                   <Text type="secondary">{selectedRequest.employeeEmail}</Text>
//                 </Space>
//               </Row>
//             </Card>

//             <Card bodyStyle={{ padding: 16 }}>
//               <Row justify="space-between">
//                 <Tag color="blue">{selectedRequest.currentShift}</Tag>
//                 <Tag color="green">{selectedRequest.requestedShift}</Tag>
//               </Row>

//               <Divider />

//               <Text strong>
//                 {dayjs(selectedRequest.dateRange[0]).format("MMM D")} -{" "}
//                 {dayjs(selectedRequest.dateRange[1]).format("MMM D, YYYY")}
//               </Text>

//               <Divider />

//               <Text>{selectedRequest.reason}</Text>
//             </Card>

//             <Row gutter={12}>
//               <Col span={12}>
//                 <Button
//                   block
//                   size="large"
//                   icon={<CheckCircleOutlined />}
//                   onClick={() => handleApprove(selectedRequest.id!)}
//                 >
//                   Approve
//                 </Button>
//               </Col>
//               <Col span={12}>
//                 <Button
//                   danger
//                   block
//                   size="large"
//                   icon={<CloseCircleOutlined />}
//                   onClick={() => handleReject(selectedRequest.id!)}
//                 >
//                   Reject
//                 </Button>
//               </Col>
//             </Row>
//           </Space>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ShiftTypes;

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
  Spin,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  reviewShiftRequestAsync,
  fetchShiftRequests,
} from "../../redux/slices/shiftsSlice";

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
  id?: string;
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
  decisionTime?: number;
}

const ShiftTypes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ GET DATA FROM REDUX STORE
  const { requests, loading } = useSelector((state: RootState) => state.shifts);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeData | null>(
    null
  );
  const [selectedRequest, setSelectedRequest] =
    useState<ShiftRequestData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // ✅ FETCH DATA FROM BACKEND ON MOUNT
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const employeesData = JSON.parse(localStorage.getItem("employees") || "[]");

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);

      if (userData.userRole === "admin") {
        setIsAdmin(true);
        // ✅ FETCH PENDING REQUESTS FROM BACKEND
        dispatch(fetchShiftRequests("pending"));
      } else {
        const employee = employeesData.find(
          (emp: EmployeeData) => emp.email === userData.email
        );
        if (employee) {
          setCurrentEmployee(employee);
          // ✅ FETCH USER'S REQUESTS FROM BACKEND
          dispatch(fetchShiftRequests("all"));
        }
      }
    }
  }, [dispatch]);

  const handleRequestClick = (req: ShiftRequestData) => {
    setSelectedRequest(req);
    setIsModalVisible(true);
  };

  // ✅ BACKEND CONNECTED APPROVE
  const handleApprove = async (requestId: string) => {
    if (!requestId) {
      message.error("Invalid request ID");
      return;
    }

    try {
      await dispatch(
        reviewShiftRequestAsync({
          id: requestId,
          data: { status: "approved", adminNotes: "" },
        })
      ).unwrap();

      message.success("Request Approved");
      setIsModalVisible(false);

      // ✅ REFRESH LIST AFTER ACTION
      dispatch(fetchShiftRequests("pending"));
    } catch (error: any) {
      message.error(error || "Failed to approve request");
    }
  };

  // ✅ BACKEND CONNECTED REJECT
  const handleReject = async (requestId: string) => {
    if (!requestId) {
      message.error("Invalid request ID");
      return;
    }

    try {
      await dispatch(
        reviewShiftRequestAsync({
          id: requestId,
          data: { status: "rejected", adminNotes: "" },
        })
      ).unwrap();

      message.info("Request Rejected");
      setIsModalVisible(false);

      // ✅ REFRESH LIST AFTER ACTION
      dispatch(fetchShiftRequests("pending"));
    } catch (error: any) {
      message.error(error || "Failed to reject request");
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };

  // ✅ FILTER REQUESTS FROM REDUX STATE
  const pendingRequests = isAdmin
    ? requests.filter((req: any) => req.status === "pending")
    : [];

  const userRequests =
    !isAdmin && currentEmployee
      ? requests.filter(
          (req: any) => req.employeeEmail === currentEmployee.email
        )
      : [];

  return (
    <div style={{ padding: 0, marginTop: "24px", overflowX: "hidden" }}>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {/* Admin – Pending Requests */}
          {/* {isAdmin && (
            <Col xs={24}>
              <Card
                title={
                  <Space>
                    <Text strong>Pending Shift Requests</Text>
                    <Badge count={pendingRequests.length} />
                  </Space>
                }
                bordered={false}
                style={{ borderRadius: 12 }}
              >
                {pendingRequests.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center" }}>
                    <Text type="secondary">No pending requests</Text>
                  </div>
                ) : (
                  <Row gutter={[16, 16]}>
                    {pendingRequests.map((request: any, index: number) => (
                      <Col xs={24} sm={12} lg={8} key={request.id || index}>
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
                )}
              </Card>
            </Col>
          )} */}

          {/* Employee – Their Requests */}
          {!isAdmin && userRequests.length > 0 && (
            <Col xs={24}>
              <Card
                title="My Shift Change Requests"
                bordered={false}
                style={{ borderRadius: 12 }}
              >
                <Space direction="vertical" size={16} style={{ width: "100%" }}>
                  {userRequests.map((req: any, index: number) => (
                    <Card
                      key={req.id || index}
                      style={{ background: "#fafafa", borderRadius: 8 }}
                      bodyStyle={{ padding: 16 }}
                    >
                      <Row justify="space-between" align="middle">
                        <Space direction="vertical" size={4}>
                          <Text strong>
                            {req.currentShift} → {req.requestedShift}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {dayjs(req.requestDate).format("MMM D, YYYY")}
                          </Text>
                        </Space>
                        <Tag color={getStatusColor(req.status)}>
                          {req.status.toUpperCase()}
                        </Tag>
                      </Row>

                      {req.reason && (
                        <>
                          <Divider style={{ margin: "12px 0" }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Reason: {req.reason}
                          </Text>
                        </>
                      )}
                    </Card>
                  ))}
                </Space>
              </Card>
            </Col>
          )}

          {/* Employee – No Requests Message */}
          {/* {!isAdmin && userRequests.length === 0 && !loading && (
            <Col xs={24}>
              <Card bordered={false} style={{ borderRadius: 12 }}>
                <div style={{ padding: "40px", textAlign: "center" }}>
                  <Text type="secondary">
                    You have no shift change requests
                  </Text>
                </div>
              </Card>
            </Col>
          )} */}
        </Row>
      </Spin>

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
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {selectedRequest.currentDepartment}
                  </Text>
                </Space>
              </Row>
            </Card>

            <Card bodyStyle={{ padding: 16 }}>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Row justify="space-between" align="middle">
                  <Text type="secondary">Current Shift:</Text>
                  <Tag color="blue">{selectedRequest.currentShift}</Tag>
                </Row>

                <Row justify="space-between" align="middle">
                  <Text type="secondary">Requested Shift:</Text>
                  <Tag color="green">{selectedRequest.requestedShift}</Tag>
                </Row>

                <Divider style={{ margin: "8px 0" }} />

                <Row justify="space-between" align="middle">
                  <Text type="secondary">Employment Type:</Text>
                  <Tag>{selectedRequest.requestedEmploymentType}</Tag>
                </Row>

                <Divider style={{ margin: "8px 0" }} />

                <Space direction="vertical" size={4}>
                  <Text type="secondary">Effective Date Range:</Text>
                  <Text strong>
                    {dayjs(selectedRequest.dateRange[0]).format("MMM D, YYYY")}{" "}
                    -{" "}
                    {dayjs(selectedRequest.dateRange[1]).format("MMM D, YYYY")}
                  </Text>
                </Space>

                {selectedRequest.reason && (
                  <>
                    <Divider style={{ margin: "8px 0" }} />
                    <Space direction="vertical" size={4}>
                      <Text type="secondary">Reason:</Text>
                      <Text>{selectedRequest.reason}</Text>
                    </Space>
                  </>
                )}

                <Divider style={{ margin: "8px 0" }} />

                <Text type="secondary" style={{ fontSize: 11 }}>
                  Requested on:{" "}
                  {dayjs(selectedRequest.requestDate).format(
                    "MMM D, YYYY h:mm A"
                  )}
                </Text>
              </Space>
            </Card>

            {isAdmin && selectedRequest.status === "pending" && (
              <Row gutter={12}>
                <Col span={12}>
                  <Button
                    block
                    size="large"
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleApprove(selectedRequest.id!)}
                    loading={loading}
                    style={{
                      backgroundColor: "#52c41a",
                      borderColor: "#52c41a",
                    }}
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
                    onClick={() => handleReject(selectedRequest.id!)}
                    loading={loading}
                  >
                    Reject
                  </Button>
                </Col>
              </Row>
            )}

            {selectedRequest.status !== "pending" && (
              <Card
                bodyStyle={{ padding: 12 }}
                style={{ background: "#f0f0f0" }}
              >
                <Text type="secondary" style={{ fontSize: 12 }}>
                  This request has been{" "}
                  <Text
                    strong
                    style={{
                      color:
                        getStatusColor(selectedRequest.status) === "success"
                          ? "#52c41a"
                          : "#ff4d4f",
                    }}
                  >
                    {selectedRequest.status}
                  </Text>
                </Text>
              </Card>
            )}
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default ShiftTypes;
