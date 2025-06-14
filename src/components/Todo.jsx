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
  const [updateTodoEdit, setUpdateTodoEdit] = useState({
    title: todo.title,
    details: todo.details,
  });

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const { todos,  setTodos } = useContext(TodosContext);

  // dialog function
  function handleDeleteClick() {
    setShowDeleteAlert(true);
  }

  function handleCancelDeleteDialog() {
    setShowDeleteAlert(false);
  }

  function handleEditDialog() {
    setShowEditAlert(true);
  }

  function handleCancelEditDialog() {
    setShowEditAlert(false);
  }

  
  function handleDeleteConfirm() {
    const updateTodo = todos.filter((e) => {
      return e.id != todo.id;
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
  }


  function handleEditConfirm() {
    const updateTodo = todos.map((e) => {
      if (e.id == todo.id) {
        return {
          ...e,
          title: updateTodoEdit.title,
          details: updateTodoEdit.details,
        };
      } else {
        return e;
      }
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    setShowEditAlert(false);
  }


  function handleChangeTodo() {
    const updateTodo = todos.map((e) => {
      if (e.id == todo.id) {
        e["isCompleted"] = !e["isCompleted"];
      }
      return e;
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
  }

  return (
    <>
      {/* the edit dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showEditAlert}
        onClose={handleCancelEditDialog}
      >
        <DialogTitle>تعديل مهمة</DialogTitle>
        <DialogContent>
          <DialogContentText>العنوان</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="titleData"
            name="text"
            type="text"
            fullWidth
            variant="standard"
            value={updateTodoEdit.title}
            onChange={(e) => {
              setUpdateTodoEdit({ ...updateTodoEdit, title: e.target.value });
            }}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>المهمة</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            type="text"
            fullWidth
            variant="standard"
            value={updateTodoEdit.details}
            onChange={(e) => {
              setUpdateTodoEdit({
                ...updateTodoEdit,
                details: e.target.value,
              });
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelEditDialog}>الغاء</Button>
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
        onClose={handleCancelDeleteDialog}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذف المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن الارجاع بعد حذف المهمة
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDeleteDialog}>الغاء</Button>
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
          width: "100%",
        }}
      >
        <CardContent>
          <Grid className="effectNote" container spacing={2}>
            <Grid size={8}>
              <Typography variant="h4" style={{color:"rgba(1, 2, 3, 0.91)"}}>{todo.title}</Typography>
              <Typography variant="h6" style={{color:"rgba(255, 255, 255, 0.88)" ,display:"inline-block",width:"100%",height:"100%"}}> {todo.details}</Typography>
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
                  background: todo.isCompleted ? "green" : "white",
                  borderRadius: "50px",
                }}
                onClick={handleChangeTodo}
              >
                <CheckIcon
                  style={{
                    color: todo.isCompleted ? "white" : "green",
                  }}
                ></CheckIcon>
              </IconButton>

              <IconButton
                className="iconClass"
                aria-label="EditIcon"
                style={{
                  background: "white",
                  borderRadius: "50px",
                }}
                onClick={handleEditDialog}
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
