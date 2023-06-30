import AddProkerForm from "./addProkerForm";
import UpdateProkerForm from "./updateProkerForm";
import { useSelector } from "react-redux";
import { updateAction } from "@/redux/reducer";
// import { updateAction } from "@/redux/reducer";


export default function Form ({user, editProker, setEditProker, handleEditChange}) {


    const formId = useSelector((state) => state.app.client.formId)
    // const datat = editProker
    // console.log(formId)
    // console.log(editProker.id)
    // const flag = true;

    return (

            <div className="container mx-auto py-5">
                {formId ? <UpdateProkerForm formId={formId} user={user} editProker ={editProker} setEditProker ={setEditProker} handleEditChange = {handleEditChange} /> : <AddProkerForm user = {user}/>}
            </div>

    )
}

