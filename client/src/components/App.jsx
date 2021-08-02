import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCompanies, loadUsers } from "../redux/features/company";
import { Container, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "./Header";
import Company from "./Company/Company";
import { loadStatus } from "../redux/features/status";
import RecordsRedact from './Records/RecordsRedact';
import Admin from './Admin/Admin';


function App(props) {
  const [filter, setFilter] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const companies = useSelector((state) => {
    return state.company.items.filter(
      (item) => item.name.indexOf(value) !== -1
    );
  });
  const loading = useSelector((state) => state.company.loading);
  const statusModel = useSelector((state) => state.status.items);

  useEffect(() => dispatch(loadCompanies()), [dispatch]);
  useEffect(() => dispatch(loadStatus()), [dispatch]);

  return (
    <Container>
      <Paper>
        <Header />
      </Paper>
      <Paper>
          <Switch>
            <Route exact path={"/"}>
              <Company
                filter={filter}
                setFilter={setFilter}
                setValue={setValue}
                loading={loading}
                companies={companies}
                statusModel={statusModel}
              />
            </Route>
            <Route path={"/companies/:id"}>
              <RecordsRedact statusModel={statusModel} companies={companies}/>
            </Route>
            <Route path={"/admin"}>
              <Admin companies={companies}/>
            </Route>
          </Switch>
      </Paper>
    </Container>
  );
}

export default App;
