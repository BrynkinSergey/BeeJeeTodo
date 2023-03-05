import './TextInput.css'

export const TextInput = ({setState,placeholder, value}) => {
    return <input value={value} onChange={(event)=>setState(event.target.value)} type='text' placeholder={placeholder}/>
}