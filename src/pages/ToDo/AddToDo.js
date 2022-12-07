import { connect } from "react-redux"
import { useParams } from 'react-router-dom'

export const AddToDo = connect(state => state.project)(({ Todos, dispatch }) => {

  const page = useParams()

  const addTodo = (e) => {
    e.preventDefault()

    dispatch({ type: 'ADD_TODO', payload: page.id })
  }

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          
          <button className='btn btn-close' onClick={ () => dispatch({ type: 'CLOSE_ADD' })}></button>
          <h4>Add todo</h4>

          <form onSubmit={ (e) => addTodo(e) }>

            <div className='py-0'>
              <label className='form-label'>Title:</label>
              <input type="text" className="form-control" name="title" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} />
            </div>

            <div className='py-0'>
              <label className='form-label'>Text:</label>
              <textarea className="form-control" rows="3" name="text" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })}></textarea>
            </div>

            <div className='py-0'>
              <label className='form-label'>Priority:</label>
              <select className="form-control" name="priority" onChange={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })}>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>

            <div className="row">
              <div className="col">
                  <div className='py-0'>
                    <label className='form-label'>Date end:</label>
                    <input type="date" className="form-control" name="date_end" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} 
                    defaultValue={ new Date().toISOString().slice(0, 10) }
                    />
                  </div>
              </div>
              <div className="col">
                <div className='py-0'>
                  <label className='form-label'>File:</label>
                  <input type="file" className="form-control" name="file" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })} />
                </div>
              </div>
            </div>
            
            {/* timer */}
            
            <div className='py-0'>
              <label className='form-label'>Add todos:</label>
              <textarea className="form-control" rows="3" name="add_todos" onInput={ (e) => dispatch({ type: 'SET_TODO', payload: e.target })}></textarea>
            </div>

            <div className='py-1'>
              <button className="btn btn-success" >Add todo</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
})
