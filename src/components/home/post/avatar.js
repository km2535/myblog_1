import React from "react";
import styled from "styled-components";

const Avatar = () => {
  return (
    <StyledAvatar src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png"></StyledAvatar>
  );
};

export default Avatar;

const StyledAvatar = styled.img`
  box-sizing: border-box;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
  text-align: center;
`;
