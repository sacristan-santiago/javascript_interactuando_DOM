const { Observable } = rxjs;

window.onload = async function () {
    const output = $('#output');   //USO JQUERY
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
    const caja = $('caja')
    //TRAIGO PRODUCTOS
    const URLJSON = "productos.json";

    //TRAYENDO DATA CON AJAX
    let listaProductos = await $.getJSON(URLJSON, function(res, est) {
            if (est==="success") {
                return res
            }
        })

    // let listaProductos = JSON.parse(sessionStorage.getItem("listaProductos"));
    let price = listaProductos.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
    let cash = $('#cash');
    let cid = [["PENNY", Number(penny.val())], ["NICKEL", Number(nickel.val())], ["DIME", Number(dime.val())], ["QUARTER", Number(quarter.val())], ["ONE", Number(one.val())], ["FIVE", Number(five.val())], ["TEN", Number(ten.val())], ["TWENTY", Number(twenty.val())], ["ONE HUNDRED", Number(oneHundred.val())]];
    
    //FUNCION PARA REMOVER PRODUCTO LISTA DE COMPRAS
    const remove = (e) => {
        const productoID = e.data.param
        //ACTUALIZO NUEVA LISTA SESSION STORAGE 
        listaProductos = listaProductos.filter(prod => prod.id != productoID);
        // guardarSession("listaProductos", JSON.stringify(listaProductos));
        
        //ACTUALIZAR PRECIO TOTAL CARRITO
        price = listaProductos.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
        $('#price2').html(price);

        //RENDERIZO NUEVA LISTA
        render();
    
    }
    
    //FUNCION PARA RENDERIZAR PRODUCTOS y PRECIO TOTAL
    const render = () => {
        const li = listaProductos.map(function (prod) {
            return `
            <li><button id="button${prod.id}")>x</button>${prod.title}: $${prod.price}</li>
            `;
        }).join(' ');
        const lista = `
                        <ul>
                            ${li} 
                        </ul>    
                        `;
        $('#items').html(lista)
        //RENDERIZO ITEMS              
        if (listaProductos[0]) {
            $('#items').html(lista)
            $('#items').hide().fadeIn(500); //ENCADENO ANIMACION
        } else {
            $('#items').fadeOut(500);
        }

        //AGREGO FUNCION AL BOTON REMOVE
        for (const prod of listaProductos) {
            $(`#button${prod.id}`).click({param: prod.id}, remove)
        }

        //RENDERIZO CAJA
        if (listaProductos[0]) {
    
        } else {
            $('#caja').hide().fadeIn(500);
        }
    
        //RENDERIZO PRECIO TOTAL
        $('#price2').html(price);  //USO JQUERY
        $('#price2').hide().fadeIn(500); //ENCADENO ANIMACION
       
    
        //RENDERIZO VUELTO TOTAL
        $('#changeTotal').html(cash.val()-price);
        $('#changeTotal').hide().fadeIn(500); //ENCADENO ANIMACION
    
        //RENDERIZO TOTAL EN BILLETES
        const outputObj = checkCashRegister(price, Number(cash.val()), cid);
        if (listaProductos[0]) {
            output.html(outputObj.change.map(x=>     //USO JQUERY
                // `<p>${x[0]}: $${x[1]}</p>`
                `<p>$${x[2]} x ${x[1]/x[2]}</p>`
                ).join(" "));
            $('#output').hide().fadeIn(500); //ENCADENO ANIMACION
        } else {
            $('#output').fadeOut(500);
        }
        

    }
    
    render(JSON.parse(sessionStorage.getItem("listaProductos")));
    
    
    //FUNCION PARA ENTREGAR EL CAMBIO Y ACTUALIZAR EL BALANCE DE LA CAJA
    const handCash = $("#handCash"); //USO JQUERY
    handCash.on("click", () => {     //USO JQUERY
        const salida = checkCashRegister(price, Number(cash.val()), cid);
        salida.change.forEach(x => {
            document.getElementById(x[2]).value-= x[1]; 
        });
        
        listaProductos = [];
        price = 0;
        cash.val(0);
        render();

    });
    
    const observable = new Observable((subscriber)=> {
        // price.on("input", () => {
        //     subscriber.next(checkCashRegister(Number(price.val()), Number(cash.val()), cid));
        // });
        cash.on("input", () => {
            subscriber.next(checkCashRegister(price, Number(cash.val()), cid));
        });
        
        penny.on("input", () => {
            cid[0][1] = Number(penny.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });

        nickel.on("input", () => {
            cid[1][1] = Number(nickel.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });

        dime.on("input", () => {
            cid[2][1] = Number(dime.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });

        quarter.on("input", () => {
            cid[3][1] = Number(quarter.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });

        one.on("input", () => {
            cid[4][1] = Number(one.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });

        five.on("input", () => {
            cid[5][1] = Number(five.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });

        ten.on("input", () => {
            cid[6][1] = Number(ten.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });

        twenty.on("input", () => {
            cid[7][1] = Number(twenty.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });

        oneHundred.on("input", () => {
            cid[8][1] = Number(oneHundred.val());
            subscriber.next(checkCashRegister(price, cash.val(), cid));
        });
    
    });
    
    const handler = {
        next: value => {
            output.html(value.change.map(x=>
            // `<p>${x[0]}: $${x[1]}</p>`
            `<p>$${x[2]} x ${x[1]/x[2]}</p>`
            ).join(" "));
            $('#output').hide().fadeIn(500); //ENCADENO ANIMACION
        },
        error: err => console.log(err),
        complete: () => console.log('proceso completo'),
    }

    const subscription = observable.subscribe(handler);
}