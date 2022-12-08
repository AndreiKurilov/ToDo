import { connect } from "react-redux";


export const EditToDo = connect(state => state.project)(({ todo, dispatch }) => {

  const editTodo = (e) => {
    e.preventDefault()

    dispatch({ type: 'EDIT_TODO' })
  }

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          
          <button className='btn btn-close' onClick={ () => dispatch({ type: 'CLOSE_EDIT' })}></button>
          <h4>Edit todo</h4>

          <form onSubmit={ (e) => editTodo(e) }>
            
            <div className='py-0'>
              <label className='form-label'>Title:</label>
              <input type="text" className="form-control" name="title" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} defaultValue={todo.title} />
            </div>

            <div className='py-0'>
              <label className='form-label'>Description:</label>
              <textarea className="form-control" rows="3" name="text" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} defaultValue={todo.text}></textarea>
            </div>

            <div className='py-0'>
              <label className='form-label'>Priority:</label>
              <select className="form-control" name="priority" onChange={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} defaultValue={todo.priority}>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>

            <div className="row">
              <div className="col">
                  <div className='py-0'>
                    <label className='form-label'>Date end:</label>
                    <input type="date" className="form-control" name="date_end" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} defaultValue={todo.date_end} 
                    />
                  </div>
              </div>
              <div className="col">
                <div className='py-0'>
                  <label className='form-label'>File:</label>
                  <input type="file" className="form-control" name="file" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} />
                  <p>{ todo.file }</p>
                </div>
              </div>
            </div>

            <div className='py-0'>
              <label className='form-label'>Add todos:</label>
              <textarea className="form-control" rows="3" name="add_todos" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} defaultValue={todo.add_todos }></textarea>
            </div>

            <div className='py-1'>
              <button className="btn btn-success" >Save todo</button> &nbsp;
              <button className="btn btn-danger" type="button" onClick={ () => dispatch({ type: 'REMOVE_TODO', payload: todo.id })} >Remove todo</button>
            </div>

          </form>

        </div>
      </div>
    </>
  )
})

