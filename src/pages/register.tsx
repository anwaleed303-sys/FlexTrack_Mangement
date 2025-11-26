// // import { useState, useEffect } from "react";
// // import {
// //   Form,
// //   Input,
// //   Button,
// //   Card,
// //   Typography,
// //   Select,
// //   message,
// //   Upload,
// //   Modal,
// //   Radio,
// //   InputNumber,
// //   Row,
// //   Col,
// //   Avatar,
// // } from "antd";
// // import {
// //   UserOutlined,
// //   LockOutlined,
// //   MailOutlined,
// //   TeamOutlined,
// //   BankOutlined, // Add this
// //   EnvironmentOutlined, // Add this
// //   GlobalOutlined, // Add this
// //   DollarOutlined, // Add this
// //   // UploadOutlined,
// //   ClockCircleOutlined,
// //   CalendarOutlined,
// //   CameraOutlined,
// // } from "@ant-design/icons";
// // import { useRouter } from "next/router";
// // import Head from "next/head";
// // import Link from "next/link";
// // import { useDispatch, useSelector } from "react-redux";
// // import { registerAdmin, registerEmployee } from "../redux/slices/authSlice";
// // import { AppDispatch, RootState } from "../redux/store";

// // const { Title, Text } = Typography;
// // const { Option } = Select;

// // // Admin roles
// // const adminRoles = [
// //   "HR Manager",
// //   "Operations Manager",
// //   "Finance Manager",
// //   "IT Manager",
// //   "General Manager",
// // ];
// // // Pay types for employees
// // const payTypes = ["Hourly", "Monthly Salary", "Project-based", "Commission"];

// // // Timezones
// // const timezones = [
// //   "UTC-12:00",
// //   "UTC-11:00",
// //   "UTC-10:00",
// //   "UTC-09:00",
// //   "UTC-08:00 (PST)",
// //   "UTC-07:00 (MST)",
// //   "UTC-06:00 (CST)",
// //   "UTC-05:00 (EST)",
// //   "UTC-04:00",
// //   "UTC-03:00",
// //   "UTC-02:00",
// //   "UTC-01:00",
// //   "UTC+00:00 (GMT)",
// //   "UTC+01:00",
// //   "UTC+02:00",
// //   "UTC+03:00",
// //   "UTC+04:00",
// //   "UTC+05:00 (PKT)",
// //   "UTC+05:30 (IST)",
// //   "UTC+06:00",
// //   "UTC+07:00",
// //   "UTC+08:00",
// //   "UTC+09:00",
// //   "UTC+10:00",
// //   "UTC+11:00",
// //   "UTC+12:00",
// // ];

// // // Employee categories
// // const employeeCategories = [
// //   "Software Developer",
// //   "Sales Executive",
// //   "Marketing Specialist",
// //   "Customer Support",
// //   "Accountant",
// // ];

// // // Working hours options
// // const workingHoursOptions = [20, 30, 40, 45, 48];
// // // Currency options
// // const currencies = [
// //   { symbol: "$", name: "USD - US Dollar" },
// //   { symbol: "€", name: "EUR - Euro" },
// //   { symbol: "£", name: "GBP - British Pound" },
// //   { symbol: "¥", name: "JPY - Japanese Yen" },
// //   { symbol: "₹", name: "INR - Indian Rupee" },
// //   { symbol: "₨", name: "PKR - Pakistani Rupee" },
// //   { symbol: "د.إ", name: "AED - UAE Dirham" },
// //   { symbol: "﷼", name: "SAR - Saudi Riyal" },
// //   { symbol: "C$", name: "CAD - Canadian Dollar" },
// //   { symbol: "A$", name: "AUD - Australian Dollar" },
// // ];

// // interface RegisterFormValues {
// //   name: string;
// //   email: string;
// //   password: string;
// //   confirmPassword: string;
// //   userRole: string;
// //   specificRole?: string;
// //   customRole?: string;
// //   // Admin fields
// //   companyName?: string;
// //   companyEmail?: string;
// //   companyAddress?: string;
// //   timezone?: string;
// //   // Employee fields
// //   employmentType?: string;
// //   shift?: string;
// //   customShift?: string;
// //   weeklyHours?: number;
// //   customWeeklyHours?: number;
// //   payType?: string;
// //   employmentDuration?: string;
// //   currency?: string;
// //   customPayType?: string;
// //   payAmount?: number;
// //   onboardingNotes?: string;
// //   profileImage?: string;
// // }

// // interface AdminAccessModalProps {
// //   visible: boolean;
// //   onCancel: () => void;
// //   onSuccess: (email: string, password: string) => void;
// // }

// // const AdminAccessModal = ({
// //   visible,
// //   onCancel,
// //   onSuccess,
// // }: AdminAccessModalProps) => {
// //   const [form] = Form.useForm();
// //   const [loading, setLoading] = useState(false);

// //   const handleVerify = async (values: {
// //     adminEmail: string;
// //     adminPassword: string;
// //   }) => {
// //     setLoading(true);
// //     try {
// //       onSuccess(values.adminEmail, values.adminPassword);
// //       form.resetFields();
// //       message.success("Access granted!");
// //     } catch (error) {
// //       message.error("Verification failed!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Modal
// //       open={visible}
// //       onCancel={onCancel}
// //       footer={null}
// //       centered
// //       width={400}
// //     >
// //       <div style={{ textAlign: "center", marginBottom: 24 }}>
// //         <div
// //           style={{
// //             width: 60,
// //             height: 60,
// //             background: "linear-gradient(135deg, #0066FF, #00D4B1)",
// //             borderRadius: "50%",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             margin: "0 auto 16px",
// //           }}
// //         >
// //           <LockOutlined style={{ fontSize: 30, color: "white" }} />
// //         </div>
// //         <Title level={4} style={{ margin: 0 }}>
// //           Admin Verification
// //         </Title>
// //         <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
// //           Enter your admin credentials to continue
// //         </Text>
// //       </div>

// //       <Form form={form} onFinish={handleVerify} layout="vertical">
// //         <Form.Item
// //           name="adminEmail"
// //           label="Admin Email"
// //           rules={[
// //             { required: true, message: "Please enter your admin email!" },
// //             { type: "email", message: "Please enter a valid email!" },
// //           ]}
// //         >
// //           <Input
// //             prefix={<MailOutlined />}
// //             placeholder="Enter your admin email"
// //             size="large"
// //           />
// //         </Form.Item>

// //         <Form.Item
// //           name="adminPassword"
// //           label="Admin Password"
// //           rules={[
// //             { required: true, message: "Please enter your admin password!" },
// //           ]}
// //         >
// //           <Input.Password
// //             prefix={<LockOutlined />}
// //             placeholder="Enter your admin password"
// //             size="large"
// //           />
// //         </Form.Item>

// //         <Form.Item>
// //           <Button
// //             htmlType="submit"
// //             loading={loading}
// //             block
// //             size="large"
// //             style={{
// //               background: "linear-gradient(135deg, #00D4B1, #0066FF)",
// //               color: "white",
// //               border: "none",
// //               fontWeight: 500,
// //             }}
// //           >
// //             Verify Access
// //           </Button>
// //         </Form.Item>
// //       </Form>
// //     </Modal>
// //   );
// // };

// // export default function Register() {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const { loading: authLoading, error } = useSelector(
// //     (state: RootState) => state.auth
// //   );
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(false);
// //   const [form] = Form.useForm();
// //   const [userRole, setUserRole] = useState<string>("");
// //   const [showCustomRole, setShowCustomRole] = useState(false);
// //   const [showCustomCategory, setShowCustomCategory] = useState(false);
// //   const [showCustomHours, setShowCustomHours] = useState(false);
// //   const [profileImage, setProfileImage] = useState<string>("");
// //   const [showAccessModal, setShowAccessModal] = useState(false);
// //   const [isFirstTimeAdmin, setIsFirstTimeAdmin] = useState(false);
// //   const [accessGranted, setAccessGranted] = useState(false);
// //   const [showCustomShift, setShowCustomShift] = useState(false);
// //   const [showCustomPayType, setShowCustomPayType] = useState(false);
// //   const [selectedCurrency, setSelectedCurrency] = useState<string>("$");
// //   const [adminCredentials, setAdminCredentials] = useState<{
// //     email: string;
// //     password: string;
// //   } | null>(null); // <-- ADD THIS LINE

// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       const storedAdmin = localStorage.getItem("adminData");
// //       setIsFirstTimeAdmin(!storedAdmin);
// //       setAccessGranted(!storedAdmin);
// //     }
// //   }, []);

// //   const handleImageUpload = (file: File) => {
// //     const reader = new FileReader();
// //     reader.onload = (e) => {
// //       const result = e.target?.result as string;
// //       setProfileImage(result);
// //     };
// //     reader.readAsDataURL(file);
// //     return false;
// //   };

// //   const onFinish = async (values: RegisterFormValues) => {
// //     setLoading(true);
// //     try {
// //       const finalSpecificRole =
// //         values.specificRole === "custom"
// //           ? values.customRole
// //           : values.specificRole;

// //       const finalWeeklyHours =
// //         values.weeklyHours === 0
// //           ? values.customWeeklyHours
// //           : values.weeklyHours;

// //       const finalPayType =
// //         values.payType === "custom" ? values.customPayType : values.payType;

// //       const finalShift =
// //         values.shift === "custom" ? values.customShift : values.shift;

// //       if (values.userRole === "admin") {
// //         const adminData = {
// //           name: values.name,
// //           email: values.email,
// //           password: values.password,
// //           userRole: values.userRole,
// //           specificRole: finalSpecificRole,
// //           profileImage: profileImage || "",
// //           companyName: values.companyName,
// //           companyEmail: values.companyEmail,
// //           companyAddress: values.companyAddress,
// //           timezone: values.timezone,
// //           ...(adminCredentials && {
// //             adminEmail: adminCredentials.email,
// //             adminPassword: adminCredentials.password,
// //           }),
// //         };

// //         await dispatch(registerAdmin(adminData)).unwrap();

// //         if (isFirstTimeAdmin) {
// //           Modal.success({
// //             title: "Registration Successful!",
// //             content: (
// //               <div>
// //                 <p>Welcome to FlexTrack!</p>
// //                 <p style={{ color: "#0066FF", marginTop: 8 }}>
// //                   You have been registered as the main administrator.
// //                 </p>
// //               </div>
// //             ),
// //             okText: "Go to Dashboard",
// //             onOk: () => {
// //               router.push("/dashboard");
// //             },
// //           });
// //         } else {
// //           message.success("Admin registered successfully!");
// //           form.resetFields();
// //           setProfileImage("");
// //           setUserRole("");
// //         }
// //       } else {
// //         // Employee registration
// //         const employeeData = {
// //           name: values.name,
// //           email: values.email,
// //           password: values.password,
// //           userRole: values.userRole,
// //           specificRole: finalSpecificRole,
// //           profileImage: profileImage || "",
// //           employmentType: values.employmentType,
// //           shift: finalShift,
// //           weeklyHours: finalWeeklyHours,
// //           payType: finalPayType,
// //           currency: values.currency,
// //           payAmount: values.payAmount,
// //           employmentDuration: values.employmentDuration,
// //           onboardingNotes: values.onboardingNotes || "",
// //           adminEmail: adminCredentials?.email,
// //           adminPassword: adminCredentials?.password,
// //         };

