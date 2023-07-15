import "./App.css";
import PostList from "./react-query/PostList";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <div>
      <h1>Posts</h1>
      <TodoForm />
      <TodoList />
      {/* <PostList /> */}
    </div>
  );
}

export default App;
