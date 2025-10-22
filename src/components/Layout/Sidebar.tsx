// // // // // import React from "react";
// // // // // import { Layout, Menu } from "antd";
// // // // // import {
// // // // //   DashboardOutlined,
// // // // //   TeamOutlined,
// // // // //   ClockCircleOutlined,
// // // // //   CalendarOutlined,
// // // // //   BarChartOutlined,
// // // // // } from "@ant-design/icons";
// // // // // import { useRouter } from "next/router";

// // // // // const Sidebar: React.FC = () => {
// // // // //   const router = useRouter();
// // // // //   return (
// // // // //     <Layout.Sider collapsible>
// // // // //       <div
// // // // //         style={{
// // // // //           height: "64px",
// // // // //           margin: "16px",
// // // // //           background: "rgba(255,255,255,.2)",
// // // // //         }}
// // // // //       />
// // // // //       <Menu
// // // // //         theme="dark"
// // // // //         mode="inline"
// // // // //         defaultSelectedKeys={["1"]}
// // // // //         items={[
// // // // //           {
// // // // //             key: "1",
// // // // //             icon: <DashboardOutlined />,
// // // // //             label: "Dashboard",
// // // // //             onClick: () => router.push("/dashboard"),
// // // // //           },
// // // // //           {
// // // // //             key: "2",
// // // // //             icon: <TeamOutlined />,
// // // // //             label: "Employees",
// // // // //             onClick: () => router.push("/employees"),
// // // // //           },
// // // // //           {
// // // // //             key: "3",
// // // // //             icon: <ClockCircleOutlined />,
// // // // //             label: "Attendance",
// // // // //             onClick: () => router.push("/attendance"),
// // // // //           },
// // // // //           {
// // // // //             key: "4",
// // // // //             icon: <CalendarOutlined />,
// // // // //             label: "Leaves",
// // // // //             onClick: () => router.push("/leaves"),
// // // // //           },
// // // // //           {
// // // // //             key: "5",
// // // // //             icon: <BarChartOutlined />,
// // // // //             label: "Reports",
// // // // //             onClick: () => router.push("/reports"),
// // // // //           },
// // // // //         ]}
// // // // //       />
// // // // //     </Layout.Sider>
// // // // //   );
// // // // // };
// // // // // export default Sidebar;

// // // // import React, { useState } from "react";
// // // // import { Layout, Menu } from "antd";
// // // // import {
// // // //   DashboardOutlined,
// // // //   ClockCircleOutlined,
// // // //   CalendarOutlined,
// // // //   BarChartOutlined,
// // // //   SettingOutlined,
// // // // } from "@ant-design/icons";
// // // // import { useRouter } from "next/router";

// // // // const { Sider } = Layout;

// // // // const Sidebar: React.FC = () => {
// // // //   const router = useRouter();
// // // //   const [collapsed, setCollapsed] = useState(false);

// // // //   const menuItems = [
// // // //     {
// // // //       key: "1",
// // // //       icon: <DashboardOutlined />,
// // // //       label: "Dashboard",
// // // //       onClick: () => router.push("/dashboard"),
// // // //     },
// // // //     {
// // // //       key: "2",
// // // //       icon: <ClockCircleOutlined />,
// // // //       label: "Attendance",
// // // //       onClick: () => router.push("/attendance"),
// // // //     },
// // // //     {
// // // //       key: "3",
// // // //       icon: <CalendarOutlined />,
// // // //       label: "Shifts",
// // // //       onClick: () => router.push("/shifts"),
// // // //     },
// // // //     {
// // // //       key: "4",
// // // //       icon: <BarChartOutlined />,
// // // //       label: "Reports",
// // // //       onClick: () => router.push("/reports"),
// // // //     },
// // // //     {
// // // //       key: "5",
// // // //       icon: <SettingOutlined />,
// // // //       label: "Settings",
// // // //       onClick: () => router.push("/settings"),
// // // //     },
// // // //   ];

