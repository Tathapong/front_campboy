function OptionDropdown(props) {
  const { children, title, onClick, className } = props;
  return (
    <li onClick={onClick} className={`option-dropdown ${className}`}>
      {children}
      <span>{title}</span>
    </li>
  );
}

export default OptionDropdown;
