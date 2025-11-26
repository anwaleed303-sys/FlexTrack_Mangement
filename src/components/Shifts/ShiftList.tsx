import { useState, useEffect, useMemo } from "react";
import {
  Select,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Card,
  DatePicker,
  Modal,
  Form,
  Radio,
  message,
  Tag,
  Divider,
  Input,
  Avatar,
  Checkbox,
  Spin,
  Empty,
  App,
} from "antd";
import {
  PlusOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  assignShiftAsync,
  createShiftRequestAsync,
  fetchDepartments,
  fetchShiftAssignments,
  fetchShiftRequests,
  fetchEmployeesAsync,
  reviewShiftRequestAsync,
} from "../../redux/slices/shiftsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

// Extend dayjs with plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface EmployeeData {
  _id?: string;
  name: string;
  fullName?: string;
  email: string;
  specificRole: string;
  shift: string;
  customShift?: string;
  employmentType: string;
  weeklyHours: number;
  profileImage?: string;
  registeredAt?: string;
}

interface ShiftAssignment {
  _id?: string;
  employeeEmail: string;
  employeeName: string;
  shift: string;
  customShift?: string;
  startDate: string;
  endDate: string;
  assignedBy: string;
  assignedDate: string;
  closedDays?: string[];
}

interface ShiftRequest {
  _id: string;
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
  status: "pending" | "approved" | "rejected";
  closedDays?: string[];
  reviewedBy?: string;
  reviewedAt?: string;
  adminComments?: string;
  adminNotes?: string;
}
// const sendNotificationToEmployee = (
//   employeeName: string,
//   type: "shift_assignment" | "shift_approval" | "shift_rejection",
//   title: string,
//   message: string,
//   shiftRequestId?: string,
//   assignmentId?: string
// ) => {
//   const employeeNotifications: any[] = JSON.parse(
//     localStorage.getItem(`notifications_${employeeName}`) || "[]"
//   );

//   const newNotification = {
//     id: `notif_${Date.now()}_${Math.random()}`,
//     type,
//     title,
//     message,
//     date: new Date().toISOString(),
//     read: false,
//     shiftRequestId,
//     assignmentId,
//   };

