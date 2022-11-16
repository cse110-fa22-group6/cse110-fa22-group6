const deleteBtn = document.getElementById('deletebtn');
const delete_dialog = document.getElementById('delete-application');

document.getElementById('d_cancel').addEventListener('click', () => {
    delete_dialog.close();
    reset();
});

deleteBtn.addEventListener('click', () => {
    delete_dialog.showModal();
});
