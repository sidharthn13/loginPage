let users={}
let current_user

if(localStorage.getItem('users') == null){
    localStorage.setItem('users',JSON.stringify(users));
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    account_create();
})


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

//display account sign up popup
function display_sign_up_popup(){
    document.querySelector('.container').style.display = 'none'
    document.querySelector(".sign_up_popup").style.display='grid'
}

//close account creation popup
function close_sign_up_popup(){
    clear_input_fields();
    document.querySelector('.container').style.display = 'block'
    document.querySelector(".sign_up_popup").style.display='none'
}


function account_login(){
    if(validate_login()){
    users = JSON.parse(localStorage.getItem('users'))
    email_id_login=document.getElementById('email_id_login').value
    user_pass=document.getElementById('password_login').value 
    
    if(users[`${email_id_login}`]==undefined){
        alert('No such user exists');
        clear_input_fields();
    }
    else{
        if(users[`${email_id_login}`]['password'] != user_pass ){
            alert('Wrong password_login');
            document.getElementById('password_login').value = "";}
        else{
            alert('Successfully logged in');
            clear_input_fields()
            current_user = users[`${email_id_login}`]['user_id']
            proceed_to_user_portal();
        }
        
        }}
    else{alert('Please fill in all fields')}    
        
    }


//function gets called when create button is pressed
function account_create(){
    
    users = JSON.parse(localStorage.getItem('users'))
    email_id=document.getElementById('email_id_sign_up').value
    password=document.getElementById('password_sign_up').value 
    user_id=document.getElementById('user_name').value 
    phone=document.getElementById('phone_number').value 
    
    const obj ={user_id:user_id,
                phone:phone,
                password:password} //write a hashing algo here

    if(users[`${email_id}`]==undefined){
        users[`${email_id}`] = obj;
        localStorage.setItem('users',JSON.stringify(users))
        
        alert('Account created successfully')
        clear_input_fields()
        close_sign_up_popup()
        
    }
}

//function that clears the input form
function clear_input_fields(){
    document.getElementById('email_id_login').value = "";
    document.getElementById('password_login').value = "";
}

//create an input field validating string
function validate_login(){
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







