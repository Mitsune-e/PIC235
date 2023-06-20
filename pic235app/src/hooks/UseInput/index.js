import { useState } from "react";
import { Input, Label } from "../../components";


function UseInput(title, id, type) {
  const [Value, setValue] = useState("");


  const component = (<>
    <div className="mb-3">
      {<Label htmlFor={id} title={title} />}
      {<Input type={type} id={id} onChange={setValue} />}
    </div>
  </>)
  return [
    Value,
    component
  ]
}

export default UseInput;