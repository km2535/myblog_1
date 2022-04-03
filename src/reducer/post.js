import produce from "immer";
import faker from "@faker-js/faker";
import shortid from "shortid";

const initialState = {
  allPosts: [
    {
      id: 1,
      User: { id: 1, nickname: "이강민" },
      content: "이강민이 최고다.",
      Comments: [
        {
          User: {
            id: shortid.generate(),
            nickname: "김혜화",
          },
          content: "맞아 넌 최고였다.",
          id: shortid.generate(),
        },
      ],
    },
  ],
  allPostsLoading: false,
  allPostsDone: false,
  allPostsError: null,
  addpostLoading: false,
  addpostDone: false,
  addpostError: null,
  removepostLoading: false,
  removepostDone: false,
  removepostError: null,
  addcommentLoading: false,
  addcommentDone: false,
  addcommentError: null,

  removecommentLoading: false,
  removecommentDone: false,
  removecommentError: null,

  updatepostLoading: false,
  updatepostDone: false,
  updatepostError: null,
};

export const LOAD_ALLPOSTS_REQUEST = "LOAD_ALLPOSTS_REQUEST";
export const LOAD_ALLPOSTS_SUCCESS = "LOAD_ALLPOSTS_SUCCESS ";
export const LOAD_ALLPOSTS_FAILURE = "LOAD_ALLPOSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export const createDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortid.generate(),
      User: {
        id: shortid.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Comments: [
        {
          User: {
            id: shortid.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
          id: shortid.generate(),
        },
      ],
    }));

const dummyPost = (data) => ({
  id: shortid.generate(),
  content: data.content,
  User: {
    id: 1,
    nickname: "이강민",
  },
  Comments: [],
});
const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data.content,
  User: {
    id: 1,
    nickname: "이강민",
  },
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_ALLPOSTS_REQUEST:
        draft.allPostsLoading = true;
        draft.allPostsDone = false;
        draft.allPostsError = null;
        break;

      case LOAD_ALLPOSTS_SUCCESS:
        draft.allPostsLoading = false;
        draft.allPostsDone = true;
        draft.allPosts = action.data.concat(draft.allPosts);
        break;

      case LOAD_ALLPOSTS_FAILURE:
        draft.allPostsLoading = false;
        draft.allPostsDone = false;
        draft.allPostsError = null;
        break;

      case ADD_POST_REQUEST:
        draft.addpostLoading = true;
        draft.addpostDone = false;
        draft.addpostError = null;
        break;

      case ADD_POST_SUCCESS:
        draft.addpostLoading = false;
        draft.addpostDone = true;
        draft.allPosts.unshift(dummyPost(action.data));
        break;

      case ADD_POST_FAILURE:
        draft.addpostLoading = false;
        draft.addpostDone = false;
        draft.addpostError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.removepostLoading = true;
        draft.removepostDone = false;
        draft.removepostError = null;
        break;

      case REMOVE_POST_SUCCESS:
        draft.removepostLoading = false;
        draft.removepostDone = true;
        draft.allPosts = draft.allPosts.filter((v) => v.id !== action.data);
        break;

      case REMOVE_POST_FAILURE:
        draft.removepostLoading = false;
        draft.removepostDone = false;
        draft.removepostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addcommentLoading = true;
        draft.addcommentDone = false;
        draft.addcommentError = null;
        break;

      case ADD_COMMENT_SUCCESS:
        draft.addcommentLoading = false;
        draft.addcommentDone = true;

        const post = draft.allPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(dummyComment(action.data.content));

        break;

      case ADD_COMMENT_FAILURE:
        draft.addcommentLoading = false;
        draft.addcommentDone = false;
        draft.addcommentError = action.error;
        break;

      case REMOVE_COMMENT_REQUEST:
        draft.removecommentLoading = true;
        draft.removecommentDone = false;
        draft.removecommentError = null;
        break;

      case REMOVE_COMMENT_SUCCESS:
        console.log(action.data.commentId);
        console.log(action.data.PostId);
        draft.removecommentLoading = false;
        draft.removecommentDone = true;
        draft.allPosts.find((v) => v.id === action.data.PostId).Comments =
          draft.allPosts
            .find((v) => v.id === action.data.PostId)
            .Comments.filter((v) => v.id !== action.data.commentId);
        break;

      case REMOVE_COMMENT_FAILURE:
        draft.removecommentLoading = false;
        draft.removecommentDone = false;
        draft.removecommentError = action.error;
        break;

      case UPDATE_POST_REQUEST:
        draft.updatepostDone = false;
        draft.updatepostError = null;
        break;

      case UPDATE_POST_SUCCESS:
        draft.updatepostDone = true;
        draft.allPosts.find((v) => v.id === action.data.PostId).content =
          action.data.content;
        break;

      case UPDATE_POST_FAILURE:
        draft.updatepostDone = false;
        draft.updatepostError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
