const day_night = document.getElementById("day_night");
var theme = document.getElementById("theme_link");


function change (){

  let dayTheme = "day.css";
  let nightTheme = "night.css";

  var href = theme.getAttribute("href");

  if (href === "day.css") {
    document.querySelector("link[href='day.css']").href="night.css";
    href = "night.css";
  }

  else {
    document.querySelector("link[href='night.css']").href="day.css";
    href = "day.css";
  }

  //theme.setAttribute("href", href);
}

day_night.addEventListener('click', change, false);
