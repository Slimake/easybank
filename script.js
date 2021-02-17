const navLinks = document.querySelector(".nav-links");
const burger = document.querySelector(".line");
const cross = document.querySelector(".cross");

burger.addEventListener("click", function() {
	navLinks.classList.add("nav-active");
	burger.classList.add("line-inactive");
	cross.classList.add("cross-active");
});

cross.addEventListener("click", function() {
	navLinks.classList.remove("nav-active");
	cross.classList.remove("cross-active");
	burger.classList.remove("line-inactive");
});