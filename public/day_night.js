const day_night = document.getElementById("day_night");
var theme = document.getElementById("theme_link");


function change (){

  let dayTheme = "day.css";
  let nightTheme = "night.css";

  var href = theme.getAttribute("href");

  if (href === "day.css") {
    document.querySelector("link[href='day.css']").href="night.css";
    href = "night.css";
    document.querySelector("img[src='/img/day_sun.png']").src="/img/night_sun.png";

  }

  else {
    document.querySelector("link[href='night.css']").href="day.css";
    href = "day.css";
    document.querySelector("img[src='/img/night_sun.png']").src="/img/day_sun.png";
  }

  //theme.setAttribute("href", href);
}

day_night.addEventListener('click', change, false);
