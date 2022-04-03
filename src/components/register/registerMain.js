import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useInput } from "../../hook/useInput";
import { REGISTER_DONE_REQUEST, REGISTER_REQUEST } from "../../reducer/user";

const RegisterMain = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [email, onChangeUserEmail] = useInput("");
  const [name, onChangeUserName] = useInput("");
  const [password, onChangeUserPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState(false);
  const { registerDone, registerError } = useSelector((state) => state.user);
  const onChangeConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
      setPasswordCheckMessage(event.target.value !== password);
    },
    [password]
  );
  useEffect(() => {
    if (registerError) {
      alert(registerError);
    }
  }, [registerError]);
  useEffect(() => {
    if (registerDone) {
      navigator("/", { replace: true });
      dispatch({
        type: REGISTER_DONE_REQUEST,
      });
    }
  }, [registerDone]);
  const onRegister = useCallback((e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setPasswordCheckMessage(true);
    }
    dispatch({
      type: REGISTER_REQUEST,
      data: {
        email,
        name,
        password,
      },
    });
  }, []);

  return (
    <>
      <RegisterForm onSubmit={onRegister}>
        <h1>회원가입</h1>
        <div>
          <label htmlFor="user-id"></label>
          <input
            name="user-email"
            type="text"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={onChangeUserEmail}
            autoComplete="off"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="user-name"></label>
          <input
            name="user-name"
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={onChangeUserName}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="user-password"></label>
          <input
            name="user-password"
            type="text"
            placeholder="비밀번호을 입력해주세요"
            value={password}
            onChange={onChangeUserPassword}
            autoComplete="off"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="user-confirm-password"></label>
          <input
            name="user-confirm-password"
            type="text"
            placeholder="비밀번호를 한번더 입력해주세요"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            autoComplete="off"
            required
          ></input>
        </div>
        {passwordCheckMessage && (
          <CheckMessage>비밀번호가 일치하지 않습니다.</CheckMessage>
        )}
        <button type="submit">가입하기</button>
        <Link to="/">돌아가기 </Link>
      </RegisterForm>
    </>
  );
};

export default RegisterMain;

const RegisterForm = styled.form`
  box-sizing: border-box;
  max-width: 50rem;
  min-height: 18.75rem;
  width: 100%;
  margin: 0 auto;
  text-align: center;

  & h1 {
    color: #4f5681;
  }
  & input {
    box-sizing: border-box;
    width: 50%;
    margin: 0.1rem 0;
    padding: 0.35rem;
    border: 1px solid #ddd;
    font-size: 0.875rem;
    color: #666;
  }

  & input::placeholder {
    font-size: 0.875rem;
    color: #ccc;
  }
  & input:focus {
    outline: none;
    border: 1px solid #7784cc;
    box-shadow: 0 0 0 0.1rem rgb(59 65 99/ 25%);
  }
  & button {
    box-sizing: border-box;
    width: 50%;
    margin: 0.2rem;
    padding: 0.3rem 0;
    border: none;
    font-size: 0.875rem;
    color: #fff;
    background: #4f5681;
    cursor: pointer;
  }

  & button:hover {
    background: #3b4163;
  }
  & a {
    display: block;
    font-size: 0.875rem;
    color: #666;
  }
`;

const CheckMessage = styled.p`
  width: 50%;
  margin: 0 auto;
  padding: 0;
  font-size: 0.875rem;
  color: red;
  text-align: left;
`;
