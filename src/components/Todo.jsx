import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, getTodo, toggleTodo } from "../redux/action";
import { TOGGLE_TODO_REQUEST_CLEAR, UPDATE_ADD_TODO_REQUEST, UPDATE_DELETE_TODO_REQUEST } from "../redux/actionTypes";

export const Todo = () => {
   
    const {todo, isLoading, isUpdated, isError, isDeleted, isToggled} = useSelector(state => state)
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodo())
        if(isUpdated)
        {
            dispatch({type: UPDATE_ADD_TODO_REQUEST})
        }
        if(isDeleted)
        {
            dispatch({type: UPDATE_DELETE_TODO_REQUEST})
        }
        if(isToggled)
        {
            dispatch({type: TOGGLE_TODO_REQUEST_CLEAR})
        }
    }, [dispatch, isUpdated, isDeleted, isToggled])

    const handleChange = (e) => {
     setQuery(e.target.value);  
    }

    const handleAdd = () => {
        const payload ={
            title: query,
            status: false
        }
        dispatch(addTodo(payload))
        setQuery("");
    }

    const handleDelete = (id) => {
         dispatch(deleteTodo(id))
    }

    const handleToggle = (id) => {
          dispatch(toggleTodo(id))
    }
   
    console.log(todo, "todos data");
  return isLoading ? <div>...loading</div> : (
    <>
    <input type="text" onChange={handleChange} placeholder="Enter Text" />
    <button onClick={handleAdd}>Add Todo</button>

    {todo && todo.map((i) => (
        <div key={i.id}>
           <div>{i.title} - {`${i.status}`}</div>
           <div><button onClick={() => handleToggle(i.id)}>Toggle</button><button onClick={() => handleDelete(i.id)}>Delete</button></div>
        </div>
    ))}
    </>
  )
}