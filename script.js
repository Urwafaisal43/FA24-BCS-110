let cart = [];

const cartIcon = document.getElementById("cartIcon");
const miniCart = document.getElementById("miniCart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const addButtons = document.querySelectorAll(".add-to-cart");

cartIcon.addEventListener("click", function () {
    miniCart.classList.toggle("show-cart");
});

addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".product-card");
        const name = card.querySelector(".product-name").textContent;
        const priceText = card.querySelector(".product-price").textContent;
        const price = Number(priceText.replace(/[^0-9]/g, ""));

        const productCount = cart.filter(function (item) {
            return item.name === name;
        }).length;

        if (productCount >= 4) {
            return;
        }

        cart.push({
            name: name,
            price: price,
            button: button
        });

        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = "";

    cart.forEach(function (item, index) {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        const text = document.createElement("span");
        text.textContent = item.name + " - Rs. " + item.price.toLocaleString();

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            removeItem(index);
        });

        div.appendChild(text);
        div.appendChild(removeButton);
        cartItems.appendChild(div);
    });

    cartCount.textContent = cart.length;

    const total = cart.reduce(function (sum, item) {
        return sum + item.price;
    }, 0);

    cartTotal.textContent = total.toLocaleString();

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    updateButtons();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateButtons() {
    addButtons.forEach(function (button) {
        const card = button.closest(".product-card");
        const name = card.querySelector(".product-name").textContent;

        const productCount = cart.filter(function (item) {
            return item.name === name;
        }).length;

        if (productCount >= 4) {
            button.disabled = true;
            button.innerHTML = "Limit reached";
        } else {
            button.disabled = false;
            button.innerHTML = '<i class="bi bi-bag-plus"></i>';
        }
    });
}