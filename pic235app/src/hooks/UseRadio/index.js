import { useState } from "react";
import { Radio } from "../../components";
import "./index.css"

export function UseRadio(data, title, name, titleName, valueName, selectValue = null, inline = false) {
  const [Value, setValue] = useState("");

  const component = (
    <>
      <div className={`${inline ? "radio-container-inline" : ""}`}>
        <label className="form-label text-navy">{title}</label>
        <ul className={`list-group ${inline ? "radio-inline" : ""}`}>
          {data.map((x, i) => {
            return (
              <Radio
                key={i}
                title={x[titleName]}
                checkedValue={selectValue === null ? Value : `${selectValue}`}
                name={name}
                id={`${name}-${i + 1}`}
                value={`${x[valueName]}`}
                onChange={setValue}
                disabled={selectValue !== null}
              />
            )
          })}
        </ul>
      </div>
    </>
  );

  return [
    Value,
    component
  ]
}
