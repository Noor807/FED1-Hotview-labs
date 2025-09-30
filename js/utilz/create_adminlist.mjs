import { social_blogs_API_ENDPOINT } from "../../scripts/api.mjs";

const accessToken = localStorage.getItem("accessToken");

/**
 * Creates a blog item DOM element for displaying in the admin blog list.
 *
 * @param {Object} blogPost - The blog post data.
 * @param {Object[]} [blogPost.media] - Optional media array.
 * @param {string} blogPost.title - The title of the blog post.
 * @param {Object} blogPost.author - The author object containing `name`.
 * @param {string} blogPost.created - The creation date of the blog post.
 * @param {string} blogPost.id - The ID of the blog post.
 * @returns {HTMLElement} The constructed blog item element.
 */
export function createBlogItem(blogPost) {
  const { media, title, author, created, id } = blogPost;

  // Main blog-item container
  const blogItem = document.createElement("div");
  blogItem.classList.add("blog-item");

  // Blog image
  const imgElement = document.createElement("img");
  imgElement.src =
    media?.url ||
    "https://media.istockphoto.com/id/1356933529/photo/futuristic-technology-wave-digital-cyberspace-abstract-wave-with-moving-particles-on.jpg?s=2048x2048&w=is&k=20&c=mQlLO3TqcbeiYTZPiCmsc0Tff-hIGsYwEFzCu272T8M=";
  imgElement.alt =
    media?.alt ||
    "technology-wave-digital-cyberspace-abstract-wave-with-moving-particles";
  blogItem.appendChild(imgElement);

  // Blog info container
  const blogInfo = document.createElement("div");
  blogInfo.classList.add("blog-info");

  // Title element
  const titleElement = document.createElement("h3");
  titleElement.textContent = title || "Untitled";

  // Author element
  const authorElement = document.createElement("p");
  authorElement.classList.add("author");
  authorElement.textContent = author?.name || "Unknown Author";

  // Date element
  const dateElement = document.createElement("p");
  dateElement.classList.add("date");
  dateElement.textContent = created?.slice(0, 10) || "Unknown Date";

  // Append title, author, and date
  blogInfo.appendChild(titleElement);
  blogInfo.appendChild(authorElement);
  blogInfo.appendChild(dateElement);

  // Button wrapper
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btn-wrapper");

  // Edit button
  const editButton = document.createElement("button");
  editButton.id = "edit-btn";
  editButton.classList.add("edit-btn");
  editButton.type = "button";
  editButton.value = id;
  editButton.textContent = "Edit";

  editButton.addEventListener("click", async () => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/Noor_irfan/${id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) throw new Error("Failed to fetch the blog post");

      const blogPostData = await response.json();

      document.getElementById("blog-id").value = blogPostData.data.id;
      document.getElementById("title").value = blogPostData.data.title;
      document.getElementById("text-area").value = blogPostData.data.body;
      document.getElementById("mediaUrl").value =
        blogPostData.data.media?.url || "";
      document.getElementById("mediaAlt").value =
        blogPostData.data.media?.alt || "";

      const tags = blogPostData.data.tags || [];
      document.querySelectorAll('input[name="tags"]').forEach((checkbox) => {
        checkbox.checked = tags.includes(checkbox.value);
      });

      window.location.href = "#create-blog-form";
    } catch (error) {
      console.error("Error fetching blog post:", error);
      alert("Error fetching the blog post");
    }
  });

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.type = "button";
  deleteButton.value = id;
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmation) return alert("Blog post deletion canceled.");

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/Noor_irfan/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete the blog post");

      blogItem.remove();
      alert("Blog post has been removed");
    } catch (error) {
      console.error("Error deleting the blog post:", error);
      alert("Error deleting the blog post");
    }
  });

  // Append buttons and info
  btnWrapper.appendChild(editButton);
  btnWrapper.appendChild(deleteButton);
  blogInfo.appendChild(btnWrapper);
  blogItem.appendChild(blogInfo);

  return blogItem;
}
