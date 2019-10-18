//準備相關變數
let apiURL = "https://api.appworks-school.tw/api/1.0/products/";
// let productShow = document.querySelector(".main");
let productPaging; //paging
let categ;
// let menCateg = "?category=men";
// let womenCateg = "?category=women";
// let accessoriesCateg = "?vategory=accessories";
let nextPageUrl;
let inputItem;
let products;
let banners;
let idSeachApi = "https://api.appworks-school.tw/api/1.0/products/details?id=";



function ajax(src, callback) {
    
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            products =  JSON.parse(xhr.responseText);
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


//渲染產品內容
//參數命名為info，為一直變動的資料
function render(info) {
    let data = info.data;
    let product = '';
    // console.log(data);
    // console.log(data[0].colors[0]);
    // console.log(data[0].id);
    for (let i = 0; i < data.length; i++ ){
        product += `<div class="clothCard">`;
        product += `<a href="./product.html?id=${data[i].id}"><img src="${data[i].main_image}" class="item" /></a>`;
        product += `<div>`;
        for (let j = 0; j < data[i].colors.length; j++){
            product += `<div class="product-color" style="background-color:#${data[i].colors[j].code}"></div>`;            
        }

        product+= `</div>`;
        product+= `<div class="title">${data[i].title}</div>`;
        product+= `<div class="price"> NTD ${data[i].price}</div>`;
        product+= `</div>`;
    }

    document.querySelector('.product').innerHTML = product;
};



// 各頁面網址
// 先強制輸入網址，再去抓網址的參數後面，再將參數當中的字(比如women, men)帶進ajax

const prodoductParams = new URL(window.location.href);
// console.log(prodoductParams);
const originParam = prodoductParams.search;
const ProParam = prodoductParams.searchParams;
console.log(originParam);

if (!originParam) {
    categ = "all";
    ajax(`${apiURL}${categ}`, function (response) { render(response); });
    } else {
    for (let pair of ProParam.entries()) {
    console.log(`key: ${pair[0]}, value: ${pair[1]}`)
    var categorySwitch = pair[1]; 
    categ = categorySwitch; 
    ajax(`${apiURL}${categ}`, function (response) {render(response);});
    } 
}

// callback=render這段函式
console.log(categ);


//點擊或是按鈕執行搜尋，弄懂render在這裡的意義>"<
let webSearchInput = document.querySelector('.webSearchInput');
webSearchInput.addEventListener('keypress', function(e){
    var keyID = e.keyCode;
    if (keyID === 13) {
        searchKeyword(render);
    }
}, false);

// 點擊手機版放大鏡跳出搜尋框
document.querySelector('.searchBtn').addEventListener('click',function(e){
    document.querySelector('.mobileSearchBar').innerHTML = '<input class="mobileSearchbox" id="mobileInput" type="text" name="search" style="width: 60px; border-bottom: solid 2px #979797; border-top: none; border-left: none; border-right: none; font-size: 18px;">';
});

//手機版的搜尋功能
let mobileSearchbox = document.querySelector('.mobileSearchBar');
mobileSearchbox.addEventListener('keypress', function(e) {
    let reqMoWord = document.getElementById('mobileInput').value;
    ajax("https://api.appworks-school.tw/api/1.0/products/search?keyword=" + reqMoWord, function (response) {
        render(response);
    });
}, false);


// 搜尋關鍵字抓取資料 
function searchKeyword(callback) {
    let result = new XMLHttpRequest();
    let reqWord = document.getElementById('inputKeyword').value;

    result.onreadystatechange = function(){
        if (result.readyState === 4) {
            let productResult = JSON.parse(result.responseText);
            // console.log(productResult);
            callback(productResult);
        }
    }
    
    result.open('GET', "https://api.appworks-school.tw/api/1.0/products/search?keyword=" + reqWord);
    result.send();
};






// 假如到達指定位置，會去讀取下一頁資料並且執行renderMore功能
//如果接近footer,觸發讀取更多下一頁paging資料
// ajax再執行渲染
// 設定loading狀態打開
let loading = false;
function ajaxMore() {
    const windowHeight = document.documentElement.clientHeight + 200;
    const footerTop = document.getElementsByClassName('footer')[0].getBoundingClientRect().top;
    // console.log(windowHeight);
    // console.log(footerTop);

    //如果滾輪來到接近底部，且loading狀態打開
    //判斷有沒有下一頁
    if (windowHeight > footerTop && !loading) {
        if (productPaging) {
            nextPageUrl = `${apiURL}${categ}?paging=${productPaging}`;
        } else {
            return;
        }
        loading = true;
        ajax(nextPageUrl, function (response) { renderMore(response); loading = false; })
        // window.removeEventListener('scroll', ajaxMore);
    }
}

// 監聽scroll的行為，如果scroll就執行ajaxMore
function scroll() {
    window.addEventListener('scroll', ajaxMore);
}

scroll();


//render more功能: 取得scroll滑下來更多的資料並且顯示
function renderMore(moreInfo) {

    let moreData = moreInfo.data;
    let moreProduct = "";

    for (let i = 0; i < moreData.length; i++) {
        moreProduct += `<div class="clothCard">`;
        moreProduct += `<a href = "./product.html?id=${moreData[i].id}" ><img src="${moreData[i].main_image}" class="item" /></a>`;
        moreProduct += `<div>`;
        for (let j = 0; j < moreData[i].colors.length; j++) {
            moreProduct += `<div class="product-color" style="background-color:#${moreData[i].colors[j].code}"></div>`;
        }

        moreProduct += `</div>`;
        moreProduct += `<div class="title">${moreData[i].title}</div>`;
        moreProduct += `<div class="price"> NTD ${moreData[i].price}</div>`;
        moreProduct += `</div>`;
    }
    document.querySelector('.product').innerHTML += moreProduct;
}


//Part.5 Get marketing campaign

function getData(src, callback) {
    let campaign = new XMLHttpRequest();

    campaign.onreadystatechange = function () {
        if (campaign.readyState === 4) {
            // console.log(campaign.responseText);
            banners = JSON.parse(campaign.responseText);
            callback(banners);
        };

    };
    campaign.open('GET', src);
    campaign.send();
}



function renderBanner(campaignBanner) {
    
    let bannerData = campaignBanner.data; 
    let moreBanner = " ";

    for (let i = 0; i < bannerData.length; i++) {
        const imgContentArray = bannerData[i].story.split("\r\n");
        // console.log(imgContentArray);

        moreBanner += `<div class="backgroundImage" style="background-image: url('https://api.appworks-school.tw${bannerData[i].picture}');">`;
        moreBanner += `<div class="bannerTitle">`;

        for (let j = 0; j < imgContentArray.length-1; j++) {
            // console.log(imgContentArray.length);
            moreBanner += `<h2> ${imgContentArray[j]} </h2>`;
            // console.log(imgContentArray[0][1]);
        }

        for (let j = 0; j < imgContentArray.length - 3; j++) {
            // console.log(imgContentArray.length);
            moreBanner += `<p> ${imgContentArray[3]} </p>`;
        }
        
        moreBanner += `</div>`;
        moreBanner += `</div>`;
    }
    document.querySelector('.banner').innerHTML += moreBanner;
    carousel();
}

getData("https://api.appworks-school.tw/api/1.0/marketing/campaigns", function (response) {renderBanner(response); });



//banner動畫效果
var myIndex = 0;


function carousel() {
    var i;
    var x = document.getElementsByClassName("backgroundImage");
    
    // console.log(document.getElementsByClassName("backgroundImage").length);
    for (i = 0; i < x.length; i++) {

        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 };
    // console.log(x[myIndex - 1]);
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 10000); // Change image every 2 seconds
}
