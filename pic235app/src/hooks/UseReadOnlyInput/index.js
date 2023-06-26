import React, { useEffect, useState } from "react";
import { ReadOnlyInput, Label } from "../../components";

export function UseReadOnlyInput(title, id, type = "text",) {
  const [Value, setValue] = useState("-");

  const component = (
    <>
      <div className="mb-3 form-input">
        {<Label htmlFor={id} title={title} />}
        {<ReadOnlyInput type={type} id={id} value={Value} />}
      </div>
    </>
  )
  return [
    setValue,
    component
  ]
}