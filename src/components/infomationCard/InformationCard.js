function InformationCard(props) {
  const { title = "Title", children, className = "" } = props;

  return (
    <div className={`information-card-group ${className}`}>
      <div className="header">{title}</div>
      <div className="body">{children}</div>
    </div>
  );
}

export default InformationCard;
