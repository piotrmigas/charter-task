import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import dayjsRandom from "dayjs-random";

dayjs.extend(dayjsRandom);

export const getCustomerTransactions = (transactions, customerId) =>
  transactions.filter((transaction) => transaction.customer.customerId === Number(customerId));

export const getRewardPoints = (transactions) =>
  transactions.reduce((rewardPoints, transaction) => {
    const doublePoints = transaction.amount - 100;

    if (doublePoints > 0) {
      rewardPoints += doublePoints * 2 + 50;
    }

    if (transaction.amount > 50 && doublePoints <= 0) {
      rewardPoints += transaction.amount - 50;
    }

    return rewardPoints;
  }, 0);

export const getTransactionsFromMonth = (transactions, monthsBack) =>
  transactions.filter((item) => dayjs(item.transactionDate).month() === dayjs().subtract(monthsBack, "month").month());

const generateCustomers = () =>
  new Array(5).fill({}).map((customer, customerIndex) => ({
    customerId: customerIndex + 1,
    customerName: faker.name.findName(),
  }));

export const generateDataset = () => {
  const clients = generateCustomers();

  return {
    clients,
    transactions: new Array(100).fill({}).map((item, index) => ({
      transactionId: index,
      customer: clients[faker.finance.amount(0, 4, 0)],
      amount: faker.finance.amount(0, 500, 0),
      currency: "USD",
      transactionDate: dayjs.between(dayjs().subtract(3, "month"), dayjs()).format("YYYY-MM-DD"),
      productName: faker.commerce.productName(),
    })),
  };
};
