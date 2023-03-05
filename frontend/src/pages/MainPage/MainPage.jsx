import './MainPage.css'
import {TextInput} from "../../components/TextInput";
import {Button} from "../../components/Button";
import {useEffect, useState} from "react";
import {TodosTable} from "./components/TodosTable";
import {Loader} from "../../components/Loader";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setData, setIsSending} from "./components/TodosTable/todosTableSlice";
import {setIsLogined} from "../../loginSlice";
import {validateEmail} from "../../utils/validateEmail";
import {Link} from "react-router-dom";

export const MainPage = () => {

    const page = useSelector((state) => state.todosTable.page)
    const data = useSelector((state) => state.todosTable.data)
    const field = useSelector((state) => state.todosTable.field)
    const order = useSelector((state) => state.todosTable.order)
    const isLogined = useSelector((state) => state.login.isLogined)
    const isSending = useSelector((state) => state.todosTable.isSending )
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (field, order) => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${window.backendUrl}/todo/${page}`, {params: {field, order}});
            dispatch(setData(data))
            setIsLoading(false)
        } catch (err) {
            setErrorMessage('Unable to fetch user list');
            setData(null);
        }
    };

    const submitForm = async () => {
        const body = {
            username,
            text,
            email,
        }

        if (!body.username || !body.text || !body.email) {
            return alert('username, text and email are required')
        }

        if (!validateEmail(body.email)) {
            return alert('invalid email')
        }

        setEmail('');
        setUsername('');
        setText('');

        dispatch(setIsSending(true));
        try {
            const res = await axios.post(`${window.backendUrl}/todo`, {...body})
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setIsSending(false));
        }
    }

    useEffect(() => {
        getData(field, order);
    }, [page, field, order, isSending]);

    useEffect(()=>{
        if(localStorage.getItem('token')) {
            dispatch(setIsLogined(true))
        }
    }, [])

    return <>
        <header className='todo-header'>
            <nav className='todo-header__nav'>
                {!isLogined && <Link to='/login'>login</Link>}
                {isLogined && <div onClick={()=>{
                    localStorage.removeItem('token')
                    dispatch(setIsLogined(false));
                }
                }>Log out</div>}
            </nav>
        </header>
        <main className='main'>
            {errorMessage && <div className="error">{errorMessage}</div>}

            {!errorMessage && <>
                <h1>TO DO LIST</h1>

                <form
                    onSubmit={(event)=>{
                        event.preventDefault();
                        submitForm();
                    }}
                    className='add-todo-form'>
                    <TextInput setState={setUsername} value={username} placeholder='username'/>
                    <TextInput setState={setEmail} value={email} placeholder='email'/>
                    <TextInput setState={setText} value={text} placeholder='text'/>
                    <Button label='add'/>
                </form>

                {isLoading && <Loader/>}

                {!isLoading && <>
                    <TodosTable tableContent={data?.todos}/>
                </>}
            </>}

        </main>
    </>
}