// //         await dispatch(registerEmployee(employeeData)).unwrap();

// //         message.success("Employee registered successfully!");
// //         form.resetFields();
// //         setProfileImage("");
// //         setUserRole("");
// //       }
// //     } catch (error: any) {
// //       message.error(error || "Registration failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // const onFinish = async (values: RegisterFormValues) => {
// //   //   setLoading(true);
// //   //   try {
// //   //     const finalSpecificRole =
// //   //       values.specificRole === "custom"
// //   //         ? values.customRole
// //   //         : values.specificRole;

// //   //     const finalWeeklyHours =
// //   //       values.weeklyHours === 0
// //   //         ? values.customWeeklyHours
// //   //         : values.weeklyHours;
// //   //     const finalPayType =
// //   //       values.payType === "custom" ? values.customPayType : values.payType;

// //   //     const finalShift =
// //   //       values.shift === "custom" ? values.customShift : values.shift;

// //   //     const registrationData: any = {
// //   //       name: values.name,
// //   //       email: values.email,
// //   //       password: values.password,
// //   //       userRole: values.userRole,
// //   //       specificRole: finalSpecificRole,
// //   //       profileImage: profileImage || "",
// //   //       registeredAt: new Date().toISOString(),
// //   //     };

// //   //     if (values.userRole === "admin") {
// //   //       // Add company information
// //   //       registrationData.companyName = values.companyName;
// //   //       registrationData.companyEmail = values.companyEmail;
// //   //       registrationData.companyAddress = values.companyAddress;
// //   //       registrationData.timezone = values.timezone;

// //   //       if (isFirstTimeAdmin) {
// //   //         const privateId = `ADMIN-${Date.now()}-${Math.random()
// //   //           .toString(36)
// //   //           .substr(2, 9)
// //   //           .toUpperCase()}`;
// //   //         registrationData.privateId = privateId;
// //   //         registrationData.isMainAdmin = true;

// //   //         localStorage.setItem("adminData", JSON.stringify(registrationData));

// //   //         Modal.success({
// //   //           title: "Registration Successful!",
// //   //           content: (
// //   //             <div>
// //   //               <p>
// //   //                 Your Private ID:{" "}
// //   //                 <strong style={{ color: "#0066FF" }}>{privateId}</strong>
// //   //               </p>
// //   //               <p style={{ color: "#ff4d4f", marginTop: 8 }}>
// //   //                 Please save this ID securely! You'll need it for future
// //   //                 access.
// //   //               </p>
// //   //             </div>
// //   //           ),
// //   //           okText: "Go to Login",
// //   //           onOk: () => {
// //   //             router.push("/login");
// //   //           },
// //   //         });
// //   //       } else {
// //   //         const existingAdmins = JSON.parse(
// //   //           localStorage.getItem("additionalAdmins") || "[]"
// //   //         );
// //   //         existingAdmins.push(registrationData);
// //   //         localStorage.setItem(
// //   //           "additionalAdmins",
// //   //           JSON.stringify(existingAdmins)
// //   //         );
// //   //         message.success(
// //   //           "Admin registered successfully! You can register another user or close."
// //   //         );

// //   //         // Reset form but keep access granted
// //   //         form.resetFields();
// //   //         setProfileImage("");
// //   //         setUserRole("");
// //   //       }
// //   //     } else {
// //   //       // Employee fields
// //   //       registrationData.employmentType = values.employmentType;
// //   //       registrationData.shift = finalShift;
// //   //       registrationData.weeklyHours = finalWeeklyHours;
// //   //       registrationData.payType = finalPayType;
// //   //       registrationData.currency = values.currency;
// //   //       registrationData.payAmount = values.payAmount;
// //   //       registrationData.onboardingNotes = values.onboardingNotes || "";

// //   //       const existingEmployees = JSON.parse(
// //   //         localStorage.getItem("employees") || "[]"
// //   //       );
// //   //       existingEmployees.push(registrationData);
// //   //       localStorage.setItem("employees", JSON.stringify(existingEmployees));
// //   //       message.success(
// //   //         "Employee registered successfully! You can register another user or close."
// //   //       );

