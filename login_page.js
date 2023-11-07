let users={}
let current_user

if(localStorage.getItem('users') == null){
    localStorage.setItem('users',JSON.stringify(users));
}

form2.addEventListener('submit',(e)=>{
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
    clear_sign_up_fields()
    document.querySelector('.container').style.display = 'none'
    document.querySelector(".sign_up_popup").style.display='grid'
}

//close account creation popup
function close_sign_up_popup(){
    clear_sign_up_fields();
    document.querySelector('.container').style.display = 'block'
    document.querySelector(".sign_up_popup").style.display='none'
}


function account_login(){
    if(validate_login()){
    users = JSON.parse(localStorage.getItem('users'))
    email_id_login=document.getElementById('email_id_login').value
    user_pass=document.getElementById('password_login').value 
    
    if(users[`${email_id_login}`]==undefined){
        generate_toast('No such user exists');
        clear_input_fields();
    }
    else{
        if(decrypt(users[`${email_id_login}`]['password']) != user_pass ){
            generate_toast('Wrong password_login');
            document.getElementById('password_login').value = "";}
        else{
            generate_toast('Successfully logged in');
            clear_input_fields()
            current_user = users[`${email_id_login}`]['user_id']
            proceed_to_user_portal();
        }
        
        }}
    else{generate_toast('Please fill in all fields')}    
        
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
                password:encrypt(password)} //write a hashing algo here

    if(users[`${email_id}`]==undefined){
        users[`${email_id}`] = obj;
        localStorage.setItem('users',JSON.stringify(users))
        
        generate_toast('Account created successfully')
        
        close_sign_up_popup()

    }
    else{
        generate_toast('User has an existing account')
        clear_sign_up_fields()
        
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
    Welcome, ${current_user}`
    document.querySelector(".bubbles").style.display ='flex'
}

//gets executed when sign out is pressed
function reset(){
    document.getElementById('sign_out_button').style.display = 'none'
    document.getElementById('user_portal').innerHTML="";
    document.getElementById('user_portal').style.display = 'none'
    document.querySelector(".container").style.display='block'
    document.querySelector(".bubbles").style.display ='none'

}


//function to encrypt password
function encrypt(str){
    let result = ""
    let ascii_values =[]
    for(let i = 0;i<str.length;i++){
        ascii_values.push(str.charCodeAt(i)+5)
        result += String.fromCharCode(ascii_values[i]);
    }
    return result
}

// function to decrypt password
function decrypt(str){
    let result =''
    let ascii_values = []
    for(let i = 0;i<str.length;i++){
        ascii_values.push(str.charCodeAt(i)-5)
        result += String.fromCharCode(ascii_values[i]);
    }
    return result
}


//function to validate email input field on signup
function validate_sign_up_email(){
    let regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    let match = regex.test(document.getElementById('email_id_sign_up').value)
    if(match){
        return true;
    }
    else{
        document.getElementById('email_id_sign_up').value=''            
    } 
}

//function to validate phone number input field on signup
function validate_sign_up_phone(){
    let regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    let match = regex.test(document.getElementById('phone_number').value )
    if(match){
        return true;
    }
    else{
        document.getElementById('phone_number').value=''
    
    }
}

//function to validate username field on signup
function validate_sign_up_username(){
    if(document.getElementById('user_name').value !=''){
        return true}
}
//function to validate password field on signup
function validate_sign_up_password(){
    if(document.getElementById('password_sign_up').value != ''){
        return true
    }

}

//function that checks validity of all fields on signup
function validate_sign_up(){
    if( validate_sign_up_email() && validate_sign_up_phone() 
    && validate_sign_up_username() && validate_sign_up_password()){
        account_create();}
    else{
        generate_toast('Please enter valid data')
    }
}


//function to activate toast messages
function generate_toast(str){
    let snack =document.getElementById('snackbar')
    snack.style.display= 'grid';
    snack.innerText = str
    setTimeout(()=>{document.getElementById('snackbar').style.display = 'none' ;
                    document.getElementById('snackbar').innerText = ''},2000)
}

//function to clear sign up fields
function clear_sign_up_fields(){
    document.getElementById('email_id_sign_up').value='' 
    document.getElementById('phone_number').value=''
    document.getElementById('user_name').value =''
    document.getElementById('password_sign_up').value = ''

}
