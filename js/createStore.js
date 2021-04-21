//wrap state in function to prevent overwrite - clocsure
//pass reducer
function createStore(reducer) {
  let state;

  function dispatch(action){
    state = reducer(state, action);
    render();
  };

  //retrieve data to access elsewhere in the app 
  function getState() {
    return state;
  }

  //expose method - store
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

//add getState to get object state 
function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

//store contains object's state 
//pass reducer
let store = createStore(reducer);
store.dispatch({ type: '@@INIT' });
let button = document.getElementById('button');

//update event listener
button.addEventListener('click', () => {
    store.dispatch({ type: 'INCREASE_COUNT' });
})



