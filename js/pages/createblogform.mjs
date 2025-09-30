/**
 * Event listener for creating a new blog post.
 *
 * - Collects and validates form data (title, body, tags, media).
 * - Ensures the user is logged in with valid credentials.
 * - Sends a POST request to the Noroff API to create a blog post.
 * - Provides feedback via alerts on success or failure.
 */
document
  .getElementById("create-blog-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("text-area").value.trim();
    const mediaUrl = document.getElementById("mediaUrl").value.trim();
    const mediaAlt = document.getElementById("mediaAlt").value.trim();

    const selectedTags = Array.from(
      document.querySelectorAll("input[name='tags']:checked")
    ).map((tag) => tag.value);

    const blogPost = {
      title,
      body,
      tags: selectedTags,
    };

    if (mediaUrl || mediaAlt) {
      blogPost.media = {
        url: mediaUrl || "",
        alt: mediaAlt || "",
      };
    }

    const userData = localStorage.getItem("adminUser");
    if (!userData) {
      alert("User is not logged in.");
      return;
    }

    const admin = JSON.parse(userData);
    if (!admin || !admin.name || !admin.accessToken) {
      alert("Invalid user data.");
      return;
    }

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/${admin.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.accessToken}`,
          },
          body: JSON.stringify(blogPost),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error("Failed to create blog post: " + errorData.message);
      }

      await response.json();
      alert("Blog post created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create blog post: " + error.message);
    }
  });
