import './TodosTable.css'
import {Button} from "../../../../components/Button";
import {decrementPage, incrementPage, setField, setOrder} from "./todosTableSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {TodosTableRow} from "./components/TodosTableRow";

export const TodosTable = ({tableContent}) => {
  const page = useSelector((state) => state.todosTable.page)
  const data = useSelector((state) => state.todosTable.data)
  const field = useSelector((state) => state.todosTable.field)
  const order = useSelector((state) => state.todosTable.order)
  const dispatch = useDispatch()

  const setSort = (fieldName) => {
      if(field !== fieldName) {
          dispatch(setField(fieldName))
          dispatch(setOrder('asc'))
      } else {
          dispatch(setOrder(order === 'asc'? 'desc': 'asc'))
      }
  }

  const displaySort = (fieldName) => {
     return `${fieldName} ${field === fieldName? (order === 'asc'? '↓': '↑') : ''}`;
  }

 return <>
    <table className='todos-table'>
        <tbody>
            <tr>
                <th>id</th>
                <th onClick={()=>setSort('username')}>{displaySort('username')}</th>
                <th onClick={()=>setSort('email')}>{displaySort('email')}</th>
                <th>text</th>
                <th onClick={()=>setSort('status')}>{displaySort('status')}</th>
            </tr>
            {tableContent && tableContent.map((row)=>{
                return <TodosTableRow key={`row-${row.id}`} row={row}/>
            })}
        </tbody>
    </table>
  <div>
    <Button disabled={page<=1} handleClick={()=>dispatch(decrementPage())} label='<'/>
    <Button disabled={page>=(data?.totalPages || 1)} handleClick={()=>dispatch(incrementPage())} label='>'/>
  </div>
  </>
}