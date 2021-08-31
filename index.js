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
    $('#items').html(lista);  //USO JQUERY
}

render(JSON.parse(sessionStorage.getItem("listaProductos")));



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

window.onload = function () {
    //FUNCION PARA ENTREGAR EL CAMBIO Y ACTUALIZAR EL BALANCE DE LA CAJA
    const handCash = $("#handCash"); //USO JQUERY
    handCash.on("click", () => {     //USO JQUERY
        console.log(checkCashRegister(Number(price.val()), Number(cash.val()), cid))
        const salida = checkCashRegister(Number(price.val()), Number(cash.val()), cid);
        salida.change.forEach(x => {
            document.getElementById(x[2]).value-= x[1]; 
        });
    });
    //Uso JQUERY
    const oneHundred = $('#100');   
    const fifty = $('#50');
    const twenty = $('#20');
    const ten   = $('#10');
    const five   = $('#5');
    const one  = $('#1');
    const quarter  = $('#0.25');
    const dime  = $('#0.1');
    const nickel  = $('#0.05');
    const penny  = $('#0.01');
    
    let price = $('#price');
        //genero un metodo para relevar el precio segun los items comprados
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        price.val(productos.reduce(reducer, 0));
    let cash = $('#cash');
    let cid = [["PENNY", Number(penny.val())], ["NICKEL", Number(nickel.val())], ["DIME", Number(dime.val())], ["QUARTER", Number(quarter.val())], ["ONE", Number(one.val())], ["FIVE", Number(five.val())], ["TEN", Number(ten.val())], ["TWENTY", Number(twenty.val())], ["ONE HUNDRED", Number(oneHundred.val())]];
    

    //IMPRIMIENDO DOM
    const output = $('#output');   //USO JQUERY
    let outputObj = checkCashRegister(Number(price.val()), Number(cash.val()), cid);
    output.html(outputObj.change.map(x=>     //USO JQUERY
    `<p>${x[0]}: $${x[1]}</p>`
    ).join("<br>"));

    
    const observable = new Observable((subscriber)=> {
        price.on("input", () => {
            subscriber.next(checkCashRegister(Number(price.val()), Number(cash.val()), cid));
        });
        cash.on("input", () => {
            subscriber.next(checkCashRegister(Number(price.val()), Number(cash.val()), cid));
        });
        
        penny.on("input", () => {
            cid[0][1] = Number(penny.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });

        nickel.on("input", () => {
            cid[1][1] = Number(nickel.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });

        dime.on("input", () => {
            cid[2][1] = Number(dime.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });

        quarter.on("input", () => {
            cid[3][1] = Number(quarter.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });

        one.on("input", () => {
            cid[4][1] = Number(one.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });

        five.on("input", () => {
            cid[5][1] = Number(five.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });

        ten.on("input", () => {
            cid[6][1] = Number(ten.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });

        twenty.on("input", () => {
            cid[7][1] = Number(twenty.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });

        oneHundred.on("input", () => {
            cid[8][1] = Number(oneHundred.val());
            subscriber.next(checkCashRegister(price.val(), cash.val(), cid));
        });
    
    });
    
    const handler = {
        next: value => {
            output.html(value.change.map(x=>
            `<p>${x[0]}: $${x[1]}</p>`
            ).join(" "));
        },
        error: err => console.log(err),
        complete: () => console.log('proceso completo'),
    }

    const subscription = observable.subscribe(handler);
}