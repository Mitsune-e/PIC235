import { useState } from "react";
import { Input, Label } from "../../components";

export function UseInput(title, id, type = "text") {
  const [Value, setValue] = useState("");


  const component = (<>
    <div className="mb-3 form-input">
      {<Label htmlFor={id} title={title} />}
      {<Input type={type} id={id} onChange={setValue} />}
    </div>
  </>)
  return [
    Value,
    component
  ]
}
