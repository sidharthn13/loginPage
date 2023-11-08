
cookie_validation()


function reset(){
    
    let json = JSON.stringify({logged_in:'no',user:``})
    document.cookie =`activity=${json}`
    redirect()

}

function redirect(){
    let log_in_status
    let user
    let cookie = document.cookie;
    cookie_arr = cookie.split(';')
    console.log(cookie_arr)
        for(let i = 0; i<cookie_arr.length; i++){
            if(cookie_arr[i].split('=')[0] == 'activity'){
                let json = JSON.parse(cookie_arr[i].split('=')[1])
                log_in_status = json['logged_in']
                user = json['user']
            }
        }
    console.log(log_in_status)
    
    if(log_in_status == 'yes'){window.location.href = 'welcome_user.html'
    document.getElementsByClassName('user_portal')[0].innerText += `, ${user}`}   //bug here
    
    else{window.location.href = 'index.html'}
}


function cookie_validation(){
    if(!document.cookie){
        window.location.href = "index.html"
    }
}