//const day_night = document.getElementById("day_night");
//let theme;

//if (!localStorage.getItem('daynight')) {
  //localStorage.setItem('daynight','day');
  //localStorage.setItem('sun', '/img/day_sun.png');
  // localStorage.setItem('theme', '/night.css');
  // document.getElementById('sun').src=(localStorage.getItem('sun'));
//   document.getElementById('theme_link').href=(localStorage.getItem('theme'));
//   document.getElementById('day_night').classList.remove(localStorage.getItem('slider_1'));
//   document.getElementById('day_night').classList.remove(localStorage.getItem('slider_2'));
// };
//
// if (localStorage.getItem('daynight') === 'night') {
//   localStorage.setItem('sun', '/img/night_sun.png');
//   localStorage.setItem('theme', '/night.css');
//   localStorage.setItem('slider_1', 'input:checked');
//   localStorage.setItem('slider_2', 'slider:before');
//   document.getElementById('sun').src=(localStorage.getItem('sun'));
//   document.getElementById('theme_link').href=(localStorage.getItem('theme'));
//   document.getElementById('day_night').classList.add(localStorage.getItem('slider_1'));
//   document.getElementById('day_night').classList.add(localStorage.getItem('slider_2'));
// };
//
// function change() {
//   if (localStorage.getItem('daynight') === 'night') {
//     localStorage.setItem('daynight','day');
//     theme = localStorage.getItem('daynight');
//     localStorage.setItem('sun', '/img/day_sun.png');
//     localStorage.setItem('theme', '/day.css');
//     console.log(theme);
//     document.getElementById('sun').src=(localStorage.getItem('sun'));
//     document.getElementById('theme_link').href=(localStorage.getItem('theme'));
//     document.getElementById('day_night').classList.remove(localStorage.getItem('slider_1'));
//     document.getElementById('day_night').classList.remove(localStorage.getItem('slider_2'));
//   } else {
//     localStorage.setItem('daynight','night');
//     theme = localStorage.getItem('daynight');
//     localStorage.setItem('sun', '/img/night_sun.png');
//     localStorage.setItem('theme', '/night.css');
//     localStorage.setItem('slider_1', 'input:checked');
//     localStorage.setItem('slider_2', 'slider:before');
//     console.log(theme);
//     document.getElementById('sun').src=(localStorage.getItem('sun'));
//     document.getElementById('theme_link').href=(localStorage.getItem('theme'));
//     document.getElementById('day_night').classList.add(localStorage.getItem('slider_1'));
//     document.getElementById('day_night').classList.add(localStorage.getItem('slider_2'));
//   };
// };
//
// day_night.onclick = function (){
//   change();
// };

const day_night = document.getElementById("day_night");

if (!localStorage.getItem('daynight')) {
  console.log(localStorage.getItem('daynight'));
  localStorage.setItem('daynight','day');
  localStorage.setItem('sunmoon', '/img/night_moon.png');
  localStorage.setItem('theme', 'day.css');
  document.getElementById("day_night").style.backgroundImage = "url('/img/night_moon.png')";
  document.getElementById('theme_link').href=(localStorage.getItem("theme"));
  console.log(localStorage.getItem('checked'));
}

if (localStorage.getItem('daynight') === 'day') {
  localStorage.setItem('sunmoon', '/img/night_moon.png');
  localStorage.setItem('theme', 'day.css');
  localStorage.setItem('checked', ':not(:checked)');
  document.getElementById("day_night").style.backgroundImage = "url('/img/night_moon.png')";
  document.getElementById('theme_link').href=(localStorage.getItem("theme"));
  console.log(localStorage.getItem('sunmoon'));
} else if (localStorage.getItem('daynight') === 'night') {
  localStorage.setItem('sunmoon', '/img/night_sun.png');
  localStorage.setItem('theme', 'night.css');
  localStorage.setItem('checked', ':checked');
  document.getElementById("day_night").style.backgroundImage = "url('/img/night_sun.png')";
  document.getElementById('theme_link').href=(localStorage.getItem("theme"));
  console.log(localStorage.getItem('sunmoon'));
  console.log(localStorage.getItem('checked'));
};



function change() {
  if (localStorage.getItem('daynight') === 'night') {
    localStorage.setItem('daynight','day');
    localStorage.setItem('sunmoon', '/img/night_moon.png');
    localStorage.setItem('theme', 'day.css');
    localStorage.setItem('checked', ':not(:checked)');
    document.getElementById("day_night").style.backgroundImage = "url('/img/night_moon.png')";
    document.getElementById('theme_link').href=(localStorage.getItem("theme"));
    console.log(localStorage.getItem('sunmoon'));
    console.log(localStorage.getItem('checked'));
  } else {
    localStorage.setItem('daynight','night');
    localStorage.setItem('sunmoon', '/img/night_sun.png');
    localStorage.setItem('theme', 'night.css');
    localStorage.setItem('checked', ':checked');
    document.getElementById("day_night").style.backgroundImage = "url('/img/night_sun.png')";
    document.getElementById('theme_link').href=(localStorage.getItem("theme"));
    console.log(localStorage.getItem('sunmoon'));
    console.log(localStorage.getItem('checked'));
  }
}

day_night.onclick = function() {
  change();
};

//day_night.addEventListener('click', change, true);
