let dataBase = [
    {
        id: 1,
        name: 'Harry Potter Saga Completa',
        precio: 129.99,
        image: '../media/saga-completa.jpg'
    },
    {
        id: 2,
        name: 'Harry Potter y la Piedra Filosofal',
        precio: 20,
        image: '../media/HarryPotterylapiedrafilosofal.jpeg'
    },
    {
        id: 3,
        name: 'Harry Potter y la Cámara Secreta',
        precio: 20,
        image: '../media/HarryPotterylacamarasecreta.jpeg'
    },
    {
        id: 4,
        name: 'Harry Potter y el prisionero de Azcaban',
        precio: 20,
        image: '../media/harrypotteryelprisionero.jpeg'
    },
    {
        id: 5,
        name: 'Harry Potter y el Cáliz de Fuego',
        precio: 20,
        image: '../media/harrypotteryelcalizdefuego.jpeg'
    },
    {
        id: 6,
        name: 'Harry Potter y la Orden del Fénix',
        precio: 20,
        image: '../media/Harry PotteryOrdendelFenix.jpeg'
    },
    {
        id: 7,
        name: 'Harry Potter y el misterio del Príncipe',
        precio: 20,
        image: '../media/HarryPottermisteriodelprincipe.jpeg'
    },
    {
        id: 8,
        name: 'Harry Potter y las Reliquias de la muerte',
        precio: 20,
        image: '../media/HarryPotterylasreliquias.jpeg'
    },
]

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#button-clean');
const DOMbotonComprar = document.querySelector('#button-buy')

function renderizarProductos() {
    dataBase.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.name;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.image);
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-outline-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', agregarProductoAlCarrito);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();
}

function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = dataBase.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - ${miItem[0].precio}${divisa}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });

    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();
}

function calcularTotal() {

    return carrito.reduce((total, item) => {

        const miItem = dataBase.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });

        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {

    carrito = [];

    renderizarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);


// vaciar carrito despues de darle comprar 
function comprarCarrito() {

    carrito = [];

    renderizarCarrito();
}
DOMbotonComprar.addEventListener('click', comprarCarrito);

DOMbotonComprar.onclick = () => {
    swal({
        title: "Gracias por tu compra!",
        icon: "success",
        button: 'Ok'
    });
}

localStorage.setItem("productos", JSON.stringify([dataBase]))
const mistock = JSON.parse(localStorage.getItem("productos"))
console.log(mistock)

renderizarProductos();
renderizarCarrito();
