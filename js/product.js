import {cart} from './home.js'

function save_data(keyName, value) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(keyName, jsonValue);
}

window.purchase = ()=>{
    const buyNum = document.querySelector('.buy-num').value;
    cart.product_num += Number(buyNum);
    cart.product1.num += Number(buyNum);
    document.querySelector('.cart-num').innerHTML = String(cart.product_num);

    //console.log("from product.html");
    save_data('cart', cart);
}
console.log("into product.js");
export {save_data}
// window解説　
// https://elsammit-beginnerblg.hatenablog.com/entry/2022/05/19/234821#exportimport%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%88%86%E5%89%B2%E3%82%92%E8%A1%8C%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B

