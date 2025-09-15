const Collapse = ({ children }) => {
    return (
        <div className="collapse bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <div className="collapse-title font-semibold">Online</div>
            <div className="collapse-content text-sm">
                {children}
            </div>
        </div>
    )
}
export default Collapse