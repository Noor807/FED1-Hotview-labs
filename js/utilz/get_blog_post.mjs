
export async function getBlogPost() {
  const url = 'https://v2.api.noroff.dev/blog/posts/Noor_irfan';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const blogArray = await response.json(); // Assume the response is an array of blog posts
    return blogArray.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}
