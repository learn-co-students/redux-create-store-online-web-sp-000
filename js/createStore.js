function createStore(reducer) {
  let state;

  function dispatch(action){
    state = reducer(state, action);
    render();
  };

  function getState() {
    return state
  }

  return {
    dispatch,
    getState
  }
}

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    case 'DECREASE_COUNT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};



function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count
};

let store = createStore(reducer)
store.dispatch({ type: '@@INIT'})
let button1 = document.getElementById('button1');

button1.addEventListener('click', function() {
    store.dispatch({ type: 'INCREASE_COUNT' });
})

let button2 = document.getElementById('button2');

button2.addEventListener('click', function() {
    store.dispatch({ type: 'DECREASE_COUNT' });
})
