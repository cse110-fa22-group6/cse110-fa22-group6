const edit_dialog = document.getElementsByClassName('edit-application')[0];
const edit_cancel = document.getElementsByClassName('edit_cancel')

for (let i = 0; i < edit_cancel.length; i++) {
  edit_cancel[i].addEventListener("click", () => {
    edit_dialog.close();
  });
}


var editIcons = document.getElementsByClassName("edit-icon");
console.log(edit_dialog)
for (let i = 0; i < editIcons.length; i++) {
  editIcons[i].addEventListener("click", () => {
    console.log(`${i}th item wants to be edited`);
    edit_dialog.showModal();
  });
}
