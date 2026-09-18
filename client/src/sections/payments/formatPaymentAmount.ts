/** Payment API amounts are represented in minor currency units. */
export function formatPaymentAmount(amount: number, currency: string): string {
  return (amount / 100).toLocaleString("en-CA", {
    style: "currency",
    currency: currency.toUpperCase(),
  });
}
