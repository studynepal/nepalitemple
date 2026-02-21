fetch("data/posts.json")
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById("posts");
    container.innerHTML = "";

    posts.forEach(post => {
      const article = document.createElement("article");

      article.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${post.image}" alt="${post.title}">
        <p>${post.description}</p>
        <small>${post.date}</small>
        <hr>
      `;

      container.appendChild(article);
    });
  })
  .catch(error => {
    console.error("Error loading posts:", error);
  });