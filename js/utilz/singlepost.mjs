/**
 * Creates a DOM element representing a single blog post.
 *
 * @param {Object} blogPost - The blog post data.
 * @param {string} blogPost.title - The title of the blog post.
 * @param {string} blogPost.body - The content of the blog post.
 * @param {Object} [blogPost.media={}] - The media object for the blog post.
 * @param {string} [blogPost.media.url] - The URL of the media image.
 * @param {string} [blogPost.media.alt] - The alt text for the media image.
 * @param {string} blogPost.created - The creation date of the blog post.
 * @param {Array<string>} blogPost.tags - The tags associated with the post.
 * @param {Object} blogPost.author - The author of the post.
 * @param {string} blogPost.author.name - The name of the author.
 * @returns {HTMLElement} The constructed blog container element.
 */
export function createBlogContainer(blogPost) {
  const { title, body, media = {}, created, tags, author } = blogPost;

  // Main container
  const blogContainer = document.createElement("div");
  blogContainer.classList.add("blog-container");

  // Blog image
  const imgElement = document.createElement("img");
  imgElement.classList.add("single-post-img");
  imgElement.src =
    media.url ||
    "https://media.istockphoto.com/id/1356933529/photo/futuristic-technology-wave-digital-cyberspace-abstract-wave-with-moving-particles-on.jpg?s=2048x2048&w=is&k=20&c=mQlLO3TqcbeiYTZPiCmsc0Tff-hIGsYwEFzCu272T8M=";
  imgElement.alt =
    media.alt ||
    "technology-wave-digital-cyberspace-abstract-wave-with-moving-particles";
  blogContainer.appendChild(imgElement);

  // Title wrapper
  const titleWrapper = document.createElement("div");
  titleWrapper.classList.add("title-wrapper");

  // Title element
  const titleElement = document.createElement("h1");
  titleElement.textContent = title;
  titleWrapper.appendChild(titleElement);

  // Share button
  const shareButton = document.createElement("button");
  shareButton.type = "button";
  shareButton.classList.add("share-btn");

  const shareMsg = document.createElement("b");
  shareMsg.classList.add("copy-msg");
  shareMsg.textContent = "copied";
  shareButton.appendChild(shareMsg);

  const shareIcon = document.createElement("img");
  shareIcon.src = "../assets/share-link.png";
  shareIcon.alt = "Share";
  shareButton.appendChild(shareIcon);

  shareButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      shareMsg.style.display = "block";
      setTimeout(() => (shareMsg.style.display = "none"), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  });

  titleWrapper.appendChild(shareButton);
  blogContainer.appendChild(titleWrapper);

  // Author and date container
  const authorDate = document.createElement("div");
  authorDate.classList.add("author-date");

  const dateElement = document.createElement("p");
  dateElement.textContent = created.slice(0, 10);

  const authorElement = document.createElement("p");
  authorElement.textContent = author.name;

  authorDate.appendChild(dateElement);
  authorDate.appendChild(authorElement);
  blogContainer.appendChild(authorDate);

  // Blog body
  const paragraph = document.createElement("p");
  paragraph.innerHTML = body.replace(/\n/g, "<br>");
  blogContainer.appendChild(paragraph);

  return blogContainer;
}
