function IconTextInfo(props) {
  const { iconImage, title = "Title", sub = "" } = props;

  return (
    <div className="icon-text-info-group">
      <div className="icon-group">
        <img src={iconImage} alt="icon-text-info" className="image w-100 h-100" />
      </div>
      <div className="d-flex flex-column info-group">
        <div className="fs-14 fw-bold title">{title}</div>
        <div className="fs-12 sub-title" dangerouslySetInnerHTML={{ __html: sub }}></div>
      </div>
    </div>
  );
}

export default IconTextInfo;
