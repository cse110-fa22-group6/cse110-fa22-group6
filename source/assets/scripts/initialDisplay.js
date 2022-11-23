// main.js
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);
var num_of_card = 0
// Starts the program, all function calls trace back here
function init() {
  // Get the jobs from localStorage
  let jobs = get_jobs_from_storage();
  // Add each job to the <main> element
  num_of_card = jobs.length
  document.getElementById('number-of-job-cards').innerText = num_of_card
  add_jobs_to_document(jobs);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'jobs' from localStorage and returns an array of
 * all of the jobs found (parsed, not in string form). If
 * nothing is found in localStorage for 'jobs', an empty array
 * is returned.
 * @returns {Array<Object>} An array of jobs found in localStorage
 */
function get_jobs_from_storage() {
  //vars
  var unparsed_job_list = window.localStorage.getItem('jobs');
  var parsed_job_list = JSON.parse(unparsed_job_list);
  var empty_arr = [];

  //check for empty, then return empty
  if (parsed_job_list == null) {
    return empty_arr;
  }

  //else returns the parsed list
  return parsed_job_list; 
}

/**
 * Takes in an array of jobs and for each job creates a
 * new <job-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new job
 * to <main>
 * @param {Array<Object>} jobs An array of jobs
 */
function add_jobs_to_document(jobs) {
  // Get a reference to the <main> element
  let main = document.querySelector('main');

  // Loops through each of the jobs in the passed in array,
  // creates a <job-card> element for each one, and populate
  // Append each element to <main>
  let i = 0;
  while(i<jobs.length) {
    let job = document.createElement('job-card');
    job.data = jobs[i];
    main.append(job);
    i++;
  }
}

/**
 * Takes in an array of jobs, converts it to a string, and then
 * saves that string to 'jobs' in localStorage
 * @param {Array<Object>} jobs An array of jobs
 */
function save_jobs_to_storage(jobs) {
  localStorage.setItem('jobs', JSON.stringify(jobs));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  const add_dialog = document.getElementById("add-application");
  document.getElementById("add_cancel").addEventListener("click", () => {
    add_dialog.close();
  });

  let form_element = document.querySelector('#add-form');
  var item_list = get_jobs_from_storage()

  // Add an event listener for the 'submit' event, which fires when the
  // submit button is clicked
  form_element.addEventListener('submit', () => {
    //new FormData object from the <form> element reference above
    let form_data = new FormData(form_element); 
    let job_object = new Object();
    job_object['id'] = num_of_card
    job_object['status'] = 1
    num_of_card += 1
    for (var[key,value] of form_data) {
      job_object[key] = value;
    }

    // new <job-card> element
    let job_card = document.createElement('job-card'); 
    // Add the jobObject data to <recipe-card> using element.data
    job_card.data = job_object;
    // Append this new <job-card> to <main>
    //main.append
    document.querySelector('main').append(job_card);
    // Get the jobs array from localStorage, add this new job to it, and
    // then save the jobs array back to localStorage
    item_list.push(job_object);
    localStorage.setItem('jobs', JSON.stringify(item_list));
});

}

