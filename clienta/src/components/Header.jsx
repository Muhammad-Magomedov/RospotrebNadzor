import React, { useState } from "react";
import { Box, Grid, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  mainBlock: {
    justifyContent: "space-between",
  },
  navBlock: {
    width: 300,
    display: "flex",
    justifyContent: "space-between",
  },
  menuBlock: {
    marginBottom: 40,
  },
}));

function Header(props) {
  const [admin, setAdmin] = useState(false);

  const classes = useStyles();

  const handleMenu = () => {
    setAdmin(!admin);
  };

  return (
      <Box classes={{ root: classes.menuBlock }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home page</title>
          <link rel="canonical" href="http://companies" />
        </Helmet>
        <Toolbar>
          <Grid container classes={{ root: classes.mainBlock }}>
            <Grid item>
              <Typography variant={"h6"}>Роспотребнадзор</Typography>
            </Grid>
            <Grid classes={{ root: classes.navBlock }} item>
              <Box>
                <NavLink to={"/"}>Главная</NavLink>
              </Box>
              <Box>
                <NavLink onClick={handleMenu} to={"/admin"}>
                  Админка
                </NavLink>
              </Box>
              {admin ? (
                <Box>
                  <NavLink to={"/status"}>
                    Статусы
                  </NavLink>
                </Box>
              ) : null}
              <Box>
                <NavLink to={"/about"}>О нас</NavLink>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
  );
}

export default Header;
