/**
 * Fetches all blog posts for the user "Noor_irfan" from the API.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} Array of blog post objects.
 * @throws {Error} Throws an error if the fetch fails or the response is not OK.
 */
export async function getBlogPost() {
  const url = "https://v2.api.noroff.dev/blog/posts/Noor_irfan";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts. Status: ${response.status}`);
    }

    const blogArray = await response.json();

    // Ensure the data property exists
    if (!blogArray?.data) {
      throw new Error("Invalid response format: missing 'data' property.");
    }

    return blogArray.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}
