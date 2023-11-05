let users={}
let account_creation_in_progress =false

user_name=document.getElementById('user_name').value //delete these two line
user_pass=document.getElementById('password').value  //delete these two lines


if(localStorage.getItem('users') == null){
    localStorage.setItem('users',JSON.stringify(users));
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    account_create();
})

function log_in(){
    display_login_popup();
    toggle_button_display();
}

function sign_up(){
    
    display_login_popup();
    account_creation_in_progress = true;
    toggle_button_display();
}

//display account login popup
function display_login_popup(){
    document.querySelector('.container').style.display = 'none'
    document.querySelector(".log_in_sign_up_popup").style.display='grid'
}

//close account login popup
function close_login_popup(){
    document.querySelector('.container').style.display = 'block'
    document.querySelector(".log_in_sign_up_popup").style.display='none'
}

//function that toggles the create and login button displays
function toggle_button_display(){
    if(account_creation_in_progress==false){
        
        document.getElementById("account_entry").style.display = 'block'
        document.getElementById("account_creation").style.display = 'none'
    }
    else{
       
        document.getElementById("account_entry").style.display = 'none'
        document.getElementById("account_creation").style.display = 'block'
        }
    }


function account_login(){
    
}

//function gets called when create button is pressed
function account_create(){
    
    users = JSON.parse(localStorage.getItem('users'))
    user_name=document.getElementById('user_name').value
    user_pass=document.getElementById('password').value 
    if(users[`${user_name}`]==undefined){
        users[`${user_name}`] = user_pass;
        localStorage.setItem('users',JSON.stringify(users))
        account_creation_in_progress = false
        clear_input_fields()
        toggle_button_display()
        close_login_popup()
        
    }
    else{
        alert('Account already exists');
        clear_input_fields();}
}

//function that clears the input form
function clear_input_fields(){
    document.getElementById('user_name').value = "";
    document.getElementById('password').value = "";
}
