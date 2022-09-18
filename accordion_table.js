function toggleTable(e) {
  let targetIndex = Array.from(e.parentElement.children).indexOf(e) + 1;
  let target = Array.from(e.parentElement.children)[targetIndex];
  if (!target.classList.contains("table-containing-row")) {
    return;
  }
  if (target.dataset.expanded === "true") {
    {
      e.dataset.expanded = "false";
      target.dataset.expanded = "false";
      e.querySelector("td:first-child").dataset.expandIcon = "➕";
    }
  } else {
    e.dataset.expanded = "true";
    target.dataset.expanded = "true";
    e.querySelector("td:first-child").dataset.expandIcon = "➖";
  }
}

function toggleMoreRows(e) {
  e.dataset.expanded = e.dataset.expanded === "true" ? "false" : "true";
}
