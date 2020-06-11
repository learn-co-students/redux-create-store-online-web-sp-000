function createStore() {
  let state;
 
  function dispatch(action) {
    state = reducer(state, action);
    render();
  }
 
  function getState() {
    return state;
  }
 
  return {
    dispatch,
    getState
  };
};
 
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
 
    default:
      return state;
  }
};
 
function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};
 
let store = createStore();
store.dispatch({ type: '@@INIT' });
let button = document.getElementById('button');
 
button.addEventListener('click', () => {
    store.dispatch({ type: 'INCREASE_COUNT' });
})
Our code is back to working. And it looks like we have a function called createStore which can work with any JavaScript application...almost.

Abstract away the reducer
We know that Redux works by having an action dispatched, which calls a reducer, and then renders the view. Our createStore's dispatch method does that.

function dispatch(action) {
  state = reducer(state, action);
  render();
};
Notice, however, that we did not move the reducer function into the createStore function. Take a look at it. This code is particular to our application.

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
 
    default:
      return state;
  }
};
We happen to have an application that increases a count. But we can imagine applications that manage people's songs, their GitHub repositories, or their contacts. So we want our dispatch method to call a reducer every time an action is dispatched. However, we don't want the createStore function to specify what that reducer is, or what it does. We want createStore to be generic enough for any JavaScript application. Instead, we should make the reducer an argument to our createStore function. Then we pass through our reducer function when invoking the createStore method.

function createStore(reducer) {
  let state;
 
  function dispatch(action) {
    state = reducer(state, action);
    render();
  }
 
  function getState() {
    return state;
  };
 
  return {
    dispatch,
    getState
  };
};
 
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
 
    default:
      return state;
  }
}
 
 
function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};
 
let store = createStore(reducer) // createStore takes the reducer reducer as an argument
store.dispatch({ type: '@@INIT' });
let button = document.getElementById('button');
 
button.addEventListener('click', () => {
  store.dispatch({ type: 'INCREASE_COUNT' });
});