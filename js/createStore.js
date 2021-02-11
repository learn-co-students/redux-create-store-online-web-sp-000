let store = createStore(reducer);
store.dispatch({type: '@@Init'})

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
};

// * * * * STORE

function createStore(reducer) {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state;
  }

  return { dispatch, getState }
}

// * * * * END STORE

function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

// Event Listener

let button = document.getElementById('button');

button.addEventListener('click', () => {
    store.dispatch({ type: 'INCREASE_COUNT' });
})
