import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Todo({ title, details }) {
  return (
    <>
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
              <Typography variant="h4">{title}</Typography>
              <Typography variant="h5"> {details}</Typography>
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
                  background: "white",
                  borderRadius: "50px",
                  width: "30%",
                  height: "60%",
                }}
              >
                <CheckIcon></CheckIcon>
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
              >
                <EditIcon></EditIcon>
              </IconButton>

              <IconButton
                className="iconClass"
                aria-label="DeleteIcon"
                style={{
                  background: "white",
                  borderRadius: "50px",
                  width: "30%",
                  height: "60%",
                }}
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