// //   //       // Reset form but keep access granted
// //   //       form.resetFields();
// //   //       setProfileImage("");
// //   //       setUserRole("");
// //   //     }
// //   //   } catch (error) {
// //   //     message.error("Registration failed. Please try again.");
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   const handleRoleChange = (value: string) => {
// //     setUserRole(value);
// //     setShowCustomRole(false);
// //     setShowCustomCategory(false);
// //     form.setFieldValue("specificRole", undefined);
// //     form.setFieldValue("customRole", undefined);
// //   };

// //   const handleSpecificRoleChange = (value: string) => {
// //     if (value === "custom") {
// //       if (userRole === "admin") {
// //         setShowCustomRole(true);
// //         setShowCustomCategory(false);
// //       } else {
// //         setShowCustomCategory(true);
// //         setShowCustomRole(false);
// //       }
// //     } else {
// //       setShowCustomRole(false);
// //       setShowCustomCategory(false);
// //       form.setFieldValue("customRole", undefined);
// //     }
// //   };

// //   const handleWeeklyHoursChange = (value: number) => {
// //     if (value === 0) {
// //       setShowCustomHours(true);
// //     } else {
// //       setShowCustomHours(false);
// //       form.setFieldValue("customWeeklyHours", undefined);
// //     }
// //   };
// //   const handleShiftChange = (value: string) => {
// //     if (value === "custom") {
// //       setShowCustomShift(true);
// //     } else {
// //       setShowCustomShift(false);
// //       form.setFieldValue("customShift", undefined);
// //     }
// //   };
// //   const handleAccessSuccess = (email: string, password: string) => {
// //     setAdminCredentials({ email, password });
// //     setAccessGranted(true);
// //     setShowAccessModal(false);
// //   };

// //   if (!isFirstTimeAdmin && !accessGranted) {
// //     return (
// //       <>
// //         <Head>
// //           <title>Register | FlexTrack</title>
// //           <meta name="viewport" content="width=device-width, initial-scale=1" />
// //         </Head>
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             minHeight: "100vh",
// //             background: "#f0f2f5",
// //             padding: "20px",
// //           }}
// //         >
// //           <Card
// //             style={{
// //               width: "100%",
// //               maxWidth: 450,
// //               boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //               borderRadius: "8px",
// //               textAlign: "center",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 width: 80,
// //                 height: 80,
// //                 background: "linear-gradient(135deg, #0066FF, #00D4B1)",
// //                 borderRadius: "50%",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 margin: "0 auto 24px",
// //               }}
// //             >
// //               <LockOutlined style={{ fontSize: 40, color: "white" }} />
// //             </div>
// //             <Title level={3}>Admin Access Required</Title>
// //             <Text
// //               type="secondary"
// //               style={{ display: "block", marginBottom: 24 }}
// //             >
// //               Only administrators can register new users. Please verify your
// //               admin access to continue.
// //             </Text>
// //             <Button
// //               size="large"
// //               block
// //               onClick={() => setShowAccessModal(true)}
// //               style={{
// //                 background: "linear-gradient(135deg, #00D4B1, #0066FF)",
// //                 color: "white",
// //                 border: "none",
// //                 fontWeight: 500,
// //                 height: 45,
// //               }}
// //             >
// //               Verify Admin Access
// //             </Button>
// //             <div style={{ marginTop: 16 }}>
// //               <Text type="secondary">
// //                 Already have an account?{" "}
// //                 <Link href="/login" style={{ fontWeight: 500 }}>
// //                   Login here
// //                 </Link>
// //               </Text>
// //             </div>
// //           </Card>
// //         </div>
// //         <AdminAccessModal
// //           visible={showAccessModal}
// //           onCancel={() => setShowAccessModal(false)}
// //           onSuccess={handleAccessSuccess}
// //         />
// //       </>
// //     );
// //   }

// //   return (
// //     <>
// //       <Head>
// //         <title>Register | FlexTrack</title>
// //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// //       </Head>
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           minHeight: "100vh",
// //           background: "#f0f2f5",
// //           padding: "20px",
// //         }}
// //       >
// //         <Card
// //           style={{
// //             width: "100%",
// //             maxWidth: 1000,
// //             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //             borderRadius: "8px",
// //           }}
// //         >
// //           <div style={{ marginBottom: 24 }}>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 marginBottom: 16,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: 40,
// //                   height: 40,
// //                   background: "linear-gradient(135deg, #0066FF, #00D4B1)",
// //                   borderRadius: "8px",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   color: "white",
// //                   fontWeight: "bold",
// //                   fontSize: "18px",
// //                 }}
// //               >
// //                 FT
// //               </div>

// //               <Title
// //                 level={2}
// //                 style={{ margin: 0, textAlign: "center", flex: 1 }}
// //               >
// //                 Register
// //               </Title>

// //               <div style={{ width: 40 }}></div>
// //             </div>

// //             {isFirstTimeAdmin && (
// //               <div
// //                 style={{
// //                   background: "#e6f7ff",
// //                   border: "1px solid #91d5ff",
// //                   borderRadius: "6px",
// //                   padding: "12px",
// //                   textAlign: "center",
// //                 }}
// //               >
// //                 <Text style={{ color: "#0050b3", fontSize: "13px" }}>
// //                   <strong>First Time Setup:</strong> You're registering as the
// //                   main admin. Save your Email Password after registration!
// //                 </Text>
// //               </div>
// //             )}
// //           </div>

// //           <Form
// //             form={form}
// //             name="register"
// //             onFinish={onFinish}
// //             layout="vertical"
// //             size="large"
// //             autoComplete="off"
// //           >
// //             {/* Profile Image - Circular Avatar Style */}
// //             <Form.Item label="Profile Image">
// //               <div style={{ textAlign: "center" }}>
// //                 <Upload
// //                   beforeUpload={handleImageUpload}
// //                   accept="image/*"
// //                   showUploadList={false}
// //                   maxCount={1}
// //                 >
// //                   <div
// //                     style={{
// //                       position: "relative",
// //                       display: "inline-block",
// //                       cursor: "pointer",
// //                     }}
// //                   >
// //                     <Avatar
// //                       size={120}
// //                       src={profileImage}
// //                       icon={!profileImage && <UserOutlined />}
// //                     />
// //                     <div
// //                       style={{
// //                         position: "absolute",
// //                         bottom: 0,
// //                         right: 0,
// //                         width: 36,
// //                         height: 36,
// //                         borderRadius: "50%",
// //                         background: "linear-gradient(135deg, #00D4B1, #0066FF)",
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         border: "3px solid white",
// //                         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
// //                       }}
// //                     >
// //                       <CameraOutlined
// //                         style={{ color: "white", fontSize: 16 }}
// //                       />
// //                     </div>
// //                   </div>
// //                 </Upload>
// //                 <div style={{ marginTop: 8 }}>
// //                   <Text type="secondary" style={{ fontSize: 12 }}>
// //                     Click avatar to upload image
// //                   </Text>
// //                 </div>
// //               </div>
// //             </Form.Item>

// //             {/* Two Column Layout for Desktop */}
// //             <Row gutter={[16, 0]}>
// //               <Col xs={24} md={12}>
// //                 <Form.Item
// //                   name="name"
// //                   label="Full Name"
// //                   rules={[
// //                     { required: true, message: "Please input your full name!" },
// //                     { min: 2, message: "Name must be at least 2 characters!" },
// //                   ]}
// //                 >
// //                   <Input
// //                     prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
// //                     placeholder="Enter your full name"
// //                   />
// //                 </Form.Item>
// //               </Col>

// //               <Col xs={24} md={12}>
// //                 <Form.Item
// //                   name="email"
// //                   label="Email"
// //                   rules={[
// //                     { required: true, message: "Please input your email!" },
// //                     { type: "email", message: "Please enter a valid email!" },
// //                   ]}
// //                 >
// //                   <Input
// //                     prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
// //                     placeholder="Enter your email"
// //                   />
// //                 </Form.Item>
// //               </Col>
// //             </Row>

// //             <Row gutter={[16, 0]}>
// //               <Col xs={24} md={24}>
// //                 <Form.Item
// //                   label="User Role"
// //                   name="userRole"
// //                   rules={[
// //                     { required: true, message: "Please select your role!" },
// //                   ]}
// //                 >
// //                   <Select
// //                     placeholder="Select your role"
// //                     onChange={handleRoleChange}
// //                     suffixIcon={<TeamOutlined style={{ color: "#bfbfbf" }} />}
// //                   >
// //                     <Option value="admin">Admin</Option>
// //                     <Option value="employee">Employee</Option>
// //                   </Select>
// //                 </Form.Item>
// //               </Col>

// //               <Col xs={24} md={12}>
// //                 {userRole === "admin" && (
// //                   <Form.Item
// //                     label="Admin Role"
// //                     name="specificRole"
// //                     rules={[
// //                       { required: true, message: "Please select admin role!" },
// //                     ]}
// //                   >
// //                     <Select
// //                       placeholder="Select admin role"
// //                       onChange={handleSpecificRoleChange}
// //                     >
// //                       {adminRoles.map((role) => (
// //                         <Option key={role} value={role}>
// //                           {role}
// //                         </Option>
// //                       ))}
// //                       <Option value="custom">Custom Role</Option>
// //                     </Select>
// //                   </Form.Item>
// //                 )}

// //                 {userRole === "employee" && (
// //                   <Form.Item
// //                     label="Employee Department"
// //                     name="specificRole"
// //                     rules={[
// //                       {
// //                         required: true,
// //                         message: "Please select employee department!",
// //                       },
// //                     ]}
// //                   >
// //                     <Select
// //                       placeholder="Select employee department"
// //                       onChange={handleSpecificRoleChange}
// //                     >
// //                       {employeeCategories.map((category) => (
// //                         <Option key={category} value={category}>
// //                           {category}
// //                         </Option>
// //                       ))}
// //                       <Option value="custom">Custom Department</Option>
// //                     </Select>
// //                   </Form.Item>
// //                 )}
// //               </Col>
// //               {/* Custom Role/Category */}
// //               <Col xs={24} md={12}>
// //                 {(showCustomRole || showCustomCategory) && (
// //                   <Form.Item
// //                     label={
// //                       showCustomRole
// //                         ? "Custom Admin Role"
// //                         : "Custom Employee Department"
// //                     }
// //                     name="customRole"
// //                     rules={[
// //                       {
// //                         required: true,
// //                         message: "Please enter custom role/category!",
// //                       },
// //                     ]}
// //                   >
// //                     <Input
// //                       placeholder={`Enter custom ${showCustomRole ? "admin role" : "employee department"}`}
// //                     />
// //                   </Form.Item>
// //                 )}
// //               </Col>
// //             </Row>

// //             {/* Company Information - Only for Admin */}
// //             {userRole === "admin" && (
// //               <>
// //                 <div style={{ marginTop: 24, marginBottom: 16 }}>
// //                   <Text strong style={{ fontSize: 16, color: "#0066FF" }}>
// //                     Company Information
// //                   </Text>
// //                 </div>

// //                 <Row gutter={[16, 0]}>
// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Company Name"
// //                       name="companyName"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please enter company name!",
// //                         },
// //                       ]}
// //                     >
// //                       <Input
// //                         prefix={<BankOutlined style={{ color: "#bfbfbf" }} />}
// //                         placeholder="Enter company name"
// //                       />
// //                     </Form.Item>
// //                   </Col>

// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Company Email"
// //                       name="companyEmail"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please enter company email!",
// //                         },
// //                         {
// //                           type: "email",
// //                           message: "Please enter a valid email!",
// //                         },
// //                       ]}
// //                     >
// //                       <Input
// //                         prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
// //                         placeholder="company@example.com"
// //                       />
// //                     </Form.Item>
// //                   </Col>
// //                 </Row>

// //                 <Row gutter={[16, 0]}>
// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Company Address"
// //                       name="companyAddress"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please enter company address!",
// //                         },
// //                       ]}
// //                     >
// //                       <Input.TextArea
// //                         placeholder="Enter complete address"
// //                         rows={1}
// //                       />
// //                     </Form.Item>
// //                   </Col>

// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Time Zone"
// //                       name="timezone"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please select timezone!",
// //                         },
// //                       ]}
// //                     >
// //                       <Select
// //                         placeholder="Select timezone"
// //                         showSearch
// //                         suffixIcon={
// //                           <GlobalOutlined style={{ color: "#bfbfbf" }} />
// //                         }
// //                       >
// //                         {timezones.map((tz) => (
// //                           <Option key={tz} value={tz}>
// //                             {tz}
// //                           </Option>
// //                         ))}
// //                       </Select>
// //                     </Form.Item>
// //                   </Col>
// //                 </Row>
// //               </>
// //             )}

// //             {/* Employee Specific Fields */}
// //             {userRole === "employee" && (
// //               <>
// //                 <Row gutter={[16, 0]}>
// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Employment Type"
// //                       name="employmentType"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please select employment type!",
// //                         },
// //                       ]}
// //                     >
// //                       <Radio.Group style={{ width: "100%" }}>
// //                         <Radio value="fulltime">Remote</Radio>
// //                         <Radio value="parttime">Onsite</Radio>
// //                       </Radio.Group>
// //                     </Form.Item>
// //                   </Col>

// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Shift"
// //                       name="shift"
// //                       rules={[
// //                         { required: true, message: "Please select shift!" },
// //                       ]}
// //                     >
// //                       <Select
// //                         placeholder="Select shift"
// //                         onChange={handleShiftChange}
// //                         suffixIcon={
// //                           <ClockCircleOutlined style={{ color: "#bfbfbf" }} />
// //                         }
// //                       >
// //                         <Option value="morning">Morning (6 AM - 2 PM)</Option>
// //                         <Option value="afternoon">
// //                           Afternoon (2 PM - 10 PM)
// //                         </Option>
// //                         <Option value="evening">Evening (10 PM - 6 AM)</Option>
// //                         <Option value="custom">Custom Shift</Option>
// //                       </Select>
// //                     </Form.Item>
// //                   </Col>

// //                   {showCustomShift && (
// //                     <Col xs={24} md={24}>
// //                       <Form.Item
// //                         label="Custom Shift"
// //                         name="customShift"
// //                         rules={[
// //                           {
// //                             required: true,
// //                             message: "Please enter custom shift!",
// //                           },
// //                         ]}
// //                       >
// //                         <Input
// //                           placeholder="e.g., Night (10 PM - 6 AM)"
// //                           prefix={
// //                             <ClockCircleOutlined style={{ color: "#bfbfbf" }} />
// //                           }
// //                         />
// //                       </Form.Item>
// //                     </Col>
// //                   )}
// //                 </Row>

// //                 <Row gutter={[16, 0]}>
// //                   <Col xs={24} md={showCustomHours ? 12 : 24}>
// //                     <Form.Item
// //                       label="Weekly Working Hours"
// //                       name="weeklyHours"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please select weekly working hours!",
// //                         },
// //                       ]}
// //                     >
// //                       <Select
// //                         placeholder="Select weekly hours"
// //                         onChange={handleWeeklyHoursChange}
// //                         suffixIcon={
// //                           <CalendarOutlined style={{ color: "#bfbfbf" }} />
// //                         }
// //                       >
// //                         {workingHoursOptions.map((hours) => (
// //                           <Option key={hours} value={hours}>
// //                             {hours} hours/week
// //                           </Option>
// //                         ))}
// //                         <Option value={0}>Custom Hours</Option>
// //                       </Select>
// //                     </Form.Item>
// //                   </Col>

// //                   {showCustomHours && (
// //                     <Col xs={24} md={12}>
// //                       <Form.Item
// //                         label="Custom Weekly Hours"
// //                         name="customWeeklyHours"
// //                         rules={[
// //                           {
// //                             required: true,
// //                             message: "Please enter custom weekly hours!",
// //                           },
// //                           {
// //                             type: "number",
// //                             min: 1,
// //                             max: 168,
// //                             message: "Hours must be between 1 and 168!",
// //                           },
// //                         ]}
// //                       >
// //                         <InputNumber
// //                           placeholder="Enter hours (1-168)"
// //                           style={{ width: "100%" }}
// //                           min={1}
// //                           max={168}
// //                         />
// //                       </Form.Item>
// //                     </Col>
// //                   )}
// //                 </Row>

// //                 {/* Employee Pay Information */}
// //                 <div style={{ marginTop: 24, marginBottom: 16 }}>
// //                   <Text strong style={{ fontSize: 16, color: "#0066FF" }}>
// //                     Compensation Details
// //                   </Text>
// //                 </div>

// //                 <Row gutter={[16, 0]}>
// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Employment Duration"
// //                       name="employmentDuration"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please select employment duration!",
// //                         },
// //                       ]}
// //                     >
// //                       <Select
// //                         placeholder="Select duration"
// //                         suffixIcon={
// //                           <CalendarOutlined style={{ color: "#bfbfbf" }} />
// //                         }
// //                       >
// //                         <Option value="internship">Internship</Option>
// //                         <Option value="fulltime">Full Time</Option>
// //                         <Option value="contract">Contract</Option>
// //                         <Option value="temporary">Temporary</Option>
// //                       </Select>
// //                     </Form.Item>
// //                   </Col>

// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Currency"
// //                       name="currency"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please select currency!",
// //                         },
// //                       ]}
// //                     >
// //                       <Select
// //                         placeholder="Select currency"
// //                         onChange={(value) => setSelectedCurrency(value)}
// //                         // suffixIcon={
// //                         //   <DollarOutlined style={{ color: "#bfbfbf" }} />
// //                         // }
// //                       >
// //                         {currencies.map((curr) => (
// //                           <Option key={curr.symbol} value={curr.symbol}>
// //                             {curr.symbol} - {curr.name}
// //                           </Option>
// //                         ))}
// //                       </Select>
// //                     </Form.Item>
// //                   </Col>
// //                 </Row>

// //                 <Row gutter={[16, 0]}>
// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Pay Type"
// //                       name="payType"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please select pay type!",
// //                         },
// //                       ]}
// //                     >
// //                       <Select
// //                         placeholder="Select pay type"
// //                         onChange={(value) =>
// //                           setShowCustomPayType(value === "custom")
// //                         }
// //                         // suffixIcon={
// //                         //   <DollarOutlined style={{ color: "#bfbfbf" }} />
// //                         // }
// //                       >
// //                         {payTypes.map((type) => (
// //                           <Option key={type} value={type}>
// //                             {type}
// //                           </Option>
// //                         ))}
// //                         <Option value="custom">Custom Pay Type</Option>
// //                       </Select>
// //                     </Form.Item>
// //                   </Col>

// //                   <Col xs={24} md={12}>
// //                     <Form.Item
// //                       label="Pay Amount"
// //                       name="payAmount"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please enter pay amount!",
// //                         },
// //                         {
// //                           type: "number",
// //                           min: 0,
// //                           message: "Amount must be positive!",
// //                         },
// //                       ]}
// //                     >
// //                       <InputNumber
// //                         placeholder="Enter amount"
// //                         style={{ width: "100%" }}
// //                         min={0}
// //                         addonBefore={selectedCurrency}
// //                         formatter={(value) =>
// //                           `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// //                         }
// //                         // parser={(value) => {
// //                         //   const parsed = value!.replace(/\$\s?|(,*)/g, "");
// //                         //   return parsed === "" ? 0 : Number(parsed);
// //                         // }}
// //                       />
// //                     </Form.Item>
// //                   </Col>

// //                   {showCustomPayType && (
// //                     <Col xs={24} md={24}>
// //                       <Form.Item
// //                         label="Custom Pay Type"
// //                         name="customPayType"
// //                         rules={[
// //                           {
// //                             required: true,
// //                             message: "Please enter custom pay type!",
// //                           },
// //                         ]}
// //                       >
// //                         <Input placeholder="e.g., Bi-weekly, Annual" />
// //                       </Form.Item>
// //                     </Col>
// //                   )}
// //                 </Row>
// //               </>
// //             )}

// //             {/* Password Fields */}
// //             <Row gutter={[16, 0]}>
// //               <Col xs={24} md={12}>
// //                 <Form.Item
// //                   name="password"
// //                   label="Password"
// //                   rules={[
// //                     { required: true, message: "Please input your password!" },
// //                     {
// //                       min: 6,
// //                       message: "Password must be at least 6 characters!",
// //                     },
// //                   ]}
// //                   hasFeedback
// //                 >
// //                   <Input.Password
// //                     prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
// //                     placeholder="Enter your password"
// //                   />
// //                 </Form.Item>
// //               </Col>

// //               <Col xs={24} md={12}>
// //                 <Form.Item
// //                   name="confirmPassword"
// //                   label="Confirm Password"
// //                   dependencies={["password"]}
// //                   hasFeedback
// //                   rules={[
// //                     {
// //                       required: true,
// //                       message: "Please confirm your password!",
// //                     },
// //                     ({ getFieldValue }) => ({
// //                       validator(_, value) {
// //                         if (!value || getFieldValue("password") === value) {
// //                           return Promise.resolve();
// //                         }
// //                         return Promise.reject(
// //                           new Error("Passwords do not match!")
// //                         );
// //                       },
// //                     }),
// //                   ]}
// //                 >
// //                   <Input.Password
// //                     prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
// //                     placeholder="Confirm your password"
// //                   />
// //                 </Form.Item>
// //               </Col>
// //             </Row>

// //             <Form.Item>
// //               <Button
// //                 htmlType="submit"
// //                 loading={loading || authLoading}
// //                 block
// //                 style={{
// //                   height: 45,
// //                   fontSize: 16,
// //                   fontWeight: 500,
// //                   color: "white",
// //                   background: "linear-gradient(135deg, #00D4B1, #0066FF)",
// //                   border: "none",
// //                 }}
// //               >
// //                 Register
// //               </Button>
// //             </Form.Item>

// //             <div style={{ textAlign: "center" }}>
// //               <Text type="secondary">
// //                 Already have an account?{" "}
// //                 <Link href="/login" style={{ fontWeight: 500 }}>
// //                   Login here
// //                 </Link>
// //               </Text>
// //             </div>
// //           </Form>
// //         </Card>
// //       </div>

// //       <AdminAccessModal
// //         visible={showAccessModal}
// //         onCancel={() => setShowAccessModal(false)}
// //         onSuccess={handleAccessSuccess}
// //       />
// //     </>
// //   );
// // }

// import { useState, useEffect } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Card,
//   Typography,
//   Select,
//   message,
//   Upload,
//   Modal,
//   Radio,
//   InputNumber,
//   Row,
//   Col,
//   Avatar,
// } from "antd";
// import {
//   UserOutlined,
//   LockOutlined,
//   MailOutlined,
//   TeamOutlined,
//   BankOutlined,
//   EnvironmentOutlined,
//   GlobalOutlined,
//   DollarOutlined,
//   ClockCircleOutlined,
//   CalendarOutlined,
//   CameraOutlined,
// } from "@ant-design/icons";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { registerAdmin, registerEmployee } from "../redux/slices/authSlice";
// import { AppDispatch, RootState } from "../redux/store";
// import axios from "axios";

// const { Title, Text } = Typography;
// const { Option } = Select;

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // Admin roles
// const adminRoles = [
//   "HR Manager",
//   "Operations Manager",
//   "Finance Manager",
//   "IT Manager",
//   "General Manager",
// ];

// // Pay types for employees
// const payTypes = ["Hourly", "Monthly Salary", "Project-based", "Commission"];

// // Timezones
// const timezones = [
//   "UTC-12:00",
//   "UTC-11:00",
//   "UTC-10:00",
//   "UTC-09:00",
//   "UTC-08:00 (PST)",
//   "UTC-07:00 (MST)",
//   "UTC-06:00 (CST)",
//   "UTC-05:00 (EST)",
//   "UTC-04:00",
//   "UTC-03:00",
//   "UTC-02:00",
//   "UTC-01:00",
//   "UTC+00:00 (GMT)",
//   "UTC+01:00",
//   "UTC+02:00",
//   "UTC+03:00",
//   "UTC+04:00",
//   "UTC+05:00 (PKT)",
//   "UTC+05:30 (IST)",
//   "UTC+06:00",
//   "UTC+07:00",
//   "UTC+08:00",
//   "UTC+09:00",
//   "UTC+10:00",
//   "UTC+11:00",
//   "UTC+12:00",
// ];

// // Employee categories
// const employeeCategories = [
//   "Software Developer",
//   "Sales Executive",
//   "Marketing Specialist",
//   "Customer Support",
//   "Accountant",
// ];

// // Working hours options
// const workingHoursOptions = [20, 30, 40, 45, 48];

// // Currency options
// const currencies = [
//   { symbol: "$", name: "USD - US Dollar" },
//   { symbol: "€", name: "EUR - Euro" },
//   { symbol: "£", name: "GBP - British Pound" },
//   { symbol: "¥", name: "JPY - Japanese Yen" },
//   { symbol: "₹", name: "INR - Indian Rupee" },
//   { symbol: "₨", name: "PKR - Pakistani Rupee" },
//   { symbol: "د.إ", name: "AED - UAE Dirham" },
//   { symbol: "﷼", name: "SAR - Saudi Riyal" },
//   { symbol: "C$", name: "CAD - Canadian Dollar" },
//   { symbol: "A$", name: "AUD - Australian Dollar" },
// ];

// interface RegisterFormValues {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   userRole: string;
//   specificRole?: string;
//   customRole?: string;
//   companyName?: string;
//   companyEmail?: string;
//   companyAddress?: string;
//   timezone?: string;
//   employmentType?: string;
//   shift?: string;
//   customShift?: string;
//   weeklyHours?: number;
//   customWeeklyHours?: number;
//   payType?: string;
//   employmentDuration?: string;
//   currency?: string;
//   customPayType?: string;
//   payAmount?: number;
//   onboardingNotes?: string;
//   profileImage?: string;
// }

// interface AdminAccessModalProps {
//   visible: boolean;
//   onCancel: () => void;
//   onSuccess: (email: string, password: string) => void;
// }

// const AdminAccessModal = ({
//   visible,
//   onCancel,
//   onSuccess,
// }: AdminAccessModalProps) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async (values: {
//     adminEmail: string;
//     adminPassword: string;
//   }) => {
//     setLoading(true);
//     try {
//       onSuccess(values.adminEmail, values.adminPassword);
//       form.resetFields();
//       message.success("Access granted!");
//     } catch (error) {
//       message.error("Verification failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       open={visible}
//       onCancel={onCancel}
//       footer={null}
//       centered
//       width={400}
//     >
//       <div style={{ textAlign: "center", marginBottom: 24 }}>
//         <div
//           style={{
//             width: 60,
//             height: 60,
//             background: "linear-gradient(135deg, #0066FF, #00D4B1)",
//             borderRadius: "50%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             margin: "0 auto 16px",
//           }}
//         >
//           <LockOutlined style={{ fontSize: 30, color: "white" }} />
//         </div>
//         <Title level={4} style={{ margin: 0 }}>
//           Admin Verification
//         </Title>
//         <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
//           Enter your admin credentials to continue
//         </Text>
//       </div>

//       <Form form={form} onFinish={handleVerify} layout="vertical">
//         <Form.Item
//           name="adminEmail"
//           label="Admin Email"
//           rules={[
//             { required: true, message: "Please enter your admin email!" },
//             { type: "email", message: "Please enter a valid email!" },
//           ]}
//         >
//           <Input
//             prefix={<MailOutlined />}
//             placeholder="Enter your admin email"
//             size="large"
//           />
//         </Form.Item>

//         <Form.Item
//           name="adminPassword"
//           label="Admin Password"
//           rules={[
//             { required: true, message: "Please enter your admin password!" },
//           ]}
//         >
//           <Input.Password
//             prefix={<LockOutlined />}
//             placeholder="Enter your admin password"
//             size="large"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             htmlType="submit"
//             loading={loading}
//             block
//             size="large"
//             style={{
//               background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//               color: "white",
//               border: "none",
//               fontWeight: 500,
//             }}
//           >
//             Verify Access
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default function Register() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading: authLoading, error } = useSelector(
//     (state: RootState) => state.auth
//   );
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [userRole, setUserRole] = useState<string>("");
//   const [showCustomRole, setShowCustomRole] = useState(false);
//   const [showCustomCategory, setShowCustomCategory] = useState(false);
//   const [showCustomHours, setShowCustomHours] = useState(false);
//   const [profileImage, setProfileImage] = useState<string>("");
//   const [showAccessModal, setShowAccessModal] = useState(false);
//   const [isFirstTimeAdmin, setIsFirstTimeAdmin] = useState(false);
//   const [accessGranted, setAccessGranted] = useState(false);
//   const [showCustomShift, setShowCustomShift] = useState(false);
//   const [showCustomPayType, setShowCustomPayType] = useState(false);
//   const [selectedCurrency, setSelectedCurrency] = useState<string>("$");
//   const [adminCredentials, setAdminCredentials] = useState<{
//     email: string;
//     password: string;
//   } | null>(null);
//   const [checkingCompany, setCheckingCompany] = useState(false);

//   // Check if any admin exists in the system
//   useEffect(() => {
//     const checkMainAdmin = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/auth/check-main-admin`);
//         const hasMainAdmin = response.data.data.hasMainAdmin;
//         setIsFirstTimeAdmin(!hasMainAdmin);
//         setAccessGranted(!hasMainAdmin);
//       } catch (error) {
//         console.error("Error checking main admin:", error);
//         // If error, assume no admin exists yet
//         setIsFirstTimeAdmin(true);
//         setAccessGranted(true);
//       }
//     };

//     checkMainAdmin();
//   }, []);

//   // Check company email when admin fills it
//   const handleCompanyEmailBlur = async (
//     e: React.FocusEvent<HTMLInputElement>
//   ) => {
//     const companyEmail = e.target.value;
//     if (!companyEmail || !companyEmail.includes("@")) return;

//     setCheckingCompany(true);
//     try {
//       const response = await axios.post(`${API_URL}/auth/check-company`, {
//         companyEmail,
//       });

//       const companyHasAdmin = response.data.data.hasAdmin;

//       if (companyHasAdmin) {
//         message.info(
//           "This company already has an admin. Verification required."
//         );
//         setShowAccessModal(true);
//       } else if (!isFirstTimeAdmin) {
//         // Not first admin globally, so require verification
//         message.info(
//           "Admin verification required to register for a new company."
//         );
//         setShowAccessModal(true);
//       } else {
//         message.success(
//           "New company! You'll be the first admin in the system."
//         );
//       }
//     } catch (error) {
//       console.error("Error checking company:", error);
//     } finally {
//       setCheckingCompany(false);
//     }
//   };

//   const handleImageUpload = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const result = e.target?.result as string;
//       setProfileImage(result);
//     };
//     reader.readAsDataURL(file);
//     return false;
//   };

//   const onFinish = async (values: RegisterFormValues) => {
//     setLoading(true);
//     try {
//       const finalSpecificRole =
//         values.specificRole === "custom"
//           ? values.customRole
//           : values.specificRole;

//       const finalWeeklyHours =
//         values.weeklyHours === 0
//           ? values.customWeeklyHours
//           : values.weeklyHours;

//       const finalPayType =
//         values.payType === "custom" ? values.customPayType : values.payType;

//       const finalShift =
//         values.shift === "custom" ? values.customShift : values.shift;

//       if (values.userRole === "admin") {
//         const adminData = {
//           name: values.name,
//           email: values.email,
//           password: values.password,
//           userRole: values.userRole,
//           specificRole: finalSpecificRole,
//           profileImage: profileImage || "",
//           companyName: values.companyName,
//           companyEmail: values.companyEmail,
//           companyAddress: values.companyAddress,
//           timezone: values.timezone,
//           ...(adminCredentials && {
//             adminEmail: adminCredentials.email,
//             adminPassword: adminCredentials.password,
//           }),
//         };

//         await dispatch(registerAdmin(adminData)).unwrap();

//         if (isFirstTimeAdmin) {
//           Modal.success({
//             title: "Registration Successful!",
//             content: (
//               <div>
//                 <p>Welcome to FlexTrack!</p>
//                 <p style={{ color: "#0066FF", marginTop: 8 }}>
//                   You have been registered as the main administrator.
//                 </p>
//               </div>
//             ),
//             okText: "Go to Dashboard",
//             onOk: () => {
//               router.push("/dashboard");
//             },
//           });
//         } else {
//           message.success("Admin registered successfully!");
//           form.resetFields();
//           setProfileImage("");
//           setUserRole("");
//         }
//       } else {
//         // Employee registration
//         if (!adminCredentials) {
//           message.error("Admin credentials required to register employees!");
//           setShowAccessModal(true);
//           return;
//         }

//         const employeeData = {
//           name: values.name,
//           email: values.email,
//           password: values.password,
//           userRole: values.userRole,
//           specificRole: finalSpecificRole,
//           profileImage: profileImage || "",
//           employmentType: values.employmentType,
//           shift: finalShift,
//           weeklyHours: finalWeeklyHours,
//           payType: finalPayType,
//           currency: values.currency,
//           payAmount: values.payAmount,
//           employmentDuration: values.employmentDuration,
//           onboardingNotes: values.onboardingNotes || "",
//           adminEmail: adminCredentials.email,
//           adminPassword: adminCredentials.password,
//         };

//         await dispatch(registerEmployee(employeeData)).unwrap();

//         message.success("Employee registered successfully!");
//         form.resetFields();
//         setProfileImage("");
//         setUserRole("");
//       }
//     } catch (error: any) {
//       message.error(error || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRoleChange = (value: string) => {
//     setUserRole(value);
//     setShowCustomRole(false);
//     setShowCustomCategory(false);
//     form.setFieldValue("specificRole", undefined);
//     form.setFieldValue("customRole", undefined);

//     // For employee, always require admin verification
//     if (value === "employee" && !accessGranted) {
//       setShowAccessModal(true);
//     }
//   };

//   const handleSpecificRoleChange = (value: string) => {
//     if (value === "custom") {
//       if (userRole === "admin") {
//         setShowCustomRole(true);
//         setShowCustomCategory(false);
//       } else {
//         setShowCustomCategory(true);
//         setShowCustomRole(false);
//       }
//     } else {
//       setShowCustomRole(false);
//       setShowCustomCategory(false);
//       form.setFieldValue("customRole", undefined);
//     }
//   };

//   const handleWeeklyHoursChange = (value: number) => {
//     if (value === 0) {
//       setShowCustomHours(true);
//     } else {
//       setShowCustomHours(false);
//       form.setFieldValue("customWeeklyHours", undefined);
//     }
//   };

//   const handleShiftChange = (value: string) => {
//     if (value === "custom") {
//       setShowCustomShift(true);
//     } else {
//       setShowCustomShift(false);
//       form.setFieldValue("customShift", undefined);
//     }
//   };

//   const handleAccessSuccess = (email: string, password: string) => {
//     setAdminCredentials({ email, password });
//     setAccessGranted(true);
//     setShowAccessModal(false);
//   };

//   // Show access modal for employee registration without admin credentials
//   if (userRole === "employee" && !accessGranted) {
//     return (
//       <>
//         <Head>
//           <title>Register | FlexTrack</title>
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//         </Head>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             minHeight: "100vh",
//             background: "#f0f2f5",
//             padding: "20px",
//           }}
//         >
//           <Card
//             style={{
//               width: "100%",
//               maxWidth: 450,
//               boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//               borderRadius: "8px",
//               textAlign: "center",
//             }}
//           >
//             <div
//               style={{
//                 width: 80,
//                 height: 80,
//                 background: "linear-gradient(135deg, #0066FF, #00D4B1)",
//                 borderRadius: "50%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 margin: "0 auto 24px",
//               }}
//             >
//               <LockOutlined style={{ fontSize: 40, color: "white" }} />
//             </div>
//             <Title level={3}>Admin Access Required</Title>
//             <Text
//               type="secondary"
//               style={{ display: "block", marginBottom: 24 }}
//             >
//               Only administrators can register new employees. Please verify your
//               admin access to continue.
//             </Text>
//             <Button
//               size="large"
//               block
//               onClick={() => setShowAccessModal(true)}
//               style={{
//                 background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//                 color: "white",
//                 border: "none",
//                 fontWeight: 500,
//                 height: 45,
//               }}
//             >
//               Verify Admin Access
//             </Button>
//             <div style={{ marginTop: 16 }}>
//               <Text type="secondary">
//                 Already have an account?{" "}
//                 <Link href="/login" style={{ fontWeight: 500 }}>
//                   Login here
//                 </Link>
//               </Text>
//             </div>
//           </Card>
//         </div>
//         <AdminAccessModal
//           visible={showAccessModal}
//           onCancel={() => {
//             setShowAccessModal(false);
//             setUserRole("");
//           }}
//           onSuccess={handleAccessSuccess}
//         />
//       </>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Register | FlexTrack</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//           background: "#f0f2f5",
//           padding: "20px",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: 1000,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             borderRadius: "8px",
//           }}
//         >
//           <div style={{ marginBottom: 24 }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginBottom: 16,
//               }}
//             >
//               <div
//                 style={{
//                   width: 40,
//                   height: 40,
//                   background: "linear-gradient(135deg, #0066FF, #00D4B1)",
//                   borderRadius: "8px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "white",
//                   fontWeight: "bold",
//                   fontSize: "18px",
//                 }}
//               >
//                 FT
//               </div>

//               <Title
//                 level={2}
//                 style={{ margin: 0, textAlign: "center", flex: 1 }}
//               >
//                 Register
//               </Title>

//               <div style={{ width: 40 }}></div>
//             </div>

//             {isFirstTimeAdmin && userRole === "admin" && (
//               <div
//                 style={{
//                   background: "#e6f7ff",
//                   border: "1px solid #91d5ff",
//                   borderRadius: "6px",
//                   padding: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Text style={{ color: "#0050b3", fontSize: "13px" }}>
//                   <strong>First Time Setup:</strong> You're registering as the
//                   main admin. Save your Email & Password after registration!
//                 </Text>
//               </div>
//             )}
//           </div>

//           <Form
//             form={form}
//             name="register"
//             onFinish={onFinish}
//             layout="vertical"
//             size="large"
//             autoComplete="off"
//           >
//             {/* Profile Image - Circular Avatar Style */}
//             <Form.Item label="Profile Image">
//               <div style={{ textAlign: "center" }}>
//                 <Upload
//                   beforeUpload={handleImageUpload}
//                   accept="image/*"
//                   showUploadList={false}
//                   maxCount={1}
//                 >
//                   <div
//                     style={{
//                       position: "relative",
//                       display: "inline-block",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Avatar
//                       size={120}
//                       src={profileImage}
//                       icon={!profileImage && <UserOutlined />}
//                     />
//                     <div
//                       style={{
//                         position: "absolute",
//                         bottom: 0,
//                         right: 0,
//                         width: 36,
//                         height: 36,
//                         borderRadius: "50%",
//                         background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         border: "3px solid white",
//                         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                       }}
//                     >
//                       <CameraOutlined
//                         style={{ color: "white", fontSize: 16 }}
//                       />
//                     </div>
//                   </div>
//                 </Upload>
//                 <div style={{ marginTop: 8 }}>
//                   <Text type="secondary" style={{ fontSize: 12 }}>
//                     Click avatar to upload image
//                   </Text>
//                 </div>
//               </div>
//             </Form.Item>

//             {/* Two Column Layout for Desktop */}
//             <Row gutter={[16, 0]}>
//               <Col xs={24} md={12}>
//                 <Form.Item
//                   name="name"
//                   label="Full Name"
//                   rules={[
//                     { required: true, message: "Please input your full name!" },
//                     { min: 2, message: "Name must be at least 2 characters!" },
//                   ]}
//                 >
//                   <Input
//                     prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
//                     placeholder="Enter your full name"
//                   />
//                 </Form.Item>
//               </Col>

//               <Col xs={24} md={12}>
//                 <Form.Item
//                   name="email"
//                   label="Email"
//                   rules={[
//                     { required: true, message: "Please input your email!" },
//                     { type: "email", message: "Please enter a valid email!" },
//                   ]}
//                 >
//                   <Input
//                     prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
//                     placeholder="Enter your email"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={[16, 0]}>
//               <Col xs={24} md={24}>
//                 <Form.Item
//                   label="User Role"
//                   name="userRole"
//                   rules={[
//                     { required: true, message: "Please select your role!" },
//                   ]}
//                 >
//                   <Select
//                     placeholder="Select your role"
//                     onChange={handleRoleChange}
//                     suffixIcon={<TeamOutlined style={{ color: "#bfbfbf" }} />}
//                   >
//                     <Option value="admin">Admin</Option>
//                     <Option value="employee">Employee</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col xs={24} md={12}>
//                 {userRole === "admin" && (
//                   <Form.Item
//                     label="Admin Role"
//                     name="specificRole"
//                     rules={[
//                       { required: true, message: "Please select admin role!" },
//                     ]}
//                   >
//                     <Select
//                       placeholder="Select admin role"
//                       onChange={handleSpecificRoleChange}
//                     >
//                       {adminRoles.map((role) => (
//                         <Option key={role} value={role}>
//                           {role}
//                         </Option>
//                       ))}
//                       <Option value="custom">Custom Role</Option>
//                     </Select>
//                   </Form.Item>
//                 )}

//                 {userRole === "employee" && (
//                   <Form.Item
//                     label="Employee Department"
//                     name="specificRole"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please select employee department!",
//                       },
//                     ]}
//                   >
//                     <Select
//                       placeholder="Select employee department"
//                       onChange={handleSpecificRoleChange}
//                     >
//                       {employeeCategories.map((category) => (
//                         <Option key={category} value={category}>
//                           {category}
//                         </Option>
//                       ))}
//                       <Option value="custom">Custom Department</Option>
//                     </Select>
//                   </Form.Item>
//                 )}
//               </Col>
//               {/* Custom Role/Category */}
//               <Col xs={24} md={12}>
//                 {(showCustomRole || showCustomCategory) && (
//                   <Form.Item
//                     label={
//                       showCustomRole
//                         ? "Custom Admin Role"
//                         : "Custom Employee Department"
//                     }
//                     name="customRole"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please enter custom role/category!",
//                       },
//                     ]}
//                   >
//                     <Input
//                       placeholder={`Enter custom ${showCustomRole ? "admin role" : "employee department"}`}
//                     />
//                   </Form.Item>
//                 )}
//               </Col>
//             </Row>

//             {/* Company Information - Only for Admin */}
//             {userRole === "admin" && (
//               <>
//                 <div style={{ marginTop: 24, marginBottom: 16 }}>
//                   <Text strong style={{ fontSize: 16, color: "#0066FF" }}>
//                     Company Information
//                   </Text>
//                 </div>

//                 <Row gutter={[16, 0]}>
//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Company Name"
//                       name="companyName"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter company name!",
//                         },
//                       ]}
//                     >
//                       <Input
//                         prefix={<BankOutlined style={{ color: "#bfbfbf" }} />}
//                         placeholder="Enter company name"
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Company Email"
//                       name="companyEmail"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter company email!",
//                         },
//                         {
//                           type: "email",
//                           message: "Please enter a valid email!",
//                         },
//                       ]}
//                     >
//                       <Input
//                         prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
//                         placeholder="company@example.com"
//                         onBlur={handleCompanyEmailBlur}
//                         disabled={checkingCompany}
//                       />
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Row gutter={[16, 0]}>
//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Company Address"
//                       name="companyAddress"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter company address!",
//                         },
//                       ]}
//                     >
//                       <Input.TextArea
//                         placeholder="Enter complete address"
//                         rows={1}
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Time Zone"
//                       name="timezone"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please select timezone!",
//                         },
//                       ]}
//                     >
//                       <Select
//                         placeholder="Select timezone"
//                         showSearch
//                         suffixIcon={
//                           <GlobalOutlined style={{ color: "#bfbfbf" }} />
//                         }
//                       >
//                         {timezones.map((tz) => (
//                           <Option key={tz} value={tz}>
//                             {tz}
//                           </Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
//                   </Col>
//                 </Row>
//               </>
//             )}

//             {/* Employee Specific Fields */}
//             {userRole === "employee" && (
//               <>
//                 <Row gutter={[16, 0]}>
//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Employment Type"
//                       name="employmentType"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please select employment type!",
//                         },
//                       ]}
//                     >
//                       <Radio.Group style={{ width: "100%" }}>
//                         <Radio value="fulltime">Remote</Radio>
//                         <Radio value="parttime">Onsite</Radio>
//                       </Radio.Group>
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Shift"
//                       name="shift"
//                       rules={[
//                         { required: true, message: "Please select shift!" },
//                       ]}
//                     >
//                       <Select
//                         placeholder="Select shift"
//                         onChange={handleShiftChange}
//                         suffixIcon={
//                           <ClockCircleOutlined style={{ color: "#bfbfbf" }} />
//                         }
//                       >
//                         <Option value="morning">Morning (6 AM - 2 PM)</Option>
//                         <Option value="afternoon">
//                           Afternoon (2 PM - 10 PM)
//                         </Option>
//                         <Option value="evening">Evening (10 PM - 6 AM)</Option>
//                         <Option value="custom">Custom Shift</Option>
//                       </Select>
//                     </Form.Item>
//                   </Col>

//                   {showCustomShift && (
//                     <Col xs={24} md={24}>
//                       <Form.Item
//                         label="Custom Shift"
//                         name="customShift"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Please enter custom shift!",
//                           },
//                         ]}
//                       >
//                         <Input
//                           placeholder="e.g., Night (10 PM - 6 AM)"
//                           prefix={
//                             <ClockCircleOutlined style={{ color: "#bfbfbf" }} />
//                           }
//                         />
//                       </Form.Item>
//                     </Col>
//                   )}
//                 </Row>

//                 <Row gutter={[16, 0]}>
//                   <Col xs={24} md={showCustomHours ? 12 : 24}>
//                     <Form.Item
//                       label="Weekly Working Hours"
//                       name="weeklyHours"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please select weekly working hours!",
//                         },
//                       ]}
//                     >
//                       <Select
//                         placeholder="Select weekly hours"
//                         onChange={handleWeeklyHoursChange}
//                         suffixIcon={
//                           <CalendarOutlined style={{ color: "#bfbfbf" }} />
//                         }
//                       >
//                         {workingHoursOptions.map((hours) => (
//                           <Option key={hours} value={hours}>
//                             {hours} hours/week
//                           </Option>
//                         ))}
//                         <Option value={0}>Custom Hours</Option>
//                       </Select>
//                     </Form.Item>
//                   </Col>

//                   {showCustomHours && (
//                     <Col xs={24} md={12}>
//                       <Form.Item
//                         label="Custom Weekly Hours"
//                         name="customWeeklyHours"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Please enter custom weekly hours!",
//                           },
//                           {
//                             type: "number",
//                             min: 1,
//                             max: 168,
//                             message: "Hours must be between 1 and 168!",
//                           },
//                         ]}
//                       >
//                         <InputNumber
//                           placeholder="Enter hours (1-168)"
//                           style={{ width: "100%" }}
//                           min={1}
//                           max={168}
//                         />
//                       </Form.Item>
//                     </Col>
//                   )}
//                 </Row>

//                 {/* Employee Pay Information */}
//                 <div style={{ marginTop: 24, marginBottom: 16 }}>
//                   <Text strong style={{ fontSize: 16, color: "#0066FF" }}>
//                     Compensation Details
//                   </Text>
//                 </div>

//                 <Row gutter={[16, 0]}>
//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Employment Duration"
//                       name="employmentDuration"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please select employment duration!",
//                         },
//                       ]}
//                     >
//                       <Select
//                         placeholder="Select duration"
//                         suffixIcon={
//                           <CalendarOutlined style={{ color: "#bfbfbf" }} />
//                         }
//                       >
//                         <Option value="internship">Internship</Option>
//                         <Option value="fulltime">Full Time</Option>
//                         <Option value="contract">Contract</Option>
//                         <Option value="temporary">Temporary</Option>
//                       </Select>
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Currency"
//                       name="currency"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please select currency!",
//                         },
//                       ]}
//                     >
//                       <Select
//                         placeholder="Select currency"
//                         onChange={(value) => setSelectedCurrency(value)}
//                       >
//                         {currencies.map((curr) => (
//                           <Option key={curr.symbol} value={curr.symbol}>
//                             {curr.symbol} - {curr.name}
//                           </Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Row gutter={[16, 0]}>
//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Pay Type"
//                       name="payType"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please select pay type!",
//                         },
//                       ]}
//                     >
//                       <Select
//                         placeholder="Select pay type"
//                         onChange={(value) =>
//                           setShowCustomPayType(value === "custom")
//                         }
//                       >
//                         {payTypes.map((type) => (
//                           <Option key={type} value={type}>
//                             {type}
//                           </Option>
//                         ))}
//                         <Option value="custom">Custom Pay Type</Option>
//                       </Select>
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Pay Amount"
//                       name="payAmount"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter pay amount!",
//                         },
//                         {
//                           type: "number",
//                           min: 0,
//                           message: "Amount must be positive!",
//                         },
//                       ]}
//                     >
//                       <InputNumber
//                         placeholder="Enter amount"
//                         style={{ width: "100%" }}
//                         min={0}
//                         addonBefore={selectedCurrency}
//                         formatter={(value) =>
//                           `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                         }
//                       />
//                     </Form.Item>
//                   </Col>

//                   {showCustomPayType && (
//                     <Col xs={24} md={24}>
//                       <Form.Item
//                         label="Custom Pay Type"
//                         name="customPayType"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Please enter custom pay type!",
//                           },
//                         ]}
//                       >
//                         <Input placeholder="e.g., Bi-weekly, Annual" />
//                       </Form.Item>
//                     </Col>
//                   )}
//                 </Row>
//               </>
//             )}

//             {/* Password Fields */}
//             <Row gutter={[16, 0]}>
//               <Col xs={24} md={12}>
//                 <Form.Item
//                   name="password"
//                   label="Password"
//                   rules={[
//                     { required: true, message: "Please input your password!" },
//                     {
//                       min: 6,
//                       message: "Password must be at least 6 characters!",
//                     },
//                   ]}
//                   hasFeedback
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
//                     placeholder="Enter your password"
//                   />
//                 </Form.Item>
//               </Col>

//               <Col xs={24} md={12}>
//                 <Form.Item
//                   name="confirmPassword"
//                   label="Confirm Password"
//                   dependencies={["password"]}
//                   hasFeedback
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please confirm your password!",
//                     },
//                     ({ getFieldValue }) => ({
//                       validator(_, value) {
//                         if (!value || getFieldValue("password") === value) {
//                           return Promise.resolve();
//                         }
//                         return Promise.reject(
//                           new Error("Passwords do not match!")
//                         );
//                       },
//                     }),
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
//                     placeholder="Confirm your password"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item>
//               <Button
//                 htmlType="submit"
//                 loading={loading || authLoading}
//                 block
//                 style={{
//                   height: 45,
//                   fontSize: 16,
//                   fontWeight: 500,
//                   color: "white",
//                   background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//                   border: "none",
//                 }}
//               >
//                 Register
//               </Button>
//             </Form.Item>

//             <div style={{ textAlign: "center" }}>
//               <Text type="secondary">
//                 Already have an account?{" "}
//                 <Link href="/login" style={{ fontWeight: 500 }}>
//                   Login here
//                 </Link>
//               </Text>
//             </div>
//           </Form>
//         </Card>
//       </div>

//       <AdminAccessModal
//         visible={showAccessModal}
//         onCancel={() => setShowAccessModal(false)}
//         onSuccess={handleAccessSuccess}
//       />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Select,
  App,
  message,
  Upload,
  Modal,
  Radio,
  InputNumber,
  Row,
  Col,
  Avatar,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  TeamOutlined,
  BankOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin, registerEmployee } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://flextrack-be-production.up.railway.app/api";

