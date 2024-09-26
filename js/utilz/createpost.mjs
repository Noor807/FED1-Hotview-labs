export function createBlogItem(blogData) {
  // Create the blog item container
  const { id, title, body, media = {}, created, tags, author } = blogData;
  const blogItem = document.createElement("div");
  blogItem.classList.add('single-blog-item', 'carousel-item');

  // Create image container
  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  const imgElement = document.createElement("img");
  imgElement.src =
    media && media.url
      ? media.url
      : "https://media.istockphoto.com/id/1356933529/photo/futuristic-technology-wave-digital-cyberspace-abstract-wave-with-moving-particles-on.jpg?s=2048x2048&w=is&k=20&c=mQlLO3TqcbeiYTZPiCmsc0Tff-hIGsYwEFzCu272T8M="; // Set image source, fallback to empty if not provided
  imgElement.alt =
    media && media.alt
      ? media.alt
      : "technology-wave-digital-cyberspace-abstract-wave-with-moving-particles";

  // Safely check if media.alt is available before using it
  
  imgContainer.appendChild(imgElement);

  // Create tags and date container
  const tagsDate = document.createElement("div");
  tagsDate.className = "tags-date";
  const tagsP = document.createElement("p");
  tagsP.textContent = `Tags: ${tags}`;
  const dateP = document.createElement("p");
  dateP.textContent = created.slice(0, 10);
  tagsDate.appendChild(dateP);
  tagsDate.appendChild(tagsP);

  // Create title
  const blogTitle = document.createElement("h3");
  blogTitle.textContent = title;
  const blogBody = document.createElement("p");
  blogBody.textContent = 'test';

  // Create read more button
  const readMoreButton = document.createElement("button");
  readMoreButton.className = "read-more";
  readMoreButton.textContent = "Read more";
  readMoreButton.onclick = function () {
    window.location.href = `/post/index.html?id=${id}`;
  };

  // Append elements to the blog item container
  blogItem.appendChild(imgContainer);
  blogItem.appendChild(tagsDate);
  blogItem.appendChild(blogTitle);
  blogItem.appendChild(readMoreButton);

  // Append blog item to the main blog container

  return blogItem;
}


// 