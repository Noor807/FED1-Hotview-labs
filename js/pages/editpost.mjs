import { getBlogPost } from "../utilz/get_blog_post.mjs";
import { createBlogItem } from "../utilz/create_adminlist.mjs";

const blogListContainer = document.querySelector(".adminlist-container");
const submitButton = document.querySelector(".submit");

/**
 * Fetches blog posts and renders them inside the admin list container.
 *
 * @async
 * @function displayAdminList
 * @returns {Promise<void>} Resolves when blog posts are fetched and displayed.
 */
async function displayAdminList() {
  try {
    const adminList = await getBlogPost();

    adminList.forEach((blogPost) => {
      const blogData = createBlogItem(blogPost);
      blogListContainer.appendChild(blogData);
    });
  } catch (error) {
    console.error("Error fetching admin list:", error);
  }
}

displayAdminList();

/**
 * Handles the form submission for editing an existing blog post.
 *
 * @async
 * @function handleEditBlogPost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves when the blog post update process is complete.
 */
async function handleEditBlogPost(event) {
  event.preventDefault();

  const accessToken = localStorage.getItem("accessToken");
  const blogId = document.getElementById("blog-id").value.trim();

  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("text-area").value.trim();
  const mediaUrl = document.getElementById("mediaUrl").value.trim();
  const mediaAlt = document.getElementById("mediaAlt").value.trim();

  const selectedTags = Array.from(
    document.querySelectorAll("input[name='tags']:checked")
  ).map((tag) => tag.value);

  /** @type {Object} blogPost */
  const blogPost = {
    title,
    body,
    tags: selectedTags,
  };

  if (mediaUrl || mediaAlt) {
    blogPost.media = {
      url: mediaUrl || "",
      alt: mediaAlt || "",
    };
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/Noor_irfan/${blogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(blogPost),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error("Failed to edit blog post: " + errorData.message);
    }

    alert("Blog post successfully edited!");
  } catch (error) {
    console.error("Error editing blog post:", error);
    alert("Failed to edit blog post: " + error.message);
  }
}

submitButton.addEventListener("click", handleEditBlogPost);