//   employeeNotifications.unshift(newNotification);
//   localStorage.setItem(
//     `notifications_${employeeName}`,
//     JSON.stringify(employeeNotifications)
//   );
// };
const ShiftManagement: React.FC = () => {
  const { message } = App.useApp();

  const dispatch = useDispatch<AppDispatch>();
  const { assignments, requests, departments, loading, error } = useSelector(
    (state: RootState) => state.shifts
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ShiftRequest | null>(
    null
  );
  const [form] = Form.useForm();
  const [reviewForm] = Form.useForm();

  const [currentEmployee, setCurrentEmployee] = useState<EmployeeData | null>(
    null
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeData[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [modalSearchText, setModalSearchText] = useState<string>("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterShift, setFilterShift] = useState<string>("all");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >([dayjs().startOf("week"), dayjs().endOf("week")]);
  const [closedDays, setClosedDays] = useState<string[]>([]);
  const [myRequests, setMyRequests] = useState<ShiftRequest[]>([]);

  const [availableShifts] = useState([
    { value: "morning", label: "Morning (6 AM - 2 PM)" },
    { value: "afternoon", label: "Afternoon (2 PM - 10 PM)" },
    { value: "evening", label: "Evening (10 PM - 6 AM)" },
    { value: "closed", label: "Closed (No Shift)" },
  ]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Initialize user and fetch data
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("loggedInUser");
  //   if (loggedInUser) {
  //     const userData = JSON.parse(loggedInUser);

  //     if (userData.userRole === "admin") {
  //       setIsAdmin(true);
  //       // Fetch admin data
  //       dispatch(fetchDepartments());
  //       dispatch(fetchShiftAssignments({}));
  //       dispatch(fetchEmployeesAsync());
  //       dispatch(fetchShiftRequests("all"));
  //     } else {
  //       // Set employee data
  //       const employee: EmployeeData = {
  //         name: userData.name || userData.fullName || "Employee",
  //         fullName: userData.fullName || userData.name || "Employee",
  //         email: userData.email,
  //         specificRole:
  //           userData.specificRole || userData.department || "Employee",
  //         shift: userData.shift || "morning",
  //         employmentType: userData.employmentType || "fulltime",
  //         weeklyHours: userData.weeklyHours || 40,
  //         profileImage: userData.profileImage,
  //       };
  //       setCurrentEmployee(employee);

  //       // ✅ FETCH EMPLOYEE'S SHIFT ASSIGNMENTS
  //       const fetchEmployeeData = () => {
  //         dispatch(fetchShiftAssignments({ email: userData.email }));
  //         fetchEmployeeRequests();
  //       };

  //       // Initial fetch
  //       fetchEmployeeData();

  //       // ✅ POLL EVERY 10 SECONDS TO CHECK FOR NEW ASSIGNMENTS
  //       const pollInterval = setInterval(fetchEmployeeData, 10000);

  //       // Cleanup on unmount
  //       return () => clearInterval(pollInterval);
  //     }
  //   }
  // }, [dispatch]);

  // ✅ REPLACE THE EXISTING useEffect FOR EMPLOYEE INITIALIZATION
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("loggedInUser");
  //   if (loggedInUser) {
  //     const userData = JSON.parse(loggedInUser);

  //     if (userData.userRole === "admin") {
  //       setIsAdmin(true);
  //       dispatch(fetchDepartments());
  //       dispatch(fetchShiftAssignments({}));
  //       dispatch(fetchEmployeesAsync());
  //       dispatch(fetchShiftRequests("all"));
  //     } else {
  //       // Set employee data
  //       const employee: EmployeeData = {
  //         name: userData.name || userData.fullName || "Employee",
  //         fullName: userData.fullName || userData.name || "Employee",
  //         email: userData.email,
  //         specificRole:
  //           userData.specificRole || userData.department || "Employee",
  //         shift: userData.shift || "morning",
  //         employmentType: userData.employmentType || "fulltime",
  //         weeklyHours: userData.weeklyHours || 40,
  //         profileImage: userData.profileImage,
  //       };
  //       setCurrentEmployee(employee);

  //       // Initial fetch
  //       dispatch(fetchShiftAssignments({ email: userData.email }));
  //       dispatch(fetchShiftRequests("all")).then((result: any) => {
  //         if (result.payload?.requests) {
  //           const myReqs = result.payload.requests.filter(
  //             (req: ShiftRequest) => req.employeeEmail === userData.email
  //           );
  //           setMyRequests(myReqs);
  //         }
  //       });
  //     }
  //   }
  // }, [dispatch]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);

      if (userData.userRole === "admin") {
        setIsAdmin(true);
        dispatch(fetchDepartments());
        dispatch(fetchShiftAssignments({}));
        dispatch(fetchEmployeesAsync());
        dispatch(fetchShiftRequests("all"));
      } else {
        // Set employee data
        const employee: EmployeeData = {
          name: userData.name || userData.fullName || "Employee",
          fullName: userData.fullName || userData.name || "Employee",
          email: userData.email,
          specificRole:
            userData.specificRole || userData.department || "Employee",
          shift: userData.shift || "morning",
          employmentType: userData.employmentType || "fulltime",
          weeklyHours: userData.weeklyHours || 40,
          profileImage: userData.profileImage,
        };
        setCurrentEmployee(employee);

        // ✅ CRITICAL FIX: Fetch ALL assignments, not just filtered by email
        dispatch(fetchShiftAssignments({})); // Changed from { email: userData.email }

        dispatch(fetchShiftRequests("all")).then((result: any) => {
          if (result.payload?.requests) {
            const myReqs = result.payload.requests.filter(
              (req: ShiftRequest) => req.employeeEmail === userData.email
            );
            setMyRequests(myReqs);
          }
        });
      }
    }
  }, [dispatch]);

  // ✅ IMPROVED: getEmployeeWeekSchedule function
  // const getEmployeeWeekSchedule = () => {
  //   if (!currentEmployee) return {};

  //   const schedule: { [day: string]: string } = {};
  //   const startOfWeek = dateRange?.[0] || dayjs().startOf("week");

  //   days.forEach((day, index) => {
  //     const currentDate = startOfWeek.add(index, "day");

  //     // Find active assignment for this specific date
  //     const activeAssignment = assignments.find((assignment) => {
  //       const startDate = dayjs(assignment.startDate);
  //       const endDate = dayjs(assignment.endDate);

  //       return (
  //         assignment.employeeEmail === currentEmployee.email &&
  //         currentDate.isSameOrAfter(startDate, "day") &&
  //         currentDate.isSameOrBefore(endDate, "day")
  //       );
  //     });

  //     // Check if day is closed
  //     if (activeAssignment?.closedDays?.includes(day)) {
  //       schedule[day] = "closed";
  //     } else if (activeAssignment) {
  //       // Use assignment shift if exists
  //       schedule[day] = activeAssignment.shift;
  //     } else {
  //       // Fall back to employee's base shift
  //       schedule[day] = currentEmployee.shift;
  //     }
  //   });

  //   return schedule;
  // };
  // Fetch employees from backend (for admin)
  // ✅ REPLACE WITH THIS
  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchEmployeesAsync()); // ✅ Fetch real employee data
    }
  }, [isAdmin, dispatch]);

  // ✅ ADD THIS NEW EFFECT
  const { employees: reduxEmployees } = useSelector(
    (state: RootState) => state.shifts
  );

  useEffect(() => {
    if (isAdmin && reduxEmployees.length > 0) {
      setEmployees(reduxEmployees); // ✅ Use employees from Redux
      setFilteredEmployees(reduxEmployees);
    }
  }, [isAdmin, reduxEmployees]);
  useEffect(() => {
    if (!isAdmin && currentEmployee) {
      const fetchEmployeeData = () => {
        // ✅ CRITICAL FIX: Fetch ALL assignments
        dispatch(fetchShiftAssignments({})); // Changed from { email: currentEmployee.email }

        dispatch(fetchShiftRequests("all")).then((result: any) => {
          if (result.payload?.requests) {
            const myReqs = result.payload.requests.filter(
              (req: ShiftRequest) => req.employeeEmail === currentEmployee.email
            );
            setMyRequests(myReqs);
          }
        });
      };

      // Poll every 10 seconds
      const pollInterval = setInterval(fetchEmployeeData, 10000);

      // Cleanup on unmount
      return () => clearInterval(pollInterval);
    }
  }, [isAdmin, currentEmployee?.email, dispatch]);
  // Fetch employee's own requests
  const fetchEmployeeRequests = async () => {
    try {
      const result = await dispatch(fetchShiftRequests("all")).unwrap();
      if (result.requests) {
        const loggedInUser = JSON.parse(
          localStorage.getItem("loggedInUser") || "{}"
        );
        dispatch(fetchShiftAssignments({ email: loggedInUser.email }));
        const myReqs = result.requests.filter(
          (req: ShiftRequest) => req.employeeEmail === loggedInUser.email
        );
        setMyRequests(myReqs);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  // Filter employees
  useEffect(() => {
    let filtered = [...employees];

    if (searchText) {
      filtered = filtered.filter((emp) => {
        const name = (emp.name || emp.fullName || "").toLowerCase();
        const email = emp.email.toLowerCase();
        const role = emp.specificRole.toLowerCase();
        const search = searchText.toLowerCase();
        return (
          name.includes(search) ||
          email.includes(search) ||
          role.includes(search)
        );
      });
    }

    if (isAdmin && filterDepartment !== "all") {
      filtered = filtered.filter(
        (emp) =>
          emp.specificRole.toLowerCase() === filterDepartment.toLowerCase()
      );
    }

    if (isAdmin && filterShift !== "all") {
      filtered = filtered.filter((emp) => emp.shift === filterShift);
    }

    setFilteredEmployees(filtered);
  }, [filterDepartment, filterShift, employees, isAdmin, searchText]);

  const getEmployeeCurrentShift = (
    employee: EmployeeData,
    date: Date = new Date()
  ) => {
    const checkDate = dayjs(date);

    // Find all assignments that overlap with this date
    const currentAssignment = assignments
      .filter((assignment) => {
        const startDate = dayjs(assignment.startDate);
        const endDate = dayjs(assignment.endDate);

        return (
          assignment.employeeEmail === employee.email &&
          checkDate.isSameOrAfter(startDate, "day") &&
          checkDate.isSameOrBefore(endDate, "day")
        );
      })
      .sort(
        (a, b) =>
          new Date(b.assignedDate).getTime() -
          new Date(a.assignedDate).getTime()
      )[0]; // Get most recent

    return currentAssignment ? currentAssignment.shift : employee.shift;
  };

  const getEmployeeClosedDays = (
    employee: EmployeeData,
    date: Date = new Date()
  ) => {
    const checkDate = dayjs(date);

    // Find all assignments that overlap with this date
    const currentAssignment = assignments
      .filter((assignment) => {
        const startDate = dayjs(assignment.startDate);
        const endDate = dayjs(assignment.endDate);

        return (
          assignment.employeeEmail === employee.email &&
          checkDate.isSameOrAfter(startDate, "day") &&
          checkDate.isSameOrBefore(endDate, "day")
        );
      })
      .sort(
        (a, b) =>
          new Date(b.assignedDate).getTime() -
          new Date(a.assignedDate).getTime()
      )[0]; // Get most recent

    return currentAssignment?.closedDays || [];
  };

  const isDayClosed = (employee: EmployeeData, dayName: string, date: Date) => {
    const closedDays = getEmployeeClosedDays(employee, date);
    return closedDays.includes(dayName);
  };

  const employeeWeekSchedule = useMemo(() => {
    if (!currentEmployee) return {};

    const schedule: { [day: string]: string } = {};
    const startOfWeek = dateRange?.[0] || dayjs().startOf("week");

    // ✅ Get logged in user email directly
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );
    const userEmail = loggedInUser.email || currentEmployee.email;

    days.forEach((day, index) => {
      const currentDate = startOfWeek.add(index, "day");
      const checkDate = dayjs(currentDate);

      // Find the most recent assignment for this specific date
      const activeAssignment = assignments
        .filter((assignment) => {
          const startDate = dayjs(assignment.startDate);
          const endDate = dayjs(assignment.endDate);

          return (
            assignment.employeeEmail === userEmail &&
            checkDate.isSameOrAfter(startDate, "day") &&
            checkDate.isSameOrBefore(endDate, "day")
          );
        })
        .sort(
          (a, b) =>
            new Date(b.assignedDate).getTime() -
            new Date(a.assignedDate).getTime()
        )[0];

      // ✅ FIXED: Only mark as closed if there's an assignment AND day is in closedDays
      if (activeAssignment) {
        if (activeAssignment.closedDays?.includes(day)) {
          schedule[day] = "closed";
        } else {
          schedule[day] = activeAssignment.shift;
        }
      } else {
        // No assignment found, use employee's default shift
        schedule[day] = currentEmployee.shift;
      }
    });

    return schedule;
  }, [currentEmployee, assignments, dateRange, days]);
  const getShiftLabel = (shiftValue: string, customShift?: string) => {
    if (shiftValue === "custom" && customShift) {
      return customShift;
    }
    const shift = availableShifts.find((s) => s.value === shiftValue);
    return shift ? shift.label : shiftValue;
  };

  const getTagColor = (shiftValue: string) => {
    const lowerText = shiftValue.toLowerCase();
    if (lowerText.includes("morning")) return "green";
    if (lowerText.includes("afternoon")) return "blue";
    if (lowerText.includes("evening")) return "purple";
    if (lowerText.includes("closed")) return "red";
    return "default";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getPaginatedEmployees = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredEmployees.slice(startIndex, endIndex);
  };

  const handleAddShift = () => {
    setIsModalVisible(true);
    setSelectedEmployees([]);
    setClosedDays([]);

    form.resetFields();
  };

  const handleRequestShift = () => {
    setIsRequestModalVisible(true);
    setClosedDays([]);
    form.resetFields();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsRequestModalVisible(false);
    form.resetFields();
    setSelectedEmployees([]);
    setModalSearchText("");
    setClosedDays([]);
  };

  const handleEmployeeSelect = (email: string) => {
    setSelectedEmployees((prev) => {
      if (prev.includes(email)) {
        return prev.filter((e) => e !== email);
      } else {
        return [...prev, email];
      }
    });
  };

  const handleRemoveSelectedEmployee = (email: string) => {
    setSelectedEmployees((prev) => prev.filter((e) => e !== email));
  };

  const handleSubmitAdminAssignment = async (values: any) => {
    if (!isAdmin) return;

    if (selectedEmployees.length === 0) {
      message.error("Please select at least one employee!");
      return;
    }

    try {
      const data = {
        selectedEmployees: selectedEmployees,
        shift: values.shift,
        customShift: values.customShift || "",
        dateRange: [
          values.dateRange[0].format("YYYY-MM-DD"),
          values.dateRange[1].format("YYYY-MM-DD"),
        ],
        closedDays: closedDays,
      };

      await dispatch(assignShiftAsync(data)).unwrap();

      message.success(
        `Shift assigned to ${selectedEmployees.length} employee(s) successfully!`
      );

      // Refresh assignments
      dispatch(fetchShiftAssignments({}));
      dispatch(fetchEmployeesAsync());

      setIsModalVisible(false);
      form.resetFields();
      setSelectedEmployees([]);
      setModalSearchText("");
      setClosedDays([]);
    } catch (error: any) {
      message.error(error || "Failed to assign shift");
    }
  };

  const handleSubmitEmployeeRequest = async (values: any) => {
    if (!currentEmployee) {
      message.error("Employee data not found!");
      return;
    }

    try {
      const data = {
        requestedShift: values.requestedShift,
        requestedEmploymentType: values.requestedEmploymentType,
        dateRange: [
          values.dateRange[0].format("YYYY-MM-DD"),
          values.dateRange[1].format("YYYY-MM-DD"),
        ],
        closedDays: closedDays,
        reason: values.reason || "No reason provided",
      };

      await dispatch(createShiftRequestAsync(data)).unwrap();
      message.success("Shift change request submitted successfully!");

      // Refresh employee's requests
      fetchEmployeeRequests();

      setIsRequestModalVisible(false);
      form.resetFields();
      setClosedDays([]);
    } catch (error: any) {
      message.error(error || "Failed to submit request");
    }
  };

  const handleReviewRequest = (request: ShiftRequest) => {
    setSelectedRequest(request);
    setReviewModalVisible(true);
    reviewForm.resetFields();
  };

  const handleSubmitReview = async (values: any) => {
    if (!selectedRequest) return;

    try {
      await dispatch(
        reviewShiftRequestAsync({
          id: selectedRequest._id,
          data: {
            status: values.status,
            adminNotes: values.adminComments || "",
          },
        })
      ).unwrap();
      // ✅ ADD NOTIFICATION FOR APPROVAL/REJECTION
      // const adminName =
      //   JSON.parse(localStorage.getItem("loggedInUser") || "{}").name ||
      //   "Admin";
      // const notificationType =
      //   values.status === "approved" ? "shift_approval" : "shift_rejection";
      // const notificationIcon = values.status === "approved" ? "✅" : "❌";
      // const notificationTitle =
      //   values.status === "approved"
      //     ? `${notificationIcon} Shift Change Approved`
      //     : `${notificationIcon} Shift Change Rejected`;

      // const notificationMessage =
      //   values.status === "approved"
      //     ? `Your shift change request to ${selectedRequest.requestedShift} has been approved by ${adminName}. ${values.adminComments || ""}`
      //     : `Your shift change request to ${selectedRequest.requestedShift} has been rejected by ${adminName}. ${values.adminComments || ""}`;

      // sendNotificationToEmployee(
      //   selectedRequest.employeeName,
      //   notificationType,
      //   notificationTitle,
      //   notificationMessage,
      //   selectedRequest._id,
      //   undefined
      // );
      message.success(`Request ${values.status} successfully!`);

      // Refresh requests
      dispatch(fetchShiftRequests("all"));
      dispatch(fetchShiftAssignments({})); // ✅ Add this to refresh assignments
      dispatch(fetchEmployeesAsync());

      setReviewModalVisible(false);
      setSelectedRequest(null);
      reviewForm.resetFields();
    } catch (error: any) {
      message.error(error || "Failed to review request");
    }
  };

  const filteredEmployeesForModal = employees.filter((emp) => {
    if (!modalSearchText) return true;
    const name = (emp.name || emp.fullName || "").toLowerCase();
    const email = emp.email.toLowerCase();
    const role = emp.specificRole.toLowerCase();
    const search = modalSearchText.toLowerCase();
    return (
      name.includes(search) || email.includes(search) || role.includes(search)
    );
  });

  const pendingRequests = requests.filter((req) => req.status === "pending");

  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
    >
      <Card
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
        bodyStyle={{ padding: 2 }}
      >
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          {/* Header */}
          <Row justify="space-between" align="middle">
            <Col>
              <Space direction="vertical" size={4}>
                <Title
                  level={2}
                  style={{ margin: 0, fontSize: 28, fontWeight: 600 }}
                >
                  Shift Management & Schedule
                </Title>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  {isAdmin ? "Manage employee shifts" : "Your weekly schedule"}
                </Text>
              </Space>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={isAdmin ? handleAddShift : handleRequestShift}
                size="large"
                style={{
                  borderRadius: "8px",
                  fontWeight: 500,
                  backgroundColor: "#10b981",
                  borderColor: "#10b981",
                  padding: "0px 30px",
                }}
              >
                {isAdmin ? "Assign Shift" : "Request Shift"}
              </Button>
            </Col>
          </Row>
          {/* Admin Filters */}
          {isAdmin && (
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: 16,
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8} md={6}>
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Filter by Department
                    </Text>
                    <Select
                      value={filterDepartment}
                      onChange={setFilterDepartment}
                      placeholder="Select Department"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="all">All Departments</Select.Option>
                      {departments.map((dept) => (
                        <Select.Option key={dept} value={dept.toLowerCase()}>
                          {dept}
                        </Select.Option>
                      ))}
                    </Select>
                  </Space>
                </Col>

                <Col xs={24} sm={8} md={6}>
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Filter by Shift
                    </Text>
                    <Select
                      value={filterShift}
                      onChange={setFilterShift}
                      placeholder="Select Shift"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="all">All Shifts</Select.Option>
                      <Select.Option value="morning">Morning</Select.Option>
                      <Select.Option value="afternoon">Afternoon</Select.Option>
                      <Select.Option value="evening">Evening</Select.Option>
                      <Select.Option value="closed">Closed</Select.Option>
                    </Select>
                  </Space>
                </Col>

                <Col xs={24} sm={8} md={12}>
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Date Range
                    </Text>
                    <RangePicker
                      value={dateRange}
                      onChange={setDateRange}
                      format="MMM D, YYYY"
                      size="large"
                      style={{ width: "100%" }}
                      placeholder={["Start Date", "End Date"]}
                    />
                  </Space>
                </Col>
              </Row>
            </Card>
          )}

          {isAdmin && pendingRequests.length > 0 && (
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: 16,
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Title level={4} style={{ marginBottom: 16 }}>
                Pending Shift Change Requests ({pendingRequests.length})
              </Title>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                {pendingRequests.map((request) => (
                  <Card
                    key={request._id}
                    size="small"
                    style={{
                      borderRadius: 8,
                      border: "1px solid #ffa940",
                      background: "#fff7e6",
                    }}
                  >
                    <Row gutter={16} align="middle">
                      <Col xs={24} md={8}>
                        <Space>
                          <Avatar
                            src={request.profileImage}
                            icon={<UserOutlined />}
                            size={40}
                          />
                          <Space direction="vertical" size={0}>
                            <Text strong>{request.employeeName}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {request.currentDepartment}
                            </Text>
                          </Space>
                        </Space>
                      </Col>
                      <Col xs={24} md={10}>
                        <Space direction="vertical" size={4}>
                          <Space size={8}>
                            <Tag color="blue">{request.currentShift}</Tag>
                            <Text type="secondary">→</Text>
                            <Tag color="green">{request.requestedShift}</Tag>
                          </Space>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {dayjs(request.dateRange[0]).format("MMM D")} -{" "}
                            {dayjs(request.dateRange[1]).format("MMM D, YYYY")}
                          </Text>
                        </Space>
                      </Col>
                      <Col xs={24} md={6} style={{ textAlign: "right" }}>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => handleReviewRequest(request)}
                        >
                          Review
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Card>
          )}
          {/* Employee Weekly Schedule */}
          {!isAdmin && currentEmployee && (
            <Card
              style={{
                marginTop: 20,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar
                    src={currentEmployee.profileImage}
                    icon={!currentEmployee.profileImage && <UserOutlined />}
                    size={48}
                  />
                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      My Weekly Schedule
                    </Title>
                    <Text type="secondary">
                      {currentEmployee.name || currentEmployee.fullName} -{" "}
                      {currentEmployee.specificRole}
                    </Text>
                  </div>
                </div>

                <Divider style={{ margin: "8px 0" }} />

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Space
                      direction="vertical"
                      size={4}
                      style={{ width: "100%" }}
                    >
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        View Schedule for Week
                      </Text>
                      <RangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        format="MMM D, YYYY"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder={["Start Date", "End Date"]}
                      />
                    </Space>
                  </Col>
                </Row>

                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      minWidth: "600px",
                    }}
                  >
                    <thead>
                      <tr style={{ background: "#fafafa" }}>
                        {days.map((day) => (
                          <th
                            key={day}
                            style={{
                              padding: "12px 8px",
                              textAlign: "center",
                              fontWeight: 600,
                              borderBottom: "2px solid #f0f0f0",
                            }}
                          >
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {days.map((day) => {
                          const shift =
                            employeeWeekSchedule[day] || currentEmployee.shift; // ✅ Use memoized value
                          return (
                            <td
                              key={day}
                              style={{
                                padding: "16px 8px",
                                textAlign: "center",
                                verticalAlign: "middle",
                                borderBottom: "1px solid #f5f5f5",
                              }}
                            >
                              <Tag
                                color={getTagColor(shift)}
                                style={{
                                  fontSize: "13px",
                                  padding: "4px 12px",
                                }}
                              >
                                {getShiftLabel(shift)}
                              </Tag>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Space>
            </Card>
          )}
          {/* Employee - My Shift Requests */}
          {!isAdmin && currentEmployee && (
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginTop: 16,
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Title level={4} style={{ marginBottom: 16 }}>
                My Shift Change Requests
              </Title>
              {myRequests.length === 0 ? (
                <Empty
                  description="You have no shift change requests"
                  style={{ padding: "40px 0" }}
                />
              ) : (
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  {myRequests.map((request) => (
                    <Card
                      key={request._id}
                      size="small"
                      style={{
                        borderRadius: 8,
                        border: `1px solid ${
                          request.status === "approved"
                            ? "#52c41a"
                            : request.status === "rejected"
                              ? "#ff4d4f"
                              : "#ffa940"
                        }`,
                        background:
                          request.status === "approved"
                            ? "#f6ffed"
                            : request.status === "rejected"
                              ? "#fff1f0"
                              : "#fff7e6",
                      }}
                    >
                      <Row gutter={16} align="middle">
                        <Col xs={24} md={12}>
                          <Space direction="vertical" size={4}>
                            <Space size={8}>
                              <Tag color="blue">{request.currentShift}</Tag>
                              <Text type="secondary">→</Text>
                              <Tag color="green">{request.requestedShift}</Tag>
                            </Space>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {dayjs(request.dateRange[0]).format("MMM D")} -{" "}
                              {dayjs(request.dateRange[1]).format(
                                "MMM D, YYYY"
                              )}
                            </Text>
                            {request.reason && (
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                Reason: {request.reason}
                              </Text>
                            )}
                          </Space>
                        </Col>
                        <Col xs={24} md={6}>
                          <Tag
                            color={getStatusColor(request.status)}
                            style={{ fontSize: 13, padding: "4px 12px" }}
                          >
                            {request.status.toUpperCase()}
                          </Tag>
                        </Col>
                        <Col xs={24} md={6} style={{ textAlign: "right" }}>
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {dayjs(request.requestDate).format("MMM D, YYYY")}
                          </Text>
                        </Col>
                      </Row>
                      {(request.adminComments || request.adminNotes) && (
                        <div
                          style={{
                            marginTop: 8,
                            paddingTop: 8,
                            borderTop: "1px solid #f0f0f0",
                          }}
                        >
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Admin Comments:{" "}
                            {request.adminComments || request.adminNotes}
                          </Text>
                        </div>
                      )}
                    </Card>
                  ))}
                </Space>
              )}
            </Card>
          )}
          {/* Admin - Employee Shifts Schedule */}
          {isAdmin && (
            <Card
              style={{
                marginTop: 3,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 12 }}
              >
                <Col>
                  <Title level={4} style={{ margin: 0 }}>
                    Employees Shifts Schedule
                  </Title>
                </Col>
                <Col>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * pageSize + 1,
                      filteredEmployees.length
                    )}{" "}
                    -{" "}
                    {Math.min(currentPage * pageSize, filteredEmployees.length)}{" "}
                    of {filteredEmployees.length} employees
                  </Text>
                </Col>
              </Row>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "900px",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#fafafa" }}>
                      <th
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          fontWeight: 600,
                          borderBottom: "2px solid #f0f0f0",
                          minWidth: "180px",
                        }}
                      >
                        Employee
                      </th>
                      {days.map((day) => (
                        <th
                          key={day}
                          style={{
                            padding: "12px 8px",
                            textAlign: "center",
                            fontWeight: 600,
                            borderBottom: "2px solid #f0f0f0",
                          }}
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedEmployees().length > 0 ? (
                      getPaginatedEmployees().map((employee, index) => {
                        const startOfWeek =
                          dateRange?.[0] || dayjs().startOf("week");

                        return (
                          <tr
                            key={employee.email}
                            style={{
                              background:
                                index % 2 === 0 ? "#ffffff" : "#fafafa",
                            }}
                          >
                            <td
                              style={{
                                padding: "12px",
                                borderBottom: "1px solid #f5f5f5",
                              }}
                            >
                              <Space>
                                <Avatar
                                  src={employee.profileImage}
                                  icon={<UserOutlined />}
                                  size={32}
                                />
                                <Space direction="vertical" size={0}>
                                  <Text strong style={{ fontSize: 13 }}>
                                    {employee.name || employee.fullName}
                                  </Text>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: 11 }}
                                  >
                                    {employee.specificRole}
                                  </Text>
                                </Space>
                              </Space>
                            </td>
                            {days.map((day, dayIndex) => {
                              const currentDate = startOfWeek.add(
                                dayIndex,
                                "day"
                              );
                              const isClosed = isDayClosed(
                                employee,
                                day,
                                currentDate.toDate()
                              );
                              const shift = isClosed
                                ? "closed"
                                : getEmployeeCurrentShift(
                                    employee,
                                    currentDate.toDate()
                                  );

                              return (
                                <td
                                  key={day}
                                  style={{
                                    padding: "12px 8px",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    borderBottom: "1px solid #f5f5f5",
                                  }}
                                >
                                  <Tag
                                    color={getTagColor(shift)}
                                    style={{
                                      fontSize: "12px",
                                      padding: "2px 8px",
                                    }}
                                  >
                                    {getShiftLabel(shift)}
                                  </Tag>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          style={{ padding: "40px", textAlign: "center" }}
                        >
                          <Empty description="No employees found with selected filters" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Row justify="end" style={{ marginTop: 12 }}>
                <Col>
                  <Space size={8}>
                    <Button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Text>
                      Page {currentPage} of{" "}
                      {Math.ceil(filteredEmployees.length / pageSize)}
                    </Text>
                    <Button
                      disabled={
                        currentPage >=
                        Math.ceil(filteredEmployees.length / pageSize)
                      }
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          )}
        </Space>
      </Card>

      {/* Admin Modal - Assign Shift */}
      {isAdmin && (
        <Modal
          title={
            <Space>
              <ClockCircleOutlined style={{ color: "#10b981", fontSize: 20 }} />
              <Text strong style={{ fontSize: 18 }}>
                Assign Shift to Employees
              </Text>
            </Space>
          }
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={800}
          centered
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmitAdminAssignment}
            initialValues={{
              dateRange: [dayjs(), dayjs().add(7, "days")],
            }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Search & Select Employees" required>
                  <Input
                    placeholder="Search by name, email, or department..."
                    size="large"
                    value={modalSearchText}
                    onChange={(e) => setModalSearchText(e.target.value)}
                    prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                    style={{ marginBottom: 12 }}
                  />

                  {selectedEmployees.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: 12,
                          marginBottom: 8,
                          display: "block",
                        }}
                      >
                        Selected Employees ({selectedEmployees.length}):
                      </Text>
                      <Space size={[8, 8]} wrap>
                        {selectedEmployees.map((email) => {
                          const emp = employees.find((e) => e.email === email);
                          return (
                            <Tag
                              key={email}
                              closable
                              onClose={() =>
                                handleRemoveSelectedEmployee(email)
                              }
                              color="blue"
                              style={{ padding: "4px 8px", fontSize: 13 }}
                            >
                              {emp?.name || emp?.fullName}
                            </Tag>
                          );
                        })}
                      </Space>
                    </div>
                  )}

                  <div
                    style={{
                      border: "1px solid #d9d9d9",
                      borderRadius: 8,
                      maxHeight: 200,
                      overflowY: "auto",
                      padding: 8,
                    }}
                  >
                    {filteredEmployeesForModal.length > 0 ? (
                      filteredEmployeesForModal.map((emp) => (
                        <div
                          key={emp.email}
                          style={{
                            padding: "8px 12px",
                            cursor: "pointer",
                            borderRadius: 6,
                            marginBottom: 4,
                            background: selectedEmployees.includes(emp.email)
                              ? "#e6f7ff"
                              : "transparent",
                            border: selectedEmployees.includes(emp.email)
                              ? "1px solid #1890ff"
                              : "1px solid transparent",
                          }}
                          onClick={() => handleEmployeeSelect(emp.email)}
                        >
                          <Space>
                            <Checkbox
                              checked={selectedEmployees.includes(emp.email)}
                            />
                            <Avatar
                              src={emp.profileImage}
                              icon={<UserOutlined />}
                              size={32}
                            />
                            <Space direction="vertical" size={0}>
                              <Text strong style={{ fontSize: 13 }}>
                                {emp.name || emp.fullName}
                              </Text>
                              <Text type="secondary" style={{ fontSize: 11 }}>
                                {emp.specificRole} • {emp.email}
                              </Text>
                            </Space>
                          </Space>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: 20, textAlign: "center" }}>
                        <Text type="secondary">No employees found</Text>
                      </div>
                    )}
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Select Shift"
                  name="shift"
                  rules={[
                    { required: true, message: "Please select a shift!" },
                  ]}
                >
                  <Radio.Group style={{ width: "100%" }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      {availableShifts.map((shift) => (
                        <Radio
                          key={shift.value}
                          value={shift.value}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            marginBottom: 8,
                          }}
                        >
                          <Space>
                            <ClockCircleOutlined />
                            <Text strong>{shift.label}</Text>
                          </Space>
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Select Closed Days (Optional)">
                  <Checkbox.Group
                    value={closedDays}
                    onChange={(checkedValues) =>
                      setClosedDays(checkedValues as string[])
                    }
                    style={{ width: "100%" }}
                  >
                    <Row gutter={[8, 8]}>
                      {days.map((day) => (
                        <Col span={8} key={day}>
                          <Checkbox value={day}>{day}</Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                  <Text
                    type="secondary"
                    style={{ fontSize: 11, marginTop: 8, display: "block" }}
                  >
                    Select days when employees will be off during this shift
                    assignment
                  </Text>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Shift Duration (Start Date - End Date)"
                  name="dateRange"
                  rules={[
                    { required: true, message: "Please select date range!" },
                  ]}
                >
                  <RangePicker
                    style={{ width: "100%" }}
                    size="large"
                    format="MMM D, YYYY"
                    disabledDate={(current) => {
                      return current && current < dayjs().startOf("day");
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginBottom: 0 }}>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={handleModalCancel} size="large">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ backgroundColor: "#10b981", borderColor: "#10b981" }}
                >
                  Assign Shift
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Employee Modal - Request Shift Change */}
      {!isAdmin && (
        <Modal
          title={
            <Space>
              <ClockCircleOutlined style={{ color: "#10b981", fontSize: 20 }} />
              <Text strong style={{ fontSize: 18 }}>
                Request Shift Change
              </Text>
            </Space>
          }
          open={isRequestModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={700}
          centered
        >
          {currentEmployee && (
            <>
              <Card
                style={{
                  background: "#f9fafb",
                  marginBottom: 24,
                  borderRadius: 8,
                }}
                bodyStyle={{ padding: 16 }}
              >
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Row gutter={16} align="middle">
                    <Col span={4}>
                      <Avatar
                        src={currentEmployee.profileImage}
                        icon={!currentEmployee.profileImage && <UserOutlined />}
                        size={64}
                      />
                    </Col>
                    <Col span={20}>
                      <Space direction="vertical" size={4}>
                        <Text strong style={{ fontSize: 16 }}>
                          {currentEmployee.name || currentEmployee.fullName}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          {currentEmployee.email}
                        </Text>
                      </Space>
                    </Col>
                  </Row>

                  <Divider style={{ margin: "12px 0" }} />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Space direction="vertical" size={4}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Department
                        </Text>
                        <Tag color="blue">{currentEmployee.specificRole}</Tag>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space direction="vertical" size={4}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Current Shift
                        </Text>
                        <Tag color="green">
                          {getShiftLabel(
                            currentEmployee.shift,
                            currentEmployee.customShift
                          )}
                        </Tag>
                      </Space>
                    </Col>
                  </Row>
                </Space>
              </Card>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitEmployeeRequest}
                initialValues={{
                  dateRange: [dayjs(), dayjs().add(7, "days")],
                  requestedEmploymentType: currentEmployee.employmentType,
                }}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Requested Shift"
                      name="requestedShift"
                      rules={[
                        { required: true, message: "Please select a shift!" },
                      ]}
                    >
                      <Radio.Group style={{ width: "100%" }}>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          {availableShifts
                            .filter((s) => s.value !== "closed")
                            .map((shift) => (
                              <Radio
                                key={shift.value}
                                value={shift.value}
                                style={{
                                  width: "100%",
                                  padding: "12px",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: 8,
                                  marginBottom: 8,
                                }}
                              >
                                <Space>
                                  <ClockCircleOutlined />
                                  <Text strong>{shift.label}</Text>
                                </Space>
                              </Radio>
                            ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Employment Type"
                      name="requestedEmploymentType"
                      rules={[
                        {
                          required: true,
                          message: "Please select employment type!",
                        },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value="fulltime">Full Time</Radio>
                        <Radio value="parttime">Part Time</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Select Closed Days (Optional)">
                      <Checkbox.Group
                        value={closedDays}
                        onChange={(checkedValues) =>
                          setClosedDays(checkedValues as string[])
                        }
                        style={{ width: "100%" }}
                      >
                        <Row gutter={[8, 8]}>
                          {days.map((day) => (
                            <Col span={8} key={day}>
                              <Checkbox value={day}>{day}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                      <Text
                        type="secondary"
                        style={{ fontSize: 11, marginTop: 8, display: "block" }}
                      >
                        Select days you'd like to have off during this shift
                      </Text>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Effective Date Range"
                      name="dateRange"
                      rules={[
                        {
                          required: true,
                          message: "Please select date range!",
                        },
                      ]}
                    >
                      <RangePicker
                        style={{ width: "100%" }}
                        size="large"
                        format="MMM D, YYYY"
                        disabledDate={(current) => {
                          return current && current < dayjs().startOf("day");
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Reason (Optional)" name="reason">
                      <Input.TextArea
                        rows={3}
                        placeholder="Provide a reason for shift change request..."
                        maxLength={200}
                        showCount
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                    <Button onClick={handleModalCancel} size="large">
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={{
                        backgroundColor: "#10b981",
                        borderColor: "#10b981",
                      }}
                    >
                      Submit Request
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          )}
        </Modal>
      )}

      {/* Admin - Review Shift Request Modal */}
      {isAdmin && (
        <Modal
          title={
            <Space>
              <ClockCircleOutlined style={{ color: "#1890ff", fontSize: 20 }} />
              <Text strong style={{ fontSize: 18 }}>
                Review Shift Change Request
              </Text>
            </Space>
          }
          open={reviewModalVisible}
          onCancel={() => {
            setReviewModalVisible(false);
            setSelectedRequest(null);
            reviewForm.resetFields();
          }}
          footer={null}
          width={700}
          centered
        >
          {selectedRequest && (
            <>
              <Card
                style={{
                  background: "#f9fafb",
                  marginBottom: 24,
                  borderRadius: 8,
                }}
                bodyStyle={{ padding: 16 }}
              >
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Row gutter={16} align="middle">
                    <Col span={4}>
                      <Avatar
                        src={selectedRequest.profileImage}
                        icon={<UserOutlined />}
                        size={64}
                      />
                    </Col>
                    <Col span={20}>
                      <Space direction="vertical" size={4}>
                        <Text strong style={{ fontSize: 16 }}>
                          {selectedRequest.employeeName}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          {selectedRequest.employeeEmail}
                        </Text>
                      </Space>
                    </Col>
                  </Row>

                  <Divider style={{ margin: "12px 0" }} />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Space direction="vertical" size={4}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Current Shift
                        </Text>
                        <Tag color="blue">{selectedRequest.currentShift}</Tag>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space direction="vertical" size={4}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Requested Shift
                        </Text>
                        <Tag color="green">
                          {selectedRequest.requestedShift}
                        </Tag>
                      </Space>
                    </Col>
                  </Row>

                  <Row gutter={16} style={{ marginTop: 12 }}>
                    <Col span={24}>
                      <Space direction="vertical" size={4}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Date Range
                        </Text>
                        <Text>
                          {dayjs(selectedRequest.dateRange[0]).format(
                            "MMM D, YYYY"
                          )}{" "}
                          -{" "}
                          {dayjs(selectedRequest.dateRange[1]).format(
                            "MMM D, YYYY"
                          )}
                        </Text>
                      </Space>
                    </Col>
                  </Row>

                  {selectedRequest.reason && (
                    <Row gutter={16} style={{ marginTop: 12 }}>
                      <Col span={24}>
                        <Space direction="vertical" size={4}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Reason
                          </Text>
                          <Text>{selectedRequest.reason}</Text>
                        </Space>
                      </Col>
                    </Row>
                  )}

                  {selectedRequest.closedDays &&
                    selectedRequest.closedDays.length > 0 && (
                      <Row gutter={16} style={{ marginTop: 12 }}>
                        <Col span={24}>
                          <Space direction="vertical" size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              Closed Days
                            </Text>
                            <Space size={4} wrap>
                              {selectedRequest.closedDays.map((day) => (
                                <Tag key={day}>{day}</Tag>
                              ))}
                            </Space>
                          </Space>
                        </Col>
                      </Row>
                    )}
                </Space>
              </Card>

              <Form
                form={reviewForm}
                layout="vertical"
                onFinish={handleSubmitReview}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Decision"
                      name="status"
                      rules={[
                        {
                          required: true,
                          message: "Please select a decision!",
                        },
                      ]}
                    >
                      <Radio.Group style={{ width: "100%" }}>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <Radio
                            value="approved"
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: "1px solid #52c41a",
                              borderRadius: 8,
                              marginBottom: 8,
                            }}
                          >
                            <Space>
                              <CheckCircleOutlined
                                style={{ color: "#52c41a" }}
                              />
                              <Text strong>Approve Request</Text>
                            </Space>
                          </Radio>
                          <Radio
                            value="rejected"
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: "1px solid #ff4d4f",
                              borderRadius: 8,
                            }}
                          >
                            <Space>
                              <CloseCircleOutlined
                                style={{ color: "#ff4d4f" }}
                              />
                              <Text strong>Reject Request</Text>
                            </Space>
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Comments (Optional)" name="adminComments">
                      <Input.TextArea
                        rows={3}
                        placeholder="Add comments for the employee..."
                        maxLength={300}
                        showCount
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => {
                        setReviewModalVisible(false);
                        setSelectedRequest(null);
                        reviewForm.resetFields();
                      }}
                      size="large"
                    >
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" size="large">
                      Submit Review
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          )}
        </Modal>
      )}
    </Spin>
  );
};

export default ShiftManagement;
