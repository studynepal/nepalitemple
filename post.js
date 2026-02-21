const params = new URLSearchParams(window.location.search);
const postId = parseInt(params.get("id"));

fetch("data/posts.json")
  .then(res => res.json())
  .then(posts => {
    const post = posts.reverse()[postId];

    if (!post) {
      document.getElementById("post").innerHTML = "<p>Post not found.</p>";
      return;
    }

    document.getElementById("post").innerHTML = `
      <article>
        <h1>${post.title}</h1>
        <img src="${post.image}" alt="${post.title}">
        <p>${post.description}</p>
        <small>${post.date}</small>
      </article>
    `;
  });