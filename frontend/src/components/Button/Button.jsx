import './Button.css'

export const Button = ({disabled, label, handleClick = ()=>{}}) => {
    return <button disabled={disabled} onClick={()=>handleClick()}>{label}</button>
}