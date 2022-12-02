# Use Browser Local Storage to store Json Object

## Context and Problem Statement

How to store data written by the create function.

## Considered Options

- a new json file
- a new csv file
- browser local storage

## Decision Outcome

Chosen option: "browser local storage".

### Consequences

- Good, because file no new file is created for each addition of a job card.
- Good, because file is automatically overwwritten.
- Good, because stores json objects, no additional computation needed for storing or reading.
- Good, all the team members have experience working with local storage
- Bad, because clearing of browser cache removes the saved data.

## Pros and Cons of the Options

### A new JSON file

Example:

```javaScript
var dict = [
    {
        "position":"Software Engineer Intern",
        "location":"Seattle, WA",
        "company_name":"Amazon",
        "status":1
	"date": "23/07/22"
    },
    {
        "position":"Product Manager Intern",
        "location":"Mountain View, CA",
        "company_name":"Google",
        "status":3
	"date": "14/05/22"
    }
]

var dictstring = JSON.stringify(dict);

var fs = require('fs');
fs.writeFile("thing.json", dictstring, function(err, result) {
    if(err) console.log('error', err);
});

```

- Good, because file JSON object is easily retrievable without much computation.
- Bad, because file does not auto overwrite old json file, creates new one every time.
- Bad, because after every job object creation, the browser asks the user for permission to download.

### CSV file

Example:

```javaScript
var json3 = [
    {
        "position":"Software Engineer Intern",
        "location":"Seattle, WA",
        "company_name":"Amazon",
        "status":1
	"date": "23/07/22"
    },
    {
        "position":"Product Manager Intern",
        "location":"Mountain View, CA",
        "company_name":"Google",
        "status":3
	"date": "14/05/22"
    }
]

var json = json3.items
var fields = Object.keys(json[0])
var replacer = function(key, value) { return value === null ? '' : value }
var csv = json.map(function(row){
  return fields.map(function(fieldName){
    return JSON.stringify(row[fieldName], replacer)
  }).join(',')
})
csv.unshift(fields.join(',')) // add header column
 csv = csv.join('\r\n');
console.log(csv)
```

- Bad, because file does not auto overwrite old csv file, creates new one every time.
- Bad, because after every job object creation, the browser asks the user for permission to download.
- Bad, because extremely complicated code.
- Bad, because conversion from csv json needed everytime on read and json to csv on create.

### Browser Local Storage

Example:

```javaScript
var data = [
    {
        "position":"Software Engineer Intern",
        "location":"Seattle, WA",
        "company_name":"Amazon",
        "status":1
	"date": "23/07/22"
    },
    {
        "position":"Product Manager Intern",
        "location":"Mountain View, CA",
        "company_name":"Google",
        "status":3
	"date": "14/05/22"
    }
]

localStorage.setItem('data', JSON.stringify(data));
```

- Good, easy to code/bugfix as it is 1 line of code.
- Good, file creation/overwritting/deletion is handled by browser.
- Good, minimal computation needed to read as object is stored as JSON.
- Bad, deletion of browser cache deletes data.
