// wrap og code in store function, pass in reducer aka just 
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
 

// same ol reducer as before
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
 
let store = createStore(reducer) // createStore takes the reducer as an argument


store.dispatch({ type: '@@INIT' }); // set initial value 

// Button element/listener
let button = document.getElementById('button');
button.addEventListener('click', () => {
  store.dispatch({ type: 'INCREASE_COUNT' });
});