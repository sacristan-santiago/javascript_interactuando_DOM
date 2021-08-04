//cid IS THE AMOUNT OF CASH IN REGISTER BEFORE THE TRANSACTION.
function checkCashRegister(price, cash, cid) {
  console.log(cid)
  console.log(price)
  console.log(cash)

  let currencyUnit = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE-HUNDRED"];
  let amount = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  let output = {
    status: "",
    change: []
  };

  let rest = cash - price;
  for (let i = amount.length-1; i>=0; i--) {
    let arr = [currencyUnit[i], 0]; 
    while (amount[i]<=rest && cid[i][1]>=arr[1]+amount[i]) {
      rest = Math.round((rest-amount[i])*100)/100;
      arr[1] += amount[i];
      arr [1]= Math.round(arr[1]*100)/100
    }
    output.change.push(arr);
  }
  // console.log(output.change)
  
  //COMPARATIVE FUNCTIONS
  const availableChange = (output) => Math.round((output.change.reduce((acc,curr)=> acc += curr[1], 0)*100))/100;
  
  const neededChange = (cash, price) => Math.round((cash-price)*100)/100;
  console.log(neededChange(cash, price))
  const moneyInRegister = (cid) => Math.round((cid.reduce((acc,curr)=> acc += curr[1], 0)*100))/100
  console.log(moneyInRegister(cid))
  //CONDITIONAL TO CHECK IF CASHREGISTER REMAINS OPEN, CLOSED OR HAS NO FUNDS.
  if (availableChange(output) < neededChange(cash, price)) {
      output.status = "INSUFFICIENT_FUNDS";
      output.change = [];
    }
    else if (moneyInRegister(cid) === neededChange(cash, price)) {
      output.status = "CLOSED";
      output.change = output.change.filter(x=>x[1] != 0)
    } 
    else {
      output.status = "OPEN";
      output.change = output.change.filter(x=>x[1] != 0)
    }
  return output;
}