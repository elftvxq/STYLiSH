// 先把localStorage叫出來
// localStorage.getItem('list');
// list = JSON.parse(localStorage.getItem("list"));

if (localStorage.getItem('list') === null) {
    let list = [];
    localStorage.setItem('list', JSON.stringify(list));
    // 當localstorage已經存在資料陣列，指定一個內容與陣列資料庫相同
} else {
    list = JSON.parse(localStorage.getItem("list"));
};




let cartCount;
let qty1;
let changeQty;
let listMain = document.querySelector('.listMain');
let allsubtotal;
let deliveryFee
let totalFee;
let prime;
let checkOurOrder = {};
let primeKey;
let checkoutData;
let feedback;
let orderNumber;

//先把總數叫出來
function creatToalcount() {
    cartCount = 0;
    for (let i = 0; i < list.length; i++) {
        cartCount += parseInt(list[i].qty);
        // console.log(totalCount);   
    }
};

creatToalcount();


function printCart() {
        
        const cartTotal = document.createElement("p");
        cartTotal.className = "cartTotal";
        cartTotal.textContent = `購物車(${cartCount})`;
        const cartTitle1 = document.querySelector('.cartTitle1');
        cartTitle1.appendChild(cartTotal);


    if (list.length === 0) {
        
        const emptyCart = document.createElement('p');
        emptyCart.className = "emptyCart";
        emptyCart.textContent = "購物車空空的耶";
        listMain.appendChild(emptyCart);
        
    } else{

        for (let i = 0; i < list.length; i++) {

            const shoppingItem = document.createElement('div');
            shoppingItem.className = "shoppingItem";
            shoppingItem.setAttribute("id", i);
            listMain.appendChild(shoppingItem);

            const itemInfo = document.createElement('div');
            itemInfo.className = "itemInfo";
            const itemPic = document.createElement("img");
            shoppingItem.appendChild(itemInfo);

            // console.log(list[0].image);
            itemPic.className = "itemPic";
            itemPic.src = list[i].image;
            itemInfo.appendChild(itemPic);
            
            

            const itemDetail = document.createElement("div");
            itemDetail.className = "itemDetail";
            itemInfo.appendChild(itemDetail);

            const itemDetail1 = document.createElement("div");
            itemDetail1.className ="itemDetail1";
            
            itemDetail.appendChild(itemDetail1);

            const itemTitle = document.createElement("p");
            itemTitle.className ="itemTitle";
            itemTitle.textContent = list[i].name;
            itemDetail1.appendChild(itemTitle);
            

            const itemid = document.createElement('p');
            itemid.className = "itemid";
            itemid.textContent = list[i].id;
            itemDetail1.appendChild(itemid);
            itemDetail.appendChild(itemDetail1);



            const itemDetail2 = document.createElement("div");
            itemDetail2.className = "itemDetail2";
            itemDetail.appendChild(itemDetail2);

            const itemColor = document.createElement("p");
            const itemSize = document.createElement("p");

            itemColor.textContent = `顏色 | ${list[i].color.name}`;
            itemSize.textContent = `尺寸 | ${list[i].size}`;
            itemDetail2.appendChild(itemColor);
            itemDetail2.appendChild(itemSize);

            const mobileItem = document.createElement("div");
            mobileItem.className = "mobileItem";
            shoppingItem.appendChild(mobileItem);

            const p1 = document.createElement('p');
            p1.textContent = "數量";
            const p2 = document.createElement('p');
            p2.textContent = "單價";
            const p3 = document.createElement('p');
            p3.textContent = "小計";
            mobileItem.appendChild(p1);
            mobileItem.appendChild(p2);
            mobileItem.appendChild(p3);

            const itemQty = document.createElement('div');
            itemQty.className = ("itemQty");
            shoppingItem.appendChild(itemQty);

            const qty1 = document.createElement("select");
            qty1.className = "qty1";
            qty1.title = i;
            qty1.onchange = changeQty;    
            itemQty.appendChild(qty1);

           
            // 選項：選項數量等於庫存，固定在放到購物車的數量
            for (let j = 1; j < list[i].max+1 ; j++) {    
            const option = document.createElement("option");
            option.textContent = j;
            option.value = j;
            // qty1.appendChild(option);
            if (j === parseInt(list[i].qty)) {
                option.selected = "selected";
            }
                qty1.appendChild(option);    
            };


            const itemPrice = document.createElement("p");
            itemPrice.className = "itemPrice";
            itemPrice.textContent = list[i].price;

            const itemSubtotal = document.createElement("p");
            itemSubtotal.className = "itemSubtotal";
            itemSubtotal.textContent = `${list[i].price*list[i].qty}`;

            

            const itemDelete = document.createElement("p");
            itemDelete.className = "itemDelete";
            

            const deleteIcon = document.createElement("img");
            deleteIcon.className = "deleteIcon";
            deleteIcon.src = "images/cart-remove.png";
            //
            deleteIcon.setAttribute("onclick","deleteProduct(this)");
            //
            itemDelete.appendChild(deleteIcon);

            shoppingItem.appendChild(itemPrice);
            shoppingItem.appendChild(itemSubtotal);
            shoppingItem.appendChild(itemDelete);
        
            // 更改選單欲購買功能，更改list陣列之後寫入localStorage
            function changeQty(e) {

                let changeAmount = e.target.value;
                // console.log(changeAmount);
                let changeObject = e.target.parentNode.parentNode.id;
                list[changeObject].qty = changeAmount;
                // console.log(list[changeObject].qty);

                localStorage.setItem('list', JSON.stringify(list));

                let changeSubtotal = changeAmount * list[changeObject].price;
                console.log(changeSubtotal);
                itemSubtotal.textContent = changeSubtotal;
                
                window.location.reload();
                addToCart();
                }
                
           
            }
            // 迴圈結束
                   
            
            // 顯示全品項金額
              const feeTotal = document.querySelector('.feeTotal');
              const feeNumTotal = document.createElement("p");
              feeNumTotal.className = "feeNumTotal"; 
            
              allsubtotal =0;
              for (let j = 0; j < list.length; j++) {
                  allsubtotal = parseInt(list[j].qty * list[j].price) + parseInt(allsubtotal);
                //   console.log(allsubtotal)        
              }
              feeNumTotal.textContent = allsubtotal;
              feeTotal.appendChild(feeNumTotal);  


            //顯示運費
            const feeNumDelivery = document.createElement('p');
            feeNumDelivery.className = "feeNumDelivery";
            const feeDeliver = document.querySelector('.feeDeliver');
            feeDeliver.appendChild(feeNumDelivery);
            // feeNumDelivery.textContent = 0;
            if (list.length === 0) {
                feeNumDeliver.textContent = "0";
            } else {
                feeNumDelivery.textContent = "30";
            }
            deliveryFee = Number(feeNumDelivery.textContent);
            

             //總金額計算
            const feePay = document.querySelector(".feePay");
            const feeNumSum = document.createElement("p");
            feeNumSum.className = "feeNumSum";
            feePay.appendChild(feeNumSum);
            totalFee = allsubtotal + deliveryFee;
            // console.log(totalFee);
            feeNumSum.textContent = totalFee;            
        }
    
    }
            


    function deleteProduct(obj) {
    // deleteIcon.addEventListener('click', (tar)=>{
    //     let deleteObject = tar.target.parentNode.parentNode.id;
    //     console(deleteObject);
    // });
    // console.log(obj);

    let deleteObject = obj.parentNode.parentNode.id;
    console.log(deleteObject);
    let deletePosition = list[deleteObject]
        console.log(deletePosition);

    var removed = list.splice(deletePosition, 1);
    localStorage.setItem('list', JSON.stringify(list));    

    // obj.addEventListener('click', (tar) => {
    window.location.reload();

}

