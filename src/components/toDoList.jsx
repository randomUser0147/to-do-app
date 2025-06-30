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
} from "@mui/material";
import { Fragment, useState } from "react";


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

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2, textAlign: "center" }}>
          To Do List
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 3,
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
          size="md"
          onClose={() => setOpen(false)}
          sx={{ zIndex: 100 }}
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
            <ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={addTask}
                sx={{ marginRight: 1 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                sx={{ marginLeft: 1 }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>
      </Container>

      {filteredTasks.length > 0 && (
        <Container sx={{ marginTop: 4 }}>
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
                    <Button variant="outlined" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      )}
    </Fragment>
  );
}

export default ToDoList;
