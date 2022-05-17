import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "leraning redux toolkit",
    content: "i have heard good things about redux",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  },
  {
    id: 2,
    title: "Slices..",
    content: "The more i say slice, the more i want pizza",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  }
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      //prepare callback
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        };
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
});

//when we write this post added function then createSlice automatically  genearates an action creator function with the same name, when we export our actions, we're actually exporting this action creator functions, that is automatically created

//state.push
//RTK uses immer.js under the hood and that allows you to write your js like this, where you would be  mutating the state, but it is not mutating the state. immer.js creates new state underneath.This only works inside of the create slice anywhere else in your app you still need to use the proper way of not mutating the state.However inside of the createslice you can use state.push and you can direcytlyset the state in other ways as well and immer.js will handle taht so it makes it easier to handle inside of here.

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
