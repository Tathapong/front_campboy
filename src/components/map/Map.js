import { useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useNavigate } from "react-router-dom";

function Map(props) {
  const { campList, zoom = 7 } = props;

  const navigate = useNavigate();
  const mapEl = useRef();

  const locations = campList.map((item) => item.location);

  const center = locations.reduce(
    (acc, item, index, arr) => {
      acc.lat += item.lat / arr.length;
      acc.lng += item.lng / arr.length;
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  const loader = new Loader({
    apiKey: "AIzaSyBgaGvtOcxZLBz4suF7E97mo5brbc586BA",
    version: "weekly"
  });

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(mapEl.current, {
        center: center,
        zoom: +zoom
      });

      campList.map((item) => {
        const marker = new google.maps.Marker({
          position: item.location,
          map
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div style="font-size:14px">${item.camp}</div>`
        });

        marker.addListener("mouseover", () => infowindow.open({ anchor: marker, map }));
        marker.addListener("mouseout", () => infowindow.close());
        marker.addListener("click", () => navigate("/camp/" + item.id));
      });
    });
  }, []);

  return <div id="map" ref={mapEl}></div>;
}

export default Map;