// // // //   return (
// // // //     <Sider
// // // //       collapsible
// // // //       collapsed={collapsed}
// // // //       onCollapse={(value) => setCollapsed(value)}
// // // //       breakpoint="lg"
// // // //       collapsedWidth={0}
// // // //       style={{
// // // //         overflow: "auto",
// // // //         height: "100vh",
// // // //         position: "fixed",
// // // //         left: 0,
// // // //         top: 0,
// // // //         bottom: 0,
// // // //         background: "#f8f9fa",
// // // //       }}
// // // //       theme="light"
// // // //       width={200}
// // // //       trigger={null}
// // // //     >
// // // //       <div
// // // //         style={{
// // // //           height: "64px",
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           justifyContent: "center",
// // // //           padding: "16px",
// // // //         }}
// // // //       >
// // // //         {/* Add your logo here */}
// // // //       </div>
// // // //       <Menu
// // // //         theme="light"
// // // //         mode="inline"
// // // //         defaultSelectedKeys={["1"]}
// // // //         items={menuItems}
// // // //         style={{
// // // //           border: "none",
// // // //           background: "transparent",
// // // //         }}
// // // //       />
// // // //     </Sider>
// // // //   );
// // // // };

// // // // export default Sidebar;

// // // import React, { useState, useEffect } from "react";
// // // import { Layout, Menu } from "antd";
// // // import {
// // //   DashboardOutlined,
// // //   ClockCircleOutlined,
// // //   CalendarOutlined,
// // //   FileTextOutlined,
// // //   SettingOutlined,
// // // } from "@ant-design/icons";
// // // import { useRouter } from "next/router";
// // // import type { MenuProps } from "antd";

// // // const { Sider } = Layout;

// // // const Sidebar: React.FC = () => {
// // //   const router = useRouter();
// // //   const [collapsed, setCollapsed] = useState(false);
// // //   const [isMobile, setIsMobile] = useState(false);

// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       setIsMobile(window.innerWidth <= 768);
// // //       if (window.innerWidth <= 768) {
// // //         setCollapsed(true);
// // //       }
// // //     };

// // //     handleResize();
// // //     window.addEventListener("resize", handleResize);
// // //     return () => window.removeEventListener("resize", handleResize);
// // //   }, []);

// // //   const menuItems: MenuProps["items"] = [
// // //     {
// // //       key: "dashboard",
// // //       icon: <DashboardOutlined />,
// // //       label: "Dashboard",
// // //       onClick: () => router.push("/dashboard"),
// // //     },
// // //     {
// // //       key: "attendance",
// // //       icon: <ClockCircleOutlined />,
// // //       label: "Attendance",
// // //       onClick: () => router.push("/attendance"),
// // //     },
// // //     {
// // //       key: "shifts",
// // //       icon: <CalendarOutlined />,
// // //       label: "Shifts",
// // //       onClick: () => router.push("/shifts"),
// // //     },
// // //     {
// // //       key: "reports",
// // //       icon: <FileTextOutlined />,
// // //       label: "Reports",
// // //       onClick: () => router.push("/reports"),
// // //     },
// // //     {
// // //       key: "settings",
// // //       icon: <SettingOutlined />,
// // //       label: "Settings",
// // //       onClick: () => router.push("/settings"),
// // //     },
// // //   ];

// // //   // Get the current selected key based on the route
// // //   const getSelectedKey = () => {
// // //     const path = router.pathname;
// // //     if (path.includes("/dashboard")) return ["dashboard"];
// // //     if (path.includes("/attendance")) return ["attendance"];
// // //     if (path.includes("/shifts")) return ["shifts"];
// // //     if (path.includes("/reports")) return ["reports"];
// // //     if (path.includes("/settings")) return ["settings"];
// // //     return ["dashboard"];
// // //   };

// // //   return (
// // //     <>
// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           left: "16px",
// // //           top: "102px", // Below header (16px padding + 70px header + 16px gap)
// // //           bottom: "16px",
// // //           zIndex: 100,
// // //         }}
// // //       >
// // //         <Sider
// // //           collapsible
// // //           collapsed={collapsed}
// // //           onCollapse={(value) => setCollapsed(value)}
// // //           width={200}
// // //           collapsedWidth={isMobile ? 0 : 80}
// // //           trigger={null}
// // //           style={{
// // //             background: "#fff",
// // //             borderRadius: "12px",
// // //             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // //             height: "100%",
// // //             overflow: "hidden",
// // //           }}
// // //           className="custom-sidebar"
// // //         >
// // //           <Menu
// // //             mode="inline"
// // //             selectedKeys={getSelectedKey()}
// // //             items={menuItems}
// // //             style={{
// // //               border: "none",
// // //               paddingTop: "20px",
// // //               height: "100%",
// // //             }}
// // //           />

