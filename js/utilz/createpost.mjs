/**
 * Creates a single blog item element for carousel or list display.
 *
 * @param {Object} blogData - Blog post data.
 * @param {string} blogData.id - The unique ID of the blog post.
 * @param {string} blogData.title - The title of the blog post.
 * @param {string} blogData.body - The body text of the blog post.
 * @param {Object} [blogData.media] - Optional media object containing URL and alt text.
 * @param {string} blogData.media.url - Image URL.
 * @param {string} blogData.media.alt - Image alt text.
 * @param {string} blogData.created - Blog creation date.
 * @param {string[]} [blogData.tags] - Array of tags for the blog post.
 * @param {Object} blogData.author - Author object (optional).
 * @returns {HTMLElement} The constructed blog item element.
 */
export function createBlogItem(blogData) {
  const { id, title, body, media = {}, created, tags = [], author } = blogData;

  // Main container
  const blogItem = document.createElement("div");
  blogItem.classList.add("single-blog-item", "carousel-item");

  // Image container
  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";

  const imgElement = document.createElement("img");
  imgElement.src =
    media.url ||
    "https://media.istockphoto.com/id/1356933529/photo/futuristic-technology-wave-digital-cyberspace-abstract-wave-with-moving-particles-on.jpg?s=2048x2048&w=is&k=20&c=mQlLO3TqcbeiYTZPiCmsc0Tff-hIGsYwEFzCu272T8M=";
  imgElement.alt =
    media.alt ||
    "technology-wave-digital-cyberspace-abstract-wave-with-moving-particles";

  imgContainer.appendChild(imgElement);

  // Tags and date container
  const tagsDate = document.createElement("div");
  tagsDate.className = "tags-date";

  const dateP = document.createElement("p");
  dateP.textContent = created?.slice(0, 10) || "Unknown Date";

  const tagsP = document.createElement("p");
  tagsP.textContent = tags.length ? `Tags: ${tags.join(", ")}` : "No tags";

  tagsDate.appendChild(dateP);
  tagsDate.appendChild(tagsP);

  // Title element
  const blogTitle = document.createElement("h3");
  blogTitle.textContent = title || "Untitled";

  // Body preview (optional, can be customized)
  const blogBody = document.createElement("p");
  blogBody.textContent = body ? `${body.slice(0, 100)}...` : "";

  // Read more button
  const readMoreButton = document.createElement("button");
  readMoreButton.className = "read-more";
  readMoreButton.textContent = "Read more";
  readMoreButton.addEventListener("click", () => {
    window.location.href = `/post/index.html?id=${id}`;
  });

  // Append elements to blog item
  blogItem.appendChild(imgContainer);
  blogItem.appendChild(tagsDate);
  blogItem.appendChild(blogTitle);
  blogItem.appendChild(blogBody);
  blogItem.appendChild(readMoreButton);

  return blogItem;
}
