import { useId } from "react";

function CheckBox(props) {
  const id = useId();
  const { label = "label", value, children, setValue } = props;

  const handleSelectCheckbox = (ev) => {
    if (ev.target.checked) {
      setValue((prev) => [...prev, ev.target.value]);
    } else
      setValue((prev) => {
        const set = new Set(prev);
        set.delete(ev.target.value);
        return Array.from(set);
      });
  };

  return (
    <div className="check-box-group">
      <input type="checkbox" id={id} value={value} className="input" onChange={handleSelectCheckbox} />
      <label htmlFor={id} className="label">
        {label}
        {children}
      </label>
    </div>
  );
}

export default CheckBox;
