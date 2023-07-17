function SelectBox(props) {
  const { list = [], setValue, selected, errorText } = props;
  const initialValue = selected ? selected : "";

  return (
    <select
      className={`select-box-group ${errorText ? "select-box-error" : ""}`}
      value={initialValue}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <option value="" className="option">
        Select
      </option>

      {list.map((item) => (
        <option key={item.id} value={item.value} className="option">
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
