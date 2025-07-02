import { Fragment } from "react";
import {
    Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
} from "@mui/material";

function CustomModal({isOpen, handleClose, title, content,handleSave}) {
  return (
    <Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          zIndex: 100,
          "& .MuiDialog-paper": {
            width: "400px",
            maxWidth: "400px",
            borderRadius: "24px",
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
        {content}
        </DialogContent>
        <DialogActions>
          <ButtonGroup sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ borderRadius: "24px" }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ borderRadius: "24px" }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default CustomModal;
