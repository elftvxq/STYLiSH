//準備相關變數
let apiURL = "https://api.appworks-school.tw/api/1.0/products/";
// let productShow = document.querySelector(".main");
let productPaging; //paging
let categ = "all";
let nextPageUrl;
let inputItem;
let products;
let banners;




function ajax(src, callback) {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            products = JSON.parse(xhr.responseText);
            // console.log(products);
            // 抓取paging
            productPaging = products.paging;
            callback(products);
        };
    }
    // 讀取資料的格式、網址 get為讀取網址的資料
    xhr.open('GET', src);
    xhr.send();
}

// callback=render這段函式
ajax(`${apiURL}${categ}`, function (response) { render(response); });

//渲染產品內容
//參數命名為info，為一直變動的資料
function render(info) {
    let data = info.data;
    let product = '';
    // console.log(data);
    // console.log(data[0].colors[0]);
    // console.log(data[0].id);
    for (let i = 0; i < data.length; i++) {
        product += `<div class="clothCard">`;
        product += `<a href="./product.html?id=${data[0].id}"><img src="${data[i].main_image}" class="item" /></a>`;
        product += `<div>`;
        for (let j = 0; j < data[i].colors.length; j++) {
            product += `<div class="product-color" style="background-color:#${data[i].colors[j].code}"></div>`;
        }

        product += `</div>`;
        product += `<div class="title">${data[i].title}</div>`;
        product += `<div class="price"> NTD ${data[i].price}</div>`;
        product += `</div>`;
    }

    document.querySelector('.product').innerHTML = product;
};

// function render(info){

//         const section = document.createElement('div');
//         section.classList.add('product');

//         let content;

//         info.data.forEach(items => {

//         content = document.createElement('div');
//         content.classList.add('clothCard');

//         const image = document.createElement('img');
//         // image.classList.add('item');
//         image.setAttribute('class', 'item');
//         image.setAttribute('src', items.main_image)
//         image.src = items.main_image;

//         const multiColor = document.createElement('div');
//         multiColor.classList.add('multiColor');

//         let clothColor;

//         items.colors.forEach(color => {
//             clothColor = document.createElement('div');    
//             clothColor.classList.add('product-color')
//             // clothColor.setAttribute('style', 'background-color')
//             clothColor.style.backgroundColor = `#${color.code}`;
//             // clothColor.textContent = `#${color.code}`;
//             // console.log(color.code);
//             multiColor.appendChild(clothColor);
//         });      


//         const title = document.createElement('div');
//         title.classList.add('title');
//         title.textContent = items.title;

//         const price = document.createElement('div');
//         price.classList.add('price');
//         price.textContent = "NTD " + items.price;

//         section.appendChild(content);
//         content.appendChild(image);
//         content.appendChild(multiColor);
//         content.appendChild(title);
//         content.appendChild(price);  
//     });

//         document.querySelector('.main').appendChild(section);
//         // section.appendChild(content);     
// }




//點擊或是按鈕執行搜尋，弄懂render在這裡的意義>"<
let webSearchInput = document.querySelector('.webSearchInput');
webSearchInput.addEventListener('keypress', function (e) {
    var keyID = e.keyCode;
    if (keyID === 13) {
        searchKeyword(render);
    }
}, false);

// 點擊手機版放大鏡跳出搜尋框
document.querySelector('.searchBtn').addEventListener('click', function (e) {
    document.querySelector('.mobileSearchBar').innerHTML = '<input class="mobileSearchbox" id="mobileInput" type="text" name="search" style="width: 60px; border-bottom: solid 2px #979797; border-top: none; border-left: none; border-right: none; font-size: 18px;">';
});

//手機版的搜尋功能
let mobileSearchbox = document.querySelector('.mobileSearchBar');
mobileSearchbox.addEventListener('keypress', function (e) {
    let reqMoWord = document.getElementById('mobileInput').value;
    ajax("https://api.appworks-school.tw/api/1.0/products/search?keyword=" + reqMoWord, function (response) {
        render(response);
    });
}, false);


// 搜尋關鍵字抓取資料 
function searchKeyword(callback) {
    let result = new XMLHttpRequest();
    let reqWord = document.getElementById('inputKeyword').value;

    result.onreadystatechange = function () {
        if (result.readyState === 4) {
            let productResult = JSON.parse(result.responseText);
            // console.log(productResult);
            callback(productResult);
        }
    }

    result.open('GET', "https://api.appworks-school.tw/api/1.0/products/search?keyword=" + reqWord);
    result.send();
};



// 網頁版切換產品類別
// 事件執行，再執行ajax函式，categ寫上各個產品類別
let CateWomen = document.getElementById('CateWomen');
CateWomen.addEventListener('click', () => {
    categ = "women";
    ajax(`${apiURL}${categ}`, function (response) {
        render(response);
    })
});


let CateMen = document.getElementById('CateMen');
CateMen.addEventListener('click', () => {
    categ = "men";
    ajax(`${apiURL}${categ}`, function (response) {
        render(response);
    })
});

let CateAccessories = document.getElementById('CateAccessories');
CateAccessories.addEventListener('click', () => {
    categ = "accessories";
    ajax(`${apiURL}${categ}`, function (response) {
        render(response);
    })
});


// 手機版切換產品類別
let MoCateWomen = document.getElementById('MoCateWomen');
MoCateWomen.addEventListener('click', () => {
    categ = "women";
    ajax(`${apiURL}${categ}`, function (response) {
        render(response);
    })
});

let MoCateMen = document.getElementById('MoCateMen');
MoCateMen.addEventListener('click', () => {
    categ = "men";
    ajax(`${apiURL}${categ}`, function (response) {
        render(response);
    })
});

let MoCateAccessories = document.getElementById('MoCateAccessories');
MoCateAccessories.addEventListener('click', () => {
    categ = "accessories";
    ajax(`${apiURL}${categ}`, function (response) {
        render(response);
    })
});

//點擊logo回到出現所有產品類別
let CateAll = document.querySelector('.logo');
CateAll.addEventListener('click', () => {
    categ = "all";
    ajax(`${apiURL}${categ}`, function (response) {
        render(response);
    })
});


//監聽滾輪視窗的位置
// innerHeighht:視窗內可讀範圍的高度
// window.screenY: 距離螢幕頂部的像素值


// var last_known_scroll_position = 0;
// var ticking = false;


// window.addEventListener('scroll', function (e) {
//     last_known_scroll_position = window.scrollY;
//      //視窗高度 //const windowHeight = window.innerHeight
//     // const bottomArea = document.querySelector('footer').getBoundingClientRect()
//     // const footTotop = bottomArea.top //footer至頂端高度

//     if (!ticking) {
//         window.requestAnimationFrame(function () {
//             getHeight();
//             ticking = false;
//         });
//     }
//     ticking = true;
// });

// function getHeight(){
//     const windowHeight = document.documentElement.clientHeight;
//     const footerTop = document.getElementsByClassName('footer')[0].getBoundingClientRect().bottom;
//     console.log(windowHeight);
//     console.log(footerTop);
// }






