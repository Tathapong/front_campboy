import "./selectBox.css";

function SelectBox(props) {
  // list = [{value,title}]
  const { list = [] } = props;
  return (
    <select className="select-box-group">
      <option value="" disabled selected>
        Select
      </option>

      {list.map((item) => (
        <option value={item.value}>{item.title}</option>
      ))}
    </select>
  );
}

export default SelectBox;
