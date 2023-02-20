function Button(props) {
  const { name, type = "" } = props;

  return <button className={`authButton ${type}`}>{name}</button>;
}

export default Button;
