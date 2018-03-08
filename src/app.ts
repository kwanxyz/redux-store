import * as fromStore from './store';
import { renderTodos } from './utils';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer
};
const store = new fromStore.Store(reducers);

// console.log(store.value);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };
    // console.log(payload);
    // store.dispatch({
    // type: fromStore.ADD_TO,
    // type: 'ADD_TODO',
    // payload: payload same as below
    // payload
    // });
    // console.log(store.value);

    store.dispatch(new fromStore.AddTodo(payload));

    input.value = '';
  },
  false
);
const unsubscribe = store.subscribe(state => {
  renderTodos(state.todos.data);
});

// unsubscribe();
destroy.addEventListener('click', unsubscribe, false);

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    console.log(target);
    const todo = JSON.parse(target.getAttribute('data-todo') as any);
    store.dispatch(new fromStore.RemoveToDo(todo));
  }
});

store.subscribe(state => console.log('STATE:::', state));
