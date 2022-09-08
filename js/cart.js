if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
    
}else {
    ready()
}

function ready() {
    let removeItemFromCart = document.getElementsByClassName('btn-danger');

for (let i = 0; i < removeItemFromCart.length; i++) {
    let button  = removeItemFromCart[i];
    
    button.addEventListener('click', removeCartItem);
}

let quantityInputs = document.getElementsByClassName('cart-quantity-input')

for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

    let addToCartButtons = document.getElementsByClassName('shop-item-button')

    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)


};


function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);
  





function purchaseClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)

    addItemToCart(title, price, imageSrc)
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.innerText = title
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = document.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
       if (cartItemNames[i].innerText == title ) {
        alert('This item is already added to your cart')
        return // exits you out of the function
       }
        
    }

    let cartRowContents = 

    `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc} " width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>
    `

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0] //Picks only the first item 
    let cartRows = cartItemContainer.getElementsByClassName('cart-row ')// get all the cart-row class items inside cart-items 
    let total = 0;

for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('cart-price')[0]
    let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    let price = parseFloat(priceElement.innerText.replace('$', ''))
    let quantity = quantityElement.value
    total = total + (price * quantity)

}
total = Math.round(total * 100) / 100
document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
console.log('lfg!!!')
//Watch at 37:40 again 