import "../Form.css";
import FormInput from "./FormInput";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase-config";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const App = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "In should be a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user);
    } catch (error) {
      alert(error.message);
    }

    values.email === "admin@mail.com" ? navigate("/admin") : navigate("/");
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);

  console.log(values);
  return (
    <div className="app">
      <div className="background"></div>
      <form className="formForm" onSubmit={handleSubmit}>
        <h1 className="formH1">Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button className="formButton">Sign in</button>
        <button
          className="formButton"
          onClick={(event) => (window.location.href = "#/register")}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default App;
