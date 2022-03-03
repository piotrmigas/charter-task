import { getRewardPoints } from "./functions";

test("calculating reward points for transaction under 100$", () => {
  const transactions = [
    {
      amount: 87,
      currency: "USD",
      customer: { customerId: 1, customerName: "John Doe" },
      productName: "Book",
      transactionDate: "2022-01-10",
      transactionId: 0,
    },
  ];
  expect(getRewardPoints(transactions)).toEqual(37);
});

test("calculating reward points for transaction over 100$", () => {
  const transactions = [
    {
      amount: 249,
      currency: "USD",
      customer: { customerId: 1, customerName: "John Doe" },
      productName: "Book",
      transactionDate: "2022-01-10",
      transactionId: 0,
    },
  ];
  expect(getRewardPoints(transactions)).toEqual(348);
});
