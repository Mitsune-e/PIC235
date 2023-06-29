import React from "react";

export const Input = (props) => {

  return (
    <>
      <input type={props.type} className="form-control round" id={props.id} onChange={(e) => props.onChange(e.target.value)} />
    </>
  )
}