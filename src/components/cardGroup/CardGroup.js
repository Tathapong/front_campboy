function CardGroup(props) {
  const { className, children, header = "Header" } = props;
  return (
    <div className={`card-group  ${className}`}>
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default CardGroup;
