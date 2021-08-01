import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { patchRecord } from "../../redux/features/record";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  redactWindow: {
    position: "absolute",
    width: 600,
    margin: "auto",
  },
  modalCenter: {
    marginTop: 200,
    width: 500,
    margin: "auto",
    marginLeft: 800,
    padding: 40,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textField: {
    paddingRight: 20,
  },
  buttonMargin: {
    marginTop: 20,
  },
});

function RedactWindow({ statusModel, companyRedact, records }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const record = records?.find((item) => {
    if (item._id === companyRedact) {
      return item;
    }
  });

  const [text, setText] = useState(record.text);
  const [statuses, setStatuses] = useState("");
  const [status, setStatusId] = useState("");

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(!open);
  };
  const handleChange = (e) => {
    setStatuses(e.target.value);
  };
  const handleStatusId = (statusId) => {
    setStatusId(statusId);
  };
  const handlePatch = async () => {
    await dispatch(patchRecord(record._id, { text, status }));
  };
  const handleText = (e) => {
    setText(e.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Grid container classes={{ root: classes.modalCenter }}>
        <Grid item classes={{ root: classes.textField }}>
          <TextField
            rows={4}
            id="outlined-basic"
            label="Изменить запись"
            variant="outlined"
            multiline
            value={text}
            onChange={handleText}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Box>
            <TextField
              fullWidth
              classes={{ root: classes.field }}
              id="filled-select-currency"
              select
              label="Изменить статус"
              value={statuses}
              onChange={handleChange}
              variant="filled"
              size={"medium"}
            >
              {statusModel.map((item) => {
                return (
                  <MenuItem
                    onClick={() => handleStatusId(item._id)}
                    value={item.text}
                  >
                    {item.text}
                  </MenuItem>
                );
              })}
            </TextField>
            <Grid item classes={{ root: classes.buttonMargin }}>
              <Button
                onClick={handlePatch}
                color={"primary"}
                variant={"contained"}
                type={"submit"}
              >
                Изменить
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default RedactWindow;