// Admin roles
const adminRoles = [
  "HR Manager",
  "Operations Manager",
  "Finance Manager",
  "IT Manager",
  "General Manager",
];

// Pay types for employees
const payTypes = ["Hourly", "Monthly Salary", "Project-based", "Commission"];

// Timezones
const timezones = [
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:00",
  "UTC-08:00 (PST)",
  "UTC-07:00 (MST)",
  "UTC-06:00 (CST)",
  "UTC-05:00 (EST)",
  "UTC-04:00",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC+00:00 (GMT)",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+04:00",
  "UTC+05:00 (PKT)",
  "UTC+05:30 (IST)",
  "UTC+06:00",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+09:00",
  "UTC+10:00",
  "UTC+11:00",
  "UTC+12:00",
];

// Employee categories
const employeeCategories = [
  "Software Developer",
  "Sales Executive",
  "Marketing Specialist",
  "Customer Support",
  "Accountant",
];

// Working hours options
const workingHoursOptions = [20, 30, 40, 45, 48];

// Currency options
const currencies = [
  { symbol: "$", name: "USD - US Dollar" },
  { symbol: "€", name: "EUR - Euro" },
  { symbol: "£", name: "GBP - British Pound" },
  { symbol: "¥", name: "JPY - Japanese Yen" },
  { symbol: "₹", name: "INR - Indian Rupee" },
  { symbol: "₨", name: "PKR - Pakistani Rupee" },
  { symbol: "د.إ", name: "AED - UAE Dirham" },
  { symbol: "﷼", name: "SAR - Saudi Riyal" },
  { symbol: "C$", name: "CAD - Canadian Dollar" },
  { symbol: "A$", name: "AUD - Australian Dollar" },
];

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userRole: string;
  specificRole?: string;
  customRole?: string;
  companyName?: string;
  companyEmail?: string;
  companyAddress?: string;
  timezone?: string;
  employmentType?: string;
  shift?: string;
  customShift?: string;
  weeklyHours?: number;
  customWeeklyHours?: number;
  payType?: string;
  employmentDuration?: string;
  currency?: string;
  customPayType?: string;
  payAmount?: number;
  onboardingNotes?: string;
  profileImage?: string;
}

