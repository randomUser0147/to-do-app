import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  ButtonGroup,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AppBar,
  Toolbar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Fragment, useState } from "react";
import TaskIcon from "@mui/icons-material/Task";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../utils/CustomModal";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskStatus, setTaskStatus] = useState("New");
  const [searchTerm, setSearchTerm] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (e) => setTaskName(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSave = () => {
    if (!taskName.trim()) return;
    if (editTaskId !== null) {
      let updatedTasks = tasks.map((task) => 
        task.id === editTaskId
          ? {
              ...task,
              name: taskName,
              priority: taskPriority,
              status: taskStatus,
            }
          : task
      );
      setTasks(updatedTasks);
    } else {
      let newTask = {
        id: new Date().getTime(),
        name: taskName,
        status: taskStatus,
        priority: taskPriority,
      };
      setTasks([...tasks, newTask]);
    }
    handleClose();
  };

  const handleClose =() =>{
    setTaskName("");
    setEditTaskId(null);
    setTaskPriority("Low");
    setTaskStatus("New");
    setOpen(false);
  }

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const itemClick = (type, event) => {
    if (type === "priority") {
      setTaskPriority(event.target.value);
    } else if (type === "status" && editTaskId !== null) {
      setTaskStatus(event.target.value);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    const updatedTask = tasks.find((task) => task.id === id);
    setOpen(true);
    setEditTaskId(updatedTask.id);
    setTaskName(updatedTask.name);
    setTaskPriority(updatedTask.priority);
    setTaskStatus(updatedTask.status);
  };

  const modalContent = (
    <>
      <TextField
        label="Enter Task"
        fullWidth
        onChange={handleChange}
        value={taskName}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth>
        <InputLabel>Select Priority</InputLabel>
        <Select
          label="Select Priority"
          value={taskPriority}
          onChange={(e) => itemClick("priority", e)}
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value={"Low"}>Low</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"High"}>High</MenuItem>
        </Select>
      </FormControl>
      {editTaskId !== null && (
        <FormControl fullWidth>
          <InputLabel>Set Status</InputLabel>
          <Select
            label="Set Status"
            onChange={(e) => itemClick("status", e)}
            value={taskStatus}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value={"New"}>New</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
          </Select>
        </FormControl>
      )}
    </>
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
        <CustomModal
          isOpen={open}
          handleClose={handleClose}
          handleSave={handleSave}
          title={editTaskId !== null ?  "Edit a task" :"Add a Task"}
          content={modalContent}
        ></CustomModal>
        {/* Dialog for adding a new task */}

        {/* Task List Table */}
        {filteredTasks.length > 0 && (
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Sr.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task, index) => (
                <TableRow
                  key={task.id}
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
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <IconButton onClick={() => handleEdit(task.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(task.id)}>
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
