import { useState } from "react";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import { TableBody, TableRow, TableHead, Table, TableCell, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getCustomerTransactions, getRewardPoints, getTransactionsFromMonth } from "../utils/functions";

const useStyles = makeStyles({
  homeBtn: {
    marginTop: 20,
    width: 120,
    color: "#fff",
    background: "#16425c",
    borderRadius: 30,
    "&:hover": {
      background: "#16425c",
      opacity: 0.8,
    },
  },
  header: { display: "flex", flexDirection: "column", alignItems: "center", margin: "25px 0" },
  name: { fontWeight: "bold" },
  points: { display: "flex", justifyContent: "center", margin: "10px 0" },
  monthPoints: { marginLeft: 10 },
  toggleBtns: { display: "flex", justifyContent: "center", margin: 20, columnGap: 10 },
  table: { margin: 50 },
  navBtn: {
    borderRadius: 30,
  },
});

const ClientTransactions = ({ clients, transactions }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState("all");

  const customerInformations = clients.find(({ customerId }) => customerId === Number(id));

  const customerTransactions = getCustomerTransactions(transactions, id);

  const renderRows = (customerTransactionsList) =>
    customerTransactionsList
      .sort((a, b) => (dayjs(b.transactionDate).isAfter(dayjs(a.transactionDate)) ? 1 : -1))
      .map((customerTransaction) => (
        <TableRow key={customerTransaction.transactionId}>
          <TableCell>{customerTransaction.transactionId}</TableCell>
          <TableCell>{customerTransaction.productName}</TableCell>
          <TableCell>{customerTransaction.transactionDate}</TableCell>
          <TableCell>{`${customerTransaction.amount} ${customerTransaction.currency}`}</TableCell>
        </TableRow>
      ));

  return (
    <>
      <Button onClick={() => navigate("/")} className={classes.homeBtn}>
        Go Back
      </Button>
      <div className={classes.header}>
        <Typography className={classes.name}>{customerInformations?.customerName}</Typography>
        <div className={classes.points}>
          <Typography>Total points: {getRewardPoints(customerTransactions)}</Typography>
          {selectedMonth !== "all" && (
            <Typography className={classes.monthPoints}>
              Total points in {dayjs().subtract(Number(selectedMonth), "month").format("MMMM")}:{" "}
              {getRewardPoints(getTransactionsFromMonth(customerTransactions, selectedMonth))}
            </Typography>
          )}
        </div>
      </div>
      <div className={classes.toggleBtns}>
        <Button
          color="secondary"
          variant="contained"
          className={classes.navBtn}
          onClick={() => setSelectedMonth("all")}
          disabled={selectedMonth === "all"}
        >
          All transactions
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={classes.navBtn}
          onClick={() => setSelectedMonth(2)}
          disabled={Number(selectedMonth) === 2}
        >
          {dayjs().subtract(2, "month").format("MMMM")}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={classes.navBtn}
          onClick={() => setSelectedMonth(1)}
          disabled={Number(selectedMonth) === 1}
        >
          {dayjs().subtract(1, "month").format("MMMM")}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={classes.navBtn}
          onClick={() => setSelectedMonth(0)}
          disabled={Number(selectedMonth) === 0}
        >
          {dayjs().subtract(0, "month").format("MMMM")}
        </Button>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderRows(
            selectedMonth !== "all"
              ? getTransactionsFromMonth(customerTransactions, selectedMonth)
              : customerTransactions
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ClientTransactions;
