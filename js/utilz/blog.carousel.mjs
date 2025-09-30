import { createBlogItem } from "./createpost.mjs";
import { getBlogPost } from "./get_blog_post.mjs";

/**
 * Fetches the top 3 blog posts from the API.
 *
 * @async
 * @function getTop3Posts
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of the top 3 blog posts.
 * @throws {Error} If fetching blog posts fails.
 */
async function getTop3Posts() {
  try {
    const blogArray = await getBlogPost();
    return blogArray.slice(0, 3);
  } catch (error) {
    console.error("Error fetching top 3 blog posts:", error);
    throw error;
  }
}

const blogCarousel = document.getElementById("carousel-item");
const backButton = document.getElementById("back");
const nextButton = document.getElementById("next");

let currentIndex = 0;
let top3Posts = [];
let autoSlideInterval = null;

/**
 * Updates the carousel with the blog post at the given index.
 *
 * @function updateCarousel
 * @param {number} index - The index of the blog post to display.
 * @returns {void}
 */
function updateCarousel(index) {
  blogCarousel.innerHTML = "";
  const blogElement = createBlogItem(top3Posts[index]);
  blogCarousel.appendChild(blogElement);
}

/**
 * Handles the "Back" button click.
 * Cycles to the previous blog post in the carousel.
 *
 * @function handleBackClick
 * @returns {void}
 */
function handleBackClick() {
  currentIndex = currentIndex === 0 ? top3Posts.length - 1 : currentIndex - 1;
  updateCarousel(currentIndex);
  resetAutoSlide();
}

/**
 * Handles the "Next" button click.
 * Cycles to the next blog post in the carousel.
 *
 * @function handleNextClick
 * @returns {void}
 */
function handleNextClick() {
  currentIndex = currentIndex === top3Posts.length - 1 ? 0 : currentIndex + 1;
  updateCarousel(currentIndex);
  resetAutoSlide();
}

/**
 * Starts the auto-slide feature for the carousel.
 *
 * @function startAutoSlide
 * @param {number} intervalMs - Interval in milliseconds for auto-slide.
 * @returns {void}
 */
function startAutoSlide(intervalMs = 5000) {
  autoSlideInterval = setInterval(() => {
    handleNextClick();
  }, intervalMs);
}

/**
 * Resets the auto-slide timer whenever a manual navigation occurs.
 *
 * @function resetAutoSlide
 * @returns {void}
 */
function resetAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  startAutoSlide();
}

/**
 * Initializes the carousel by fetching and displaying the top 3 blog posts.
 * Also attaches event listeners for navigation and starts auto-slide.
 *
 * @async
 * @function displayTop3Posts
 * @returns {Promise<void>}
 */
async function displayTop3Posts() {
  try {
    top3Posts = await getTop3Posts();
    updateCarousel(currentIndex);

    backButton.addEventListener("click", handleBackClick);
    nextButton.addEventListener("click", handleNextClick);

    startAutoSlide(); // Start auto-slide
  } catch (error) {
    console.error("Error displaying top 3 blog posts:", error);
  }
}

displayTop3Posts();
