// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "../Components/Register.module.css";
import robo from "../assets/Group.png";
import icon1 from "../assets/Frame 1036.png";
import icon2 from "../assets/icon.png";
import icon3 from "../assets/lock.png";
import icon4 from "../assets/view.png";
import icon5 from "../assets/Vector.png";
import { useNavigate } from "react-router-dom";
function Register() {
  const [ShowPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [CurrentEyeIcon, setCurrentEyeIcon] = useState(icon4);
  const [currentConfirmEyeIcon, setCurrentConfirmEyeIcon] = useState(icon4);
  const [formErrors, setFormErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleLoginClick = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };
  const ToggleEyeIcon = () => {
    setShowPassword(!ShowPassword);
    setCurrentEyeIcon(ShowPassword ? icon4 : icon5);
  };
  const ToggleConfirmEyeIcon = () => {
    setShowConfirmPassword(!showConfirmPassword);
    setCurrentConfirmEyeIcon(showConfirmPassword ? icon4 : icon5);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "*Name is required";
    if (!formData.email) errors.email = "*Email is required";
    if (!formData.confirmPassword) {
      errors.confirmPassword = "*Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "*Passwords do not match";
    }
    if (!formData.password) {
      errors.password = "*Password is required";
    } else if (formData.password.length < 8 || !/\d/.test(formData.password)) {
      errors.password =
        " *Password must be at least 8 characters long and contain at least one number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        console.log("Registration response:", data);

        if (response.ok) {
          setToastMessage("Registration successful!");
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setFormErrors({});
          setCurrentEyeIcon(icon4);
          setCurrentConfirmEyeIcon(icon4);
          navigate("/dashboard");
        } else {
          if (data.error) {
            setToastMessage(data.error);
          } else if (Array.isArray(data.errors)) {
            setToastMessage(data.errors.join(", "));
          } else {
            setToastMessage("Registration failed.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setToastMessage("An error occurred while registering.");
      }
    } else {
      setToastMessage("Please correct the errors in the form");
    }
    setTimeout(() => {
      setToastMessage("");
    }, 5000);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.left}>
        <div className={styles.roboContainer}>
          <div className={styles.backgroundCircle}></div>
          <img className={styles.robo} src={robo} alt="Robot Illustration" />
        </div>
        <p className={styles.para}>Welcome aboard my friend</p>
        <span className={styles.span}>
          just a couple of clicks and we start
        </span>
      </div>
      <div className={styles.Right}>
        <h3>Register</h3>
        <div className={styles.inputGroup}>
          <img src={icon1} alt="Name Icon" className={styles.icon} />
          <input
            type="text"
            placeholder="Name"
            name="name"
            className={styles.inputField}
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && (
            <span className={styles.error}>{formErrors.name}</span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <img src={icon2} alt="Email" className={styles.icon} />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={styles.inputField}
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <span className={styles.error}>{formErrors.email}</span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <img src={icon3} alt="Confirm Password" className={styles.icon} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            className={styles.inputField}
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <img
            src={currentConfirmEyeIcon}
            alt="Show Password"
            className={styles.eyeIcon}
            onClick={ToggleConfirmEyeIcon}
          />
          {formErrors.confirmPassword && (
            <span className={styles.error}>{formErrors.confirmPassword}</span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <img src={icon3} alt="Password" className={styles.icon} />
          <input
            type={ShowPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className={styles.inputField}
            value={formData.password}
            onChange={handleInputChange}
          />
          <img
            src={CurrentEyeIcon}
            alt="Show Password"
            className={styles.eyeIcon}
            onClick={ToggleEyeIcon}
          />
          {formErrors.password && (
            <span className={styles.error}>{formErrors.password}</span>
          )}
        </div>
        <button type="submit" className={styles.registerButton}>
          Register
        </button>
        <div className={styles.loginLink}>
          <p>Have an account?</p>
          <button className={styles.LoginButton} onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
      {toastMessage && (
        <div className={styles.toastMessage}>{toastMessage}</div>
      )}
    </form>
  );
}

export default Register;
