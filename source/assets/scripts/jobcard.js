var editModal = document.getElementById("edit-modal");
var deleteModal = document.getElementById("delete-modal");

/**
 * Listen for which edit modal is clicked
 */
var editIcons = document.getElementsByClassName("edit-icon");
for (let i = 0; i < editIcons.length; i++) {
  editIcons[i].addEventListener("click", () => {
    console.log(`${i}th item wants to be edited`);
    editModal.style.display = "block";
  });
}

/* Show the specific modal */
document
  .getElementsByClassName("edit-icon")[0]
  .addEventListener("click", () => {
    editModal.style.display = "block";
  });

/**
 * Listen for which delete modal is clicked
 */
var deleteIcons = document.getElementsByClassName("delete-icon");
for (let i = 0; i < deleteIcons.length; i++) {
  deleteIcons[i].addEventListener("click", () => {
    console.log(`${i}th item wants to be deleted`);

    /* Show the specific modal */
    deleteModal.style.display = "block";
  });
}

/**
 * Listen for any modals being closed by pressing "x".
 */
for (let i = 0; i < document.getElementsByClassName("close").length; i++) {
  var close = document
    .getElementsByClassName("close")
    [i].addEventListener("click", () => {
      /* Hide the clicked modal */
      editModal.style.display = "none";
      deleteModal.style.display = "none";
    });
}

/**
 * Click outside of the modal to close it.
 * @param {*} event
 */
window.onclick = function (event) {
  if (event.target == editModal || event.target == deleteModal) {
    /* Hide the modal */
    editModal.style.display = "none";
    deleteModal.style.display = "none";
  }
};

//-----------------------------------------------//

/**
 * FIXME
 * Updates the progress bar by getting which
 * progress step was clicked and updating the coloring
 * for that specific progress bar
 *
 * @param e - The observable event.
 * @listens
 */

// loop thru all progress bars and add click listeners to them all.
for (let i = 0; i < document.getElementsByClassName("stages").length; i++) {
  document
    .getElementsByClassName("stages")
    [i].addEventListener("click", function (e) {
      // get which bubble was clicked for that specific progress bar
      if (e.target && e.target.nodeName == "LI") {
        let stepNum = parseInt(e.target.textContent);
        console.log(`updating progress bar ${i}`);
        // make the clicked bubble purple and all others white
        updateProgress(document.getElementsByClassName("stages")[i], stepNum);
      }
    });
}

/**
 * FIXME: Fix params
 * Makes a specific bubble purple (denoted with the ul and stepNum) while
 * making all others white
 * @param {number} stepNum - The current step (bubble) we have clicked
 */
function updateProgress(ul, stepNum) {
  // get the specific progress bar
  var li = ul.getElementsByTagName("li");

  /*
  loop thru all bubbles of a specific 
  progress bar and make them all white by 
  removing 'active' class, besides the one 
  we clicked (denoted by stepNum-1)
  in that case, we add the 'active' class
  to make it purple
  */
  for (let i = 0; i < li.length; i++) {
    if (i == stepNum - 1) {
      li[i].classList.add("active");
      console.log(`Updated stage ${i + 1}`);
    } else {
      li[i].classList.remove("active");
    }
  }
}
