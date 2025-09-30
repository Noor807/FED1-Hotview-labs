import { getBlogPost } from "../utilz/get_blog_post.mjs";
import { createBlogItem } from "../utilz/createpost.mjs";

const blogContainer = document.getElementById("blog-container");

/**
 * Fetches blog posts and displays them inside the blog container.
 *
 * @async
 * @function displayBlogs
 * @returns {Promise<void>} Resolves when blog posts are fetched and rendered.
 */
async function displayBlogs() {
  try {
    const blogs = await getBlogPost();

    blogs.forEach((blogData) => {
      const blogItem = createBlogItem(blogData);
      blogContainer.appendChild(blogItem);
    });
  } catch (error) {
    console.error("Error displaying blogs:", error);
  }
}

displayBlogs();
