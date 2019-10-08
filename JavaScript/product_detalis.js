let idSearchApi = "https://api.appworks-school.tw/api/1.0/products/details?id=";
let color;
let colors;
let size;
let sizes;

let currentColor;
let currentColorName;
let currentSize;
let currentMax;
let currentAmount;

let select;
let cart;
let count;
let btnIncrease;
let btnReduce;
let stock;

let purchaseProduct;
let localstorage;
// 購物車內清單
let list = []; 
let bill;
let cartQty;
let cartQtyNav;
let totalCount;

// console.log(location.href);
// 點擊後的網址 file:///Users/shiwanyu/Desktop/Web-Front-End-2019-Summer/students/emma/stylish/product.html?id=201807201824


// 將取得的網址進行字串分割以取得id
// let localUrl = location.href;
const urlParams = new URLSearchParams(window.location.search);
// console.log(urlParams);
const myParam = urlParams.get('myParam');
// console.log(myParam);


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// query string: ?foo=lorem&bar=&baz
var productId = getParameterByName('id'); // "lorem"
// console.log(productId);


// 把取到的id透過AJAX拿去跟後端叫資料
var getId = new XMLHttpRequest();
getId.open('GET', `${idSearchApi}${productId}`, true);
getId.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
getId.send();

getId.onload = function () {
    // console.log(getId.responseText);
    if (getId.readyState === 4 & getId.status === 200) {
        let str = JSON.parse(getId.responseText);
        // console.log(parseDetail);
        // 渲染網頁
        parseDetail(str);
    }
};



