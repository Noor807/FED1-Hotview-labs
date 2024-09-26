document
  .getElementById("create-blog-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the values from the form
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

    // Get the username from local storage
    const username = localStorage.getItem("adminUser");
    if (!username) {
      alert("Username is not available in local storage.");
      return;
    }

    const admin = JSON.parse(username);

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
        const errorData = await response.json(); // Try to get error details from the response
        console.error("Error details:", errorData);
        throw new Error("Failed to create blog post: " + errorData.message);
      }

      const result = await response.json();
      console.log("Blog post created successfully:", result);
      alert("Blog post created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create blog post: " + error.message);
    }
  });
