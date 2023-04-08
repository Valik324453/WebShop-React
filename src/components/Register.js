import Alert from "react-bootstrap/Alert";

import { useState, useEffect } from "react";
import "../Form.css";
import FormInput from "./FormInput";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";

import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [loggedUser, setLoggedUser] = useState({});

  const [showSccessRegisterMessage, setShowSccessRegisterMessage] =
    useState(false);
  const [showRegisterError, setShowRegisterError] = useState(false);
  const [errorRegisterMessage, setErrorRegisterMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = res.user;
      console.log(user.uid);
      await addDoc(collection(db, "users"), {
        authId: user.uid,
        Name: values.username,
        Email: values.email,
        Address: values.address,
        Phone: values.phone,
        Cart: Object.fromEntries(new Map()),
      });
    } catch (err) {
      console.error(err);
      if (showSccessRegisterMessage) {
        setShowSccessRegisterMessage(false);
      }
      setErrorRegisterMessage(err.message);
      setShowRegisterError(true);
      return;
    }
    setShowRegisterError(false);
    setShowSccessRegisterMessage(true);

    setTimeout(navigate("/"), 1000);
  };

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
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "In should be a valid email address",
      label: "Email",
      required: true,
    },
    // {
    //   id: 3,
    //   name: "birthday",
    //   type: "date",
    //   placeholder: "Birthday",
    //   label: "Birthday",
    // },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "Address",

      label: "Address",
      required: true,
    },
    {
      id: 4,
      name: "phone",
      type: "tel",
      placeholder: "Phone format: 068-68-68-68",
      errorMessage: "Invalid mobile phone number",
      label: "Phone",
      pattern: "[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "ConfirmPassword",
      errorMessage: "Passwords don't match!",
      label: "ConfirmPassword",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values.username);
  return (
    <div className="app">
      {showRegisterError ? (
        <Alert key="danger" variant="danger">
          {errorRegisterMessage}
        </Alert>
      ) : (
        <p></p>
      )}

      {showSccessRegisterMessage ? (
        <Alert key="success" variant="success">
          you have been successfully registered!
        </Alert>
      ) : (
        <></>
      )}
      <form className="formForm" onSubmit={register}>
        <h1 className="formH1">Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button className="formButton">Submit</button>
      </form>
    </div>
  );
};

export default App;
