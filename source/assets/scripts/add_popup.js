const addBtn = document.getElementById("add_application_btn");
const add_dialog = document.getElementById("add-application");

document.getElementById("add_cancel").addEventListener("click", () => {
  add_dialog.close();
});

var addIcon = document.getElementsByClassName("add-icon");

addBtn.addEventListener("click", () => {
  console.log("add application");
  add_dialog.showModal();
});
