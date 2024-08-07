import React from "react";
import styles from "./MainSlider.module.css";
import img1 from "./../../assets/grocery-banner-2.jpeg";
import img2 from "./../../assets/blog-img-2.jpeg";
import img3 from "./../../assets/grocery-banner.png";
import img4 from "./../../assets/slider-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className="row mt-4">
      <div className="w-3/4 bg-red-200">
        <Slider {...settings}>
          <img src={img4} alt="" className="h-[400px]" />
          <img src={img1} alt="" className="h-[400px]" />
          <img src={img3} alt="" className="h-[400px]" />
          <img src={img2} alt="" className="h-[400px]" />
        </Slider>
      </div>
      <div className="w-1/4 bg-lime-200">
        <img src={img3} alt="" className="h-[200px]" />
        <img src={img2} alt="" className="h-[200px]" />
      </div>
    </div>
  );
}
