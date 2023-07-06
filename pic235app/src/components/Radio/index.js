import React from "react";

export const Radio = (props) => {

  return (
    <>
      <li className={"list-group-item rounded-pill mb-2 darker-border"}>
        <input
          className={"form-check-input me-1"}
          type="radio"
          name={props.name}
          value={props.value}
          checked={`${props.value}` === `${props.checkedValue}`}
          onChange={(e) => props.onChange(e.target.value)}
          id={props.id}
          disabled={props.disabled}
        />

        <label className="form-check-label" htmlFor={props.id}>{props.title}</label>
      </li>
    </>
  );
}