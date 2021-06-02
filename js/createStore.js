function createStore(reducer) {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state
  }

  return { dispatch, getState }

}

function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
}

function reducer(state = { count: 0 }, action){
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 }
    case 'DECREASE_COUNT':
      return { count: state.count - 1 }
    case 'RESET_COUNT':
      return { count: 0 }
    default:
      return state;
  }
}

let store = createStore(reducer)
store.dispatch({ type: '@@INIT' })

const inc = document.getElementById('increase');
inc.addEventListener('click',
    () => store.dispatch({ type: 'INCREASE_COUNT' }))

const dec = document.getElementById('decrease')
dec.addEventListener('click',
    () => store.dispatch({ type: 'DECREASE_COUNT'}))

const reset = document.getElementById('reset')
reset.addEventListener('click',
    () => store.dispatch({ type: 'RESET_COUNT' }))

