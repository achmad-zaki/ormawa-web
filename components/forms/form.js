import AddUserForm from "./addUserForm"
import UpdateUserForm from "./updateUserForm"


const flag = false;

export default function Form () {
    return (
        <div className="container mx-auto py-5">
            {flag ? <AddUserForm/> : <UpdateUserForm/>}
        </div>
    )
}