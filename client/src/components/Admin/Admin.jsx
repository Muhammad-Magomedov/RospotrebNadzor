import React, {useState} from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../../redux/features/company";
import { Link } from "react-router-dom";
import AddInput from "./AddInput";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  table: {
    width: 1100,
    margin: "auto",
  },
  button: {
    margin: 20,
    textAlign: "right",
    paddingBottom: 20,
  },
}));

function Admin({ companies }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Box>
      <table className={classes.table}>
        <tr>
          <td>Логотип</td>
          <td>Название</td>
          <td>Удалить данные</td>
        </tr>
        {companies.map((item) => {
          return (
            <tr>
              <td>
                <img className={classes.avatar} src={item.image} alt="" />
              </td>
              <td>
                <Link to={`companies/${item._id}`}>{item.name}</Link>
              </td>
              <td>
                <Button onClick={() => dispatch(deleteCompany(item._id))}>
                  Удалить
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
      <Box classes={{ root: classes.button }}>
        {open ? <AddInput/> : null}
        <Button onClick={handleOpen} color={"secondary"} variant={"contained"}>
          Добавить
        </Button>
      </Box>
    </Box>
  );
}

export default Admin;
