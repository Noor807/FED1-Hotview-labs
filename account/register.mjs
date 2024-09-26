import { REGISTER_API_ENDPOINT } from "../scripts/api.mjs";

const registrationForm = document.querySelector("#registration-form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

// Listen for the form submission event
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  registerUser(); // Call the function to register the user
});

async function registerUser() {
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const customOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };

    const response = await fetch(REGISTER_API_ENDPOINT, customOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log("Registration successful:", json);
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
