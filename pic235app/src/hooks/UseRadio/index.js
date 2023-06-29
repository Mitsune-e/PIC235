import { useState } from "react";
import { Radio } from "../../components";

export function UseRadio(data, title, name, titleName, valueName, selectValue = null) {
  const [Value, setValue] = useState("");

  const component = (
    <>
      <div>
        <label className="form-label text-navy">{title}</label>
        <ul className="list-group">
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
