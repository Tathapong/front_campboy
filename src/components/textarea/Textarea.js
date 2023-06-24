import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(props, ref) {
  const { placeholder, value, onChange, errorText, maxLength, maxLine = 5 } = props;

  function onChangeTextarea(ev) {
    const lines = ev.target.value.split("\n");
    if (lines.length <= maxLine) onChange(ev);
  }

  return (
    <div className="textarea-group">
      <textarea
        className="textarea"
        placeholder={placeholder}
        value={value}
        onChange={onChangeTextarea}
        ref={ref}
        maxLength={maxLength}
      />
      <div className="small-text-group">
        {maxLength ? (
          <small className="text-count">
            {value.length}/{maxLength} Characters
          </small>
        ) : (
          ""
        )}
        {errorText ? <small className="text-error">{errorText}</small> : ""}
      </div>
    </div>
  );
});

export default Textarea;
