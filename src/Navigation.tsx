import React from "react";
import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const Navigation: React.FC = () => {
  return (
    <Menu
      mode="horizontal"
      className="fixed top-0 left-0 w-full z-50 flex justify-center"
    >
      <Menu.Item key="home">
        <a className="p-2" href="/">
          Home
        </a>
      </Menu.Item>
      <Menu.Item key="about">
        <a className="p-2" href="/about">
          About
        </a>
      </Menu.Item>
      <SubMenu key="services" title="Services" icon={<DownOutlined />}>
        <Menu.Item key="service1">
          <a className="p-2" href="/services/service1">
            Service 1
          </a>
        </Menu.Item>
        <Menu.Item key="service2">
          <a className="p-2" href="/services/service2">
            Service 2
          </a>
        </Menu.Item>
        <Menu.Item key="service3">
          <a className="p-2" href="/services/service3">
            Service 3
          </a>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="applications">
        <a className="p-2" href="/applications">
          Applications
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
