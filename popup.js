function renderLinks() {
  const container = document.getElementById("app");

  container.innerHTML = "";

  Object.entries(linksData).forEach(([category, links]) => {
    const title = document.createElement("h3");
    title.textContent = category;
    title.className = "category-title";
    container.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "category-grid";

    links.forEach((link) => {
      const button = document.createElement("button");
      button.textContent = link.label;
      button.className = "link-button";
      button.dataset.url = link.url;
      grid.appendChild(button);
    });

    container.appendChild(grid);
  });
}

document.getElementById("app").addEventListener("click", async (event) => {
  const button = event.target.closest(".link-button");
  if (!button) return;

  const url = button.dataset.url;
  const originalText = button.textContent;

  try {
    await navigator.clipboard.writeText(url);

    button.textContent = "Скопировано!";
    button.classList.add("copied");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("copied");
    }, 1500);
  } catch (error) {
    console.error("Ошибка копирования:", error);
    button.textContent = "Ошибка";
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("copied");
    }, 1500);
  }
});

document.addEventListener("DOMContentLoaded", renderLinks);
