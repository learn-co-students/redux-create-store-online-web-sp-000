// state variable holds a representation of all of our data we need to display
// not very good if this variable is global, and we can accidentally overwrite 

// We want createStore to be generic enough for any JavaScript application
// we don't want the createStore function to specify what that reducer is, or what it does
// Instead, we should make the reducer an argument to our createStore function.
// Then we pass through our reducer function when invoking the createStore method.
// When an action is dispatched, it calls the reducer that we passed through when creating the store.

// Every piece of code that would be common to any JavaScript application following this pattern is wrapped inside of the createStore function
//  What is generic to each application following this pattern?
  // That a call to dispatch should call a reducer, reassign the state, and render a change. 
  // This is implemented inside the createStore function.
// Any code that is particular to our application is outside that function.

function createStore(reducer) {
  let state;

  function dispatch(action){
    state = reducer(state, action);
    render();
  };

  function getState() {
    return state;
  }
  // In Redux terms, this returned JavaScript object is called the store, so we've named the method createStore
  // now we can dispatch actions that modify that state but we need some way to retrieve data from the store. 
  // To do this, our store should respond to one other method, getState
  // This method simply returns the state so we can use it elsewhere in our application7
  // We will also need to add getState to the object our createStore function returns.
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

//  in order to access the dispatch method, we will create a variable store and set it equal to the result of calling createStore
// Because createStore returns an object that contains the dispatch method, we can now access the method from store
let store = createStore()
store.dispatch({ type: '@@INIT' })
// So now we have this object called a store which contains all of our application's state

let button = document.getElementById('button');

button.addEventListener('click', function() {
    store.dispatch({ type: 'INCREASE_COUNT' });
})

// Redux works by having an action dispatched, which calls a reducer, and then renders the view