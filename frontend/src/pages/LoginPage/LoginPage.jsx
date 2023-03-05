import './LoginPage.css'
import {Link} from "react-router-dom";
import {Button} from "../../components/Button";
import axios from "axios";
import {useState} from "react";
import {TextInput} from "../../components/TextInput"
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setIsLogined} from "../../loginSlice";


export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    return <main className='login-page__main'>
        <form className='login-form'
        onSubmit={async (event)=>{
        event.preventDefault();
        try {
            const res = await axios.post(`${window.backendUrl}/auth/login`, {
                username,
                password
            })

            localStorage.setItem('token', res.data.token)
            dispatch(setIsLogined(true));

            navigate('/')

        } catch (err) {
            alert(err.response.data.message)
        }

        }
        }>
            <h2>Login</h2>
            <label htmlFor='username-input'>username</label>
            <TextInput setState={setUsername} value={username} placeholder='username'/>
            <label htmlFor='username-input'>password</label>
            <TextInput setState={setPassword} value={password} placeholder='password'/>
            <Button label='Log in'/>
        </form>
        <Link to='/'>to main page</Link>
    </main>
}