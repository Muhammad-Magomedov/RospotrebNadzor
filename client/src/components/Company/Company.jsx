import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import CompanyPreloader from "./CompanyPreloader";
import Thead from "./Thead";
import Tbody from "./Tbody";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  status: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    textAlign: "center",
  },
  showFilter: {
    color: "blue",
    cursor: "pointer",
  },
}));

function Company({filter, setFilter, setValue, loading, companies, statusModel}) {
  const classes = useStyles();

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  if (loading) {
    return <CompanyPreloader />;
  }

  return (
    <Container>
      <Box>
        <Typography variant={"h5"}>Список Компаний</Typography>
      </Box>
      <Box>
        <Typography
          classes={{ root: classes.showFilter }}
          variant={"h6"}
          onClick={handleFilter}
        >
          Показать фильтр...
        </Typography>
      </Box>
      <Box>{filter ? <input onChange={handleSearch} /> : null}</Box>
      <table width={"100%"}>
        <Thead />
        {companies.map((item) => {
          const lastRecord = item.lastRecord.find((company) => company);
          const status = statusModel.find((element) => {
            if (element._id === lastRecord?.status) {
              return element;
            }
          });
          return (
            <Tbody
              lastRecord={lastRecord}
              status={status}
              classes={classes}
              item={item}
            />
          );
        })}
      </table>
    </Container>
  );
}

export default Company;