// // //           {/* Collapse Button */}
// // //           <div
// // //             onClick={() => setCollapsed(!collapsed)}
// // //             style={{
// // //               position: "absolute",
// // //               bottom: "20px",
// // //               left: "50%",
// // //               transform: "translateX(-50%)",
// // //               width: collapsed ? "40px" : "160px",
// // //               height: "40px",
// // //               background: "#f0f2f5",
// // //               borderRadius: "8px",
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "center",
// // //               cursor: "pointer",
// // //               fontSize: "16px",
// // //               color: "#595959",
// // //               transition: "all 0.2s",
// // //             }}
// // //             className="collapse-btn"
// // //           >
// // //             {collapsed ? "»" : "«"}
// // //           </div>
// // //         </Sider>
// // //       </div>

// // //       <style jsx global>{`
// // //         .custom-sidebar .ant-layout-sider-children {
// // //           display: flex;
// // //           flex-direction: column;
// // //         }

// // //         .custom-sidebar .ant-menu {
// // //           flex: 1;
// // //         }

// // //         .custom-sidebar .ant-menu-item {
// // //           height: 48px;
// // //           line-height: 48px;
// // //           margin: 8px 12px !important;
// // //           border-radius: 8px !important;
// // //           width: auto !important;
// // //           transition: all 0.2s;
// // //         }

// // //         .custom-sidebar .ant-menu-item-selected {
// // //           background-color: #e6f4ff !important;
// // //           color: #0066ff !important;
// // //         }

// // //         .custom-sidebar .ant-menu-item-selected .anticon {
// // //           color: #0066ff !important;
// // //         }

// // //         .custom-sidebar .ant-menu-item:hover {
// // //           background-color: #f5f5f5 !important;
// // //         }

// // //         .custom-sidebar .ant-menu-item .anticon {
// // //           font-size: 18px;
// // //           color: #595959;
// // //         }

// // //         .custom-sidebar .ant-menu-item-selected .anticon {
// // //           color: #0066ff;
// // //         }

// // //         .custom-sidebar .ant-menu-item span {
// // //           font-size: 14px;
// // //           font-weight: 500;
// // //         }

// // //         .collapse-btn:hover {
// // //           background: #e0e0e0 !important;
// // //         }

// // //         /* Responsive styles */
// // //         @media (max-width: 768px) {
// // //           .custom-sidebar {
// // //             position: fixed;
// // //             left: 8px;
// // //             top: 86px;
// // //             bottom: 8px;
// // //           }

// // //           .custom-sidebar .ant-layout-sider {
// // //             width: 0 !important;
// // //             min-width: 0 !important;
// // //           }

// // //           .custom-sidebar .ant-layout-sider-collapsed {
// // //             width: 0 !important;
// // //           }
// // //         }

// // //         @media (max-width: 480px) {
// // //           .custom-sidebar {
// // //             left: 4px;
// // //             top: 82px;
// // //             bottom: 4px;
// // //           }
// // //         }

// // //         /* Smooth transitions */
// // //         .custom-sidebar .ant-layout-sider {
// // //           transition: all 0.2s ease-in-out;
// // //         }

// // //         .custom-sidebar .ant-menu-item {
// // //           transition: all 0.2s ease-in-out;
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // };

// // // export default Sidebar;

// // import React, { useState, useEffect } from "react";
// // import { Layout, Menu } from "antd";
// // import {
// //   DashboardOutlined,
// //   ClockCircleOutlined,
// //   CalendarOutlined,
// //   FileTextOutlined,
// //   SettingOutlined,
// // } from "@ant-design/icons";
// // import { useRouter } from "next/router";
// // import type { MenuProps } from "antd";

// // const { Sider } = Layout;

// // const Sidebar: React.FC = () => {
// //   const router = useRouter();
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 768);
// //       if (window.innerWidth <= 768) {
// //         setCollapsed(true);
// //       }
// //     };

// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const menuItems: MenuProps["items"] = [
// //     {
// //       key: "dashboard",
// //       icon: <DashboardOutlined />,
// //       label: "Dashboard",
// //       onClick: () => router.push("/dashboard"),
// //     },
// //     {
// //       key: "attendance",
// //       icon: <ClockCircleOutlined />,
// //       label: "Attendance",
// //       onClick: () => router.push("/attendance"),
// //     },
// //     {
// //       key: "shifts",
// //       icon: <CalendarOutlined />,
// //       label: "Shifts",
// //       onClick: () => router.push("/shifts"),
// //     },
// //     {
// //       key: "reports",
// //       icon: <FileTextOutlined />,
// //       label: "Reports",
// //       onClick: () => router.push("/reports"),
// //     },
// //     {
// //       key: "settings",
// //       icon: <SettingOutlined />,
// //       label: "Settings",
// //       onClick: () => router.push("/settings"),
// //     },
// //   ];

// //   // Get the current selected key based on the route
// //   const getSelectedKey = () => {
// //     const path = router.pathname;
// //     if (path.includes("/dashboard")) return ["dashboard"];
// //     if (path.includes("/attendance")) return ["attendance"];
// //     if (path.includes("/shifts")) return ["shifts"];
// //     if (path.includes("/reports")) return ["reports"];
// //     if (path.includes("/settings")) return ["settings"];
// //     return ["dashboard"];
// //   };

// //   return (
// //     <>
// //       <div
// //         style={{
// //           position: "fixed",
// //           left: "20px",
// //           top: "106px", // Below header (16px padding + 70px header + 20px gap)
// //           bottom: "20px",
// //           zIndex: 100,
// //         }}
// //       >
// //         <Sider
// //           collapsible
// //           collapsed={collapsed}
// //           onCollapse={(value) => setCollapsed(value)}
// //           width={180}
// //           collapsedWidth={isMobile ? 0 : 70}
// //           trigger={null}
// //           style={{
// //             background: "#fff",
// //             borderRadius: "12px",
// //             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //             height: "100%",
// //             overflow: "hidden",
// //           }}
// //           className="custom-sidebar"
// //         >
// //           <Menu
// //             mode="inline"
// //             selectedKeys={getSelectedKey()}
// //             items={menuItems}
// //             style={{
// //               border: "none",
// //               paddingTop: "24px",
// //               height: "100%",
// //             }}
// //           />

// //           {/* Collapse Button */}
// //           <div
// //             onClick={() => setCollapsed(!collapsed)}
// //             style={{
// //               position: "absolute",
// //               bottom: "24px",
// //               left: "50%",
// //               transform: "translateX(-50%)",
// //               width: collapsed ? "36px" : "140px",
// //               height: "36px",
// //               background: "#f0f2f5",
// //               borderRadius: "8px",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               cursor: "pointer",
// //               fontSize: "16px",
// //               color: "#595959",
// //               transition: "all 0.2s",
// //               fontWeight: 500,
// //             }}
// //             className="collapse-btn"
// //           >
// //             {collapsed ? "»" : "«"}
// //           </div>
// //         </Sider>
// //       </div>

// //       <style jsx global>{`
// //         .custom-sidebar .ant-layout-sider-children {
// //           display: flex;
// //           flex-direction: column;
// //         }

// //         .custom-sidebar .ant-menu {
// //           flex: 1;
// //         }

// //         .custom-sidebar .ant-menu-item {
// //           height: 46px;
// //           line-height: 46px;
// //           margin: 6px 10px !important;
// //           border-radius: 8px !important;
// //           width: auto !important;
// //           transition: all 0.2s;
// //           display: flex;
// //           align-items: center;
// //         }

// //         .custom-sidebar .ant-menu-item-selected {
// //           background-color: #e6f4ff !important;
// //           color: #0066ff !important;
// //         }

// //         .custom-sidebar .ant-menu-item-selected .anticon {
// //           color: #0066ff !important;
// //         }

// //         .custom-sidebar .ant-menu-item:hover {
// //           background-color: #f5f5f5 !important;
// //         }

// //         .custom-sidebar .ant-menu-item .anticon {
// //           font-size: 18px;
// //           color: #595959;
// //         }

// //         .custom-sidebar .ant-menu-item-selected .anticon {
// //           color: #0066ff;
// //         }

// //         .custom-sidebar .ant-menu-item span {
// //           font-size: 14px;
// //           font-weight: 500;
// //         }

// //         .custom-sidebar .ant-layout-sider-collapsed .ant-menu-item {
// //           padding-left: 20px !important;
// //           padding-right: 20px !important;
// //         }

