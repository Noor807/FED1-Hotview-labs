import { LOGIN_API_ENDPOINT } from "../scripts/api.mjs";

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

async function loginUser() {
  const email = emailInput.value;
  const password = passwordInput.value;

  const customOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  try {
    const response = await fetch(LOGIN_API_ENDPOINT, customOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const adminData = await response.json();
   

    const accessToken = adminData.data.accessToken; // Adjust if necessary based on the actual API response structure
    const adminUser = adminData.data
    localStorage.setItem( "adminUser" , JSON.stringify(adminUser))
    localStorage.setItem("accessToken", accessToken);
     window.location.href = '/'
     alert('login successfully');
    return adminData;
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await loginUser();
});