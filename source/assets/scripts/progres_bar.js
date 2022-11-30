// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

function init () {
  progressBarListener();
}

/**
 * @description Updates progress bar by retrieving which step was clicked and updates the coloring of all steps accordingly
 */
function progressBarListener () {
  // prettier-ignore
  for (let i = 0; i < document.getElementsByClassName("stages").length; i++) {
  document
    .getElementsByClassName("stages")[i]
    .addEventListener("click", function (e) {
      // get which bubble was clicked for that specific progress bar
      if (e.target && e.target.nodeName == "LI") {
        let stepNum = parseInt(e.target.textContent);
        console.log(`updating progress bar ${i}`);
        // make the clicked bubble purple and all others white
        updateProgress(document.getElementsByClassName("stages")[i], stepNum);
      }
    });
}
}

/**
 * @param {Object} ul The progress bar
 * @param {number} stepNum The current step (bubble) we have clicked
 * @description Makes a specific bubble purple and makes all others white.
 */
function updateProgress (ul, stepNum) {
  // get the specific progress bar
  const li = ul.getElementsByTagName("li");

  // change each bubble accordingly
  for (let i = 0; i < li.length; i++) {
    if (i === stepNum - 1) {
      li[i].classList.add("active");
      console.log(`Updated stage ${i + 1}`);
    } else {
      li[i].classList.remove("active");
    }
  }
}
