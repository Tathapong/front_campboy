function PriceTag(props) {
  const { price } = props;
  return (
    <span className="price-tag">
      <span className="baht">THB</span>
      <span className="price">{price}</span>
    </span>
  );
}

export default PriceTag;
