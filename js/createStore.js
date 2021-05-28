function createStore(reducer) { // not a grocery store; state container that holds application's state
  let state;

  function dispatch(action){
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state
  }

  return { dispatch, getState }
}

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

let store = createStore(reducer) // this store is basically the state
store.dispatch({ type: '@@INIT' }) // access the dispatch method within the state storage container

let button = document.getElementById('button');

button.addEventListener('click', function() {
    store.dispatch({ type: 'INCREASE_COUNT' }); // don't need 'store.getState() bc dispatch is a closure and already has access to state from its declaration at the beginning of createStore()
})
