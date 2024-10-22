// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import styles from '../Components/Login.module.css';
import robo from '../assets/Group.png';
import icon2 from '../assets/icon.png';
import icon3 from '../assets/lock.png';
import icon4 from '../assets/view.png';
import icon5 from '../assets/Vector.png';
function Login() {
    const[ShowPassword,setShowPassword] = useState(false);
    const[CurrentEyeIcon, setCurrentEyeIcon] = useState(icon4);
    const [formErrors, setFormErrors] = useState({});
    const [toastMessage, setToastMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    const handleLoginClick = (e) =>{
        e.preventDefault();
        window.location.href = '/';
    }
    const ToggleEyeIcon = () =>{
        setShowPassword(!ShowPassword);
        setCurrentEyeIcon(ShowPassword ? icon4 : icon5 );
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.email = '*Email is required';
        if (!formData.password) {
            errors.password = '*Password is required';
          } else if (formData.password.length < 8 || !/\d/.test(formData.password)) {
            errors.password = ' *Password must be at least 8 characters long and contain at least one number';
          }
          setFormErrors(errors);
          return Object.keys(errors).length === 0;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log('Form submitted', formData);
          setToastMessage('Login successful!');
          setFormData({
            email: '',
            password: '',
          });
          setFormErrors({});
          setCurrentEyeIcon(icon4);
        } else {
          setToastMessage('Please correct the errors in the form');
        }
        setTimeout(() => {
          setToastMessage('');
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
            <span className={styles.span}>just a couple of clicks and we start</span>
        </div>
        <div className={styles.Right}>
        <h3>Login</h3>
        <div className={styles.inputGroup}>
        <img src = {icon2} alt="Email" className={styles.icon} />
        <input type = 'email' placeholder='Email'name="email" className={styles.inputField} onChange={handleInputChange} />
        {formErrors.email && (
            <span className={styles.error}>{formErrors.email}</span>
          )}
        </div>
        <div className={styles.inputGroup}>
        <img src={icon3} alt= "Password" className={styles.icon} />
        <input type='password' placeholder='Password'name='password' className={styles.inputField} onChange={handleInputChange} />
        <img src = {CurrentEyeIcon} alt="Show Password" className={styles.eyeIcon} onClick={ToggleEyeIcon}/>
        {formErrors.password && (
            <span className={styles.error}>{formErrors.password}</span>
          )}
        </div>
        <button className={styles.LoginButton}>Login</button>
        <div className={styles.loginLink}>
        <p>Have no account yet?</p>
            <button className={styles.registerButton} onClick={handleLoginClick}>Register</button>
          </div>
        </div>
        {toastMessage && (
        <div className={styles.toastMessage}>
          {toastMessage}
        </div>
      )}
    </form>
  )
}

export default Login