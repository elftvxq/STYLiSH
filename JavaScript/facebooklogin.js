window.fbAsyncInit = function () {
    FB.init({
        appId: '1629322010556193', // 填入 FB APP ID
        cookie: true,
        xfbml: true,
        version: 'v3.3'
    });

    FB.AppEvents.logPageView();
    // 進來馬上確定連線狀態
    // 執行給頁面的動作
    FB.getLoginStatus(function (response) {
        console.log(response);
        statusChangeCallback(response);
    });
};

// 載入 FB SDK
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)){
       return; 
    } 
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}


// 處理各種登入身份
function statusChangeCallback(response) {
    console.log(response);
    var target = document.getElementById("FB_STATUS_1");
        html = "";

    // 登入 FB 且已加入會員
    if (response.status === 'connected') {

        var access_token = response.authResponse.accessToken;
        localStorage.setItem('access_token', JSON.stringify(access_token));
        
        
        
        FB.api('me?fields=id,name,email,picture.width(500)', function (response) {
            console.log(response);
            const memerLogin = document.querySelector('.memerLogin');
            memerLogin.src = `https://graph.facebook.com/${response.id}/picture`;
            memerLogin.style.borderRadius = "50%";

            const mobileMemberIcon = document.querySelector('.mobileMemberIcon');
            mobileMemberIcon.src = `https://graph.facebook.com/${response.id}/picture`;
            mobileMemberIcon.style.borderRadius = "50%";
            mobileMemberIcon.style.width = "30px";
            mobileMemberIcon.style.height = "30px";
            // html += response.name + "你好" + "<br/>";
            // html += "會員 email：" + response.email;
            target.innerHTML = html;            
        });

        html = "已登入FB" + "<br/>";
        testAPI();
    }

    // 登入 FB, 未偵測到加入會員
    else if (response.status === "not_authorized") {
        target.innerHTML = "尚未登入會員";

        // FB.login(function (response) {
        //     statusChangeCallback(response);
        //     console.log(response);
        // }, { scope: 'public_profile,email' });
    }

    // 未登入 FB
    else {
        target.innerHTML = "未登入 FB";

    }
}



         
    

function testAPI(){
        FB.api('me?fields=id,name,email,picture.width(500)', function (response){
            if (response && !response.error) {
            console.log(testAPI);
            // if (document.getElementById('login') !== null) {

            const profile = document.getElementById('profile');
            // console.log(profile);
            profile.style.display ="flex";
            const login = document.getElementById('login');
            // console.log(login);
            login.style.display = "none";

            // 顯示名字
            const FBname = document.getElementById('FB-name');
            FBname.textContent = response.name;

            const FBmail = document.getElementById('FB-mail');
            FBmail.textContent = response.email;
            // const userID = response.id;
            const FBpicture = document.getElementById('FB-picture');
            FBpicture.className = "FB-pitcure";
            FBpicture.style.background = `url(https://graph.facebook.com/${userID}/picture?width=200) center no-repeat`;

                        // }
                    }
        });

            return access_token
    }

            // function buildProfile(response) {
            //     window.location.href = "./profile.html"
                
            // }



// 登出按鈕
function fbLogout() {
    FB.logout(function () {
        alert("成功登出！");
        window.location.href = "./index.html";
    });
}

                
                            
         