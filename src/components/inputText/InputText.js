import { forwardRef } from "react";

const InputText = forwardRef(function InputText(props, ref) {
  const { placeholder = "Enter input", type = "text", onChange, className = "", errorText } = props;
  return (
    <>
      <input
        ref={ref}
        className={`input-text ${errorText ? "input-error" : ""} ${className}`}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      ></input>
      {errorText ? <small className="text-error">{errorText}</small> : ""}
    </>
  );
});

export default InputText;
