import React, { Component } from "react";
import './styles.css';

import { withRouter } from 'react-router-dom';
import { FaUser, FaBell, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaHome, FaAddressCard, FaUsers } from 'react-icons/fa';

import history from '../../util/history'

function Sidebar(props) {
  const { role } = props;
  const user_menus = [
    {
      name: "Home",
      to: "/",
      exact: true,
      icon: () =><FaHome className="icons" />

    },
    {
      name: "Thông tin cá nhân",
      to: "/profile",
      exact: true,
      icon: () =><FaUser className="icons" />
    },
    {
      name: "Thông báo",
      to: "/notifications",
      exact: true,
      icon: () =><FaBell className="icons" />
    },
    {
      name: "Tài khoản DSParking",
      to: "/account",
      exact: true,
      icon: () =><FaAddressCard className="icons" />
    },
    {
      name: "Thống kê",
      to: "/statistic",
      exact: true,
      icon: () =><FaChartArea className="icons" />
    },
    {
      name: "Hỗ trợ",
      to: "/support",
      exact: true,
      icon: () =><FaQuestionCircle className="icons" />
    },
    {
      name: "Đánh giá",
      to: "/evaluation",
      exact: true,
      icon: () =><FaPenSquare className="icons" />
    },
    {
      name: "Cài đặt",
      to: "/setting",
      exact: true,
      icon: () =><FaCog className="icons" />
    },
  ];

  const admin_menus = [
    {
      name: "Line Vào",
      to: "/admin",
      exact: true,
      icon: () =><FaHome className="icons" />

    },
    {
      name: "Line ra",
      to: "/admin/lineout",
      exact: true,
      icon: () =><FaHome className="icons" />
    },
    {
      name: "Thông tin cá nhân",
      to: "/admin/profile",
      exact: true,
      icon: () =><FaUser className="icons" />
    },
    {
      name: "Thống kê",
      to: "/admin/statistic",
      exact: true,
      icon: () =><FaChartArea className="icons" />
    },
    {
      name: "Quản lí người dùng",
      to: "/admin/management",
      exact: true,
      icon: () =><FaUsers className="icons" />
    },
  ];

  const sidebarMap = () => {
    if(role === "user"){
      return user_menus.map((item, index) => {
        return (
          <li className={`nav-item ${history.location.pathname === user_menus[index].to && 'nav-item-active'}`} key={index} onClick={() => history.push(user_menus[index].to)}>
            <a href="#" className="nav-link">
              {item.icon()}
              <span className="link-text">{item.name}</span>
            </a>
          </li>
        );
      });
    }
    else{
      return admin_menus.map((item, index) => {
        return (
          <li className={`nav-item ${history.location.pathname === admin_menus[index].to && 'nav-item-active'}`} key={index} onClick={() => history.push(admin_menus[index].to)}>
            <a href="#" className="nav-link">
              {item.icon()}
              <span className="link-text">{item.name}</span>
            </a>
          </li>
        );
      });
    }
    }

  return (
    <div className="navbar">
      <ul className="navbar-nav">
        {sidebarMap()}
      </ul>
    </div>
  );
}

export default withRouter(Sidebar);