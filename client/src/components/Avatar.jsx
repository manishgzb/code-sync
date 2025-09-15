const Avatar = ({ user }) => {
    const user_intitials = user.name.split("")[0]
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="avatar avatar-online avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full">
                        <span className="text-3xl">{user_intitials}</span>
                    </div>
                </div>
                <div>
                    <p>{user.name}</p>
                </div>
            </div>

        </>
    )
}
export default Avatar