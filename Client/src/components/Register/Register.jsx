import React, { useState } from "react";
import { registerUser } from "../../API/Auth";
import styles from "./Register.module.css";
import passwordIcon from "../../assets/passwordIcon.png";
import Container from "../Container/Container";

const Register = ({ showRegister, setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Fields can't be empty");
      return;
    }

    try {
      const response = await registerUser({ ...formData });
      alert(response.message);
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <Container isOpen={showRegister} setIsOpen={setShowRegister}>
        <h1 className={styles.formHeader}>Register to SwipTory</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              className={styles.input}
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div className={styles.passwordContainer}>
            <label>Password</label>
            <input
              className={styles.passwordInput}
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <img
              onClick={() => setShowPassword(!showPassword)}
              className={styles.passwordIcon}
              src={passwordIcon}
              alt="password icon"
            />
          </div>
          {showError && <div className={styles.error}>{errorMessage}</div>}
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.button}>
              Register
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Register;