//將得到產品詳細資訊渲染至網頁上
function parseDetail(proInfo) {
    // /利用DOM來渲染
    const mainProduct = document.querySelector('.mainProduct');
    const productMainpic = document.createElement("div");
    productMainpic.className = "productMainpic";
    mainProduct.appendChild(productMainpic);

    const productImg = document.createElement("img");
    productImg.src = proInfo.data.main_image;
    productMainpic.appendChild(productImg);


    const productIntro = document.querySelector(".productIntro");
    mainProduct.appendChild(productIntro);

    const productBuy = document.createElement("div");
    productBuy.className = "productBuy";
    productIntro.appendChild(productBuy);

    const productTitle = document.createElement("h3");
    productTitle.className = "productTitle";
    productTitle.textContent = proInfo.data.title;
    // console.log(productTitle.textContent);
    const productId = document.createElement("p");
    productId.className = "productId";
    productId.textContent = proInfo.data.id;

    const productPrice = document.createElement("h4");
    productPrice.className = "productPrice";
    productPrice.textContent = "TWD." + proInfo.data.price;


    productBuy.appendChild(productTitle);
    productBuy.appendChild(productId);
    productBuy.appendChild(productPrice);
    productIntro.appendChild(productBuy);

    const productColor = document.createElement("div");
    productColor.className = "productColor";
    productIntro.appendChild(productColor);

    const ColorP = document.createElement("p");
    ColorP.className = "ColorP";
    ColorP.textContent = "顏色";
    ColorP.style.borderRight = "1px solid #3f3a3a";
    productColor.appendChild(ColorP);


    //按鈕數量加減功能
    const btnIncrease = document.getElementById("btnIncrease");
    const btnReduce = document.getElementById("btnReduce");
    // const inputNum = document.getElementById("inputNum");
    //控制數字加減
    const count = document.querySelector('.CalculateInput');
    count.value = 1;
    count.textContent = count.value;
    currentAmount = count.value;



    proInfo.data.colors.forEach(element => {
        // console.log(element);
        const SelectColors = document.createElement("div");
        SelectColors.className = "SelectColors";
        SelectColors.style.backgroundColor = `#${element.code}`;
        // 為了儲存選取色塊的id
        SelectColors.id = `${element.code}`;
        SelectColors.value = `${element.name}`;
        productColor.appendChild(SelectColors);
    });

    

    // console.log(proInfo.data.color.name);
    // console.log(proInfo.data.colors.name);
    // 選擇顏色並且加上特效外型框
    // 1.找到可被選擇的色塊
    // 2.不管選哪個都先移除所有邊框再加框
    let SelectColors = document.querySelectorAll('.SelectColors');
    // console.log(SelectColors);
    for (let i = 0; i < SelectColors.length; i++) {
        //   console.log(SelectColors.length);  
        SelectColors[i].addEventListener('click', function (e) {
            let x = e.target;
            // console.log(x);
            removeColor();
            x.classList.add("selectBorder");
            colors = document.querySelector('.selectBorder');
            // console.log(color);

            // 3.記憶住目前所選的顏色
            currentColor = colors.id;
            currentColorName = colors.value;
            // console.log(currentColorName);

            // 4.將值重新歸0計算
            count.value = 1;
            count.textContent = count.value;
            currentAmount = count.value;
            getStock();
        });
    };

    // 動態加上邊框效果但是一次只能選一個
    // 移除所有邊框
    function removeColor() {
        for (let i = 0; i < SelectColors.length; i++) {
            // SelectColors[i].style.border = "0px";
            SelectColors[i].classList.remove("selectBorder");
        }
    };


    const productSize = document.createElement("div");
    productSize.className = "productSize";
    productIntro.appendChild(productSize);

    const sizeP = document.createElement("p");
    sizeP.textContent = "尺寸";
    sizeP.style.borderRight = "1px solid #3f3a3a";
    productSize.appendChild(sizeP);

    proInfo.data.sizes.forEach(size => {
        const avalableSize = document.createElement("div");
        avalableSize.className = "avalableSize";
        avalableSize.id = size;
        avalableSize.textContent = size;
        // console.log(size.sizes);
        productSize.appendChild(avalableSize);
    });



    // 1.選擇尺寸變換顏色特效 & 選擇尺寸
    let avalableSize = document.querySelectorAll('.avalableSize');

    for (let j = 0; j < avalableSize.length; j++) {
        avalableSize[j].addEventListener('click', function (e) {
            let x = e.target;
            removeEffect();
            x.classList.add("sizeEffect");
            sizes = document.querySelector('.sizeEffect');
            // console.log(sizes);

            // 記憶住目前所選的尺寸    
            currentSize = sizes.id;
         

            //將值重新歸0計算
            count.value = 1;
            count.textContent = count.value;
            currentAmount = count.value;
            getStock();
        })
    };

    // 2.移除沒有被選擇的色塊邊框
    function removeEffect() {
        for (let j = 0; j < avalableSize.length; j++) {
            avalableSize[j].classList.remove("sizeEffect");
        }
    };


    const productNum = document.querySelector(".productNum");
    // productNum.className = "productNum";
    productIntro.appendChild(productNum);
    const addCart = document.querySelector(".addCart");
    productIntro.appendChild(addCart);

    const numP = document.createElement("p");
    numP.textContent = "數量";
    numP.style.borderRight = "1px solid #3f3a3a";
    const calculateNum = document.querySelector(".calculateNum");
    productNum.appendChild(numP);
    productNum.appendChild(calculateNum);
    calculateNum.appendChild(btnReduce);
    calculateNum.appendChild(count);
    calculateNum.appendChild(btnIncrease);

    //使用尺寸或顏色數量對應庫存功能
    const select = document.querySelector('.productIntro');
    const cart = document.querySelector('.addCart');

    const productInfo = document.createElement("div");
    productInfo.className = "productInfo";
    productIntro.appendChild(productInfo);

    const productInfoP = document.createElement("p");
    productInfoP.className = "productInfoP";
    productInfoP.textContent = "實品顏色依單品照為主";

    const texture = document.createElement("p");
    texture.className = "texture";
    texture.textContent = "*" + proInfo.data.texture;

    const des = proInfo.data.description.split('\r\n');
    const thickness = document.createElement("p");
    thickness.className = "thickness";
    thickness.textContent = des[0];
    const flexity = document.createElement("p");
    flexity.className = "flexity";
    flexity.textContent = des[1];


    const originCountry = document.createElement("p");
    originCountry.className = "originCountry";
    originCountry.textContent = "素材產地/" + proInfo.data.place;

    const factoryCountry = document.createElement("p");
    factoryCountry.className = "factoryCountry";
    factoryCountry.textContent = "加工產地/" + proInfo.data.place;

    productInfo.appendChild(productInfoP);
    productInfo.appendChild(texture);
    productInfo.appendChild(thickness);
    productInfo.appendChild(flexity);
    productInfo.appendChild(originCountry);
    productInfo.appendChild(factoryCountry);



    //渲染詳細說明部分
    const explainInfo = document.querySelector('.explainInfo');
    const explainSub = document.createElement("p");
    explainSub.className = "explainSub";
    explainSub.textContent = proInfo.data.story;
    explainInfo.appendChild(explainSub);

    proInfo.data.images.forEach(image => {
        const explainPic = document.createElement('img');
        explainPic.className = "explainPic";
        explainPic.src = image;
        explainInfo.appendChild(explainPic);
    });

    // console.log(proInfo.data.variants);
    function getStock(){
        proInfo.data.variants.forEach(item => {

        if ( currentColor === item.color_code && currentSize === item.size) {
               stock = item.stock;             
        }
    });   
};


    // 按鈕加減功能
    // 本來找不到stock，要命名stock給全域使用getStock
    btnIncrease.addEventListener("click", () => {
            if (currentAmount <= stock) {
                count.value++;
                count.textContent = count.value;
                currentAmount = count.value;
            }
    });

    btnReduce.addEventListener("click", () => {

        if (count.value > 1) {
            count.value--;
            count.textContent = count.value;
            currentAmount = count.value;
        }
    }); 


    // 判斷庫存
    //尚未選擇產品尺寸顏色無法加入購物車
    if (currentColor === undefined || currentSize === undefined) {
        cart.className = "add-to-cart-faded";
    }

    select.addEventListener("click", () => {
        // console.log(proInfo.data.variants);

        proInfo.data.variants.forEach(item => {

            let {
                color_code,
                size,
                stock
            } = item;

            // console.log(color_code);
            // console.log(size);
            // console.log(stock);


            // 必須選擇顏色＆尺寸才能加入購物車
            if (currentColor === color_code && currentSize === size) {
                cart.className = "addCart";
                cart.textContent = "加入購物車";
                currentMax = stock;


                
            // 如果加到購物車,要扣掉庫存 
            for (let i = 0; i < list.length; i++) {
                    if (list[i].color.code === color_code && list[i].size === size) {
                        stock = stock - list[i].qty;
                    }
                }

                // 沒有庫存的狀態
                if (stock === 0) {
                    
                    cart.textContent =  "目前無庫存!";
                    cart.className = "add-to-card-no-stock";
                    currentAmount = 0;
                    count.value = 0;
                    count.textContent = currentAmount;

                    // console.log(colors);
                   
                    if (currentColor === color_code) {
                        colors.className = "colorFaded";
                        sizes.className = "avalableSize";
                    } 
                  
                    
                    if (currentSize === size) {
                        sizes.className = "sizeFaded";
                        colors.className = "SelectColors";
                    } 
                   

                } else {
                    stock = stock - currentAmount;

                    if (stock < 0) {

                        currentAmount = stock + currentAmount;
                        stock = 0;
                        count.value = currentAmount;
                        count.textContent = currentAmount;
                        alert(`你選擇的商品只剩${currentAmount}件。`);
                    }
                }

            }
   
            // 判斷顏色庫存是否足夠  
            if (currentSize === size & currentColor === color_code) {
                if (currentAmount <= stock && stock !== 0) {
                    if (colors.className === "colorFaded") {
                        colors.className = "SelectColors";
                        sizes.className = "avalableSize";
                    }
                } else {
                    if (colors.className === "SelectColors") {
                        colors.className = "SelectColors";
                        
                    }
                }
            }

            //判斷尺寸庫存
            if (currentColor === color_code && currentSize === size) {

                if (currentAmount <= stock && stock !== 0) {
                    if (sizes.className === "sizeFaded" ) {
                        sizes.className = "avalableSize";
                        colors.className = "SelectColors";
                    }
                } else {
                    if (sizes.className === "avalableSize")  {
                        sizes.className = "avalableSize";
                    }
                }
            }
    
        });
    });



    // 當localstorage沒有資料陣列，指定一個空陣列放入資料庫
    // stringify把JavaScrip值轉為JSON
    // if (localStorage.getItem('list') === undefined) {
    //     let list = [];
    //     localStorage.setItem('list', JSON.stringify(list));
    //     // 當localstorage已經存在資料陣列，指定一個內容與陣列資料庫相同
    // } else {
    //     let list = JSON.parse(localStorage.getItem("list"));
    // };

    // 購物車內容加入localstorage
    // let list = [];
    cart.addEventListener('click', () => {
        if (cart.className === "addCart" && currentAmount > 0) {
            let bill = 0;
            alert("成功加入購物車！");
        

        
        // 假如車子已有東西，將選擇一樣的商品加進去
        // 需要確認過每個商品 list是陣列
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === proInfo.data.id && currentSize === list[i].size && currentColor === list[i].color.code) {
                    list[i].qty = list[i].qty + currentAmount;
                } else {
                    bill++;
                }
            }
        };

        
        if (bill === list.length) {
            // 要先把purchaseProduct轉為物件容器
            let purchaseProduct = {};

            purchaseProduct.id = proInfo.data.id.toString();
            purchaseProduct.name = proInfo.data.title;
            purchaseProduct.price = proInfo.data.price;
            purchaseProduct.color = {
                "name": `${currentColorName}`,
                "code": `${currentColor}`
            };
            purchaseProduct.size = currentSize;
            purchaseProduct.qty = currentAmount;
            purchaseProduct.image = proInfo.data.main_image;
            purchaseProduct.max = currentMax;


            list.push(purchaseProduct);  
            console.log(list);    
        }
           
            localStorage.setItem('list', JSON.stringify(list));
            console.log(localStorage);
            
        } else{
            
            let purchaseProduct = {};

            purchaseProduct.id = proInfo.data.id;
            purchaseProduct.name = proInfo.data.title;
            purchaseProduct.price = proInfo.data.price;
            purchaseProduct.color = {
                "name": `${currentColorName}`,
                "code": `${currentColor}`
            };
            purchaseProduct.size = currentSize;
            purchaseProduct.qty = currentAmount;
            purchaseProduct.image = proInfo.data.main_image;
            purchaseProduct.max = currentMax;


            list.push(purchaseProduct);
            localStorage.setItem('list', JSON.stringify(list));  
        }
            if (localStorage.getItem('access_token') !== "undefined"){
                var access_token = JSON.parse(localStorage.getItem('access_token'))
            }
            createShoppingList();
            printCart();
    });

        // 把現有的list再呼叫出來一次
        // 為了避免list為空值
        if (localStorage.getItem('list') === null) {
            let list = [];
            localStorage.setItem('list', JSON.stringify(list));
            // 當localstorage已經存在資料陣列，指定一個內容與陣列資料庫相同
        } else {
            list = JSON.parse(localStorage.getItem("list"));
        };
        
        
       
};

 createShoppingList();

        // 購物車數字變化
        function createShoppingList() {
            let totalCount = 0;
            list = JSON.parse(localStorage.getItem("list"));
            for (let i = 0; i < list.length; i++) {
                totalCount = parseInt(list[i].qty) + parseInt(totalCount);
                // console.log(totalCount);   
            }

            const cartQty = document.querySelector('.cartNum');
            const cartQtyNav = document.querySelector('.cartNumNav');
            cartQty.textContent = totalCount;
            cartQtyNav.textContent = totalCount;
            
            // console.log(totalCount);
        };
    