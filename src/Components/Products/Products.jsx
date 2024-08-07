import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((data) => setProducts(data.data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold">Popular Products</h2>
      <div className="row mt-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/productdetails/${product._id}`}
              key={product._id}
              className="w-full md:w-1/3 lg:w-1/6 p-4 "
            >
              <ProductItem product={product} />
            </Link>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
