const delete_dialog = document.getElementById("delete-application");

document.getElementById("d-cancel").addEventListener("click", () => {
  delete_dialog.close();
});

var delete_icons = document.getElementsByClassName("delete-icon");

for (let i = 0; i < delete_icons.length; i++) {
  delete_icons[i].addEventListener("click", () => {
    console.log(`${i}th item wants to be deleted`);
    delete_dialog.show_modal();
  });
}
