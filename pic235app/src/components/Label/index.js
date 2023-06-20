import React from "react";

export const Label = (props) => {

  return (
    <>
      <label htmlFor={props.htmlFor} className="form-label text-navy">{props.title}</label>
    </>
  )
}