printCart();


TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');


var fields = {
    number: {
        // css selector
        element: '#card-number',
        placeholder: '**** **** **** ****'
    },
    expirationDate: {
        // DOM object
        element: document.getElementById('card-expiration-date'),
        placeholder: 'MM / YY'
    },
    ccv: {
        element: '#card-ccv',
        placeholder: '後三碼'
    }
};
// 選填 CCV Example

TPDirect.card.setup({
    fields: fields,
    styles: {
        // Style all elements
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.cvc': {
            // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
            // 'font-size': '16px'
        },
        // style focus state
        ':focus': {
            // 'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    }
});


// onUpdate

TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        // submitButton.removeAttribute('disabled')
    } else {
        // Disable submit Button to get prime.
        // submitButton.setAttribute('disabled', true)
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    if (update.cardType === 'visa') {
        // Handle card type visa.
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.cvc === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.cvc === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }
})


//  Get Tappay Fields Status

// call TPDirect.card.getPrime when user submit form to get tappay prime
// $('form').on('submit', onSubmit)

function onSubmit() {
    // e.preventDefault();

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('信用卡輸入資料有誤或輸入不完整，請重新驗證！')
        return false;
    } 
    else 
    {
        // Get prime
        TPDirect.card.getPrime((result) => {
            console.log(result);
            if (result.status !== 0) {
                alert('get prime error ' + result.msg);
                return false;
            }
            else{
                primeKey = result.card.prime;
                console.log(primeKey);
                checkTotalInfo();
            }
            // alert('get prime 成功，prime: ' + result.card.prime)
            
            // send prime to your server, to pay with Pay by Prime API .
            // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
            // savePaymentInfo();
        })
        
    }



    
}

