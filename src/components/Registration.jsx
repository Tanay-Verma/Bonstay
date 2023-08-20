import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function Registration({ url }) {
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    nameErr: "",
    emailErr: "",
    phoneNoErr: "",
    passwordErr: "",
  });

  const [mandatory, setMandatory] = useState(false);
  const [valid, setValid] = useState(false);
  const [hover, setHover] = useState({
    emailErr: false,
    passwordErr: false,
    phoneNoErr: false,
    nameErr: false,
  });

  const messages = {
    NAME_ERR: "Please provide a valid name",
    PHONE_ERR: "Please provide a valid phone number",
    EMAIL_ERR: "Please provide a valid email ID",
    PASSWORD_ERR:
      "Password length should be minimum 6 maximum 16 it should include a special character, a number, a small case alphabet and a capital alphabet",
    POST_ERR: "Something went wrong",
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (
        validationErrors.addressErr ||
        validationErrors.emailErr ||
        validationErrors.nameErr ||
        validationErrors.passwordErr
      ) {
        setValid(false);
      } else {
        setValid(true);
      }
      if (Object.values(userData).includes("")) {
        setMandatory(true);
      } else {
        setMandatory(false);
      }
    }
  }, [userData, validationErrors]);

  const validation = (name, value) => {
    const validRegex = {
      name: /^[a-zA-Z]+$/,
      phoneNo: /^[1-9]{1}[0-9]{9}$/,
      email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    };

    switch (name) {
      case "name":
        validRegex.name.test(value)
          ? setValidationErrors({ ...validationErrors, nameErr: "" })
          : setValidationErrors({
              ...validationErrors,
              nameErr: messages.NAME_ERR,
            });
        break;
      case "phoneNo":
        validRegex.phoneNo.test(value)
          ? setValidationErrors({ ...validationErrors, phoneNoErr: "" })
          : setValidationErrors({
              ...validationErrors,
              phoneNoErr: messages.PHONE_ERR,
            });
        break;
      case "email":
        validRegex.email.test(value)
          ? setValidationErrors({ ...validationErrors, emailErr: "" })
          : setValidationErrors({
              ...validationErrors,
              emailErr: messages.EMAIL_ERR,
            });
        break;
      case "password":
        validRegex.password.test(value)
          ? setValidationErrors({ ...validationErrors, passwordErr: "" })
          : setValidationErrors({
              ...validationErrors,
              passwordErr: messages.PASSWORD_ERR,
            });
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    validation(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(url, { ...userData })
      .then((res) => {
        alert(`User ${res.data.name} registered with ID: ${res.data.id}`);
        navigate("/login");
      })
      .catch(() => {
        alert(messages.POST_ERR);
      });
  };

  return (
    <>
      <div className="grid grid-cols-2 w-1/2 rounded-md  gap-10 p-4 bg-slate-200">
        <div className="relative">
          <img
            className="rounded-md h-full w-full object-cover"
            src="/regPic.jpg"
          />
          <div className="font-Lobster text-5xl absolute bottom-3 flex justify-center w-full text-white">
            Welcome to BonStay
          </div>
        </div>
        <form noValidate onSubmit={(e) => handleSubmit(e)}>
          <div className="grid grid-rows-6 gap-4 h-full">
            <div className="grid grid-rows-2 gap-1">
              <label htmlFor="name" className="text-lg font-bold">
                Name
              </label>
              <div className="grid grid-cols-10 gap-1 relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="rounded-lg p-1 col-span-9"
                />
                {validationErrors.nameErr && (
                  <div
                    className="flex justify-center align-middle hover:cursor-pointer"
                    onMouseEnter={() => setHover({ ...hover, nameErr: true })}
                    onMouseLeave={() => setHover({ ...hover, nameErr: false })}
                  >
                    <FontAwesomeIcon
                      icon={faExclamation}
                      beatFade
                      className="text-red-500 text-3xl justify-self-center self-center"
                    />

                    {hover.nameErr && (
                      <div className="text-red-400 absolute bg-orange-100 right-1/2 top-1/2 text-justify p-2 rounded-lg">
                        {validationErrors.nameErr}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-rows-2 gap-1">
              <label htmlFor="address" className="text-lg font-bold">
                Address
              </label>
              <div className="grid grid-cols-10 gap-1 relative">
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  placeholder="Adress"
                  className="rounded-lg p-1 col-span-9"
                />
              </div>
            </div>
            <div className="grid grid-rows-2 gap-1">
              <label htmlFor="phoneNo" className="text-lg font-bold">
                Phone Number
              </label>
              <div className="grid grid-cols-10 gap-1 relative">
                <input
                  id="phoneNo"
                  type="text"
                  name="phoneNo"
                  value={userData.phoneNo}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="rounded-lg p-1 col-span-9"
                />
                {validationErrors.phoneNoErr && (
                  <div
                    className="flex justify-center align-middle hover:cursor-pointer"
                    onMouseEnter={() =>
                      setHover({ ...hover, phoneNoErr: true })
                    }
                    onMouseLeave={() =>
                      setHover({ ...hover, phoneNoErr: false })
                    }
                  >
                    <FontAwesomeIcon
                      icon={faExclamation}
                      beatFade
                      className="text-red-500 text-3xl justify-self-center self-center"
                    />

                    {hover.phoneNoErr && (
                      <div className="text-red-400 absolute bg-orange-100 right-1/2 top-1/2 text-justify p-2 rounded-lg">
                        {validationErrors.phoneNoErr}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-rows-2 gap-1">
              <label htmlFor="email" className="text-lg font-bold">
                Email ID
              </label>
              <div className="grid grid-cols-10 gap-1 relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Email ID"
                  className="rounded-lg p-1 col-span-9"
                />
                {validationErrors.emailErr && (
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
                      <div className="text-red-400 absolute bg-orange-100 right-1/2 top-1/2 text-justify p-2 rounded-lg">
                        {validationErrors.emailErr}
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
                  id="password"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="rounded-lg p-1 col-span-9"
                />
                {validationErrors.passwordErr && (
                  <div
                    className="flex justify-center align-middle hover:cursor-pointer"
                    onMouseEnter={() =>
                      setHover({ ...hover, passwordErr: true })
                    }
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
                      <div className="text-red-400 absolute bg-orange-100 right-1/2 top-1/2 text-justify p-2 rounded-lg">
                        {validationErrors.passwordErr}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-rows-2 gap-1">
              <div className="grid grid-cols-10">
                <button
                  type="submit"
                  className="rounded-lg bg-sky-400 text-sky-50 text-lg font-bold disabled:bg-slate-500 col-span-9"
                  disabled={!(valid && !mandatory)}
                >
                  Register
                </button>
              </div>
              <div className="self-center">
                <Link to="/login">
                  <span className="text-blue-500 hover:cursor-pointer">
                    Login
                  </span>{" "}
                </Link>
                with your existing account
              </div>
            </div>
            {mandatory && (
              <div className="text-red-400">All the fields are mandatory</div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
