const day_night = document.getElementById("day_night");

if (!localStorage.getItem('daynight')) {
  console.log(localStorage.getItem('daynight'));
  localStorage.setItem('daynight','day');
  localStorage.setItem('sunmoon', '/img/moon.png');
  localStorage.setItem('theme', 'day.css');
  document.getElementById("day_night").style.backgroundImage = "url('/img/moon.png')";
  document.getElementById('theme_link').href=(localStorage.getItem("theme"));
  console.log(localStorage.getItem('checked'));
}

if (localStorage.getItem('daynight') === 'day') {
  localStorage.setItem('sunmoon', '/img/moon.png');
  localStorage.setItem('theme', 'day.css');
  localStorage.setItem('checked', ':not(:checked)');
  document.getElementById("day_night").style.backgroundImage = "url('/img/moon.png')";
  document.getElementById('theme_link').href=(localStorage.getItem("theme"));
  console.log(localStorage.getItem('sunmoon'));
} else if (localStorage.getItem('daynight') === 'night') {
  localStorage.setItem('sunmoon', '/img/sun.png');
  localStorage.setItem('theme', 'night.css');
  localStorage.setItem('checked', ':checked');
  document.getElementById("day_night").style.backgroundImage = "url('/img/sun.png')";
  document.getElementById('theme_link').href=(localStorage.getItem("theme"));
  console.log(localStorage.getItem('sunmoon'));
  console.log(localStorage.getItem('checked'));
};



function change() {
  if (localStorage.getItem('daynight') === 'night') {
    localStorage.setItem('daynight','day');
    localStorage.setItem('sunmoon', '/img/moon.png');
    localStorage.setItem('theme', 'day.css');
    localStorage.setItem('checked', ':not(:checked)');
    document.getElementById("day_night").style.backgroundImage = "url('/img/moon.png')";
    document.getElementById('theme_link').href=(localStorage.getItem("theme"));
    console.log(localStorage.getItem('sunmoon'));
    console.log(localStorage.getItem('checked'));
  } else {
    localStorage.setItem('daynight','night');
    localStorage.setItem('sunmoon', '/img/sun.png');
    localStorage.setItem('theme', 'night.css');
    localStorage.setItem('checked', ':checked');
    document.getElementById("day_night").style.backgroundImage = "url('/img/sun.png')";
    document.getElementById('theme_link').href=(localStorage.getItem("theme"));
    console.log(localStorage.getItem('sunmoon'));
    console.log(localStorage.getItem('checked'));
  }
}

day_night.onclick = function() {
  change();
};
