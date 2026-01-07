async function loadHTML(selector, file) {
  const el = document.querySelector(selector);
  const res = await fetch(file + "?v=" + Date.now());

  el.innerHTML = await res.text();
}

loadHTML("#header", "./src/components/header.html");
loadHTML("#main", "./src/components/main.html");
loadHTML("#footer", "./src/components/footer.html");
