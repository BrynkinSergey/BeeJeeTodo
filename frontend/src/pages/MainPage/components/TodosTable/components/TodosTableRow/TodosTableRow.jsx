import './TodosTableRow.css'
import {useState} from "react";
import {setIsSending} from "../../todosTableSlice";
import {useDispatch} from "react-redux";
import axios from "axios";
import {TextInput} from "../../../../../../components/TextInput";
import {Button} from "../../../../../../components/Button";

export const TodosTableRow = ({row}) => {

    const [isChangeStatusButtonShown, setIsChangeStatusButtonShown] = useState(false);
    const [isTextEditing, setIsTextEditing] = useState(false);
    const [editInput, setEditInput] = useState(row.text);

    const dispatch = useDispatch();

    const handleChangeStatus = async () => {
        try {
            dispatch(setIsSending(true))
            const res = await axios.put(`${window.backendUrl}/todo/${row.id}`, {status: row.status === 'active' ? 'done' : 'active'}, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
        }catch (err) {
            if(err.response.status == 401) {
                alert('Only admin have permission to update todos!')
            }
        } finally {
            dispatch(setIsSending(false))
        }
    }

    const handleUpdateText = async () => {
        try {
            dispatch(setIsSending(true))
            const res = await axios.put(`${window.backendUrl}/todo/${row.id}`, {text: editInput}, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
        }catch (err) {
            if(err.response.status == 401) {
                alert('Only admin have permission to update todos!')
            }
        } finally {
            dispatch(setIsSending(false))
        }
    }

    return <tr
        onMouseLeave={()=>setIsChangeStatusButtonShown(false)}
        onMouseEnter={()=>setIsChangeStatusButtonShown(true)}
        className='todos-table__row' key={`tr-${row.id}`}>
            {Object.values(row).map((value, index)=>{
                if (Object.keys(row)[index] === 'status') {
                    return <td
                        key={`td-${index}`}>{value}
                        {
                            isChangeStatusButtonShown &&
                            <div className='change-status-button'
                            onClick={()=>handleChangeStatus()}>{
                                row.status === 'active'? '✓' : 'X'
                            }</div>
                        }
                    </td>
                }
                if (Object.keys(row)[index] === 'text') {
                    return <td
                        onClick={()=>setIsTextEditing(true)}
                        key={`td-${index}`}>{value}
                        {
                            isTextEditing &&
                            <form className='edit-text-form'
                            onSubmit={(event)=>{
                                event.preventDefault()
                                handleUpdateText()
                            }}>
                                <TextInput setState={setEditInput} value={editInput}/>
                                <Button label='✓'/>
                            </form>
                        }
                    </td>
                }
                return <td key={`td-${index}`}>{value}</td>
            })}
        </tr>
}