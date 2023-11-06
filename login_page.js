let users={}
let current_user

if(localStorage.getItem('users') == null){
    localStorage.setItem('users',JSON.stringify(users));
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    account_create();
})

function log_in(){
    display_login_popup();

}

function sign_up(){
    
    //needs to e complete
}

//display account login popup
function display_login_popup(){
    document.querySelector('.container').style.display = 'none'
    document.querySelector(".log_in_popup").style.display='grid'
}

//close account login popup
function close_login_popup(){
    clear_input_fields();
    document.querySelector('.container').style.display = 'block'
    document.querySelector(".log_in_popup").style.display='none'
}


function account_login(){
    if(validate()){
    users = JSON.parse(localStorage.getItem('users'))
    email_id_login=document.getElementById('email_id_login').value
    user_pass=document.getElementById('password_login').value 
    if(users[`${email_id_login}`]==undefined){
        alert('No such user exists');
        clear_input_fields();
    }
    else{
        if(users[`${email_id_login}`] != user_pass ){
            alert('Wrong password_login');
            document.getElementById('password_login').value = "";}
        else{
            alert('Successfully logged in');
            clear_input_fields()
            current_user = email_id_login
            proceed_to_user_portal();
        }
        
        }}
    else{alert('Please fill in all fields')}    
        
    }


//function gets called when create button is pressed
function account_create(){
    if(validate()){
    users = JSON.parse(localStorage.getItem('users'))
    email_id_login=document.getElementById('email_id_login').value
    user_pass=document.getElementById('password_login').value 
    if(users[`${email_id_login}`]==undefined){
        users[`${email_id_login}`] = user_pass;
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
    document.getElementById('email_id_login').value = "";
    document.getElementById('password_login').value = "";
}

//create an input field validating string
function validate(){
    if(document.getElementById('email_id_login').value =='' ||
    document.getElementById('password_login').value == ''){
        return false
    }
    else{return true}
}


//gets executed after successful login
function proceed_to_user_portal(){
    
    document.querySelector(".log_in_popup").style.display='none'
    document.getElementById('user_portal').style.display = 'block'
    document.getElementById('sign_out_button').style.display = 'block'
    document.getElementById('user_portal').innerHTML = `
    Welcome, ${current_user}
   `
}

//gets executed when sign out is pressed
function reset(){
    document.getElementById('sign_out_button').style.display = 'none'
    document.getElementById('user_portal').innerHTML="";
    document.getElementById('user_portal').style.display = 'none'
    document.querySelector(".container").style.display='block'
}







