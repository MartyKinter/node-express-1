# Broken App Issues
- changed the axios and app variables to const so they can't be changed by mistake

- turned the post function into an async function

- the map fuction on req.body.developers returns an array of promises so you have to await the results of those promises

- changed "results" and "out" to const valriables to show they dont change

- the catch block was missing the err argument 

- refactored code to pull out the logic into its own function instead of having it in the route 