// let state;
function createStore(reducer) {
  let state; //state is now accessible to dispath 

  function dispatch(action){
    state = reducer(state, action);
    render();
  }
  function getState(){
    return state;
  }
  return {dispatch, getState};          //this makes the dispath method available to use outside of creatStore() method. 
}
//Note: You may notice that in the above code we made a closure. As you surely remember a JavaScript function has access to all the variables that were in scope at the time of its definition. This feature is called a closure since a function encloses or draws a protective bubble around the variables in its scope and carries those with it when invoked later.

//As you see above, dispatch is now private to our new function. But we'll need to call the function when certain events happen in our application (eg. we might want to call dispatch when a user clicks on a button). So we expose the method by having our function return a JavaScript object containing the dispatch method. In Redux terms, this returned JavaScript object is called the store, so we've named the method createStore because that's what it does.

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
};

//the reducer is particular to the application. Other apps might manage people's songs, ect.  So we want our dispatch method to call a reducer every time an action is dispatched. However, we don't want the createStore function to specify what that reducer is, or what it does. We want createStore to be generic enough for any JavaScript application. Instead, we should make the reducer an argument to our createStore function. Then we pass through our reducer function when invoking the createStore method.

function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

// dispatch({ type: '@@INIT' })
// let button = document.getElementById('button');
let store = createStore();
store.dispatch({type: '@@INIT'});
// but we need some way to retrieve data from the store. 




button.addEventListener('click', function() {
    store.dispatch({ type: 'INCREASE_COUNT' });
})
