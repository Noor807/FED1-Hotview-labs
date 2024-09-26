import { social_blogs_API_ENDPOINT } from "../../scripts/api.mjs";
const accessToken = localStorage.getItem('accessToken')

export function createBlogItem(blogPost) {
  const { media, title, author, created, id } = blogPost;
  // Create the main blog-item div
  const blogItem = document.createElement("div");
  blogItem.classList.add("blog-item");

  // Create the img element
  const imgElement = document.createElement("img");
  imgElement.src =
    media && media.url
      ? media.url
      : "https://media.istockphoto.com/id/1356933529/photo/futuristic-technology-wave-digital-cyberspace-abstract-wave-with-moving-particles-on.jpg?s=2048x2048&w=is&k=20&c=mQlLO3TqcbeiYTZPiCmsc0Tff-hIGsYwEFzCu272T8M="; // Set image source, fallback to empty if not provided
  imgElement.alt =
    media && media.alt
      ? media.alt
      : "technology-wave-digital-cyberspace-abstract-wave-with-moving-particles";

  // Append img to blog-item
  blogItem.appendChild(imgElement);

  // Create the blog-info div
  const blogInfo = document.createElement("div");
  blogInfo.classList.add("blog-info");

  // Create the title element (h3)
  const titleElement = document.createElement("h3");
  titleElement.textContent = title || "Untitled"; // Set the title, fallback to 'Untitled'

  // Create the author paragraph
  const authorElement = document.createElement("p");
  authorElement.classList.add("author");
  authorElement.textContent = author.name || "author"; // Set the author, fallback to 'Unknown Author'

  // Create the date paragraph
  const dateElement = document.createElement("p");
  dateElement.classList.add("date");
  dateElement.textContent = created.slice(0, 10) || "Unknown Date"; // Set the date, fallback to 'Unknown Date'

  // Append title, author, and date to blog-info
  blogInfo.appendChild(titleElement);
  blogInfo.appendChild(authorElement);
  blogInfo.appendChild(dateElement);

  // Create the button wrapper div
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btn-wrapper");

  // Create the Edit button
  const editButton = document.createElement("button");
  editButton.id = 'edit-btn';
  editButton.type = "button";
  editButton.value = id; // Set the id as the value for the button
  editButton.textContent = "Edit"; // Set button text
  editButton.addEventListener("click", async function () {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/Noor_irfan/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the blog post");
      }

      const blogPost = await response.json();
     document.getElementById('blog-id').value = blogPost.data.id
      document.getElementById("title").value = blogPost.data.title;
      document.getElementById("text-area").value = blogPost.data.body;
      document.getElementById("mediaUrl").value =
        blogPost.data.media?.url || "";
      document.getElementById("mediaAlt").value =
        blogPost.data.media?.alt || "";

      const tags = blogPost.data.tags || [];
      document.querySelectorAll('input[name="tags"]').forEach((checkbox) => {
        checkbox.checked = tags.includes(checkbox.value);
      });
      window.location.href = "#create-blog-form";
    } catch (error) {
      console.error("Error fetching blog post:", error);
      alert("Error fetching the blog post");
    }
  });

  // Create the Delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.type = "button";
  deleteButton.value = id; // Set the id as the value for the button
  deleteButton.textContent = "Delete"; // Set button text
  deleteButton.addEventListener("click", async function(){
    const confirmation = confirm("Are you sure you want to delete this blog post?");
    
    if (confirmation) {
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
  
        if (!response.ok) {
          throw new Error("Failed to delete the blog post");
        }
  
        blogItem.remove(); // Assuming blogItem is a reference to the DOM element for the blog post.
        alert("Blog post has been removed");
      } catch (error) {
        console.error("Error deleting the blog post:", error);
        alert("Error deleting the blog post");
      }
    } else {
      alert("Blog post deletion canceled.");
    }

  })
  
  // Append buttons to button wrapper
  btnWrapper.appendChild(editButton);
  btnWrapper.appendChild(deleteButton);

  // Append the button wrapper to blog-info
  blogInfo.appendChild(btnWrapper);

  // Append blog-info to blog-item
  blogItem.appendChild(blogInfo);

  // Return the constructed blog-item
  return blogItem;
}

 
