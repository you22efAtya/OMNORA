fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    // run AFTER navbar is inserted
    setActiveLink();
  });

fetch("footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
    if (currentPage === "") {
      document.querySelector('.homeNavlink').classList.add("active");
    }
  });
}