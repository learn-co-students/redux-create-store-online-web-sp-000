function createStore() {
  let state

   dispatch = (action = { type: '@@INIT' }) => {
    state = reducer(state, action);
    render();
  }

   getState = () => {return state}

  return {
    dispatch,
    getState
  }
}
let store = createStore()
store.dispatch()


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


let button = document.getElementById('button');

button.addEventListener('click', () => {
  store.dispatch({ type:
  'INCREASE_COUNT' })
})
// button.addEventListener('click', function() {
//   dispatch({ type: 'INCREASE_COUNT' });
// })


