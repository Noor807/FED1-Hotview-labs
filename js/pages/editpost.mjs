import { getBlogPost } from "../utilz/get_blog_post.mjs";
import { createBlogItem } from "../utilz/create_adminlist.mjs"; // Import your createBlogItem function

// Assuming you have a container for displaying the blog items
const blogListContainer = document.querySelector(".adminlist-container");

async function displayAdminList() {
  try {
    // Fetch the list of blog posts
    const adminList = await getBlogPost();
    console.log(adminList);

    // Iterate through each blog post in the list
    adminList.forEach((blogPost) => {
      // Extract the necessary data for each blog post

      const blogData = createBlogItem(blogPost);

      // Append the blog item to the container
      blogListContainer.appendChild(blogData);
    });
  } catch (error) {
    console.error("Error fetching admin list:", error);
  }
}

displayAdminList();
const submitbutton = document.querySelector('.submit')
submitbutton.addEventListener('click' , async function(event){
event.preventDefault()

  const accessToken = localStorage.getItem('accessToken')
  const blogId = document.getElementById('blog-id').value
  const title = document.getElementById("title").value;
  const body = document.getElementById("text-area").value;
  const mediaUrl = document.getElementById("mediaUrl").value;
  const mediaAlt = document.getElementById("mediaAlt").value;
  const selectedTags = Array.from(
    document.querySelectorAll("input[name='tags']:checked")
  ).map((tag) => tag.value);

  // Create the blog post object based on the structure
  const blogPost = {
    title: title,
    body: body,
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
      const errorData = await response.json(); // Try to get error details from the response
      console.error("Error details:", errorData);
      throw new Error("Failed to create blog post: " + errorData.message);
    }


    alert("Blog post successfully edited!");
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to create blog post: " + error.message);
  }

})


