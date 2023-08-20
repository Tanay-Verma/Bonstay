import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Login({ url, setUserId }) {
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const [valid, setValid] = useState(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [mandatory, setMandatory] = useState({
    email: false,
    password: false,
  });

  const [validPassword, setValidPassword] = useState(false);

  const [hover, setHover] = useState({
    emailErr: false,
    passwordErr: false,
  });

  const messages = {
    EMAIL_REQ: "Email is required",
    PASSWORD_REQ: "Password is required",
    PASSWORD_VALID: "Password length should be between 6 and 16",
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (!mandatory.email && !mandatory.password && validPassword) {
        setValid(true);
      } else {
        setValid(false);
      }
    }
  }, [mandatory, validPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        value === ""
          ? setMandatory({ ...mandatory, [name]: true })
          : setMandatory({ ...mandatory, [name]: false });
        break;
      case "password":
        if (value === "") {
          setPasswordErrorMessage(messages.PASSWORD_REQ);
        } else if (value.length < 6 || value.length > 16) {
          setPasswordErrorMessage(messages.PASSWORD_VALID);
        } else {
          setPasswordErrorMessage("");
        }
        value === ""
          ? setMandatory({ ...mandatory, [name]: true })
          : setMandatory({ ...mandatory, [name]: false });

        value.length >= 6 && value.length <= 16
          ? setValidPassword(true)
          : setValidPassword(false);
        break;
      default:
        break;
    }

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${url}?email=${userData.email}`)
      .then((res) => {
        let data = res.data;

        if (data.length !== 0 && data[0].password === userData.password) {
          navigate("/home");
          setUserId(data[0].id);
        } else {
          alert("Username or password is incorrect");
        }
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };
  return (
    <>
      <div className="grid grid-rows-[10%, 90%] w-1/4 rounded-md p-4 gap-10 mx-auto bg-slate-200">
        <h1 className="text-center font-Lobster text-4xl p-4">
          BonStay with Us
        </h1>
        <form
          noValidate
          className="grid grid-rows-4 gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-rows-2 gap-1">
            <label htmlFor="email" className="text-lg font-bold">
              Email
            </label>
            <div className="grid grid-cols-10 gap-1 relative">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="rounded-lg p-1 col-span-9"
              />
              {mandatory.email && (
                <div
                  className="flex justify-center align-middle hover:cursor-pointer"
                  onMouseEnter={() => setHover({ ...hover, emailErr: true })}
                  onMouseLeave={() => setHover({ ...hover, emailErr: false })}
                >
                  <FontAwesomeIcon
                    icon={faExclamation}
                    beatFade
                    className="text-red-500 text-3xl justify-self-center self-center"
                  />

                  {hover.emailErr && (
                    <div className="text-red-400 absolute bg-orange-100 left-0 top-1/2 text-justify p-2 rounded-lg">
                      {messages.EMAIL_REQ}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-rows-2 gap-1">
            <label htmlFor="password" className="text-lg font-bold">
              Password
            </label>
            <div className="grid grid-cols-10 gap-1 relative">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="rounded-lg p-1 col-span-9"
              />
              {passwordErrorMessage && (
                <div
                  className="flex justify-center align-middle hover:cursor-pointer"
                  onMouseEnter={() => setHover({ ...hover, passwordErr: true })}
                  onMouseLeave={() =>
                    setHover({ ...hover, passwordErr: false })
                  }
                >
                  <FontAwesomeIcon
                    icon={faExclamation}
                    beatFade
                    className="text-red-500 text-3xl justify-self-center self-center"
                  />

                  {hover.passwordErr && (
                    <div className="text-red-400 absolute bg-orange-100 left-0 top-1/2 text-justify p-2 rounded-lg">
                      {passwordErrorMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center p-3">
            <button
              type="submit"
              className="rounded-lg bg-sky-400 text-sky-50 text-lg font-bold disabled:bg-slate-500 w-1/2"
              disabled={!valid}
            >
              Login
            </button>
          </div>
          <div className="self-center">
            <Link to="/">
              <span className="text-blue-500 hover:cursor-pointer">
                Sign Up
              </span>
            </Link>{" "}
            to create a new account
          </div>
        </form>
      </div>
    </>
  );
}
