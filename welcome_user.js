cookie_validation(); //redirect to login page if valid cookie not found

document.getElementById("user_portal").innerText += `, ${get_user()}`;

function sign_out() {
  const user_status = JSON.stringify({ logged_in: "no", user: `` });

  const expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";

  document.cookie = `activity=${user_status};${expires}`;
  window.location.href = "index.html";
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
  cookie_array = cookie.split(";");
  for (let i = 0; i < cookie_array.length; i++) {
    if (cookie_array[i].split("=")[0] == "activity") {
      const user_status = JSON.parse(cookie_array[i].split("=")[1]);
      user = user_status["user"];
    }
  }
  return user;
}
