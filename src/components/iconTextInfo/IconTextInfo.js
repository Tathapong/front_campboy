function IconTextInfo(props) {
  const { iconImage, title = "Title", subTitle1 = "", subTitle2 = "" } = props;

  return (
    <div className="icon-text-info-group">
      <div className="icon-group">
        <img src={iconImage} alt="icon-text-info" className="image w-100 h-100" />
      </div>
      <div className="info-group">
        <div className="title">{title}</div>
        <div className="sub-title1" dangerouslySetInnerHTML={{ __html: subTitle1 }}></div>
        <div className="sub-title2" dangerouslySetInnerHTML={{ __html: subTitle2 }}></div>
      </div>
    </div>
  );
}

export default IconTextInfo;
