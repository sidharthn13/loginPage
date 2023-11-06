let users={}
let account_creation_in_progress =false

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
    clear_input_fields();
    if (account_creation_in_progress){
        toggle_button_display();
        account_creation_in_progress = false;
    }
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
    if(validate()){
    users = JSON.parse(localStorage.getItem('users'))
    user_name=document.getElementById('user_name').value
    user_pass=document.getElementById('password').value 
    if(users[`${user_name}`]==undefined){
        alert('No such user exists');
        clear_input_fields();
    }
    else{
        if(users[`${user_name}`] != user_pass ){
            alert('Wrong password');
            document.getElementById('password').value = "";}
        else{
            alert('Successfully logged in');
            clear_input_fields();
        }
        
        }}
    else{alert('Please fill in all fields')}    
        
    }


//function gets called when create button is pressed
function account_create(){
    if(validate()){
    users = JSON.parse(localStorage.getItem('users'))
    user_name=document.getElementById('user_name').value
    user_pass=document.getElementById('password').value 
    if(users[`${user_name}`]==undefined){
        users[`${user_name}`] = user_pass;
        localStorage.setItem('users',JSON.stringify(users))
        account_creation_in_progress = false
        alert('Account created successfully')
        clear_input_fields()
        toggle_button_display()
        close_login_popup()
        
    }
    else{
        alert('Account already exists');
        clear_input_fields();}}
    else{alert('Please fill in all fields')}
}

//function that clears the input form
function clear_input_fields(){
    document.getElementById('user_name').value = "";
    document.getElementById('password').value = "";
}

//create an input field validating string
function validate(){
    if(document.getElementById('user_name').value =='' ||
    document.getElementById('password').value == ''){
        return false
    }
    else{return true}
}