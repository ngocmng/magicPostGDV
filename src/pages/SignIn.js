import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "../database/firebase";
//import "./SignIn.css";
import { InputAdornment, TextField } from "@mui/material";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";

function SignIn({ transfer }) {
  useEffect(() => {
    signOut(fireAuth);
  }, []);
  const [input, setInput] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState({ state: false, message: "" });
  const [pwError, setPwError] = useState({ state: false, message: "" });

  const handleInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSignIn = () => {
    setEmailError({ state: false, message: "" });
    setPwError({ state: false, message: "" });

    if (!input.email.length) {
      setEmailError({ state: true, message: "Vui lòng nhập email" });
      return;
    }

    if (!input.password.length) {
      setPwError({ state: true, message: "Vui lòng nhập mật khẩu" });
      return;
    }

    const signIn = async ({ email, password }) => {
      try {
        await signInWithEmailAndPassword(fireAuth, email, password);
        transfer();
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            setEmailError({ state: true, message: "Email không tồn tại" });
            break;
          case "auth/wrong-password":
            setPwError({ state: true, message: "Mật khẩu không đúng" });
            break;
          default:
            alert(`${error.code}\n${error.message}`);
        }
      }
    };
    signIn(input);
  };
  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <div className="input-group1">
        <TextField
          required
          name="email"
          label="Email"
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  zIndex: 10,
                }}
              >
                <MdPermIdentity size={24} color="var(--title-color)" />
              </InputAdornment>
            ),
          }}
          onChange={handleInput}
          error={emailError.state}
          helperText={emailError.message}
        />
      </div>
      <div className="input-group1">
        <TextField
          type="password"
          name="password"
          label="Mật khẩu"
          required
          InputProps={{
            classes: {
              input: "MuiInputBase-input",
            },
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  zIndex: 10,
                }}
              >
                <RiLockPasswordFill size={24} color="var(--title-color)" />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            classes: {
              root: "MuiInputLabel-root",
              shrink: "MuiInputLabel-shrink",
            },
          }}
          onChange={handleInput}
          error={pwError.state}
          helperText={pwError.message}
        />
      </div>
      <button onClick={handleSignIn}>Đăng nhập</button>
    </div>
  );
}
export default SignIn;