interface AdminAccessModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: (email: string, password: string) => void;
  loading: boolean;
}

const AdminAccessModal = ({
  visible,
  onCancel,
  onSuccess,
  loading,
}: AdminAccessModalProps) => {
  const [form] = Form.useForm();

  const handleVerify = async (values: {
    adminEmail: string;
    adminPassword: string;
  }) => {
    onSuccess(values.adminEmail, values.adminPassword);
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      closable={false}
      maskClosable={false}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div
          style={{
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #0066FF, #00D4B1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <LockOutlined style={{ fontSize: 30, color: "white" }} />
        </div>
        <Title level={4} style={{ margin: 0 }}>
          Admin Verification Required
        </Title>
        <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
          Please verify your admin credentials to access the registration page
        </Text>
      </div>

      <Form form={form} onFinish={handleVerify} layout="vertical">
        <Form.Item
          name="adminEmail"
          label="Admin Email"
          rules={[
            { required: true, message: "Please enter your admin email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Enter your admin email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="adminPassword"
          label="Admin Password"
          rules={[
            { required: true, message: "Please enter your admin password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your admin password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{
              background: "linear-gradient(135deg, #00D4B1, #0066FF)",
              color: "white",
              border: "none",
              fontWeight: 500,
            }}
          >
            Verify & Continue
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Text type="secondary">
            Don't have an account?{" "}
            <Text type="secondary" style={{ fontWeight: 500 }}>
              Contact your administrator
            </Text>
          </Text>
        </div>
      </Form>
    </Modal>
  );
};

export default function Register() {
  const { message } = App.useApp();
  const dispatch = useDispatch<AppDispatch>();
  const { loading: authLoading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userRole, setUserRole] = useState<string>("");
  const [showCustomRole, setShowCustomRole] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomHours, setShowCustomHours] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [isFirstTimeAdmin, setIsFirstTimeAdmin] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [showCustomShift, setShowCustomShift] = useState(false);
  const [showCustomPayType, setShowCustomPayType] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("$");
  const [adminCredentials, setAdminCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const [verifyingAdmin, setVerifyingAdmin] = useState(false);
  const [checkingSystem, setCheckingSystem] = useState(true);

  // Check if any admin exists in the system on page load
  useEffect(() => {
    const checkMainAdmin = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/check-main-admin`);
        const hasMainAdmin = response.data.data.hasMainAdmin;

        setIsFirstTimeAdmin(!hasMainAdmin);

        if (hasMainAdmin) {
          // Admin exists, show verification modal
          setAccessGranted(false);
          setShowAccessModal(true);
        } else {
          // No admin exists, allow direct registration
          setAccessGranted(true);
        }
      } catch (error) {
        console.error("Error checking main admin:", error);
        // If error, assume no admin exists yet
        setIsFirstTimeAdmin(true);
        setAccessGranted(true);
      } finally {
        setCheckingSystem(false);
      }
    };

    checkMainAdmin();
  }, []);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const finalSpecificRole =
        values.specificRole === "custom"
          ? values.customRole
          : values.specificRole;

      const finalWeeklyHours =
        values.weeklyHours === 0
          ? values.customWeeklyHours
          : values.weeklyHours;

      const finalPayType =
        values.payType === "custom" ? values.customPayType : values.payType;

      const finalShift =
        values.shift === "custom" ? values.customShift : values.shift;

      if (values.userRole === "admin") {
        const adminData = {
          name: values.name,
          email: values.email,
          password: values.password,
          userRole: values.userRole,
          specificRole: finalSpecificRole,
          profileImage: profileImage || "",
          companyName: values.companyName,
          companyEmail: values.companyEmail,
          companyAddress: values.companyAddress,
          timezone: values.timezone,
          ...(adminCredentials && {
            adminEmail: adminCredentials.email,
            adminPassword: adminCredentials.password,
          }),
        };

        await dispatch(registerAdmin(adminData)).unwrap();

        if (isFirstTimeAdmin) {
          Modal.success({
            title: "Registration Successful!",
            content: (
              <div>
                <p>Welcome to FlexTrack!</p>
                <p style={{ color: "#0066FF", marginTop: 8 }}>
                  You have been registered as the main administrator.
                </p>
              </div>
            ),
            okText: "Go to Dashboard",
            onOk: () => {
              router.push("/dashboard");
            },
          });
        } else {
          message.success("Admin registered successfully!");
          form.resetFields();
          setProfileImage("");
          setUserRole("");
        }
      } else {
        // Employee registration
        const employeeData = {
          name: values.name,
          email: values.email,
          password: values.password,
          userRole: values.userRole,
          specificRole: finalSpecificRole,
          profileImage: profileImage || "",
          employmentType: values.employmentType,
          shift: finalShift,
          weeklyHours: finalWeeklyHours,
          payType: finalPayType,
          currency: values.currency,
          payAmount: values.payAmount,
          employmentDuration: values.employmentDuration,
          onboardingNotes: values.onboardingNotes || "",
          adminEmail: adminCredentials?.email,
          adminPassword: adminCredentials?.password,
        };

        await dispatch(registerEmployee(employeeData)).unwrap();

        message.success("Employee registered successfully!");
        form.resetFields();
        setProfileImage("");
        setUserRole("");
      }
    } catch (error: any) {
      message.error(error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setUserRole(value);
    setShowCustomRole(false);
    setShowCustomCategory(false);
    form.setFieldValue("specificRole", undefined);
    form.setFieldValue("customRole", undefined);
  };

  const handleSpecificRoleChange = (value: string) => {
    if (value === "custom") {
      if (userRole === "admin") {
        setShowCustomRole(true);
        setShowCustomCategory(false);
      } else {
        setShowCustomCategory(true);
        setShowCustomRole(false);
      }
    } else {
      setShowCustomRole(false);
      setShowCustomCategory(false);
      form.setFieldValue("customRole", undefined);
    }
  };

  const handleWeeklyHoursChange = (value: number) => {
    if (value === 0) {
      setShowCustomHours(true);
    } else {
      setShowCustomHours(false);
      form.setFieldValue("customWeeklyHours", undefined);
    }
  };

  const handleShiftChange = (value: string) => {
    if (value === "custom") {
      setShowCustomShift(true);
    } else {
      setShowCustomShift(false);
      form.setFieldValue("customShift", undefined);
    }
  };

  const handleAccessSuccess = async (email: string, password: string) => {
    setVerifyingAdmin(true);
    try {
      // Verify admin credentials with backend
      const response = await axios.post(`${API_URL}/auth/verify-admin`, {
        adminEmail: email,
        adminPassword: password,
      });

      if (response.data.success) {
        setAdminCredentials({ email, password });
        setAccessGranted(true);
        setShowAccessModal(false);
        message.success("Admin verified successfully!");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Invalid admin credentials!";
      message.error(errorMessage);
    } finally {
      setVerifyingAdmin(false);
    }
  };

  // Show loading while checking system
  if (checkingSystem) {
    return (
      <>
        <Head>
          <title>Register | FlexTrack</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#f0f2f5",
          }}
        >
          <Card style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: 24, marginBottom: 16 }}>🔄</div>
            <Text>Loading registration page...</Text>
          </Card>
        </div>
      </>
    );
  }

  // Show access modal if admin verification required
  if (!accessGranted) {
    return (
      <>
        <Head>
          <title>Register | FlexTrack</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#f0f2f5",
            padding: "20px",
          }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: 450,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <LockOutlined style={{ fontSize: 40, color: "white" }} />
            </div>
            <Title level={3}>Admin Access Required</Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 24 }}
            >
              Only administrators can register new users. Please verify your
              admin credentials to continue.
            </Text>
            <Button
              size="large"
              block
              onClick={() => setShowAccessModal(true)}
              style={{
                background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                color: "white",
                border: "none",
                fontWeight: 500,
                height: 45,
              }}
            >
              Verify Admin Access
            </Button>
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">
                Already have an account?{" "}
                <Link href="/login" style={{ fontWeight: 500 }}>
                  Login here
                </Link>
              </Text>
            </div>
          </Card>
        </div>
        <AdminAccessModal
          visible={showAccessModal}
          onCancel={() => setShowAccessModal(false)}
          onSuccess={handleAccessSuccess}
          loading={verifyingAdmin}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Register | FlexTrack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f0f2f5",
          padding: "20px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                FT
              </div>

              <Title
                level={2}
                style={{ margin: 0, textAlign: "center", flex: 1 }}
              >
                Register
              </Title>

              <div style={{ width: 40 }}></div>
            </div>

            {isFirstTimeAdmin ? (
              <div
                style={{
                  background: "#e6f7ff",
                  border: "1px solid #91d5ff",
                  borderRadius: "6px",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <Text style={{ color: "#0050b3", fontSize: "13px" }}>
                  <strong>First Time Setup:</strong> You're registering as the
                  main admin. Save your Email & Password after registration!
                </Text>
              </div>
            ) : (
              <div
                style={{
                  background: "#f6ffed",
                  border: "1px solid #b7eb8f",
                  borderRadius: "6px",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <Text style={{ color: "#389e0d", fontSize: "13px" }}>
                  <strong>Admin Verified:</strong> You can now register admins
                  or employees for your company.
                </Text>
              </div>
            )}
          </div>

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            {/* Profile Image - Circular Avatar Style */}
            <Form.Item label="Profile Image">
              <div style={{ textAlign: "center" }}>
                <Upload
                  beforeUpload={handleImageUpload}
                  accept="image/*"
                  showUploadList={false}
                  maxCount={1}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      size={120}
                      src={profileImage}
                      icon={!profileImage && <UserOutlined />}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "3px solid white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      <CameraOutlined
                        style={{ color: "white", fontSize: 16 }}
                      />
                    </div>
                  </div>
                </Upload>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Click avatar to upload image
                  </Text>
                </div>
              </div>
            </Form.Item>

            {/* Two Column Layout for Desktop */}
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input your full name!" },
                    { min: 2, message: "Name must be at least 2 characters!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                    placeholder="Enter your email"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col xs={24} md={24}>
                <Form.Item
                  label="User Role"
                  name="userRole"
                  rules={[
                    { required: true, message: "Please select your role!" },
                  ]}
                >
                  <Select
                    placeholder="Select your role"
                    onChange={handleRoleChange}
                    suffixIcon={<TeamOutlined style={{ color: "#bfbfbf" }} />}
                  >
                    <Option value="admin">Admin</Option>
                    <Option value="employee">Employee</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                {userRole === "admin" && (
                  <Form.Item
                    label="Admin Role"
                    name="specificRole"
                    rules={[
                      { required: true, message: "Please select admin role!" },
                    ]}
                  >
                    <Select
                      placeholder="Select admin role"
                      onChange={handleSpecificRoleChange}
                    >
                      {adminRoles.map((role) => (
                        <Option key={role} value={role}>
                          {role}
                        </Option>
                      ))}
                      <Option value="custom">Custom Role</Option>
                    </Select>
                  </Form.Item>
                )}

                {userRole === "employee" && (
                  <Form.Item
                    label="Employee Department"
                    name="specificRole"
                    rules={[
                      {
                        required: true,
                        message: "Please select employee department!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select employee department"
                      onChange={handleSpecificRoleChange}
                    >
                      {employeeCategories.map((category) => (
                        <Option key={category} value={category}>
                          {category}
                        </Option>
                      ))}
                      <Option value="custom">Custom Department</Option>
                    </Select>
                  </Form.Item>
                )}
              </Col>
              {/* Custom Role/Category */}
              <Col xs={24} md={12}>
                {(showCustomRole || showCustomCategory) && (
                  <Form.Item
                    label={
                      showCustomRole
                        ? "Custom Admin Role"
                        : "Custom Employee Department"
                    }
                    name="customRole"
                    rules={[
                      {
                        required: true,
                        message: "Please enter custom role/category!",
                      },
                    ]}
                  >
                    <Input
                      placeholder={`Enter custom ${showCustomRole ? "admin role" : "employee department"}`}
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>

            {/* Company Information - Only for Admin */}
            {userRole === "admin" && (
              <>
                <div style={{ marginTop: 24, marginBottom: 16 }}>
                  <Text strong style={{ fontSize: 16, color: "#0066FF" }}>
                    Company Information
                  </Text>
                </div>

                <Row gutter={[16, 0]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Company Name"
                      name="companyName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter company name!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<BankOutlined style={{ color: "#bfbfbf" }} />}
                        placeholder="Enter company name"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Company Email"
                      name="companyEmail"
                      rules={[
                        {
                          required: true,
                          message: "Please enter company email!",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                        placeholder="company@example.com"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 0]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Company Address"
                      name="companyAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please enter company address!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="Enter complete address"
                        rows={1}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Time Zone"
                      name="timezone"
                      rules={[
                        {
                          required: true,
                          message: "Please select timezone!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select timezone"
                        showSearch
                        suffixIcon={
                          <GlobalOutlined style={{ color: "#bfbfbf" }} />
                        }
                      >
                        {timezones.map((tz) => (
                          <Option key={tz} value={tz}>
                            {tz}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            {/* Employee Specific Fields */}
            {userRole === "employee" && (
              <>
                <Row gutter={[16, 0]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Employment Type"
                      name="employmentType"
                      rules={[
                        {
                          required: true,
                          message: "Please select employment type!",
                        },
                      ]}
                    >
                      <Radio.Group style={{ width: "100%" }}>
                        <Radio value="fulltime">Remote</Radio>
                        <Radio value="parttime">Onsite</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Shift"
                      name="shift"
                      rules={[
                        { required: true, message: "Please select shift!" },
                      ]}
                    >
                      <Select
                        placeholder="Select shift"
                        onChange={handleShiftChange}
                        suffixIcon={
                          <ClockCircleOutlined style={{ color: "#bfbfbf" }} />
                        }
                      >
                        <Option value="morning">Morning (6 AM - 2 PM)</Option>
                        <Option value="afternoon">
                          Afternoon (2 PM - 10 PM)
                        </Option>
                        <Option value="evening">Evening (10 PM - 6 AM)</Option>
                        <Option value="custom">Custom Shift</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {showCustomShift && (
                    <Col xs={24} md={24}>
                      <Form.Item
                        label="Custom Shift"
                        name="customShift"
                        rules={[
                          {
                            required: true,
                            message: "Please enter custom shift!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="e.g., Night (10 PM - 6 AM)"
                          prefix={
                            <ClockCircleOutlined style={{ color: "#bfbfbf" }} />
                          }
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>

                <Row gutter={[16, 0]}>
                  <Col xs={24} md={showCustomHours ? 12 : 24}>
                    <Form.Item
                      label="Weekly Working Hours"
                      name="weeklyHours"
                      rules={[
                        {
                          required: true,
                          message: "Please select weekly working hours!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select weekly hours"
                        onChange={handleWeeklyHoursChange}
                        suffixIcon={
                          <CalendarOutlined style={{ color: "#bfbfbf" }} />
                        }
                      >
                        {workingHoursOptions.map((hours) => (
                          <Option key={hours} value={hours}>
                            {hours} hours/week
                          </Option>
                        ))}
                        <Option value={0}>Custom Hours</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {showCustomHours && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Custom Weekly Hours"
                        name="customWeeklyHours"
                        rules={[
                          {
                            required: true,
                            message: "Please enter custom weekly hours!",
                          },
                          {
                            type: "number",
                            min: 1,
                            max: 168,
                            message: "Hours must be between 1 and 168!",
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="Enter hours (1-168)"
                          style={{ width: "100%" }}
                          min={1}
                          max={168}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>

                {/* Employee Pay Information */}
                <div style={{ marginTop: 24, marginBottom: 16 }}>
                  <Text strong style={{ fontSize: 16, color: "#0066FF" }}>
                    Compensation Details
                  </Text>
                </div>

                <Row gutter={[16, 0]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Employment Duration"
                      name="employmentDuration"
                      rules={[
                        {
                          required: true,
                          message: "Please select employment duration!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select duration"
                        suffixIcon={
                          <CalendarOutlined style={{ color: "#bfbfbf" }} />
                        }
                      >
                        <Option value="internship">Internship</Option>
                        <Option value="fulltime">Full Time</Option>
                        <Option value="contract">Contract</Option>
                        <Option value="temporary">Temporary</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Currency"
                      name="currency"
                      rules={[
                        {
                          required: true,
                          message: "Please select currency!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select currency"
                        onChange={(value) => setSelectedCurrency(value)}
                      >
                        {currencies.map((curr) => (
                          <Option key={curr.symbol} value={curr.symbol}>
                            {curr.symbol} - {curr.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 0]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Pay Type"
                      name="payType"
                      rules={[
                        {
                          required: true,
                          message: "Please select pay type!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select pay type"
                        onChange={(value) =>
                          setShowCustomPayType(value === "custom")
                        }
                      >
                        {payTypes.map((type) => (
                          <Option key={type} value={type}>
                            {type}
                          </Option>
                        ))}
                        <Option value="custom">Custom Pay Type</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Pay Amount"
                      name="payAmount"
                      rules={[
                        {
                          required: true,
                          message: "Please enter pay amount!",
                        },
                        {
                          type: "number",
                          min: 0,
                          message: "Amount must be positive!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter amount"
                        style={{ width: "100%" }}
                        min={0}
                        addonBefore={selectedCurrency}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                    </Form.Item>
                  </Col>

                  {showCustomPayType && (
                    <Col xs={24} md={24}>
                      <Form.Item
                        label="Custom Pay Type"
                        name="customPayType"
                        rules={[
                          {
                            required: true,
                            message: "Please enter custom pay type!",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., Bi-weekly, Annual" />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </>
            )}

            {/* Password Fields */}
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                    placeholder="Enter your password"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                    placeholder="Confirm your password"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading || authLoading}
                block
                style={{
                  height: 45,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "white",
                  background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                  border: "none",
                }}
              >
                Register
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Already have an account?{" "}
                <Link href="/login" style={{ fontWeight: 500 }}>
                  Login here
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </div>

      <AdminAccessModal
        visible={showAccessModal}
        onCancel={() => setShowAccessModal(false)}
        onSuccess={handleAccessSuccess}
        loading={verifyingAdmin}
      />
    </>
  );
}
