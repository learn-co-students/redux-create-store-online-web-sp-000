function createStore(reducer) { //wrapping our state in a function
  let state; //accessible to dispatch 
 
  function dispatch(action) { 
    state = reducer(state, action); //calls our reducer and returns new state
    render();
  }
 
  function getState() { //method returns the state so we cAN USE it elsewhere 
    return state;
  };
 
  return { //returns js object called the store 
    dispatch,
    getState //retrieve data from store
    //store responds to getState
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
 
//store equal to result of calling createStore
//createStore returns an object that contains the dispatch method
//access method from store
//dispatch initial action
let store = createStore(reducer) //takes reducer as an arg
store.dispatch({ type: '@@INIT' });
let button = document.getElementById('button');
 
button.addEventListener('click', () => {
  store.dispatch({ type: 'INCREASE_COUNT' });
});