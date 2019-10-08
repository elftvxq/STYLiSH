
const pageParams = new URL(window.location.href);
// console.log(window.location.href);
console.log(pageParams);
const thankParam = pageParams.searchParams;
console.log(thankParam);

if (pageParams.search !== "") {
    for (let pair of thankParam.entries()) {
        // console.log(`key: ${pair[0]}, value: ${pair[1]}`)
        var orderNumer = pair[1];
    }
}



const thankOrder = document.createElement('p');
thankOrder.className = "thankOrder";
thankOrder.textContent = `訂單編號為${orderNumer}，我們會盡快將您的訂購商品寄送。`;

const thankyouSub = document.querySelector(".thankyouSub");
thankyouSub.appendChild(thankOrder);