import { useState, useEffect } from "react";
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
  Table,
  Avatar,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Extend dayjs with plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface ShiftManagementProps {
  departments?: string[];
  onAddShift?: () => void;
}

interface EmployeeData {
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

interface AdminShiftAssignment {
  employeeEmail: string;
  employeeName: string;
  shift: string;
  startDate: string;
  endDate: string;
  assignedBy: string;
  assignedDate: string;
  closedDays?: string[]; // Array of day names like ["Monday", "Tuesday"]
}

interface ShiftRequestData {
  employeeName: string;
  employeeEmail: string;
  currentDepartment: string;
  currentShift: string;
  currentEmploymentType: string;
  requestedShift: string;
  requestedEmploymentType: string;
  dateRange: [string, string];
  reason: string;
  requestDate: string;
  status: string;
  closedDays?: string[];
}

const ShiftManagement: React.FC<ShiftManagementProps> = ({
  departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"],
  onAddShift,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
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
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterShift, setFilterShift] = useState<string>("all");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >([dayjs().startOf("week"), dayjs().endOf("week")]);
  const [closedDays, setClosedDays] = useState<string[]>([]);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedInUser = localStorage.getItem("loggedInUser");
      const employeesData = JSON.parse(
        localStorage.getItem("employees") || "[]"
      );

      setEmployees(employeesData);
      setFilteredEmployees(employeesData);

      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);

