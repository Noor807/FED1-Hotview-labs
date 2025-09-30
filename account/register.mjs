import { REGISTER_API_ENDPOINT } from "../scripts/api.mjs";

const registrationForm = document.querySelector("#registration-form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  registerUser();
});

/**
 * Registers a new user by sending their name, email, and password to the API.
 *
 * @async
 * @function registerUser
 * @returns {Promise<void>} Resolves when the registration process completes.
 */
async function registerUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const customOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    };

    const response = await fetch(REGISTER_API_ENDPOINT, customOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await response.json();
    alert("Registration successful!");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
  }
}
