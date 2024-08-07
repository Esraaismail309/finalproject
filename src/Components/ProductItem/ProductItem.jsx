import React from "react";
import styles from "./ProductItem.module.css";

export default function ProductItem({ product }) {
  return (
    <div className="inner">
      <img src={product.imageCover} className="w-full" alt="" />
      <div className="px-2 mt-2">
        <p>{product.category.name}</p>
        <h2 className="font-bold my-2">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h2>
        <div className="flex justify-between">
          <p>{product.price} EGP</p>
          <div>
            <i className="fa-solid fa-star text-yellow-400"></i>
            {product.ratingsAverage}
          </div>
        </div>
      </div>
    </div>
  );
}
