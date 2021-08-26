const { Observable } = rxjs;

//FUNCION PARA RENDERIZAR PRODUCTOS
const render = () => {
    const listaProductos = JSON.parse(sessionStorage.getItem("listaProductos"));
    const li = listaProductos.map(function (prod) {
        return `
        <li>${prod.title}: $${prod.price}<button id="button${prod.id}" onclick="remove(${prod.id})">Remover</button></li>
        `;
    }).join(' ');

    const lista = `
    <ul>
         ${li} 
    </ul>    
    `;
    document.getElementById('items').innerHTML = lista;
}

//FUNCION PARA REMOVER PRODUCTO LISTA DE COMPRAS
const remove = (productoID) => {
    //ACTUALIZO NUEVA LISTA SESSION STORAGE 
    let listaProductos = JSON.parse(sessionStorage.getItem("listaProductos"));
    listaProductos = listaProductos.filter(prod => prod.id != productoID);
    guardarSession("listaProductos", JSON.stringify(listaProductos));

    //RENDERIZO NUEVA LISTA
    render(listaProductos);

    //ACTUALIZAR VUELTO
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    price.value = listaProductos.reduce(reducer, 0);
    price.dispatchEvent(new Event("input"));
}
render(JSON.parse(sessionStorage.getItem("listaProductos")));

window.onload = function () {
    //FUNCION PARA ENTREGAR EL CAMBIO Y ACTUALIZAR EL BALANCE DE LA CAJA
    const handCash = document.getElementById("handCash");
    handCash.onclick = () => {
        console.log(checkCashRegister(Number(price.value), Number(cash.value), cid))
        const salida = checkCashRegister(Number(price.value), Number(cash.value), cid);
        salida.change.forEach(x => {
            document.getElementById(x[2]).value -= x[1]; 
        });
    }

    const oneHundred = document.getElementById('100');
    const fifty = document.getElementById('50');
    const twenty = document.getElementById('20');
    const ten   = document.getElementById('10');
    const five   = document.getElementById('5');
    const one  = document.getElementById('1');
    const quarter  = document.getElementById('0.25');
    const dime  = document.getElementById('0.1');
    const nickel  = document.getElementById('0.05');
    const penny  = document.getElementById('0.01');
    
    let price = document.getElementById('price');
        //genero un metodo para relevar el precio segun los items comprados
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        price.value = productos.reduce(reducer, 0);
    let cash = document.getElementById('cash');
    let cid = [["PENNY", Number(penny.value)], ["NICKEL", Number(nickel.value)], ["DIME", Number(dime.value)], ["QUARTER", Number(quarter.value)], ["ONE", Number(one.value)], ["FIVE", Number(five.value)], ["TEN", Number(ten.value)], ["TWENTY", Number(twenty.value)], ["ONE HUNDRED", Number(oneHundred.value)]];
    

    //IMPRIMIENDO DOM
    const output = document.getElementById('output');
    let outputObj = checkCashRegister(Number(price.value), Number(cash.value), cid);
    output.innerHTML = outputObj.change.map(x=>
    `<p>${x[0]}: $${x[1]}</p>`
    ).join("<br>");

    
    const observable = new Observable((subscriber)=> {
        price.addEventListener("input", () => {
            subscriber.next(checkCashRegister(Number(price.value), Number(cash.value), cid));
        });
        cash.addEventListener("input", () => {
            subscriber.next(checkCashRegister(Number(price.value), Number(cash.value), cid));
        });
        
        penny.addEventListener("input", () => {
            cid[0][1] = Number(penny.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });

        nickel.addEventListener("input", () => {
            cid[1][1] = Number(nickel.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });

        dime.addEventListener("input", () => {
            cid[2][1] = Number(dime.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });

        quarter.addEventListener("input", () => {
            cid[3][1] = Number(quarter.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });

        one.addEventListener("input", () => {
            cid[4][1] = Number(one.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });

        five.addEventListener("input", () => {
            cid[5][1] = Number(five.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });

        ten.addEventListener("input", () => {
            cid[6][1] = Number(ten.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });

        twenty.addEventListener("input", () => {
            cid[7][1] = Number(twenty.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });

        oneHundred.addEventListener("input", () => {
            cid[8][1] = Number(oneHundred.value);
            subscriber.next(checkCashRegister(price.value, cash.value, cid));
        });
    
    });
    
    const handler = {
        next: value => {
            output.innerHTML = value.change.map(x=>
            `<p>${x[0]}: $${x[1]}</p>`
            ).join(" ");
        },
        error: err => console.log(err),
        complete: () => console.log('proceso completo'),
    }

    const subscription = observable.subscribe(handler);
}

//FUNCION PARA ENTREGAR EL CAMBIO Y ACTUALIZAR EL BALANCE DE LA CAJA
const handCash = () => {
    console.log(checkCashRegister(Number(price.value), Number(cash.value), cid));
}
