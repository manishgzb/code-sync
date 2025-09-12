const Input = ({value,setValue}) => {
    return (
        <>
            <input value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input input-primary w-56" placeholder={inputLabel}></input>
        </>
    )
}
export default Input