import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import ClientList from "./pages/ClientList";
import ClientTransactions from "./pages/ClientTransactions";
import { generateDataset } from "./utils/functions";

function App() {
  const [dataset, setDataset] = useState({});

  useEffect(() => {
    const fetchData = () => {
      Promise.all([
        fetch("./clients.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }),
        fetch("./transactions.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }),
      ])
        .then(async ([clients, transactions]) => {
          const clientsData = await clients.json();
          const transactionsData = await transactions.json();
          setDataset({
            clients: clientsData,
            transactions: transactionsData,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const { transactions, clients } = dataset;

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={<ClientList clients={clients} generateNewDataset={() => setDataset(generateDataset())} />}
        />
        <Route path="/client/:id" element={<ClientTransactions clients={clients} transactions={transactions} />} />
      </Routes>
    </Container>
  );
}

export default App;
