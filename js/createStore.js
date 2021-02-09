function createStore(reducer) {
  let state;

  // createStore takes the reducer function as its argument. This sets new store's reducer as 'reducer'. When an action is dispatched, it calls the reducer that's passed in when creating the store.
  // This is done so createStore can be generic enough for any JS app.
  
  function dispatch(action){
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
    };
    
function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

let store = createStore(reducer);
store.dispatch({ type: '@@INIT' });
// store object contains all of the app's state.
// To be able to retrieve data from the store, we include the method getState, which returns the state so we can use it elsewhere.
// Also need to add getState to the object returned by createStore function.

let button = document.getElementById('button');

button.addEventListener('click', () => {
    store.dispatch({ type: 'INCREASE_COUNT' });
})
