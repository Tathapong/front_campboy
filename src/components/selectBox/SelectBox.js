import "./selectBox.css";

function SelectBox(props) {
  const { list = [] } = props;
  return (
    <select className="select-box-group" defaultValue="">
      <option value="" disabled>
        Select
      </option>

      {list.map((item, index) => (
        <option value={item.value} key={index}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
