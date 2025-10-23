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
      key: "overview",
      icon: <CalendarOutlined />,
      label: "Overview",
      onClick: () => {
        router.push("/overview");
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
    if (path.includes("/overview")) return ["overview"];

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
            minHeight: "100vh",
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
