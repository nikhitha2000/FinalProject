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
    const handleLoginClick = () =>{
        window.location.href = '/';
    }
    const ToggleEyeIcon = () =>{
        setShowPassword(!ShowPassword);
        setCurrentEyeIcon(ShowPassword ? icon4 : icon5 );
    }
  return (
    <div className={styles.container}>
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
        <input type = 'email' placeholder='Email' className={styles.inputField} />
        </div>
        <div className={styles.inputGroup}>
        <img src={icon3} alt= "Password" className={styles.icon} />
        <input type='password' placeholder='Password' className={styles.inputField} />
        <img src = {CurrentEyeIcon} alt="Show Password" className={styles.eyeIcon} onClick={ToggleEyeIcon}/>
        </div>
        <button className={styles.LoginButton}>Login</button>
        <div className={styles.loginLink}>
        <p>Have no account yet?</p>
            <button className={styles.registerButton} onClick={handleLoginClick}>Register</button>
          </div>
        </div>
    </div>
  )
}

export default Login