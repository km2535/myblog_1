import React, { useEffect } from "react";
import styled from "styled-components";
import Post from "./post/post";
import PostForm from "./post/postForm";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_ALLPOSTS_REQUEST } from "../../reducer/post";

const HomeMain = () => {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.post);
  const { info } = useSelector((state) => state.user);

  useEffect(() => {
    if (!info) {
      dispatch({
        type: LOAD_ALLPOSTS_REQUEST,
      });
    }
  }, []);

  return (
    <StyledWrap>
      {info && <PostForm />}
      {allPosts && allPosts.map((post) => <Post key={post.id} post={post} />)}
    </StyledWrap>
  );
};

export default HomeMain;

const StyledWrap = styled.div`
  box-sizing: border-box;
  max-width: 50rem;
  min-width: 18.75rem;
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;
