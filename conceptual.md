### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
You can manage async code with callbacks, promises and async/await. Callbacks are passed into functions and called once the function is completed, Promises represent a placeholder for a future value and async/await allow you to write async code to look like synchronous code but await the requested values.

- What is a Promise?
A promise represents a placeholder for a future value 

- What are the differences between an async function and a regular function?
Async functions always return an promise while regular functions do not. Also async functions can use the await keyword to wait for the promise to be resolved.

- What is the difference between Node.js and Express.js?
Node is a way of writing server-side javascript, express is a web framework for node that helps to create web apps and APIs

- What is the error-first callback pattern?
The error first patter is a convention for node where the first argument in a callback function is an error object and if there's no error the argument will be null

- What is middleware?
Middleware is a function that happens between the client and server-side and performs an action on the request or response

- What does the `next` function do?
The next function allows one function to pass information to the next middleware function 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
One issue is that the function makes 3 api calls in a row instead of making them in parallel, you could fix this with promise.all, and another issue is that the functions returns an array of users in a different order than the api calls were made that could confuse people. Here is a function correcting those two issues:
```js
async function getUsers() {
  const [elie, joel, matt] = await Promise.all([
    $.getJSON('https://api.github.com/users/elie'),
    $.getJSON('https://api.github.com/users/joelburton'),
    $.getJSON('https://api.github.com/users/mmmaaatttttt')
  ]);

  return [elie, joel, matt];
}
```