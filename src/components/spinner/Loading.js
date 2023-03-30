import { ColorRing } from "react-loader-spinner";

function Loading() {
  return (
    <div className="loading-group">
      <ColorRing height="80" width="80" colors={["#fff", "#fff", "#fff", "#fff", "#fff"]} wrapperClass="spinner" />
    </div>
  );
}

export default Loading;
