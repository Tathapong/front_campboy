function OptionDropdown(props) {
  const { children, title, onClick } = props;
  return (
    <li onClick={onClick} className="option-dropdown">
      {children}
      <span>{title}</span>
    </li>
  );
}

export default OptionDropdown;
