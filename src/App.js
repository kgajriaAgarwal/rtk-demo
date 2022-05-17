import "./styles.css";
import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

export default function App() {
  return (
    <div className="App">
      {/* <Counter /> */}
      <AddPostForm />
      <PostsList />
    </div>
  );
}
