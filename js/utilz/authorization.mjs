document.addEventListener('DOMContentLoaded', function(){

    function updateLoginLogoutButton() {
    const accessToken = localStorage.getItem('accessToken');
    const adminUser  = JSON.parse(localStorage.getItem('adminUser'));
    const user = document.getElementById('user');
    const adminAvatar = document.getElementById('avatar');
    const hamburgerMeny= document.querySelector('.hamburger-meny');
    
    
    const loginLogoutButton = document.getElementById('login');
    const adminContainer = document.getElementById('admin-container');
    
    if (accessToken) {
      hamburgerMeny.classList.remove('admin-burger')
      // User is logged in, show 'Logout' button across all pages
      loginLogoutButton.textContent = 'Logout';
      loginLogoutButton.href = ''
      loginLogoutButton.onclick = function() {
        handleLogout();
      };
      adminAvatar.src = adminUser.avatar.url
      adminAvatar.alt = adminUser.avatar.alt
      user.textContent = adminUser.name
      adminContainer.classList.remove('admin-hidden')
      
    } else {
      hamburgerMeny.classList.add('admin-burger')
        adminContainer.classList.add('admin-hidden')
       
      // User is not logged in, show 'Login' button across all pages
      loginLogoutButton.textContent = 'Login';
    
    }
  }
  updateLoginLogoutButton()
  
  function handleLogout() {
    // Logout logic: remove accessToken and redirect to homepage
    alert('you are logout')
    localStorage.removeItem('accessToken');
    window.location.href = 'index.html'; // Redirect to homepage after logout
  }
  
  // Run the update function on page load
  

})
  