/**
 * @description Deletes displayed popup dialog, if the cancel option is clicked then nothing gets deleted.
 *
*/
const deleteBtn = document.getElementById('delete-btn');
const delete_dialog = document.getElementById('delete-application');


document.getElementById('d_cancel').addEventListener('click', () => {
    delete_dialog.close();
});


var deleteIcons = document.getElementsByClassName("delete-icon");

for (let i = 0; i < deleteIcons.length; i++) {
  deleteIcons[i].addEventListener("click", () => {
    console.log(`${i}th item wants to be deleted`);
    delete_dialog.showModal();
  });
}
