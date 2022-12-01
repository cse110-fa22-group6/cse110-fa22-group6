const add_btn = document.getElementById("add-application-btn");
const add_dialog = document.getElementById("add-application");

document.getElementById("add-cancel").addEventListener("click", () => {
  add_dialog.close();
});


add_btn.addEventListener("click", () => {
  console.log("add application");
  add_dialog.show_modal();
});
