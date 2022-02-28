import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./index.scss";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";
import { handleNumber } from "../../../../common/method/displayData";

const useStyles = makeStyles({
  table: {
    width: "100%",
    minWidth: 650,
    borderRadius: 30
  }
});

export default function BasicTable({ data }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table
        className={`${classes.table} rounded-lg`}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>جرئیات</TableCell>
            <TableCell align="right">مهلت ثبت نام</TableCell>
            <TableCell align="right">قیمت (ريال)</TableCell>
            <TableCell align="right">تعداد</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={data.name}>
            <TableCell component="th" scope="row">
              {data.body.Name ? data.body.Name : "-"}
            </TableCell>
            <TableCell align="right">
              {data.body.registration_end_date
                ? dateConvertMiladiToShamsi(
                    data.body.registration_end_date.split(" ")[0]
                  )
                : "-"}
            </TableCell>
            <TableCell align="right">
              {data.body.cost ? handleNumber(data.body.cost) : "رایگان"}
            </TableCell>
            <TableCell align="right">{data.body.remained_capacity}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
