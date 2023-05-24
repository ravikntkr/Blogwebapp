// Fetch data from API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    const blogList = document.getElementById("blogList");
    data.forEach((blog) => {
      const div = document.createElement("div");
      div.classList.add("blog-card");
      div.innerHTML = `
      <h3 class='blog-title'>${blog.title}</h3>
      <p class='blog-text'>${blog.body}</p>
      <span class="post-no">${blog.id}</span>
      <button class="delete-btn" data-id="${blog.id}">Delete</button>`;
      blogList.appendChild(div);
    });
  });

// Add new blog || POST Method
document.getElementById("addpost").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("posttitle").value;
  const body = document.getElementById("postcontent").value;

  const postData = {
    title,
    body,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      const blogList = document.getElementById("blogList");
      const div = document.createElement("div");
      div.classList.add("blog-card");
      div.innerHTML = `<h3 class='blog-title'>${data.title}</h3>
      <p class='blog-text'>${data.body}</p>
      <span class="post-no">${data.id}</span>
      <button class="delete-btn" data-id="${data.id}">Delete</button>`;
      blogList.appendChild(div);
      document.getElementById("addpost").reset();
    });
});

// Delete
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const blogId = event.target.getAttribute("data-id");
    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
      method: "DELETE",
    }).then(() => {
      event.target.parentElement.remove();
    });
  }
});
