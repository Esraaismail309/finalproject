import React from "react";
import styles from "./Cart.module.css";
import { Helmet } from "react-helmet";

export default function Cart(props) {
  console.log(props);

  return (
    <div>
      <Helmet>
        <title>cart</title>
      </Helmet>
    </div>
  );
}
