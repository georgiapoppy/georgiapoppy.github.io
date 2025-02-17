document.getElementById("star").addEventListener("click", function() {
  this.classList.toggle("rotate");
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    hideDiv("dark1", "dark2");
    hideDiv("dark3", "dark4");
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