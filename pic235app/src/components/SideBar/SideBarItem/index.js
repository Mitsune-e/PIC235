import React from "react";
import { Link } from "react-router-dom";
import { SideBarIcon } from "../SideBarIcon";

export const SideBarItem = (
  props
) => {
  return (
    <>
      <li className="sidebar-item align-items-center" >
        <SideBarIcon>{props.icon}</SideBarIcon>
        <Link className="sidebar-link" to={`/${props.path}`}>{props.title}</Link>
      </li>
    </>
  )
} 