const POSTS_PER_PAGE = 3;
let currentPage = 1;
let allPosts = [];
let filteredPosts = [];

fetch("data/posts.json")
  .then(res => res.json())
  .then(posts => {
    allPosts = posts.reverse(); // newest first
    filteredPosts = allPosts;
    renderPage();
  });

function renderPage() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(start, end);

  pagePosts.forEach(post => {
    const article = document.createElement("article");

    article.innerHTML = `
      <h2>${post.title}</h2>
      <img src="${post.image}" alt="${post.title}">
      <p>${post.description}</p>
      <small>${post.date}</small>
    `;

    article.style.cursor = "pointer";
    article.onclick = () => {
      const index = allPosts.indexOf(post);
      window.location.href = `post.html?id=${index}`;
    };

    container.appendChild(article);
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;

  document.getElementById("page-info").textContent =
    `Page ${currentPage} of ${totalPages}`;

  document.getElementById("prev").disabled = currentPage === 1;
  document.getElementById("next").disabled = currentPage === totalPages;
}

document.getElementById("prev").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
};

document.getElementById("next").onclick = () => {
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
};

document.getElementById("search").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  currentPage = 1;

  filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query)
  );

  renderPage();
});