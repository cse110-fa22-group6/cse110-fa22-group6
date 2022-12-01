const addBtn = document.getElementById("add-application-btn");
const add_dialog = document.getElementById("add-application");

document.getElementById("add_cancel").addEventListener("click", () => {
  add_dialog.close();
});

addBtn.addEventListener("click", () => {
  console.log("add application");
  add_dialog.showModal();
});
