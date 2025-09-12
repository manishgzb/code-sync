import Button from "./Button"

const RoomForm = ({ inputLabel, buttonLabel, value, setValue, onSubmit }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-5">
                    <input value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="input input-primary w-56" placeholder={inputLabel}></input>
                    <Button type={'submit'} color={'btn-primary'} ht={'10'} wt={'56'} label={buttonLabel} />
                </div>

            </form>
        </div>
    )
}
export default RoomForm