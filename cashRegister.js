//cid IS THE AMOUNT OF CASH IN REGISTER BEFORE THE TRANSACTION.
function checkCashRegister(price, cash, cid) {
  class Output {
    constructor() {
      this.status = "";
      //INSERTO UN ARRAY DENTRO DEL OBJETO, LUEGO USARE METODOS SOBRE ESTE ARRAY
      this.change = [];
    }
    //UTILIZO EL METODO ARRAY.REDUCE
    availableChange () {
      return Math.round((this.change.reduce((acc,curr)=> acc += curr[1], 0)*100))/100;
    }
  }

  //CREO LOS ARRAYS currencyUnit Y amount
  let currencyUnit = ["UN CENTAVO", "CINCO CENTAVOS", "DIEZ CENTAVOS", "VEINTICINCO CENTAVOS", "UN PESOS", "CINCO PESOS", "DIEZ PESOS", "VEINTE PESOS", "CIEN PESOS"];
  let amount = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  let rest = cash - price;
  let output = new Output;

  //CALCULO EL CAMBIO EN BILLETES/MONEDAS
  for (let i = amount.length-1; i>=0; i--) {
    let arr = [currencyUnit[i], 0, amount[i]]; 
    while (amount[i]<=rest && cid[i][1]>=arr[1]+amount[i]) {
      rest = Math.round((rest-amount[i])*100)/100;
      arr[1] += amount[i];
      arr [1]= Math.round(arr[1]*100)/100
    }
    output.change.push(arr);
  }
  
  //COMPARATIVE FUNCTIONS
  const availableChange = output.availableChange();
  const neededChange = (cash, price) => Math.round((cash-price)*100)/100;
  //UTILIZO EL METODO ARRAY.REDUCE
  const moneyInRegister = (cid) => Math.round((cid.reduce((acc,curr)=> acc += curr[1], 0)*100))/100
  
  //CONDITIONAL TO CHECK IF CASHREGISTER REMAINS OPEN, CLOSED OR HAS NO FUNDS.
  if (availableChange < neededChange(cash, price)) {
      output.status = "INSUFFICIENT_FUNDS";
      output.change = [];
    }
    else if (moneyInRegister(cid) === neededChange(cash, price)) {
      output.status = "CLOSED";
      //UTILIZO EL METODO ARRAY.FILTER
      output.change = output.change.filter(x=>x[1] != 0)
    } 
    else {
      output.status = "OPEN";
       //UTILIZO EL METODO ARRAY.FILTER
      output.change = output.change.filter(x=>x[1] != 0)
    }
  return output;
}