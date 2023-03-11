function Button(props) {
  const { name, type = "button", onClick, className = "", children } = props;
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {name}
      {children}
    </button>
  );
}

export default Button;
