import "./App.css";
import PostList from "./react-query/PostList";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <div>
      {/* <TodoList /> */}
      <h1>Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
