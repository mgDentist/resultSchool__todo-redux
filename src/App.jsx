import GetTodos from "./components/todo-list";
import style from "./App.module.css";

const App = () => {
  return (
    <div className={style.app}>
      <header className={style.appHeader}>
      <GetTodos></GetTodos>
      </header>
    </div>
  );
}

export default App;
