import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function Todo({ todo }) {
  const [updateTodoEdite, setupdateTodoEdite] = useState({
    title: todo.title,
    details: todo.details,
  });

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);

  const { todos, getTodos } = useContext(TodosContext);

  // dialog function
  function handleDeleteClick() {
    setShowDeleteAlert(true);
  }

  function handleCanselDeleteDialog() {
    setShowDeleteAlert(false);
  }

  function handleEditeDialog() {
    setShowEditAlert(true);
  }

  function handleCanselEditeDialog() {
    setShowEditAlert(false);
  }

  function handleDeleteConfirm() {
    const updateTodo = todos.filter((e) => {
      return e.id != todo.id;
    });
    getTodos(updateTodo);
  }
  function handleEditConfirm() {
    const updateTodo = todos.map((e) => {
      if (e.id == todo.id) {
        return {
          ...e,
          title: updateTodoEdite.title,
          details: updateTodoEdite.details,
        };
      } else {
        return e;
      }
    });
    getTodos(updateTodo);
    setShowEditAlert(false);
  }
  console.log(showEditAlert);
  function handleChangeTodo() {
    const updateTodo = todos.map((e) => {
      if (e.id == todo.id) {
        e["isCompleted"] = !e["isCompleted"];
      }
      return e;
    });
    getTodos(updateTodo);
  }

  return (
    <>
      {/* the edit dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showEditAlert}
        onClose={handleCanselEditeDialog}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
            },
          },
        }}
      >
        <DialogTitle>تعديل مهمة</DialogTitle>
        <DialogContent>
          <DialogContentText>اكتب عنوان</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="  "
            name="text"
            label="اكتب التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={updateTodoEdite.title}
            onChange={(e) => {
              setupdateTodoEdite({ ...updateTodoEdite, title: e.target.value });
            }}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>اكتب الملاحظة</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            label="اكتب التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={updateTodoEdite.details}
            onChange={(e) => {
              setupdateTodoEdite({
                ...updateTodoEdite,
                details: e.target.value,
              });
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCanselEditeDialog}>الغاء التعديل</Button>
          <Button type="submit" onClick={handleEditConfirm}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* ######################################################################## */}

      {/* the delete dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteAlert}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={handleCanselDeleteDialog}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذق المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن الارجاع بعد حذف المهمة
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCanselDeleteDialog}>الغاء</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            اوفق
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        variant="outlined"
        sx={{
          minWidth: 275,
          background: "grey",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <CardContent>
          <Grid className="effectNote" container spacing={2}>
            <Grid size={8} sx={{ background: "red" }}>
              <Typography variant="h4">{todo.title}</Typography>
              <Typography variant="h5"> {todo.details}</Typography>
            </Grid>
            <Grid
              size={4}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <IconButton
                className="iconClass"
                aria-label="CheckIcon"
                style={{
                  background: todo.isCompleted ? "white" : "green",
                  borderRadius: "50px",
                  width: "30%",
                  height: "60%",
                }}
                onClick={handleChangeTodo}
              >
                <CheckIcon
                  style={{
                    color: todo.isCompleted ? "green" : "white",
                  }}
                ></CheckIcon>
              </IconButton>

              <IconButton
                className="iconClass"
                aria-label="EditIcon"
                style={{
                  background: "white",
                  borderRadius: "50px",
                  width: "30%",
                  height: "60%",
                }}
                onClick={handleEditeDialog}
              >
                <EditIcon></EditIcon>
              </IconButton>

              {/* delete button  */}
              <IconButton
                className="iconClass"
                aria-label="DeleteIcon"
                style={{
                  background: "white",
                  borderRadius: "50px",
                  width: "30%",
                  height: "60%",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </>
  );
}

export default Todo;
