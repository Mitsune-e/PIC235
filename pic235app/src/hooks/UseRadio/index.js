import { useState } from "react";
import { Radio } from "../../components";

export function UseRadio(data, title, name, titleName, valueName) {
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
                checkedValue={Value}
                name={name}
                id={`${name}-${i + 1}`}
                value={`${x[valueName]}`}
                onChange={setValue}
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
