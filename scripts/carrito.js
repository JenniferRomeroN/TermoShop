// carrito
const btnCart = document.querySelector('.container-icon-vasos');
const containerCartProducts = document.querySelector('.container-cart-product')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

// Lista de todos los contenedores de productos
const producstList = document.querySelector('.container-items')

// Variable de arreglos de productos
let allProducts = []
const valorTotal = document.querySelector('.total-pagar')
const countProduct = document.querySelector('#contador-productos')

producstList.addEventListener('click', e => {
    if(e.target.classList.contains('bntCart')){
        const product = e.target.parentElement
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        }

        const exist = allProducts.some(product => product.title === infoProduct.title);
        if(exist){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product
                } else{
                    return product
                }
            })
            // nos devolvera el arreglo
            allProducts = [...products]
        } else{
        //para que se vayan sumando/acumulando/cambinar los dos arrays, sin mutar 
            allProducts = [...allProducts, infoProduct];
        }
        showHTML();
    }
});

rowProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement
        const title = product.querySelector('p').textContent

        allProducts = allProducts.filter(product => product.title !== title);
        console.log(allProducts)
        showHTML();

    }
})


// funcion para mostrar HTML
const showHTML = () => {

    if(!allProducts.length){
        containerCartProducts.innerHTML=`
        <p class="cart-empty">The cart is empty</p>
        `
    }

    // limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product =>{
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>   
        `;

        rowProduct.append(containerProduct)

        total = total + parseInt(product.quantity * product.price.slice(1))
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText =  `${total} `
    countProduct.innerText =  totalOfProducts;

};