import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { id } = useParams();
  const [details, setDetails] = useState({});
  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => setDetails(data.data.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getProductDetails();
  }, []);

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
    <div className="container">
      <Helmet>
       
        <title>{details.title}</title>
      </Helmet>
      <div className="row items-center">
        <div className="w-1/4 bg-red-200">
          <Slider {...settings}>
            {details?.images?.map((image, i) => (
              <img
                src={image}
                className="w-full "
                alt={details.title}
                key={i}
              />
            ))}
          </Slider>
        </div>
        <div className="w-3/4  p-4">
          <h2 className="font-bold text-2xl">{details.title}</h2>
          <small className="my-2">{details.description}</small>
          <p>{details?.category?.name}</p>
          <div className="flex justify-between my-2">
            <p>{details.price} EGP</p>
            <div>
              <i className="fa-solid fa-star text-yellow-500"></i>
              {details.ratingsAverage}
            </div>
          </div>
          <button className="bg-green-500 rounded w-full py-2">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
