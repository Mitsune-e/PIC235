import React from "react";
import "./index.css"

export const DropBrox = (props) => {

  return (
    <>
      {
        props.options.length === 0 && <>
          <div className="alert alert-danger">{"Não tem opções para renderizar o drop box"}</div>
        </>
      }

      {
        props.options.length > 0 && <>
          <select className="round" id={props.id} value={props.value} onChange={(e) => props.onChange(e.target.value)}>
            <option key={-1} value={null}>{"Escolha uma opção"}</option>
            {props.options.map((option, index) => {
              return (
                <option
                  value={option[props.valueName]}
                  key={index}
                >{option[props.titleName]}</option>
              )
            })}
          </select>
        </>
      }
    </>
  )
}