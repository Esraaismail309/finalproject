import React, { useEffect, useState } from "react";
import styles from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((data) => setCategories(data.data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className=" my-8">
      <h2 className="font-bold mt-2">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="h-[250px]">
            <img src={category.image} className="h-full" alt="" />
            <h2 className="font-bold mt-2">{category.name}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}
