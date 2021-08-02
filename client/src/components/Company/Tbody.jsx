import React from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box } from '@material-ui/core';

function Tbody({classes, lastRecord, status, item}) {

  return (
    <tr>
      <td>
        <img className={classes.avatar} src={item.image} alt="" />
      </td>
      <td><Link to={`/companies/${item._id}`}>{item.name}</Link></td>
      <td>{dayjs(lastRecord?.updatedAt).format("YY.MM.DD HH:mm")}</td>
      <td>
        <Box classes={{ root: classes.status }} bgcolor={status?.color}>
          {status?.text}
        </Box>
      </td>
      <td>{item.records.length}</td>
    </tr>
  );
}

export default Tbody;