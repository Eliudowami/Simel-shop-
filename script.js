document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const totalSalesElem = document.getElementById('total-sales');
    const totalProductsElem = document.getElementById('total-products');

    let products = [];
    let totalSales = 0;

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = document.getElementById('product-name').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
        const productStock = parseInt(document.getElementById('product-stock').value);
        const productImage = document.getElementById('product-image').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const product = {
                name: productName,
                price: productPrice,
                stock: productStock,
                image: e.target.result
            };

            products.push(product);
            updateProductList();
            updateMetrics();
            
            productForm.reset();
        }
        reader.readAsDataURL(productImage);
    });

    function updateProductList() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            li.textContent = `${product.name} - KSh ${product.price.toFixed(2)} - Stock: ${product.stock}`;
            li.appendChild(img);
            productList.appendChild(li);
        });
    }

    function updateMetrics() {
        totalProductsElem.textContent = products.length;
        totalSales = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
        totalSalesElem.textContent = totalSales.toFixed(2);
    }
});