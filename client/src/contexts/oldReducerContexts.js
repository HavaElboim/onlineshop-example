export const initialState = {
    user: null,
  };
  
  export const ActionTypes = {
    UPDATE_USER: "UPDATE_USER",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    REQUEST_LOGIN: "REQUEST_LOGIN",
  };
  
 /* A reducer is a function that receives the current state and an action object, 
 decides how to update the state if necessary, 
 and returns the new state: (state, action) => newState.
 */
/* this is an example of redux action object- it has a: 
type (in format (feature or category that this action belongs to)/(the specific thing that happened))
payload = additional information about what happened:
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
*/ 
// see here: https://redux.js.org/tutorials/essentials/part-1-overview-concepts
/*
Reducers must always follow some specific rules:

- They should only calculate the new state value based on the state and action arguments
- They are not allowed to modify the existing state. 
Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
(hence the use below of: ...state)
- They must not do any asynchronous logic, calculate random values, or cause other "side effects"

Why Are They Called 'Reducers?'
The Array.reduce() method lets you take an array of values, process each item in the array one at a time, 
and return a single final result. You can think of it as "reducing the array down to one value".
*/
export function reducer(state = initialState, action) {
    console.log("reducer", state, action);
    switch (action.type) {
      case ActionTypes.REQUEST_LOGIN:
        return { ...state, loading: true };
      case ActionTypes.LOGIN_ERROR:
        return { ...state, error: action.error, loading: false };
      case ActionTypes.LOGIN_SUCCESS:
        return { ...state, user: action.user, loading: false };
      case ActionTypes.UPDATE_USER: {
        return { ...state, user: action.user };
      }
      default:
        console.log("reducer: unknown type: " + action.type);
      //throw new Error();
    }
  }
  