// // // ===== Layout/MainLayout.tsx =====
// // import React from "react";
// // import { Layout } from "antd";
// // import Header from "./Header";
// // import Sidebar from "./Sidebar";

// // const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
// //   <Layout style={{ minHeight: "100vh" }}>
// //     <Sidebar />
// //     <Layout>
// //       <Header />
// //       <Layout.Content
// //         style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
// //       >
// //         {children}
// //       </Layout.Content>
// //     </Layout>
// //   </Layout>
// // );
// // export default MainLayout;

// import React, { useState, useEffect } from "react";
// import { Layout } from "antd";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

// const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [sidebarVisible, setSidebarVisible] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);

//       // Auto-collapse sidebar on tablet
//       if (window.innerWidth < 992 && window.innerWidth >= 768) {
//         setCollapsed(true);
//       } else if (window.innerWidth >= 992) {
//         setCollapsed(false);
//       }

//       // Hide mobile sidebar when resizing to desktop
//       if (window.innerWidth >= 768) {
//         setSidebarVisible(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setSidebarVisible(!sidebarVisible);
//     } else {
//       setCollapsed(!collapsed);
//     }
//   };

//   const closeMobileSidebar = () => {
//     if (isMobile) {
//       setSidebarVisible(false);
//     }
//   };

//   // Calculate content margin based on sidebar state
//   const getContentMargin = () => {
//     if (isMobile) {
//       return "0";
//     }
//     // Desktop: account for sidebar width + gaps
//     const sidebarWidth = collapsed ? 70 : 180;
//     const leftGap = 20; // Left padding
//     const rightGap = 20; // Gap between sidebar and content
//     return `0 20px 0 ${sidebarWidth + leftGap + rightGap}px`;
//   };

//   return (
//     <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       {/* Mobile Overlay */}
//       {isMobile && sidebarVisible && (
//         <div
//           onClick={closeMobileSidebar}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.45)",
//             zIndex: 999,
//             transition: "opacity 0.3s",
//           }}
//         />
//       )}

//       {/* Sidebar */}
//       <Sidebar
//         collapsed={collapsed}
//         isMobile={isMobile}
//         visible={sidebarVisible}
//         onClose={closeMobileSidebar}
//       />

//       <Layout style={{ background: "transparent" }}>
//         {/* Header */}
//         <Header onMenuClick={toggleSidebar} isMobile={isMobile} />

//         {/* Content */}
//         <Layout.Content
//           style={{
//             margin: getContentMargin(),
//             marginTop: isMobile ? "8px" : "0",
//             padding: 0,
//             transition: "margin 0.2s ease-in-out",
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: isMobile ? "16px" : "24px",
//               borderRadius: "12px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               minHeight: "calc(100vh - 106px - 40px)", // viewport - header - margins
//             }}
//           >
//             {children}
//           </div>
//         </Layout.Content>

//         {/* Footer spacing */}
//         <div style={{ height: "20px" }} />
//       </Layout>

//       {/* Global responsive styles */}
//       <style jsx global>{`
//         /* Smooth transitions for all layout changes */
//         * {
//           transition-property: margin, padding, width;
//           transition-duration: 0.2s;
//           transition-timing-function: ease-in-out;
//         }

//         /* Desktop styles */
//         @media (min-width: 992px) {
//           .ant-layout-content > div {
//             min-height: calc(100vh - 106px - 40px);
//           }
//         }

//         /* Tablet styles */
//         @media (max-width: 992px) and (min-width: 768px) {
//           .ant-layout-content {
//             margin-left: ${collapsed ? "110px" : "220px"} !important;
//           }

//           .ant-layout-content > div {
//             min-height: calc(100vh - 98px - 32px);
//           }
//         }

//         /* Mobile styles */
//         @media (max-width: 768px) {
//           .ant-layout-content {
//             margin: 8px !important;
//           }

//           .ant-layout-content > div {
//             padding: 16px !important;
//             min-height: calc(100vh - 84px - 24px);
//           }
//         }

