import { forwardRef } from "react";

const InputText = forwardRef(function InputText(props, ref) {
  const { placeholder = "Enter input", type = "text", setValue } = props;
  return (
    <input
      ref={ref}
      className="input-text"
      placeholder={placeholder}
      type={type}
      onChange={(ev) => setValue(ev.target.value)}
    ></input>
  );
});

export default InputText;
