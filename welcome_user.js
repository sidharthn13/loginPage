cookie_validation();

document.getElementById("user_portal").innerText += `, ${get_user()}`;

function reset() {
  let json = JSON.stringify({ logged_in: "no", user: `` });
  document.cookie = `activity=${json}`;
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

  if (log_in_status == "no") {
    window.location.href = "index.html";
  }
}

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
