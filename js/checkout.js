import {cart,save_data} from './index.js'

update_buyname();
update_checkout_summary();



function update_buyname(){
    const buyNum = document.querySelector('.buy-num').value;
    document.querySelector('.buy-num').value=cart.product1.num;
}

function update_checkout_summary(){
    let item_price = document.querySelector('.items-price');
    let itemLst = item_price.innerText.split('$');
    //let itemPrice = Number(itemLst[1].replace(':\n$',''));
    //console.log(itemPrice);
    // ['金額', ':\n$5000']
    //console.log(itemLst); 
    itemLst[0] = itemLst[0].replace('\n','');
    itemLst[1] = cart.product1.num*cart.product1.price;
    //console.log(`num: ${cart.product1.num}, price: ${cart.product1.price}`);
    //console.log(itemLst[1]);
    item_price.innerText = itemLst.join('$');




    let delivery_price = document.querySelector('.delivery-price');
    let deliveryLst = delivery_price.innerText.split('$');
    let cartDeliveryPrice = 0;
    if(cart.product1.delivery_style === '自行取貨'){
        cartDeliveryPrice = 0;
    }
    if(cart.product1.delivery_style === '超商取貨'){
        cartDeliveryPrice = 60;
    }
    if(cart.product1.delivery_style === '宅配到家'){
        cartDeliveryPrice = 120;
    }
    deliveryLst[0] = deliveryLst[0].replace('\n','');
    deliveryLst[1] = cartDeliveryPrice;
    delivery_price.innerText = deliveryLst.join('$');


    let total_price = document.querySelector('.total-price');
    let totalLst = total_price.innerText.split('$');
    totalLst[0] = totalLst[0].replace('\n','');
    totalLst[1] = cartDeliveryPrice + cart.product1.num*cart.product1.price;
    total_price.innerText = totalLst.join('$');

}
window.update_product = ()=>{
    let doinput_lst = document.querySelectorAll('.delivery-option');
    doinput_lst.forEach ((d_opt) => {
        let cur_checked = d_opt.getElementsByClassName("delivery-option-input")[0].checked;
        if(cur_checked){
            cart.product1.delivery_style = d_opt.getElementsByClassName("delivery-option-name")[0].innerHTML;
        }else{
            ;
        }
    });
    save_data(cart);
    update_buyname();
    console.log("into update checkout")
    update_checkout_summary();
}



