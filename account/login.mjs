import { LOGIN_API_ENDPOINT } from "../scripts/api.mjs";

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

/**
 * Handles user login by sending credentials to the login API.
 * On success, stores the user data and token in localStorage and redirects to the home page.
 *
 * @async
 * @function loginUser
 * @returns {Promise<Object|void>} The admin data object if login is successful, otherwise nothing.
 */
async function loginUser() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const customOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(LOGIN_API_ENDPOINT, customOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const adminData = await response.json();
    const accessToken = adminData.data.accessToken;
    const adminUser = adminData.data;

    localStorage.setItem("adminUser", JSON.stringify(adminUser));
    localStorage.setItem("accessToken", accessToken);

    alert("Login successful!");
    window.location.href = "/";

    return adminData;
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
}

/**
 * Event listener for login form submission.
 * Prevents default behavior and triggers the login process.
 */
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await loginUser();
});