TPDirect.getFraudId();


// 將表單資料儲存至 localStorage
const savenameElement = document.getElementsByName("name")[0];
let saveName = "";
const savephoneElement = document.getElementsByName("phone")[0];
let savePhone = "";
const savemailElement = document.getElementsByName("mail")[0];
let saveMail = "";
const saveaddressElement = document.getElementsByName("address")[0];
let saveAddress = "";
const saveTimeElement = document.getElementsByName("receiving-time")[0];
let saveTime = "";
console.log(saveTime);

const saveShippingElement = document.getElementsByName("shipping")[0];
let saveShipping = "";
const savePaymentElement = document.getElementsByName("payment")[0];
let savePayment = "";

console.log(list);


// 確認購物車內有東西
function checkList() {
    if (list.length > 0){
        return true;
    } else {
        alert("你的購物車空空的耶！")
        return false;
    }
};

// 確認表單內都有填資料
var mailCheck = /^[a-zA-Z0-9_-]{5,}@([a-zA-Z0-9_-]{2,})+.+(com|gov|net|com.cn|edu.cn)$/;
var phoneCheck  = /^(13[0-9]|14[57]|15[0-35-9]|17[6-8]|18[0-9])[0-9]{8}$/;

function checkOrderInfo() {
    saveName = savenameElement.value;
    savePhone = savephoneElement.value;
    saveMail = savemailElement.value;
    saveAddress = saveaddressElement.value;
    saveTime = saveTimeElement.value;
    saveShipping = saveShippingElement.value;
    savePayment = savePaymentElement.value;

    console.log(saveName, phoneCheck.test(savePhone), mailCheck.test(saveMail), saveAddress, saveTime)

    if (saveName !== "" && savePhone !== "" && mailCheck.test(saveMail) == true && saveAddress !== "" && saveTime !== "") {
        return true;        
    } else { 
        alert("表單資料未完整，請填寫完後再送出。")
        return false;
    }
}


// 取得使用者輸入表單的資料


    // if (localStorage.getItem('orderCheckOut') === null) {
    //     var storageArray = [];
    //     localStorage.setItem('orderCheckOut', JSON.stringify(storageArray));
    //     //當localStorage已存在資料陣列，指定一個內容與陣列資料庫相同的陣列
    // } else {
    //     var storageArray = JSON.parse(localStorage.getItem('orderCheckOut'));
    // };




const confirmPay = document.querySelector('.confirmPay');
console.log(confirmPay);

//獲取後端回應
function sendData(data) {
    //创建xhr对象 
    var xhr = new XMLHttpRequest();
    //创建一个 post 请求，采用异步
    xhr.open('POST', 'https://api.appworks-school.tw/api/1.0/order/checkout', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    
    //注册相关事件回调处理函数
    xhr.onload = function (e) {

       
        if (this.status == 200 || this.status == 304) {
             console.log(xhr.responseText);
             feedback = JSON.parse(xhr.responseText).data.number;

             console.log(feedback);
             alert("訂購成功！")
             getOrderNumber();
        } else {           
             alert("有地方出錯了！請重新進行訂購流程。")
        }
    
    };

   //发送数据
    xhr.send(data);
}

    
function checkTotalInfo() {
    if ( checkList() !== false && checkOrderInfo()!== false ){


        // 刪除不必丟到list的資料
        for (let i = 0; i < list.length; i++) {
            delete list[i].image;
            delete list[i].max;
        }

        var orderCheckOut = 
        {   "access_token": access_token,
            "prime": primeKey,
            "order": {
                "shipping": saveShipping,
                "payment":  savePayment,
                "subtotal": allsubtotal,
                "freight": deliveryFee,
                "total": totalFee,
                "recipient": {
                    "name": saveName,
                    "phone": savePhone,
                    "email": saveMail,  
                    "address": saveAddress,
                    "time": saveTime
                },
                "list": list 
                }
            }

            console.log(primeKey);
        //    console.log(orderCheckOut);


            
            orderCheckOut = JSON.stringify(orderCheckOut);
            console.log(orderCheckOut);
            let checkoutData = sendData(orderCheckOut);
   
    }
}

// 點擊購買按鈕後先拿PrimKey 
confirmPay.addEventListener("click",()=>{
    onSubmit();
});
    

function getOrderNumber(){
    
    localStorage.removeItem("list");
    window.location.href = `./thankyou.html?number=${feedback}`;

}