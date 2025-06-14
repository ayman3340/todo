import "./App.css";
import * as React from "react";
import TodoList from "./components/Todolist";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import {TodosContext} from "./contexts/TodosContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria-Black"],
  },
});


function App() {
  const InitialTodos = [
    {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: "كتب عن اي شيء تريد ان تقراء فيه",
      isCompleted: false,
    },
  ];

  let [todos, setTodos] = React.useState(InitialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "green",
          direction: "rtl",
          flexDirection: "column",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList></TodoList>
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
