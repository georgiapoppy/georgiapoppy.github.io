document.getElementById("me2").style.display === "none";

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    hideDiv("me1", "me2");
}

function hideDiv(a, b) {
    const x = document.getElementById(a);
    const y = document.getElementById(b);
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
    }
}