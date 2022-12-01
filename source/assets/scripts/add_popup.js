const add_btn = document.getElementById("add_application_btn");
const add_dialog = document.getElementById("add-application");

document.getElementById("add_cancel").addEventListener("click", () => {
  add_dialog.close();
});

add_btn.addEventListener("click", () => {
  console.log("add application");
  // eslint-disable-next-line snakecasejs/snakecasejs
  add_dialog.showModal();
});