//         /* Small mobile styles */
//         @media (max-width: 480px) {
//           .ant-layout-content > div {
//             padding: 12px !important;
//             border-radius: 8px !important;
//           }
//         }

//         /* Prevent layout shift during transitions */
//         .ant-layout {
//           overflow-x: hidden;
//         }

//         /* Scrollbar styling */
//         ::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: #f0f2f5;
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: #bfbfbf;
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: #8c8c8c;
//         }

//         /* Ensure content is always scrollable if needed */
//         .ant-layout-content {
//           overflow-y: auto;
//           overflow-x: hidden;
//         }

//         /* Fix for mobile landscape */
//         @media (max-height: 600px) and (orientation: landscape) {
//           .ant-layout-content > div {
//             min-height: auto;
//             padding: 12px !important;
//           }
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default MainLayout;

import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto-collapse sidebar on tablet
      if (window.innerWidth < 992 && window.innerWidth >= 768) {
        setCollapsed(true);
      } else if (window.innerWidth >= 992) {
        setCollapsed(false);
      }

      // Hide mobile sidebar when resizing to desktop
      if (window.innerWidth >= 768) {
        setSidebarVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setSidebarVisible(false);
    }
  };

  // Calculate content margin based on sidebar state
  const getContentMargin = () => {
    if (isMobile) {
      return "0";
    }
    // Desktop: account for sidebar width + gaps
    const sidebarWidth = collapsed ? 70 : 180;
    const leftGap = 20; // Left padding
    const rightGap = 20; // Gap between sidebar and content
    return `0 20px 0 ${sidebarWidth + leftGap + rightGap}px`;
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        position: "relative",
      }}
    >
      {/* Mobile Overlay */}
      {isMobile && sidebarVisible && (
        <div
          onClick={closeMobileSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 999,
            transition: "opacity 0.3s",
          }}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        isMobile={isMobile}
        visible={sidebarVisible}
        onClose={closeMobileSidebar}
      />

      <Layout style={{ background: "transparent" }}>
        {/* Header */}
        <Header onMenuClick={toggleSidebar} isMobile={isMobile} />

        {/* Content */}
        <Layout.Content
          style={{
            margin: getContentMargin(),
            marginTop: isMobile ? "8px" : "0",
            padding: 0,
            transition: "margin 0.2s ease-in-out",
          }}
        >
          <div
            style={{
              // background: "#f0f2f5",
              padding: isMobile ? "16px" : "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "calc(100vh - 106px - 40px)", // viewport - header - margins
            }}
          >
            {children}
          </div>
        </Layout.Content>

        {/* Footer spacing */}
        <div style={{ height: "20px" }} />
      </Layout>

      {/* Global responsive styles */}
      <style jsx global>{`
        /* Smooth transitions for all layout changes */
        * {
          transition-property: margin, padding, width;
          transition-duration: 0.2s;
          transition-timing-function: ease-in-out;
        }

        /* Desktop styles */
        @media (min-width: 992px) {
          .ant-layout-content > div {
            min-height: calc(100vh - 106px - 40px);
          }
        }

        /* Tablet styles */
        @media (max-width: 992px) and (min-width: 768px) {
          .ant-layout-content {
            margin-left: ${collapsed ? "110px" : "220px"} !important;
          }

          .ant-layout-content > div {
            min-height: calc(100vh - 98px - 32px);
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .ant-layout-content {
            margin: 8px !important;
          }

          .ant-layout-content > div {
            padding: 16px !important;
            min-height: calc(100vh - 84px - 24px);
          }
        }

        /* Small mobile styles */
        @media (max-width: 480px) {
          .ant-layout-content > div {
            padding: 12px !important;
            border-radius: 8px !important;
          }
        }

        /* Prevent layout shift during transitions */
        .ant-layout {
          overflow-x: hidden;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f0f2f5;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #bfbfbf;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #8c8c8c;
        }

        /* Ensure content is always scrollable if needed */
        .ant-layout-content {
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Fix for mobile landscape */
        @media (max-height: 600px) and (orientation: landscape) {
          .ant-layout-content > div {
            min-height: auto;
            padding: 12px !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default MainLayout;