        if (userData.userRole === "admin") {
          setIsAdmin(true);
        } else {
          const employee = employeesData.find(
            (emp: EmployeeData) => emp.email === userData.email
          );

          if (employee) {
            setCurrentEmployee(employee);
          }
        }
      }
    }
  }, []);

  // Filter employees based on admin's selections and search
  useEffect(() => {
    let filtered = [...employees];

    // Search filter
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

    // Department filter (only for admin)
    if (isAdmin && filterDepartment !== "all") {
      filtered = filtered.filter(
        (emp) =>
          emp.specificRole.toLowerCase() === filterDepartment.toLowerCase()
      );
    }

    // Shift filter (only for admin)
    if (isAdmin && filterShift !== "all") {
      filtered = filtered.filter((emp) => emp.shift === filterShift);
    }

    setFilteredEmployees(filtered);
  }, [filterDepartment, filterShift, employees, isAdmin, searchText]);

  const getEmployeeCurrentShift = (
    employee: EmployeeData,
    date: Date = new Date()
  ) => {
    const assignments = JSON.parse(
      localStorage.getItem("adminShiftAssignments") || "[]"
    );

    const currentAssignment = assignments.find(
      (assignment: AdminShiftAssignment) => {
        const startDate = dayjs(assignment.startDate);
        const endDate = dayjs(assignment.endDate);
        const checkDate = dayjs(date);

        return (
          assignment.employeeEmail === employee.email &&
          checkDate.isSameOrAfter(startDate, "day") &&
          checkDate.isSameOrBefore(endDate, "day")
        );
      }
    );

    return currentAssignment ? currentAssignment.shift : employee.shift;
  };

  const getEmployeeClosedDays = (
    employee: EmployeeData,
    date: Date = new Date()
  ) => {
    const assignments = JSON.parse(
      localStorage.getItem("adminShiftAssignments") || "[]"
    );

    const currentAssignment = assignments.find(
      (assignment: AdminShiftAssignment) => {
        const startDate = dayjs(assignment.startDate);
        const endDate = dayjs(assignment.endDate);
        const checkDate = dayjs(date);

        return (
          assignment.employeeEmail === employee.email &&
          checkDate.isSameOrAfter(startDate, "day") &&
          checkDate.isSameOrBefore(endDate, "day")
        );
      }
    );

    return currentAssignment?.closedDays || [];
  };

  const isDayClosed = (employee: EmployeeData, dayName: string, date: Date) => {
    const closedDays = getEmployeeClosedDays(employee, date);
    return closedDays.includes(dayName);
  };

  const getEmployeeWeekSchedule = () => {
    if (!currentEmployee) return {};

    const schedule: { [day: string]: string } = {};
    const startOfWeek = dateRange?.[0] || dayjs().startOf("week");

    days.forEach((day, index) => {
      const currentDate = startOfWeek.add(index, "day");

      if (isDayClosed(currentEmployee, day, currentDate.toDate())) {
        schedule[day] = "closed";
      } else {
        const shift = getEmployeeCurrentShift(
          currentEmployee,
          currentDate.toDate()
        );
        schedule[day] = shift;
      }
    });

    return schedule;
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

  const getShiftLabel = (shiftValue: string, customShift?: string) => {
    if (shiftValue === "custom" && customShift) {
      return customShift;
    }
    const shift = availableShifts.find((s) => s.value === shiftValue);
    return shift ? shift.label : shiftValue;
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedEmployees([]);
    setSearchText("");
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

  const handleSubmitAdminAssignment = (values: any) => {
    if (!isAdmin) return;

    if (selectedEmployees.length === 0) {
      message.error("Please select at least one employee!");
      return;
    }

    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );

    const existingAssignments = JSON.parse(
      localStorage.getItem("adminShiftAssignments") || "[]"
    );

    selectedEmployees.forEach((employeeEmail) => {
      const selectedEmp = employees.find((emp) => emp.email === employeeEmail);
      if (selectedEmp) {
        const shiftAssignment: AdminShiftAssignment = {
          employeeEmail: selectedEmp.email,
          employeeName: selectedEmp.name || selectedEmp.fullName || "",
          shift: values.shift,
          startDate: values.dateRange[0].format("YYYY-MM-DD"),
          endDate: values.dateRange[1].format("YYYY-MM-DD"),
          assignedBy: loggedInUser.email || "admin",
          assignedDate: new Date().toISOString(),
          closedDays: closedDays,
        };
        existingAssignments.push(shiftAssignment);
      }
    });

    localStorage.setItem(
      "adminShiftAssignments",
      JSON.stringify(existingAssignments)
    );

    message.success(
      `Shift assigned to ${selectedEmployees.length} employee(s) successfully!`
    );
    setIsModalVisible(false);
    form.resetFields();
    setSelectedEmployees([]);
    setSearchText("");
    setClosedDays([]);
  };

  const handleSubmitEmployeeRequest = (values: any) => {
    if (!currentEmployee) {
      message.error("Employee data not found!");
      return;
    }

    const shiftRequest: ShiftRequestData = {
      employeeName: currentEmployee.name || currentEmployee.fullName || "",
      employeeEmail: currentEmployee.email,
      currentDepartment: currentEmployee.specificRole,
      currentShift: getShiftLabel(
        currentEmployee.shift,
        currentEmployee.customShift
      ),
      currentEmploymentType: currentEmployee.employmentType,
      requestedShift: getShiftLabel(values.requestedShift),
      requestedEmploymentType: values.requestedEmploymentType,
      dateRange: [
        values.dateRange[0].format("YYYY-MM-DD"),
        values.dateRange[1].format("YYYY-MM-DD"),
      ],
      reason: values.reason || "No reason provided",
      requestDate: new Date().toISOString(),
      status: "pending",
      closedDays: closedDays,
    };

    const existingRequests = JSON.parse(
      localStorage.getItem("shiftRequests") || "[]"
    );
    existingRequests.push(shiftRequest);
    localStorage.setItem("shiftRequests", JSON.stringify(existingRequests));

    message.success("Shift change request submitted successfully!");
    setIsModalVisible(false);
    form.resetFields();
    setClosedDays([]);
  };

  const getTagColor = (shiftValue: string): string => {
    const lowerText = shiftValue.toLowerCase();
    if (lowerText.includes("morning")) return "green";
    if (lowerText.includes("afternoon")) return "blue";
    if (lowerText.includes("evening")) return "purple";
    if (lowerText.includes("closed")) return "red";
    return "default";
  };

  const filteredEmployeesForModal = employees.filter((emp) => {
    if (!searchText) return true;
    const name = (emp.name || emp.fullName || "").toLowerCase();
    const email = emp.email.toLowerCase();
    const role = emp.specificRole.toLowerCase();
    const search = searchText.toLowerCase();
    return (
      name.includes(search) || email.includes(search) || role.includes(search)
    );
  });

  return (
    <>
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
                onClick={handleAddShift}
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
                      <Select.Option value="engineering">
                        Engineering
                      </Select.Option>
                      <Select.Option value="sales">Sales</Select.Option>
                      <Select.Option value="marketing">Marketing</Select.Option>
                      <Select.Option value="hr">HR</Select.Option>
                      <Select.Option value="finance">Finance</Select.Option>
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

          {/* Employee Weekly Schedule - Only for logged-in employees */}
          {!isAdmin && currentEmployee && (
            <Card
              style={{
                marginTop: 20,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
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

                {/* Date Range Picker for Employee */}
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
                          const schedule = getEmployeeWeekSchedule();
                          const shift = schedule[day] || "closed";
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

          {/* Admin View - Employee List with Current Shifts */}
          {/* Admin View - Employee List with Current Shifts */}
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
                          style={{
                            padding: "40px",
                            textAlign: "center",
                          }}
                        >
                          <Text type="secondary">
                            No employees found with selected filters
                          </Text>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Row justify="end" style={{ marginTop: 16 }}>
                <Col>
                  <Space>
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

      {/* Admin Modal - Assign Shift to Multiple Employees */}
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
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
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
                    {
                      required: true,
                      message: "Please select a shift!",
                    },
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
          open={isModalVisible}
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
                        {
                          required: true,
                          message: "Please select a shift!",
                        },
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
    </>
  );
};

export default ShiftManagement;
