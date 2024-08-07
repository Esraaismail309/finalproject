import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // function validateAllInputs(values) {
  //   // console.log(values);
  //   // {name: 'd', email: '', password: '', rePassword: '', phone: ''}
  //   let errors = {};
  //   let nameRegex = /^[A-Z][a-z]{2,10}$/;
  //   let emailRegex =
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   let phoneRegex = /^01[0-25][0-9]{8}$/;

  //   if (values.name === "") {
  //     errors.name = "Name is required";
  //   } else if (!nameRegex.test(values.name)) {
  //     errors.name = "Name must start with capital letter";
  //   }

  //   if (values.email === "") {
  //     errors.email = "Email is required";
  //   } else if (!emailRegex.test(values.email)) {
  //     errors.email = "Email is Not Valid";
  //   }

  //   if (values.password === "") {
  //     errors.password = "Password is required";
  //   } else if (!/^[a-zA-Z0-9]{6,9}$/.test(values.password)) {
  //     errors.password = "password at least 6 character";
  //   }

  //   if (values.rePassword === "") {
  //     errors.rePassword = "rePassword is required";
  //   } else if (values.rePassword !== values.password) {
  //     errors.rePassword = "rePassword does not match password";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is required";
  //   } else if (!phoneRegex.test(values.phone)) {
  //     errors.phone = "phone is Not Valid";
  //   }
  //   return errors;
  // }

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(values) {
    setIsLoading(true);
    //call api
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        if (data.data.message === "success")
          // navigate
         
        navigate("/login");

        // setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        // setIsLoading(false);
      });
    setIsLoading(false);
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required").min(3),
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^[a-zA-Z0-9]{6,9}$/, "password at least 6 character"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "rePassword does not match password"),
    phone: Yup.string()
      .required()
      .matches(/^01[0-25][0-9]{8}$/, "phone is not a valid number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate: validateAllInputs,
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="container ">
      <div className="w-3/4 mx-auto">
        <h1 className="font-semibold text-3xl">Register Now :</h1>
        {error && (
          <div className="px-3 py-2 mt-3 text-red-600 bg-red-100">{error}</div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div class="relative my-4">
            <input
              type="text"
              id="name"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Name
            </label>
          </div>
          {formik.errors.name && formik.touched.name && (
            <div className="px-3 py-2 text-red-600 bg-red-100">
              {formik.errors.name}
            </div>
          )}

          <div class="relative my-4">
            <input
              type="email"
              id="email"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="px-3 py-2 text-red-600 bg-red-100">
              {formik.errors.email}
            </div>
          )}
          <div class="relative my-4">
            <input
              type="password"
              id="password"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="px-3 py-2 text-red-600 bg-red-100">
              {formik.errors.password}
            </div>
          )}
          <div class="relative my-4">
            <input
              type="password"
              id="rePassword"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              name="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your rePassword
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="px-3 py-2 text-red-600 bg-red-100">
              {formik.errors.rePassword}
            </div>
          )}
          <div class="relative my-4">
            <input
              type="tel"
              id="phone"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your phone
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="px-3 py-2 text-red-600 bg-red-100">
              {formik.errors.phone}
            </div>
          )}
          <button
            type="submit"
            class="text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
