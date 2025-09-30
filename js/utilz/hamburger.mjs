const hamburgerMeny = document.querySelector(".hamburger-meny");
const adminContainer = document.getElementById("admin-container");

/**
 * Toggles the visibility of the admin navigation menu.
 *
 * @function
 */
function toggleMenu() {
  if (!adminContainer) {
    console.error("Admin container not found.");
    return;
  }
  adminContainer.classList.toggle("hamburger-hidden");
}

// Attach click event to hamburger menu
if (hamburgerMeny) {
  hamburgerMeny.addEventListener("click", toggleMenu);
} else {
  console.error("Hamburger menu element not found.");
}
