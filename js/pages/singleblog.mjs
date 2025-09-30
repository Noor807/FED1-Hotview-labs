import { createBlogContainer } from "../utilz/singlepost.mjs";

const singleBlogContainer = document.querySelector(".single-blog-container");

/**
 * Retrieves the value of a query parameter from the current URL.
 *
 * @param {string} key - The name of the query parameter.
 * @returns {string|null} The value of the query parameter, or null if not found.
 */
function getQueryParameter(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

const blogId = getQueryParameter("id");

/**
 * Fetches a single blog post by its ID and renders it into the container.
 *
 * @async
 * @param {string} blogId - The unique identifier of the blog post.
 * @returns {Promise<void>} Resolves when the blog post is fetched and displayed.
 */
async function getBlogPost(blogId) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/Noor_irfan/${blogId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch blog post. Status: ${response.status}`);
    }

    const blogPost = await response.json();
    const blogItem = createBlogContainer(blogPost.data);

    singleBlogContainer.appendChild(blogItem);
  } catch (error) {
    console.error("Error fetching blog post:", error);
  }
}

getBlogPost(blogId);

/**
 * Toggles visibility of the edit button based on authentication status.
 *
 * @async
 * @function hideEditBtn
 * @returns {Promise<void>} Resolves when the button visibility is updated.
 */
async function hideEditBtn() {
  const accessToken = localStorage.getItem("accessToken");
  const editBtn = document.querySelector(".edit-btn");

  if (!editBtn) {
    console.warn("Edit button not found in DOM.");
    return;
  }

  if (accessToken) {
    editBtn.classList.remove("admin-hidden");
  } else {
    editBtn.classList.add("admin-hidden");
  }
}

document.addEventListener("DOMContentLoaded", hideEditBtn);
