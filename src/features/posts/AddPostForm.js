import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  //here we have got useState() because you are just using redux doesn't mean we dont use useState
  //in some components bcoz this is a temporary state it's just a controlled form input for title and content and so we dont really need to send those to the global state they're just for this component so we only want to send  things to the global state that other components would possibly use throughout the app and eventually we could expand this app where other components would be using what're sending to the global state

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  console.log("userId:", userId);

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        //here we dont want to duplicate this type of logic in every component that post to our global state, so we can handle this in the slice with a prepare callback(It can generate unique id's, format the data, return the object with the payload and that's kind of what we are doingt here!)
        // so It will simplify our component  and will handle everything in the slice.
        // postAdded({
        //   id: nanoid(),
        //   title,
        //   content
        // })
        // everything will be handled inside prepare callback in the slice and the benefit here is that our compoenet once again doesn't even have to know the structure of the state at all.all of this is now is handled inside a slice, here we just need to send the raw data
        postAdded(title, content, userId)
      );
      setTitle("");
      setContent("");
    }
  };

  return (
    <>
      <h2>Add Post Form</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </>
  );
};

export default AddPostForm;