// //         .collapse-btn:hover {
// //           background: #e0e0e0 !important;
// //         }

// //         /* Responsive styles */
// //         @media (max-width: 768px) {
// //           .custom-sidebar {
// //             position: fixed;
// //             left: 8px;
// //             top: 90px;
// //             bottom: 8px;
// //           }

// //           .custom-sidebar .ant-layout-sider {
// //             width: 0 !important;
// //             min-width: 0 !important;
// //           }

// //           .custom-sidebar .ant-layout-sider-collapsed {
// //             width: 0 !important;
// //           }
// //         }

// //         @media (max-width: 480px) {
// //           .custom-sidebar {
// //             left: 4px;
// //             top: 86px;
// //             bottom: 4px;
// //           }
// //         }

// //         /* Smooth transitions */
// //         .custom-sidebar .ant-layout-sider {
// //           transition: all 0.2s ease-in-out;
// //         }

// //         .custom-sidebar .ant-menu-item {
// //           transition: all 0.2s ease-in-out;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default Sidebar;

// import React from "react";
// import { Layout, Menu, Drawer } from "antd";
// import {
//   DashboardOutlined,
//   ClockCircleOutlined,
//   CalendarOutlined,
//   FileTextOutlined,
//   SettingOutlined,
//   CloseOutlined,
// } from "@ant-design/icons";
// import { useRouter } from "next/router";
// import type { MenuProps } from "antd";

// const { Sider } = Layout;

// interface SidebarProps {
//   collapsed: boolean;
//   isMobile: boolean;
//   visible: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   collapsed,
//   isMobile,
//   visible,
//   onClose,
// }) => {
//   const router = useRouter();

//   const menuItems: MenuProps["items"] = [
//     {
//       key: "dashboard",
//       icon: <DashboardOutlined />,
//       label: "Dashboard",
//       onClick: () => {
//         router.push("/dashboard");
//         if (isMobile) onClose();
//       },
//     },
//     {
//       key: "attendance",
//       icon: <ClockCircleOutlined />,
//       label: "Attendance",
//       onClick: () => {
//         router.push("/attendance");
//         if (isMobile) onClose();
//       },
//     },
//     {
//       key: "shifts",
//       icon: <CalendarOutlined />,
//       label: "Shifts",
//       onClick: () => {
//         router.push("/shifts");
//         if (isMobile) onClose();
//       },
//     },
//     {
//       key: "reports",
//       icon: <FileTextOutlined />,
//       label: "Reports",
//       onClick: () => {
//         router.push("/reports");
//         if (isMobile) onClose();
//       },
//     },
//     {
//       key: "settings",
//       icon: <SettingOutlined />,
//       label: "Settings",
//       onClick: () => {
//         router.push("/settings");
//         if (isMobile) onClose();
//       },
//     },
//   ];

//   // Get the current selected key based on the route
//   const getSelectedKey = () => {
//     const path = router.pathname;
//     if (path.includes("/dashboard")) return ["dashboard"];
//     if (path.includes("/attendance")) return ["attendance"];
//     if (path.includes("/shifts")) return ["shifts"];
//     if (path.includes("/reports")) return ["reports"];
//     if (path.includes("/settings")) return ["settings"];
//     return ["dashboard"];
//   };

//   // Mobile drawer view
//   if (isMobile) {
//     return (
//       <>
//         <Drawer
//           placement="left"
//           onClose={onClose}
//           open={visible}
//           width={240}
//           styles={{
//             body: { padding: 0 },
//             header: {
//               borderBottom: "1px solid #f0f0f0",
//               padding: "16px 24px",
//             },
//           }}
//           title={
//             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//               <div
//                 style={{
//                   width: 36,
//                   height: 36,
//                   background: "linear-gradient(135deg, #0066FF, #00D4B1)",
//                   borderRadius: "8px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "white",
//                   fontWeight: "bold",
//                   fontSize: "16px",
//                 }}
//               >
//                 FT
//               </div>
//               <span style={{ fontSize: "18px", fontWeight: 600 }}>
//                 FlexTrack
//               </span>
//             </div>
//           }
//           closeIcon={<CloseOutlined />}
//         >
//           <Menu
//             mode="inline"
//             selectedKeys={getSelectedKey()}
//             items={menuItems}
//             style={{
//               border: "none",
//               paddingTop: "8px",
//             }}
//           />
//         </Drawer>

