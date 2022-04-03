import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducer/user";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.user);
  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  };
  return (
    <>
      <StyledNav>
        <div>
          <Link to="/">
            <span>MyBlog</span>
          </Link>
        </div>
        <div>
          <Link to="/register">회원가입</Link>
        </div>
        {!info && (
          <div>
            <Link to="/login">로그인</Link>
          </div>
        )}
        {info && (
          <StyledInfo>
            {info.nickname} | <button onClick={onLogout}>로그아웃</button>
          </StyledInfo>
        )}
      </StyledNav>
      <div>{children}</div>
    </>
  );
};

export default Layout;

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  max-width: 50rem;
  min-width: 18.75rem;
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;
  /* 내 선택자의 a */
  & a {
    padding-top: 0.3rem;
    text-decoration: none;
    font-size: 0.875rem;
    color: #666;
  }
  & span {
    font-size: 1.5rem;
    font-weight: 900;
    color: #4f5681;
  }
`;

const StyledInfo = styled.div`
  font-size: 0.875rem;
  color: #666;
  cursor: default;

  & button {
    border: none;
    padding-top: 0.3rem;
    font-size: 0.875rem;
    color: #666;
    background: none;
    cursor: pointer;

    :hover {
      color: #000;
    }
  }
`;
