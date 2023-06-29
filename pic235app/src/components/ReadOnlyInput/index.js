import React from "react";

export const ReadOnlyInput = (props) => {

  return (
    <>
      <input type={props.type} className="form-control round" value={props.value} id={props.id} />
    </>
  )
}