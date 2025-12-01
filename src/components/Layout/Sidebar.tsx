import React from "react";
import { Layout, Menu, Drawer } from "antd";
import {
  DashboardOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  CloseOutlined,
  UserOutlined,
  AppstoreOutlined,
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
      icon: <AppstoreOutlined />,
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
      icon: (
        <SettingOutlined
          style={{
            marginLeft: "7px",
          }}
        />
      ),
      label: "Settings",
      children: [
        {
          key: "profile",
          label: "Profile",
          icon: <UserOutlined />,
          onClick: () => {
            router.push("/settings");
            if (isMobile) onClose();
          },
        },
      ],
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
    if (path.includes("/settings/account")) return ["account"];
    if (path === "/settings") return ["profile"];
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
            defaultOpenKeys={["settings"]}
            items={menuItems}
            style={{
              border: "none",
              paddingTop: "8px",
            }}
          />
        </Drawer>

        <style jsx global>{`
          /* Mobile Drawer Styles */
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

          /* Desktop/Tablet Sidebar Styles */
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

          /* Fix Settings submenu alignment */
          .custom-sidebar .ant-menu-submenu {
            height: 46px;
            line-height: 46px;
            margin: 6px 10px !important;
            border-radius: 8px !important;
          }

          .custom-sidebar .ant-menu-submenu-title {
            height: 46px !important;
            line-height: 46px !important;
            margin: 0 !important;
            padding-left: 16px !important;
            border-radius: 8px !important;
          }

          .custom-sidebar .ant-menu-submenu-title:hover {
            background-color: #f5f5f5 !important;
          }

          .custom-sidebar .ant-menu-submenu-title .anticon {
            font-size: 18px;
            color: #595959;
          }

          /* Submenu Items (Profile, Account) */
          .custom-sidebar .ant-menu-sub {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
          }

          .custom-sidebar .ant-menu-sub .ant-menu-item {
            height: 40px !important;
            line-height: 40px !important;
            padding-left: 48px !important;
            border-radius: 6px !important;
            margin: 2px 10px !important;
            transition: 0.2s;
          }

          .custom-sidebar .ant-menu-sub .ant-menu-item:hover {
            background: #f5f5f5 !important;
          }

          .custom-sidebar .ant-menu-sub .ant-menu-item-selected {
            background-color: #e6f4ff !important;
            color: #0066ff !important;
          }

          .custom-sidebar .ant-menu-sub .ant-menu-item .anticon {
            color: #595959 !important;
          }

          .custom-sidebar .ant-menu-sub .ant-menu-item-selected .anticon {
            color: #0066ff !important;
          }

          /* Collapsed Sidebar Styles */
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