//         <style jsx global>{`
//           .ant-drawer .ant-menu-item {
//             height: 46px;
//             line-height: 46px;
//             margin: 4px 12px !important;
//             border-radius: 8px !important;
//           }

//           .ant-drawer .ant-menu-item-selected {
//             background-color: #e6f4ff !important;
//             color: #0066ff !important;
//           }

//           .ant-drawer .ant-menu-item-selected .anticon {
//             color: #0066ff !important;
//           }

//           .ant-drawer .ant-menu-item:hover {
//             background-color: #f5f5f5 !important;
//           }

//           .ant-drawer .ant-menu-item .anticon {
//             font-size: 18px;
//             color: #595959;
//           }

//           .ant-drawer .ant-menu-item span {
//             font-size: 14px;
//             font-weight: 500;
//           }
//         `}</style>
//       </>
//     );
//   }

//   // Desktop/Tablet sidebar view
//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           left: "20px",
//           top: "106px",
//           bottom: "20px",
//           zIndex: 100,
//         }}
//       >
//         <Sider
//           collapsed={collapsed}
//           width={180}
//           collapsedWidth={70}
//           trigger={null}
//           style={{
//             background: "#fff",
//             borderRadius: "12px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             height: "100%",
//             overflow: "hidden",
//           }}
//           className="custom-sidebar"
//         >
//           <Menu
//             mode="inline"
//             selectedKeys={getSelectedKey()}
//             items={menuItems}
//             style={{
//               border: "none",
//               paddingTop: "24px",
//               height: "calc(100% - 80px)",
//             }}
//           />
//         </Sider>
//       </div>

//       <style jsx global>{`
//         .custom-sidebar .ant-layout-sider-children {
//           display: flex;
//           flex-direction: column;
//         }

//         .custom-sidebar .ant-menu {
//           flex: 1;
//         }

//         .custom-sidebar .ant-menu-item {
//           height: 46px;
//           line-height: 46px;
//           margin: 6px 10px !important;
//           border-radius: 8px !important;
//           width: auto !important;
//           transition: all 0.2s;
//           display: flex;
//           align-items: center;
//         }

//         .custom-sidebar .ant-menu-item-selected {
//           background-color: #e6f4ff !important;
//           color: #0066ff !important;
//         }

//         .custom-sidebar .ant-menu-item-selected .anticon {
//           color: #0066ff !important;
//         }

//         .custom-sidebar .ant-menu-item:hover {
//           background-color: #f5f5f5 !important;
//         }

//         .custom-sidebar .ant-menu-item .anticon {
//           font-size: 18px;
//           color: #595959;
//         }

//         .custom-sidebar .ant-menu-item-selected .anticon {
//           color: #0066ff;
//         }

