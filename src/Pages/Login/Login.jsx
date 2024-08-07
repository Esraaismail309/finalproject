import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext/UserContext";

export default function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUserToken } = useContext(userContext);
  const navigate = useNavigate();

  async function handleLogin(values) {
    setIsLoading(true);
    //call api
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        if (data.data.message === "success")
          // navigate
          setError(null);
        setUserToken(data.data.token);
        localStorage.setItem("userToken", data.data.token);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        // setIsLoading(false);
      });
    setIsLoading(false);
  }

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^[a-zA-Z0-9]{6,9}$/, "password at least 6 character"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate: validateAllInputs,
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="container ">
      <div className="w-3/4 mx-auto">
        <h1 className="font-semibold text-3xl">Login Now :</h1>
        {error && (
          <div className="px-3 py-2 mt-3 text-red-600 bg-red-100">{error}</div>
        )}
        <form onSubmit={formik.handleSubmit}>
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
