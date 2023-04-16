import { useRef, useState } from "react";

function Carousel(props) {
  const { list } = props;

  const imageEl = useRef([]);
  const dotEl = useRef([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function clickNextImage() {
    if (currentImageIndex < list.length - 1) setCurrentImageIndex((prev) => prev + 1);
    else setCurrentImageIndex(0);
  }

  function clickPreviousImage() {
    if (currentImageIndex > 0) setCurrentImageIndex((prev) => prev - 1);
    else setCurrentImageIndex(list.length - 1);
  }

  function clickSelectImage(index) {
    setCurrentImageIndex(index);
  }

  return (
    <div className="carousel-group">
      {list.map((item, index) => (
        <img
          src={item}
          className={`image ${currentImageIndex === index ? "d-block" : "d-none"}`}
          key={index}
          alt={"image" + index}
          ref={(el) => (imageEl.current[index] = el)}
        />
      ))}
      <div className="prev-next-group">
        <i class="fa-solid fa-angle-left icon" onClick={clickPreviousImage}></i>
        <i class="fa-solid fa-angle-right icon" onClick={clickNextImage}></i>
      </div>

      <div className="dot-group">
        {list.map((item, index) => {
          return (
            <i
              class={`fa-solid fa-circle icon ${currentImageIndex === index ? "active" : ""}`}
              onClick={() => clickSelectImage(index)}
              ref={(el) => (dotEl.current[index] = el)}
              key={index}
            ></i>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
