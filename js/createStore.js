// let state;

// protection from being overwritten
// function() {
//     let state;
// }
//
// function reducer(state = { count: 0 }, action) {
//     switch (action.type) {
//     case 'INCREASE_COUNT':
//         return { count: state.count + 1 };
//
//     default:
//         return state;
//     }
// };
//
// function dispatch(action){
//     state = reducer(state, action);
//     render();
// };
//
// function render() {
//     let container = document.getElementById('container');
//     container.textContent = state.count;
// };
//
// dispatch({ type: '@@INIT' })
//
// let button = document.getElementById('button');
//
// button.addEventListener('click', function() {
//     dispatch({ type: 'INCREASE_COUNT' });
// })

// Now if you dispatch your initial action by calling dispatch({ type: '@@INIT' })
// your code breaks because the dispatch function does not have access to that declared state.

// Notice that render() won't have access to your state either.
// At this point, it;s tempting to move everything inside of our new function.

function createStore() {
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

let store = createStore();
store.dispatch({ type: '@@INIT' });
let button = document.getElementById('button');

button.addEventListener('click', () => {
    store.dispatch({ type: 'INCREASE_COUNT' });
})

/**

With this set up, you've got a fully functional store, that encapsulates your state
and provides a controlled way to write (dispatch) and retrieve (getState) information.

Every piece of code that would be common to any JS application following this pattern
is wrapped inside of the `createStore` function.

Any code that is particular to your application is outside that function.

Q: What's particular to a specific application?
* How the DOM is updated in your render function
* What events trigger a dispatch method
* How your state should change in response to different actions being dispatched.

These are all implemented outside of your createStore method.

Q: What is generic to each application following this pattern?
* That a call to dispatch should call a reducer, reassign the state, and render a change.

This is implemented inside the createStore method.

**/
