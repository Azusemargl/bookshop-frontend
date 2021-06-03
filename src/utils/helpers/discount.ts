export const discount = (past_price: number, price: number) => {
   return Math.floor((past_price - price) * 100 / price)
}