let productos = [
    {
        title: "Lapicera",
        price: 50,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png",
        id: 1
    },
    {
        title: "Goma de borrar",
        price: 85,
        thumbnail: "https://cdn1.iconfinder.com/data/icons/interface-travel-and-environment/64/eraser-rubber-interface-512.png",
        id: 2
    },
    {
        title: "Papel",
        price: 200,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/round-varieties/60/Rounded_-_High_Ultra_Colour07_-_Lined_Paper-512.png",
        id: 3
    },
    {
        title: "Sacapuntas",
        price: 165,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/Office_supplies/128/sharpener.png",
        id: 4
    },
    {
        title: "Regla",
        price: 120,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/eon-education-i/32/ruler_cm_mm-512.png",
        id: 5
    },
    {
        title: "Calculadora",
        price: 900,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/logistics-and-shipping-5/85/calculator_accounting_math-512.png",
        id: 6
    },
]


const render = (productos) => {
    const li = productos.map(function (productos) {
        
        return `
        <li>${productos.title}: $${productos.price}<button id="button${productos.id}" onclick="remove(${productos.id})">Remover</button></li>
        `;
    }).join(' ');

    const lista = `
    <ul>
         ${li} 
    </ul>    
    `;
    document.getElementById('items').innerHTML = lista;
}

/*REMOVER PRODUCTO LISTA DE COMPRAS*/ 
const remove = (productoID) => {
    productos = productos.filter(producto => producto.id != productoID);
    render(productos);
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    price.value = productos.reduce(reducer, 0);
    price.dispatchEvent(InputEvent);
}

render(productos);