//         .custom-sidebar .ant-menu-item span {
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .custom-sidebar .ant-layout-sider-collapsed .ant-menu-item {
//           padding-left: 20px !important;
//           padding-right: 20px !important;
//         }

//         /* Tablet responsive */
//         @media (max-width: 992px) {
//           .custom-sidebar {
//             left: 12px;
//             top: 98px;
//             bottom: 12px;
//           }
//         }

//         /* Smooth transitions */
//         .custom-sidebar .ant-layout-sider {
//           transition: all 0.2s ease-in-out;
//         }

//         .custom-sidebar .ant-menu-item {
//           transition: all 0.2s ease-in-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Sidebar;
import React from "react";
import { Layout, Menu, Drawer } from "antd";
import {
  DashboardOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import type { MenuProps } from "antd";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  visible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  isMobile,
  visible,
  onClose,
}) => {
  const router = useRouter();

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        router.push("/dashboard");
        if (isMobile) onClose();
      },
    },
    {
      key: "attendance",
      icon: <ClockCircleOutlined />,
      label: "Attendance",
      onClick: () => {
        router.push("/attendance");
        if (isMobile) onClose();
      },
    },
    {
      key: "shifts",
      icon: <CalendarOutlined />,
      label: "Shifts",
      onClick: () => {
        router.push("/shifts");
        if (isMobile) onClose();
      },
    },
    {
      key: "reports",
      icon: <FileTextOutlined />,
      label: "Reports",
      onClick: () => {
        router.push("/reports");
        if (isMobile) onClose();
      },
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => {
        router.push("/settings");
        if (isMobile) onClose();
      },
    },
  ];

  // Get the current selected key based on the route
  const getSelectedKey = () => {
    const path = router.pathname;
    if (path.includes("/dashboard")) return ["dashboard"];
    if (path.includes("/attendance")) return ["attendance"];
    if (path.includes("/shifts")) return ["shifts"];
    if (path.includes("/reports")) return ["reports"];
    if (path.includes("/settings")) return ["settings"];
    return ["dashboard"];
  };

  // Mobile drawer view
  if (isMobile) {
    return (
      <>
        <Drawer
          placement="left"
          onClose={onClose}
          open={visible}
          width={240}
          styles={{
            body: { padding: 0 },
            header: {
              borderBottom: "1px solid #f0f0f0",
              padding: "16px 24px",
            },
          }}
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                FT
              </div>
              <span style={{ fontSize: "18px", fontWeight: 600 }}>
                FlexTrack
              </span>
            </div>
          }
          closeIcon={<CloseOutlined />}
        >
          <Menu
            mode="inline"
            selectedKeys={getSelectedKey()}
            items={menuItems}
            style={{
              border: "none",
              paddingTop: "8px",
            }}
          />
        </Drawer>

        <style jsx global>{`
          .ant-drawer .ant-menu-item {
            height: 46px;
            line-height: 46px;
            margin: 4px 12px !important;
            border-radius: 8px !important;
          }

          .ant-drawer .ant-menu-item-selected {
            background-color: #e6f4ff !important;
            color: #0066ff !important;
          }

          .ant-drawer .ant-menu-item-selected .anticon {
            color: #0066ff !important;
          }

          .ant-drawer .ant-menu-item:hover {
            background-color: #f5f5f5 !important;
          }

          .ant-drawer .ant-menu-item .anticon {
            font-size: 18px;
            color: #595959;
          }

          .ant-drawer .ant-menu-item span {
            font-size: 14px;
            font-weight: 500;
          }
        `}</style>
      </>
    );
  }

  // Desktop/Tablet sidebar view
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "20px",
          top: "106px",
          bottom: "20px",
          zIndex: 100,
        }}
      >
        <Sider
          collapsed={collapsed}
          width={180}
          collapsedWidth={70}
          trigger={null}
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            minHeight: "calc(100vh - 126px)",
            overflow: "hidden",
          }}
          className="custom-sidebar"
        >
          <Menu
            mode="inline"
            selectedKeys={getSelectedKey()}
            items={menuItems}
            style={{
              border: "none",
              paddingTop: "24px",
              height: "calc(100% - 80px)",
            }}
          />
        </Sider>
      </div>

      <style jsx global>{`
        .custom-sidebar .ant-layout-sider-children {
          display: flex;
          flex-direction: column;
        }

        .custom-sidebar .ant-menu {
          flex: 1;
        }

        .custom-sidebar .ant-menu-item {
          height: 46px;
          line-height: 46px;
          margin: 6px 10px !important;
          border-radius: 8px !important;
          width: auto !important;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }

        .custom-sidebar .ant-menu-item-selected {
          background-color: #e6f4ff !important;
          color: #0066ff !important;
        }

        .custom-sidebar .ant-menu-item-selected .anticon {
          color: #0066ff !important;
        }

        .custom-sidebar .ant-menu-item:hover {
          background-color: #f5f5f5 !important;
        }

        .custom-sidebar .ant-menu-item .anticon {
          font-size: 18px;
          color: #595959;
        }

        .custom-sidebar .ant-menu-item-selected .anticon {
          color: #0066ff;
        }

        .custom-sidebar .ant-menu-item span {
          font-size: 14px;
          font-weight: 500;
        }

        .custom-sidebar .ant-layout-sider-collapsed .ant-menu-item {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }

        /* Tablet responsive */
        @media (max-width: 992px) {
          .custom-sidebar {
            left: 12px;
            top: 98px;
            bottom: 12px;
          }
        }

        /* Smooth transitions */
        .custom-sidebar .ant-layout-sider {
          transition: all 0.2s ease-in-out;
        }

        .custom-sidebar .ant-menu-item {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
