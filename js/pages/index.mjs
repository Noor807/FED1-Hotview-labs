
// Assuming getBlogPost and createBlogItem are exported from the same or different files
import { getBlogPost } from '../utilz/get_blog_post.mjs';  // Adjust the import path as needed
import { createBlogItem } from '../utilz/createpost.mjs';  // Adjust the import path as needed

async function populateBlogItems() {
  try {
    // const blogData = await getBlogPost(); // Fetch blog posts from API

    
  } catch (error) {
    console.error('Error populating blog items:', error);
  }
}

// Call the function to populate the blog items
//  populateBlogItems();

 const blogContainer = document.getElementById('blog-container')
    async function displayBlogs() {
        const blogs = await getBlogPost();
     
        blogs.forEach((blogData) => {
          const blogItem = createBlogItem(blogData);
          blogContainer.appendChild(blogItem);
        });
      }
     
      displayBlogs();

