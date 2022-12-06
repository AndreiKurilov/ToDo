import { v4 } from 'uuid';

const initialState = JSON.parse(localStorage.getItem('todos')) || {
  project_num: 1,
  addPopup: false,
  editPopup: false,
  Todos: [],
  todo: {
    taskNumber: 0,
    title: '',
    text: '',
    priority: '1',
    date_end: new Date().toISOString().slice(0, 10),
    file: '',
    add_todos: '',
    status: 0,
    time: 0
  }
}

const saveStorage = (state) => {
  localStorage.setItem('todos', JSON.stringify(state))
}

let timer;

const startTime = (time) => {
    
    timer = setInterval(() => {
      console.log(time++)
    }, 1000)
}

const stopTime = () => {
    clearInterval(timer)
}



export const project = (state = initialState, action) => {
  
  switch(action.type)
  {
    case 'OPEN_ADD': return { ...state, addPopup: true }
    case 'CLOSE_ADD': return { ...state, addPopup: false }

    case 'SET_TODO': 
      let todo = { ...state.todo }
      todo[action.payload.name] = action.payload.name === 'file' ? action.payload.files[0].name : action.payload.value;

      return { ...state, todo } 

    case 'ADD_TODO': 

      let task_num = state.Todos[0] ? state.Todos[state.Todos.length - 1].taskNumber + 1 : 1;

      let new_state = { ...state, Todos: [ ...state.Todos, { ...state.todo, taskNumber: task_num, date_end: state.todo.date_end, date_create: new Date().toLocaleDateString(), id: v4(), project_id: action.payload } ], addPopup: false }

      saveStorage(new_state);

      return new_state;

    //////////////////////////////////////////////

    case 'OPEN_EDIT': 
      let todo_edit = state.Todos.find((el) => el.id == action.payload)

      console.log(todo_edit)

      startTime(todo_edit.time)
    
      return { ...state, todo: { ...todo_edit }, editPopup: true }

    case 'EDIT_TODO':
        let todos_copy = [ ...state.Todos ]
        let todo_index = todos_copy.findIndex((el) => el.id == state.todo.id)

        todos_copy[todo_index] = { ...state.todo }
        let edit_state = { ...state, Todos: todos_copy, editPopup: false } 
        
        stopTime()
        saveStorage(edit_state);
        
        return edit_state;

    case 'REMOVE_TODO':

      let remove_state = { ...state, Todos: state.Todos.filter((el) => el.id != action.payload), editPopup: false };
      stopTime()
      saveStorage(remove_state);

      return remove_state;


    case 'CLOSE_EDIT': 
      stopTime()
      return { ...state, editPopup: false }

    ////////////////////////////////////////

    case 'PICK_UP': 
      let todos_up = [ ...state.Todos ]
      let todo_up = todos_up.find((el) => el.id == action.payload.id)
      todo_up.status = action.payload.status

      console.log(action.payload.status)

      saveStorage({ ...state, Todos: todos_up })

      return state;

    default: return state;
  }
}
