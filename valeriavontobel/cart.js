let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Funktion zum Aktualisieren des Warenkorbs
function updateCartPage() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
        totalPriceElement.innerText = "0.00";
        return;
    }

    let totalPrice = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        totalPrice += item.price * item.quantity;
        return `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>CHF ${item.price.toFixed(2)}</p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Entfernen</button>
            </div>
        `;
    }).join('');

    totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Funktion zum Aktualisieren der Artikelmenge im Warenkorb
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPage();
}

// Funktion zum Entfernen eines Artikels aus dem Warenkorb
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPage();
}

// Checkout-Funktion
function checkout() {
    if (cart.length === 0) {
        alert("Der Warenkorb ist leer!");
        return;
    }

    alert("Kauf erfolgreich abgeschlossen!");
    localStorage.removeItem('cart');
    cart = [];
    updateCartPage();
}

// Aktualisiert die Warenkorb-Seite
updateCartPage();
