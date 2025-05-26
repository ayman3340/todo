import "./App.css";
import TodoList from "./components/Todolist";
import {createTheme , ThemeProvider} from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: [
     "Alexandria-Black"
    ],
  },
});


function App() {
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
      <TodoList></TodoList>
    </div>
    </ThemeProvider>

  );
}

export default App;
