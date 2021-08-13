var modal = document.getElementById("modal_window");
var btn = document.getElementById("modal");
var span = document.getElementsByClassName("close_modal_window")[0];

btn.onclick = function (e) {
    e.preventDefault();
    modal.style.display = "block";
 }

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
