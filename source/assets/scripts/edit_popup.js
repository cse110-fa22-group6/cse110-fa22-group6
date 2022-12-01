const edit_dialog = document.getElementsByClassName("edit-application")[0];
const edit_cancel = document.getElementsByClassName("edit-cancel");

for (let i = 0; i < edit_cancel.length; i++) {
  edit_cancel[i].addEventListener("click", () => {
    edit_dialog.close();
  });
}

var edit_icons = document.getElementsByClassName("edit-icon");
console.log(edit_dialog);
for (let i = 0; i < edit_icons.length; i++) {
  edit_icons[i].addEventListener("click", () => {
    console.log(`${i}th item wants to be edited`);
    // eslint-disable-next-line snakecasejs/snakecasejs
    edit_dialog.showModal();
  });
}
