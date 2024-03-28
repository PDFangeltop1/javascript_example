const goodsParaLst = [
    ['海底撈【自煮火鍋（麻辣嫩牛/番茄牛肉）】', 189, 300],
    ['桂格無糖養氣人蔘盒裝19瓶', 989],
    ['平面伯爵茶醫療口罩口罩 台灣製造 雙鋼印 醫療口罩 MIT 成人口罩( 現貨供應)', 49, 100],
    ['白色美背復古三門二抽二格衣櫃 衣櫥 臥室收納 大容量置物', 2599, 4180],
    ['FUJIFILM 富士 FUJINON XF 56mm F1.2 R WR 公司貨 新款預購中', 31200],
    ['一體式杯蓋不銹鋼真空保溫保冷杯(SM-GA60)｜600ml 旋蓋式', 1088, 1190],
    ['雙開門電動超跑│阿嬤官方旗艦店', 9999],
    ['NB 復古運動鞋_中性_白銀', 2384, 2980],
    ['3色短襪 男短襪 男生襪子 運動襪 撞色 輕薄透氣 棉襪 女生襪 彈性襪 吸汗', 6, 50],
    ['PGM Switch Pro S205 手把 無線藍牙手把', 374, 485]
];

class Goods {
    constructor(img_path, item_name, original_price, discount_price = null) {
        this.img_path = img_path;
        this.item_name = item_name;
        this.original_price = original_price;
        this.discount_price = discount_price;
        this.calDiscountRate();
    }
    calDiscountRate() {
        if (this.discount_price) {
            this.discount_rate = Math.round(this.discount_price * 100 / this.original_price) / 10;
        } else {
            this.discount_rate = null;
        }
    }
}

const goodLst = []
for (let i = 0; i < goodsParaLst.length; i++) {
    let img_path = `images/product_images/product_image${i + 1}.jpg`;
    if (goodsParaLst[i].length == 2) {
        goodLst.push(new Goods(img_path, goodsParaLst[i][0], goodsParaLst[i][1]));
    } else {
        goodLst.push(new Goods(img_path, goodsParaLst[i][0], goodsParaLst[i][2], goodsParaLst[i][1]));
    }
}
//console.log(goodLst);
generateHomeHTML(goodLst);


let cart = init_cart();
document.querySelector('.cart-num').innerHTML = String(cart.product_num);

function generateHomeHTML(goodLst) {
    let product_grid = document.querySelector('.product-grid');
    //console.log(product_grid.innerHTML);
    let curHtml = "";
    for (let i = 0; i < goodLst.length; i++) {
        let product_discount_str = "";
        let discount_price_str = "<p class='discount-price'></p>"
        if(goodLst[i].discount_rate){
            product_discount_str = `<p class="product-discount">${goodLst[i].discount_rate}折</p>`;
            discount_price_str = `<p class='discount-price'>$${goodLst[i].discount_price}</p>`;
        }
        curHtml += `<div class="product-block">
                        <a href="product.html">
                            <div class="product-image-row">
                                <img class="product-image" src="${goodLst[i].img_path}">
                                ${product_discount_str}
                            </div>

                            <div class="product-information">
                                <div class="product-text">
                                    <p class="product-name">${goodLst[i].item_name}</p>
                                    <div class="add-success hidden-element">
                                        <img class="check-icon" src="images/icons/check.png">
                                        <p class="add-success-p">加入購物車</p>
                                    </div>
                                    <div class="product-price-row">
                                        <div class="product-price">
                                            ${discount_price_str}
                                            <p class="origin-price">$${goodLst[i].original_price}</p>
                                        </div>
                                        <img class="add-to-cart" src="images/icons/cart.png">
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>`
    }
    console.log(typeof curHtml);
    //document.querySelector('.product-grid').innerHTML = curHtml;
}

function init_cart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = {
            product_num: 0,
            product1: {
                num: 0,
                name: 'ramen',
                price: 189,
                delivery_style: '自行取貨'
            },
            total_price: 0,
        }
    }
    return cart;
}

function save_data(keyName, value) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(keyName, jsonValue);
}

window.purchase = ()=>{
    const buyNum = document.querySelector('.buy-num').value;
    cart.product_num += Number(buyNum);
    cart.product1.num += Number(buyNum);
    document.querySelector('.cart-num').innerHTML = String(cart.product_num);
    save_data('cart', cart);
}
export {cart, save_data}

// window解説　
// https://elsammit-beginnerblg.hatenablog.com/entry/2022/05/19/234821#exportimport%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%88%86%E5%89%B2%E3%82%92%E8%A1%8C%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B

