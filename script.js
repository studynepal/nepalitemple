const POSTS_PER_PAGE = 3;
let currentPage = 1;
let allPosts = [];

fetch("data/posts.json")
  .then(res => res.json())
  .then(posts => {
    allPosts = posts.reverse(); // newest first
    renderPage();
  });

function renderPage() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pagePosts = allPosts.slice(start, end);

  pagePosts.forEach(post => {
    const article = document.createElement("article");
    article.innerHTML = `
      <h2>${post.title}</h2>
      <img src="${post.image}" alt="${post.title}">
      <p>${post.description}</p>
      <small>${post.date}</small>
    `;
    container.appendChild(article);
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

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
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
};