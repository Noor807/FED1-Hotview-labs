import { createBlogItem } from './createpost.mjs';
import { getBlogPost } from './get_blog_post.mjs'; // Adjust path as necessary

// Fetch the top 3 posts from the blog API
async function getTop3Posts() {
  try {
    const blogArray = await getBlogPost();
    const top3Posts = blogArray.slice(0, 3); // Get the top 3 posts
    return top3Posts;
  } catch (error) {
    console.error('Error fetching top 3 blog posts:', error);
    throw error;
  }
}

const blogCarousel = document.getElementById('carousel-item');
const backButton = document.getElementById('back');
const nextButton = document.getElementById('next');

let currentIndex = 0; // Start at the first post
let top3Posts = [];

// Function to display the current blog post
function updateCarousel(index) {
  blogCarousel.innerHTML = ''; // Clear the existing content

  const blogElement = createBlogItem(top3Posts[index]); // Create the blog item
  blogCarousel.appendChild(blogElement); // Add the new blog item
}

// Function to handle the 'Back' button click
function handleBackClick() {
  currentIndex = (currentIndex === 0) ? top3Posts.length - 1 : currentIndex - 1; // Loop back to the last post
  updateCarousel(currentIndex);
}

// Function to handle the 'New' (Next) button click
function handleNextClick() {
  currentIndex = (currentIndex === top3Posts.length - 1) ? 0 : currentIndex + 1; // Loop back to the first post
  updateCarousel(currentIndex);
}

// Fetch and display the top 3 posts
async function displayTop3Posts() {
  try {
    top3Posts = await getTop3Posts(); // Fetch top 3 posts
    updateCarousel(currentIndex); // Display the first post initially

    // Attach event listeners to buttons
    backButton.addEventListener('click', handleBackClick);
    nextButton.addEventListener('click', handleNextClick);
  } catch (error) {
    console.error('Error displaying top 3 blog posts:', error);
  }
}

displayTop3Posts();
