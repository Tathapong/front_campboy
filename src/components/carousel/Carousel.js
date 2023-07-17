import { useRef, useState, memo } from "react";

function Carousel(props) {
  const { images } = props;

  const imageEl = useRef([]);
  const dotEl = useRef([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handleOnClickNextImage() {
    if (currentImageIndex < images.length - 1) setCurrentImageIndex((prev) => prev + 1);
    else setCurrentImageIndex(0);
  }

  function handleOnClickPreviousImage() {
    if (currentImageIndex > 0) setCurrentImageIndex((prev) => prev - 1);
    else setCurrentImageIndex(images.length - 1);
  }

  function handleOnClickSelectImage(index) {
    setCurrentImageIndex(index);
  }

  return (
    <div className="carousel-group">
      {images.map((item, index) => (
        <img
          key={item.id}
          src={item.src}
          className={`image ${currentImageIndex === index ? "d-block" : "d-none"}`}
          alt={`camp-${item.id}`}
          ref={(el) => (imageEl.current[index] = el)}
        />
      ))}
      <div className="prev-next-group">
        <i class="fa-solid fa-angle-left icon" onClick={handleOnClickPreviousImage}></i>
        <i class="fa-solid fa-angle-right icon" onClick={handleOnClickNextImage}></i>
      </div>

      <div className="dot-group">
        {images.map((item, index) => {
          return (
            <i
              class={`fa-solid fa-circle icon ${currentImageIndex === index ? "active" : ""}`}
              onClick={() => handleOnClickSelectImage(index)}
              ref={(el) => (dotEl.current[index] = el)}
              key={index}
            ></i>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Carousel);
