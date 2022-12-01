# Wing It

## Team 6 - First Backend meeting for sprint 1 (planning)

Zoom - 11/03/22

9:00pm - 9:30pm

<hr>

### Members
- Supratik 
- Micheal Lian(absent)
- Cristian Antonio Hernandez 
- Jongmin Kim 
- Andrei Secor 

### Agenda:
- Assigning roles for each operation.
- Create
- Read 
- Update
- Delete
- Creating a backend branch
- Documenting (pipeline)

### New Business and Discussion:
- Functions:
  - Create - Sup , Cristian
    - Button event to call Create dialog
    - Parse strings from the dialog, assign informations into each object
  - Read - Front-End + Sup , Cristian
    - Read json from the local storage make it as specific data structures
    - Make it as new HTML format(with front end) 
  - Update - text - updating tags
    - Stage update(color changing for circle)
    - Content edit
    - Json update, and store local storage
  - Delete - Sup, Cristian
    - Click event(delete dialog)
  - Create a back end branch
    - Each feature has separate branch, individuals can also have additional branches
    - Branch naming convention: backend-name-feature
- Merge Back end and front end branch after every sprint. 
- Store local data as JSON
  - JSON file has array of objects, every object represents an application
  - Each object is gonna have data according to the wireframe
	- Store each job_object in an array with Id corresponding to the index of the array
	- Object names for each job(JSON):
    - company_name
    - location
    - status: (unapplied, applied, rejected, screened, interviewed, offer)
    - 0-5 in listed order
    - id
    - position
    - Image(not in this phase)

 - For CI/CD 
    - Add superlinter for code style and formatting
    - Follow jsDoc convention for documentation.
		- jsDoc - sup, cristian
		- Superlinter - Andrei, Jongmin, Micheal

### Unfinished business 
  - None

### Concerns 
  - None
