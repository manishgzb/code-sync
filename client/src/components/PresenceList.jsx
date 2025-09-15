import Avatar from "./Avatar"
import Collapse from "./Collapse"

const PresenceList = ({ users }) => {
    return (
            <div className="w-full h-full flex flex-col gap-2 p-1 border-1 border-gray-300">
                <div className="border-b-1 border-gray-300">
                    <h1 className="text-lg text-center">Participants</h1>
                </div>
                <div className="flex flex-wrap gap-2 justify-between">
                    {
                        users.map((user, index) => {
                            return <Avatar key={Date.now() + index} user={user} />
                        })
                    }
                </div>

            </div>

    )
}
export default PresenceList