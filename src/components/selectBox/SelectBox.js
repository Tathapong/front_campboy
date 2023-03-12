function SelectBox(props) {
  const { list = [] } = props;
  return (
    <select className="select-box-group" defaultValue="">
      <option value="" disabled className="option">
        Select
      </option>

      {list.map((item, index) => (
        <option value={item.value} key={index} className="option">
          {item.title}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
