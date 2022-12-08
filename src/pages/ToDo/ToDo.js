import './style.css';
import { AddToDo } from './AddToDo';
import { EditToDo } from './EditToDo';
import { connect } from 'react-redux';
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid  } from 'uuid';
import { useParams } from 'react-router-dom';


const onDragEnd = (result, columns, setColumns) => {
  
  const { source, destination } = result;

  if (!result.destination) return;
  
  if (source.droppableId !== destination.droppableId) {
    
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    
    setColumns({
      ...columns, [source.droppableId]: {...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destColumn, items: destItems }
    });
    
  } else {
    
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    
    setColumns({ ...columns, [source.droppableId]: { ...column, items: copiedItems }
    });
  }
};



export const ToDo = connect(state => state.project)((props) => {

  let { addPopup, editPopup, Todos, dispatch } = props;
  
  const page = useParams();

  const getStatusTodos = (status) => {
    return Todos.filter((el) => el.status == status && el.project_id == page.id)
  };

  const columnsToDo = {
    [uuid()]: { name: "Queue", items: getStatusTodos(0), status: 0 },
    [uuid()]: { name: "Development", items: getStatusTodos(1), status: 1 },
    [uuid()]: { name: "Done", items: getStatusTodos(2), status: 2 },
  };
  
  const [columns, setColumns] = useState(columnsToDo);

  useEffect(() => {
    setColumns(columnsToDo)
  }, [Todos]);

  function searchTodos(e) {
    
    const current_card = document.querySelectorAll('.columnToDo')[e.target.dataset.id];
    
    const todo_nums = current_card.querySelectorAll('.todo_num');
    
    const todo_titles = current_card.querySelectorAll('.todo_title');

    todo_nums.forEach((num, index) => {
      
      let num_result = num.textContent.toLowerCase().includes(e.target.value.toLowerCase());

      let title_result = todo_titles[index].textContent.toLowerCase().includes(e.target.value.toLowerCase());
      
      if(num_result || title_result)
        num.closest('.alert').style.display = 'block';
        else 
        num.closest('.alert').style.display = 'none';
    })
  }
  
  return (
    <>
      <h1 className="d-flex justify-content-center" style={{marginBottom: 30}}>ToDo</h1>

      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
          >

          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className='columnsToDo' key={columnId}>
                <div className="w-100 px-5 d-flex justify-content-between align-items-center">
                  <h2>{column.name}</h2>
                <div className="">
                  <button className="btn btn-outline-success" onClick={ () => dispatch({ type: 'OPEN_ADD' })}>+</button>
                </div>
                </div>

                <div className="w-100 p-2" style={{}}>
                  <input type="search" className="form-control" placeholder="Search number/title..." data-id={index} onInput={ searchTodos } />
                </div>


                <div className='columnToDo'>
                  <Droppable droppableId={columnId} key={columnId} >
                    {(provided, snapshot) => {
                      return (
                        <div id={column.status} {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                            padding: 4, width: 370, minHeight: 440,
                            borderRadius: 4 
                          }}>

                          {column.items.map((item, index) => {
                            return (
                              <Draggable key={item.id}
                                draggableId={item.id}
                                index={index}
                                
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div className="alert alert-primary" 
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      
                                      onClick={ () => dispatch({ type: 'OPEN_EDIT', payload: item.id })}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <p  style={{ fontSize: '16px', marginBottom: 6 }}>
                                          Task № <span className="todo_num">{item.taskNumber}</span>
                                        </p>
                                        <p style={{ fontSize: '16px' }}>
                                          Create: {item.date_create}
                                        </p>
                                      </div>
                                      <h5 className="todo_title">{item.title}</h5>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                  { addPopup ? <AddToDo /> : null }
                  { editPopup ? <EditToDo /> : null }
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
  </>
  );
})
