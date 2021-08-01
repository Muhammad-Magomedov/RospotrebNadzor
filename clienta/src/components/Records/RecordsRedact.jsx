import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
//import {useDispatch, useSelector} from "react-redux";
import { Helmet } from "react-helmet";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { postRecord } from "../../redux/features/record";
import RedactWindow from "../redactWindow/RedactWindow";
//import { loadCompanyById } from '../../redux/features/company';

const useStyles = makeStyles({
  formBlock: {
    display: "flex",
    width: 900,
    margin: "auto",
    marginTop: 20,
    marginLeft: 160,
  },
  field: {
    width: 200,
  },
  textField: {
    width: 500,
  },
  textFieldMargin: {
    marginRight: 20,
  },
  buttonMargin: {
    marginTop: 20,
    marginLeft: 20,
  },
  comments: {
    width: 800,
    margin: "auto",
    marginTop: 40,
    justifyContent: "space-between",
  },
  status: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    textAlign: "center",
  },
});

function RecordsRedact({ companies, statusModel }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [statuses, setStatuses] = useState("");
  const [text, setText] = useState("");
  const [status, setStatusId] = useState("");
  const [redactWindow, setRedactWindow] = useState(false);
  const [companyRedact, setCompanyRedact] = useState("")

  const company = companies.find((item) => {
    if (item._id === id) {
      return item;
    }
  });

  const handleChange = (e) => {
    setStatuses(e.target.value);
  };
  const handlePost = async () => {
    await dispatch(postRecord(company._id, { text, status }));
  };
  const handleWriting = (e) => {
    setText(e.target.value);
  };
  const handleStatusId = (statusId) => {
    setStatusId(statusId);
  };
  const handleOpenWindow = (id) => {
    setCompanyRedact(id)
    setRedactWindow(!redactWindow);
  };

  const records = company?.records;

  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User record</title>
        <link rel="canonical" href="http://companies" />
      </Helmet>
      <Box>
        <Typography>Все записи об {company?.name}</Typography>
      </Box>
      <FormControl
        classes={{ root: classes.formBlock }}
        noValidate
        autoComplete="off"
      >
        <Grid container>
          <Grid item classes={{ root: classes.textFieldMargin }}>
            <TextField
              classes={{ root: classes.textField }}
              rows={4}
              id="outlined-basic"
              label="Поле для записи"
              variant="outlined"
              multiline
              fullWidth
              value={text}
              onChange={handleWriting}
            />
          </Grid>
          <Grid item>
            <TextField
              classes={{ root: classes.field }}
              id="filled-select-currency"
              select
              label="Укажите статус"
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
                onClick={handlePost}
                color={"primary"}
                variant={"contained"}
                type={"submit"}
              >
                Добавить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </FormControl>
      <Grid container classes={{ root: classes.comments }}>
        {records?.map((item) => {
          const status = statusModel.find((element) => {
            if (element._id === item.status) {
              return element;
            }
          });
          return (
            <Grid classes={{ root: classes.comments }} container>
              <Grid item>
                <Box>
                  <Box>{dayjs(item.updatedAt).format("YY.MM.DD HH:mm")}</Box>
                  <Box
                    classes={{ root: classes.status }}
                    bgcolor={status?.color}
                  >
                    {status?.text}
                  </Box>
                </Box>
              </Grid>
              <Grid item>{item.text}</Grid>
              <Grid item>
                <Button onClick={() => handleOpenWindow(item._id)}>
                  Редактировать
                </Button>
              </Grid>
            </Grid>
          );
        })}
        {redactWindow ? <RedactWindow statusModel={statusModel} companyRedact={companyRedact} records={records} /> : null}
      </Grid>
    </Container>
  );
}

export default RecordsRedact;
