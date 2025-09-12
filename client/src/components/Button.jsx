const Button = ({ color, ht, wt, label, onClick ,type }) => {
    return <div>
        <button type={type && ''} onClick={onClick} className={`btn ${color} w-${wt} h-${ht}`}>
            {label}
        </button>
    </div>
}
export default Button