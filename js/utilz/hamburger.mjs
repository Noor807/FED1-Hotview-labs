const hamburgerMeny = document.querySelector('.hamburger-meny');
const adminContainer = document.getElementById('admin-container');


async function toggleMeny(){
    adminContainer.classList.toggle('hamburger-hidden')

}
hamburgerMeny.addEventListener('click', toggleMeny);










