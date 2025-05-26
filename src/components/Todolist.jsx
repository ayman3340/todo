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
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, getTodos] = React.useState([
    {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: "بنسيمب",
      isCompleted: false,
    },
  ]);

  const [titleInput, SetTitleInput] = React.useState("");

  const todosData = todos.map((e) => {
    return (
      <Todo
        style={{ marginTop: "50px" }}
        key={e.id}
        id={e.id}
        title={e.title}
        details={e.details}
      ></Todo>
    );
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

  function handleAddClick(params) {
    const newTodo = {
      id: uuidv4(),
      title:titleInput,
      details:"",
      isCompleted:false
    }
    getTodos([...todos,newTodo]);
    SetTitleInput("")
  }
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2">المهام</Typography>
          <Divider />
          <ToggleButtonGroup
            // value={alignment}
            exclusive
            // onChange={handleAlignment}
            style={{ margin: "30px", border: "solid green" }}
          >
            <ToggleButton value="left">الكل</ToggleButton>
            <ToggleButton value="center">منجز</ToggleButton>
            <ToggleButton value="right">غير منجز </ToggleButton>
          </ToggleButtonGroup>

          {todosData}

          <Grid className="effectNote" container spacing={2}>
            <Grid size={8} dir="rtl">
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <TextField label="ادخال المهام" variant="outlined" 
                    value={titleInput}
                    onChange={(e)=>SetTitleInput(e.target.value)}
                    />
                  </div>
                </ThemeProvider>
              </CacheProvider>
            </Grid>
            <Grid size={4} display={"flex"} justifyContent={"space-around"}>
              <Button variant="contained" onClick={handleAddClick}>
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
