let users = {};
let current_user;

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  validate_sign_up();
});

//display account login popup
function display_login_popup() {
  document.querySelector(".login_sign_up_button_container").style.display =
    "none";
  document.querySelector(".log_in_popup").style.display = "grid";
}

//close account login popup
function close_login_popup() {
  clear_input_fields();
  document.querySelector(".login_sign_up_button_container").style.display =
    "block";
  document.querySelector(".log_in_popup").style.display = "none";
}

//display account sign up popup
function display_sign_up_popup() {
  clear_sign_up_fields();
  document.querySelector(".login_sign_up_button_container").style.display =
    "none";
  document.querySelector(".sign_up_popup").style.display = "grid";
}

//close account creation popup
function close_sign_up_popup() {
  clear_sign_up_fields();
  document.querySelector(".login_sign_up_button_container").style.display =
    "block";
  document.querySelector(".sign_up_popup").style.display = "none";
}

function account_login() {
  if (validate_login()) {
    users = JSON.parse(localStorage.getItem("users"));
    email_id_login = document.getElementById("email_id_login").value;
    user_pass = document.getElementById("password_login").value;

    if (!users[`${email_id_login}`]) {
      generate_toast("No such user exists");
    } else {
      if (decrypt(users[`${email_id_login}`]["password"]) != user_pass) {
        generate_toast("Wrong password");
      } else {
        generate_toast("Successfully logged in");
        clear_input_fields();
        current_user = users[`${email_id_login}`]["user_id"];
        proceed_to_user_portal();
      }
    }
  } else {
    generate_toast("Please fill in all fields");
  }
}

//function gets called when create button is pressed
function account_create() {
  users = JSON.parse(localStorage.getItem("users"));
  email_id = document.getElementById("email_id_sign_up").value;
  password = document.getElementById("password_sign_up").value;
  user_id = document.getElementById("user_name").value;
  phone = document.getElementById("phone_number").value;

  const obj = { user_id: user_id, phone: phone, password: encrypt(password) };

  if (!users[`${email_id}`]) {
    users[`${email_id}`] = obj;
    localStorage.setItem("users", JSON.stringify(users));

    generate_toast("Account created successfully");

    close_sign_up_popup();
  } else {
    generate_toast("User has an existing account");
  }
}

//function that clears the input form
function clear_input_fields() {
  document.getElementById("email_id_login").value = "";
  document.getElementById("password_login").value = "";
}

//create an input field validating string
function validate_login() {
  return (
    document.getElementById("email_id_login").value != "" &&
    document.getElementById("password_login").value != ""
  );
}

//gets executed after successful login
function proceed_to_user_portal() {
  document.querySelector(".log_in_popup").style.display = "none";
  const user_status = JSON.stringify({
    logged_in: "yes",
    user: `${current_user}`,
  });

  //set cookie expiry
  let date_object = new Date();
  date_object.setTime(date_object.getTime() + 1 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date_object.toUTCString();

  document.cookie = `activity=${user_status};${expires}`;
  redirect();
}

//function to encrypt password
function encrypt(str) {
  let result = "";
  let ascii_values = [];
  for (let i = 0; i < str.length; i++) {
    ascii_values.push(str.charCodeAt(i) + 5);
    result += String.fromCharCode(ascii_values[i]);
  }
  return result;
}

// function to decrypt password
function decrypt(str) {
  let result = "";
  let ascii_values = [];
  for (let i = 0; i < str.length; i++) {
    ascii_values.push(str.charCodeAt(i) - 5);
    result += String.fromCharCode(ascii_values[i]);
  }
  return result;
}

//function to validate email input field on signup
function validate_sign_up_email() {
  let regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  let match = regex.test(document.getElementById("email_id_sign_up").value);
  if (match) {
    return true;
  } else {
    generate_toast("Please enter a valid Gmail ID");
    return false;
  }
}

//function to validate phone number input field on signup
function validate_sign_up_phone() {
  let regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  let match = regex.test(document.getElementById("phone_number").value);
  if (match) {
    return true;
  } else {
    generate_toast("Please enter valid Indian Phone number");
    return false;
  }
}

//function to validate username field on signup
function validate_sign_up_username() {
  if (document.getElementById("user_name").value == "") {
    generate_toast("Please enter a username");
    return false;
  } else {
    return true;
  }
}

//function to validate password field on signup
function validate_sign_up_password() {
  if (document.getElementById("password_sign_up").value.length < 10) {
    generate_toast("Password must be 10 characters long");
    return false;
  } else {
    return true;
  }
}

//function that checks validity of all fields on signup
function validate_sign_up() {
  if (
    validate_sign_up_email() &&
    validate_sign_up_password() &&
    validate_sign_up_phone() &&
    validate_sign_up_username()
  ) {
    account_create();
  }
}

//function to activate toast messages
function generate_toast(str) {
  let snack = document.getElementById("snackbar");
  snack.style.display = "grid";
  snack.innerText = str;
  setTimeout(() => {
    document.getElementById("snackbar").style.display = "none";
    document.getElementById("snackbar").innerText = "";
  }, 2000);
}

//function to clear sign up fields
function clear_sign_up_fields() {
  document.getElementById("email_id_sign_up").value = "";
  document.getElementById("phone_number").value = "";
  document.getElementById("user_name").value = "";
  document.getElementById("password_sign_up").value = "";
}

function redirect() {
  let log_in_status;
  let user;
  let cookie = document.cookie;
  cookie_arr = cookie.split(";");
  for (let i = 0; i < cookie_arr.length; i++) {
    if (cookie_arr[i].split("=")[0] == "activity") {
      let json = JSON.parse(cookie_arr[i].split("=")[1]);
      log_in_status = json["logged_in"];
      user = json["user"];
    }
  }

  if (log_in_status == "yes") {
    window.location.href = "welcome_user.html";
  }
}
