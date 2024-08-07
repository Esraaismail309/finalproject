import React from "react";
import styles from "./Loader.module.css";


export default function Loader() {
  return <div className=" flex justify-center w-full h-[100vh] items-center">
    <span className={styles.loader}></span>
  </div>
}
