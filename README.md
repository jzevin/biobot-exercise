# Jeremy Zevin - Biobot Exercise

You will need to first install the dependencies

## `npm i`

---

Then start the Frontend:

## `npm run start:fe`

Runs the frontend app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

Then start the API:

## `npm run start:api`

Runs the API app.\
Open [http://localhost:3001/kits](http://localhost:3001/kits).

---

## Notes:

1. A min of 3 chars is required to initiate the autocomplete
1. Although the API supports it, and in a real-world implementation there would likely be more info in the detail, so you you would likely hit the detail endpoint when the user clicked an autocomplete item; however, all the data is there, so I just pass that along with the hoisted app state
1. Would probably put a throttle on the change function in real-world
1. Would implement the use of up/down arrow keys to navigate autocomplete in real-world; however not in scope for this. I did add tab indexing so you can use tabbing and enter key
1. Would write unit and fe tests with more time
