cookie_validation(); //redirect to login page if valid cookie not found

document.getElementById("user_portal").innerText += `, ${get_user()}`;

function reset() {
  const user_status = JSON.stringify({ logged_in: "no", user: `` });

  let cookie_expiry = new Date();
  cookie_expiry.setTime(cookie_expiry.getTime() + 1 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + cookie_expiry.toUTCString();

  document.cookie = `activity=${user_status};${expires}`;
  redirect();
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

  if (log_in_status === "no") {
    window.location.href = "index.html";
  }
}

//function to check cookie validity
function cookie_validation() {
  if (!document.cookie) {
    window.location.href = "index.html";
  }
}

//function to get user name from cookie
function get_user() {
  let user;
  let cookie = document.cookie;
  cookie_arr = cookie.split(";");
  for (let i = 0; i < cookie_arr.length; i++) {
    if (cookie_arr[i].split("=")[0] == "activity") {
      let json = JSON.parse(cookie_arr[i].split("=")[1]);
      user = json["user"];
    }
  }
  return user;
}
