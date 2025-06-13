import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
  };

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      setLoginError("");
      setRegistrationError("");

      if (pageType === "login") {
        const response = await fetch(
          "http://localhost:3000/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setLoginError(errorData.message || "Invalid email or password");
          return;
        }

        const loggedIn = await response.json();
        if (loggedIn.token && loggedIn.user) {
          dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
          onSubmitProps.resetForm();
          navigate("/home");
        } else {
          setLoginError("Invalid email or password");
        }
      }

      if (pageType === "register") {
        const response = await fetch(
          "http://localhost:3000/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.message?.toLowerCase().includes("email")) {
            setRegistrationError(errorData.message);
          } else {
            setRegistrationError(
              "Registration failed. Please try again."
            );
          }
          return;
        }

        const savedUser = await response.json();
        if (savedUser) {
          onSubmitProps.resetForm();
          setPageType("login");
        }
      }
    } catch (err) {
      console.error(err);
      if (pageType === "login")
        setLoginError("Something went wrong. Please try again.");
      if (pageType === "register")
        setRegistrationError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-wide">
          Welcome to Connectify
        </h1>
        <p className="text-lg text-white mt-2">
          Connect with people and share your experiences.
        </p>
      </div>

      <div
        className={
          `w-full ${
            pageType === "login" ? "max-w-md" : "max-w-3xl"
          } p-8 bg-white rounded-2xl shadow-xl`
        }
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          {pageType === "login" ? "Login" : "Create Account"}
        </h2>

        <Formik
          initialValues={
            pageType === "login" ? initialValuesLogin : initialValuesRegister
          }
          validationSchema={
            pageType === "login" ? loginSchema : registerSchema
          }
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {pageType === "register" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "First Name", name: "firstName" },
                    { label: "Last Name", name: "lastName" },
                    { label: "Location", name: "location" },
                    { label: "Occupation", name: "occupation" },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col">
                      <label
                        htmlFor={field.name}
                        className="mb-1 text-sm font-medium text-gray-700"
                      >
                        {field.label}
                      </label>
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[field.name]}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      />
                      {touched[field.name] && errors[field.name] && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors[field.name]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {[
                { label: "Email", type: "email", name: "email" },
                { label: "Password", type: "password", name: "password" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label
                    htmlFor={field.name}
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field.name]}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                  {touched[field.name] && errors[field.name] && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}

              {(registrationError || loginError) && (
                <div className="text-center text-red-600 font-semibold">
                  {registrationError || loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
              >
                {pageType === "login" ? "LOGIN" : "REGISTER"}
              </button>

              <p
                onClick={() => {
                  setPageType(pageType === "login" ? "register" : "login");
                  resetForm();
                  setLoginError("");
                  setRegistrationError("");
                }}
                className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:text-purple-700 transition"
              >
                {pageType === "login"
                  ? "Don’t have an account? Sign up"
                  : "Already have an account? Log in"}
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Form;
