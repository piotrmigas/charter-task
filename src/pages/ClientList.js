import {
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  genBtn: {
    color: "#fff",
    display: "flex",
    margin: "40px auto",
    width: 200,
    height: 40,
    background: "#01D38B",
    borderRadius: 30,
    "&:hover": {
      background: "#01D38B",
      opacity: 0.8,
    },
  },
  tableContainer: { display: "flex", justifyContent: "center" },
  table: { width: 600 },
  listBtn: {
    width: 100,
    borderRadius: 30,
    textTransform: "capitalize",
    color: "#fff",
    background: "#16425c",
    "&:hover": {
      background: "#16425c",
      opacity: 0.8,
    },
  },
  header: {
    margin: "25px 0",
  },
});

const ClientList = ({ clients, generateNewDataset }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={generateNewDataset} className={classes.genBtn}>
        Generate dataset
      </Button>
      <Typography variant="h5" className={classes.header} align="center">
        Clients
      </Typography>
      <div className={classes.tableContainer}>
        {!clients ? (
          <CircularProgress />
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Transactions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map(({ customerId, customerName }) => (
                <TableRow key={customerId}>
                  <TableCell>{customerId}</TableCell>
                  <TableCell>{customerName}</TableCell>
                  <TableCell>
                    <Button className={classes.listBtn} onClick={() => navigate(`/client/${customerId}`)}>
                      See list
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default ClientList;
