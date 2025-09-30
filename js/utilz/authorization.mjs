document.addEventListener("DOMContentLoaded", () => {
  /**
   * Updates the login/logout button and user UI elements
   * depending on authentication status.
   *
   * - If logged in: shows Logout, user name, avatar, and admin panel.
   * - If not logged in: shows Login and hides admin panel.
   *
   * @function updateLoginLogoutButton
   * @returns {void}
   */
  function updateLoginLogoutButton() {
    const accessToken = localStorage.getItem("accessToken");
    const adminUser = JSON.parse(localStorage.getItem("adminUser"));

    const user = document.getElementById("user");
    const adminAvatar = document.getElementById("avatar");
    const hamburgerMeny = document.querySelector(".hamburger-meny");
    const loginLogoutButton = document.getElementById("login");
    const adminContainer = document.getElementById("admin-container");

    if (accessToken && adminUser) {
      // User is logged in
      hamburgerMeny.classList.remove("admin-burger");

      loginLogoutButton.textContent = "Logout";
      loginLogoutButton.href = "#";
      loginLogoutButton.onclick = handleLogout;

      if (adminUser.avatar) {
        adminAvatar.src = adminUser.avatar.url || "";
        adminAvatar.alt = adminUser.avatar.alt || "User avatar";
      }

      user.textContent = adminUser.name || "Admin";
      adminContainer.classList.remove("admin-hidden");
    } else {
      // User is not logged in
      hamburgerMeny.classList.add("admin-burger");
      adminContainer.classList.add("admin-hidden");

      loginLogoutButton.textContent = "Login";
      loginLogoutButton.href = "login.html";
      loginLogoutButton.onclick = null;
    }
  }

  /**
   * Logs out the current user by clearing storage and redirecting.
   *
   * @function handleLogout
   * @returns {void}
   */
  function handleLogout() {
    alert("You have been logged out.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminUser");
    window.location.href = "index.html";
  }

  // Run on page load
  updateLoginLogoutButton();
});
