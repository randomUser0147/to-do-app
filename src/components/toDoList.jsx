import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Fragment, useState } from "react";
import TaskIcon from "@mui/icons-material/Task";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => setTaskName(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const addTask = () => {
    if (!taskName.trim()) return;
    setTasks([...tasks, { name: taskName, status: "new" }]);
    setTaskName("");
    setOpen(false);
  };

  const handleDelete = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      {/* AppBar */}
      <Container>
        <AppBar sx={{ backgroundColor: "#1976d2", marginBottom: 3 }}>
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TaskIcon fontSize="large" sx={{ marginRight: 1 }} />
              <Typography
                variant="h4"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                TaskMate
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>

      {/* Search and Add Task Button */}
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: 3,
          position: "absolute",
          flexDirection: "column",
          top: "30%",
          // right: tasks.length > 0 ? "16%" : "40%",
          right: "16%",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",

            gap: 2,
          }}
        >
          <TextField
            label="Search task"
            variant="outlined"
            sx={{ flexGrow: 1 }}
            onChange={handleSearchChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{ padding: "10px 20px" }}
          >
            Add task
          </Button>
        </Box>

        {/* Dialog for adding a new task */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            zIndex: 100,
            "& .MuiDialog-paper": {
              width: "400px",
              maxWidth: "400px",
              borderRadius: "24px",
            },
          }}
        >
          <DialogTitle>Add a Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Enter Task"
              fullWidth
              onChange={handleChange}
              value={taskName}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <ButtonGroup sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={addTask}
                sx={{ borderRadius: "24px" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                sx={{ borderRadius: "24px" }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>

        {/* Task List Table */}
        {filteredTasks.length > 0 && (
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Sr.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#fafafa",
                    },
                    "&:hover": {
                      backgroundColor: "#e8e8e8",
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Container>
    </Fragment>
  );
}

export default ToDoList;
