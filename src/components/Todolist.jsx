import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { TodosContext } from "../contexts/TodosContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, SetTitleInput] = React.useState("");
  const [detailsInput, SetDetailsInput] = React.useState("");
  const [completeState, SetCompleteState] = React.useState("All");

  let filterAllCompleteData = todos;
  let filterCompleteData = todos.filter((r) => {
    return r.isCompleted;
  });

  let filterNOtCompleteData = todos.filter((r) => {
    return !r.isCompleted;
  });

  let currentComplete = todos;
  if (completeState == "Complete") {
    currentComplete = filterCompleteData;
  } else if (completeState == "NotComplete") {
    currentComplete = filterNOtCompleteData;
  } else {
    currentComplete = filterAllCompleteData;
  }

  const todosData = currentComplete.map((e) => {
    return <Todo key={e.id} todo={e}></Todo>;
  });

  const theme = (outerTheme) =>
    createTheme({
      direction: "rtl",
      palette: {
        mode: outerTheme.palette.mode,
      },
    });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: detailsInput,
      isCompleted: false,
    };
    const UpdateTodos = [...todos, newTodo];
    // to save the localStorge data at once
    setTodos(UpdateTodos);
    localStorage.setItem("todos", JSON.stringify(UpdateTodos));
    SetTitleInput("");
    SetDetailsInput("");
  }

  function handleRemoveAllClick() {
    setTodos([]);
    localStorage.setItem("todos", JSON.stringify([]));
    SetTitleInput("");
    SetDetailsInput("");
  }
  React.useEffect(() => {
    if (localStorage.getItem("todos") == null) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else if (
      todos &&
      localStorage.getItem("todos") != null &&
      JSON.parse(localStorage.getItem("todos")).length != 0
    ) {
      let storageUpdate = JSON.parse(localStorage.getItem("todos"));
      setTodos(storageUpdate);
    } else if (JSON.parse(localStorage.getItem("todos")).length == 0) {
      setTodos(todos);
    } else {
      setTodos(todos);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, height: "80vh", overflowY: "scroll" }}>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">المهام</Typography>
          <Divider />
          <ToggleButtonGroup
            value={currentComplete}
            exclusive
            onChange={(e) => SetCompleteState(e.target.value)}
            style={{ margin: "30px" }}
          >
            <ToggleButton value="All">الكل</ToggleButton>
            <ToggleButton value="Complete">منجز</ToggleButton>
            <ToggleButton value="NotComplete">غير منجز </ToggleButton>
          </ToggleButtonGroup>

          {todosData}

          <Grid className="effectNote" container spacing={2}>
            <Grid size={10} dir="rtl">
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <TextField
                      fullWidth
                      label="ادخال عنوان "
                      variant="outlined"
                      value={titleInput}
                      onChange={(e) => SetTitleInput(e.target.value)}
                      style={{ marginBottom: "1em" }}
                      required
                    />
                    <TextField
                      required
                      label="ادخال المهم "
                      fullWidth
                      variant="outlined"
                      value={detailsInput}
                      onChange={(e) => SetDetailsInput(e.target.value)}
                    />
                  </div>
                </ThemeProvider>
              </CacheProvider>
            </Grid>
            <Grid size={2} display={"flex"} justifyContent={"space-around"}>
              <Button variant="contained" onClick={handleAddClick}>
                إضافة
              </Button>
            </Grid>
            <Button
              variant="contained"
              onClick={handleRemoveAllClick}
              style={{ background: "red" }}
            >
              حذف الكل
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
