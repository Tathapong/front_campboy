import "./priceTag.css";

function PriceTag(props) {
  const { price } = props;
  return (
    <span className="price-tag">
      <span>THB</span>
      <span>{price}</span>
    </span>
  );
}

export default PriceTag;
