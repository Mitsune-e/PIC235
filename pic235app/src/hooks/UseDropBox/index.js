import { useState } from "react";
import { DropBrox, Label } from "../../components";


export function UseDropBox(options, title, id, valueName, titleName) {
  const [Value, setValue] = useState("");

  const component = (
    <>
      <div className="mb-3 form-input">
        <Label htmlFor={id} title={title} />
        <DropBrox
          id={id}
          value={Value}
          onChange={setValue}
          options={options}
          valueName={valueName}
          titleName={titleName}
        />
      </div>
    </>
  );

  return [
    Value,
    component
  ]
}