function createStore(reducer) {
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


function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

dispatch({ type: '@@INIT' })
let button = document.getElementById('button');

 
button.addEventListener('click', () => {
    store.dispatch({ type: 'INCREASE_COUNT' });
})