import React from "react";
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SideBarIcon = (
  props

) => {
  console.log(props)
  return (
    <>
      <FontAwesomeIcon icon={props.children} className="sidebaricon text-navy" />
    </>
  )
}