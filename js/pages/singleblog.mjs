import { createBlogContainer } from "../utilz/singlepost.mjs";
const singleBlogContainer = document.querySelector(".single-blog-container");

function getQueryParameter(id) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(id);
}
const blogId = getQueryParameter("id");

async function getBlogPost(blogId) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/Noor_irfan/${blogId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/Json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("fail to fetch blog post");
    }
    const blogPost = await response.json();
    const blogItem = createBlogContainer(blogPost.data);
    singleBlogContainer.appendChild(blogItem);
  } catch (error) {
    console.error(error);
  }
}

getBlogPost(blogId);
document.addEventListener("DOMContentLoaded", function () {
  async function hideEditBtn() {
    const accessToken = localStorage.getItem("accessToken");
    const editBtn = document.querySelector(".edit-btn");

    if (accessToken) {
      editBtn.classList.remove("admin-hidden");
    } else {
      editBtn.classList.add("admin-hidden");
    }
  }
  hideEditBtn();
});
