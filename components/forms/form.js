import AddProkerForm from "./addProkerForm";
import UpdateProkerForm from "./updateProkerForm";
import { useSelector } from "react-redux";
import { updateAction } from "@/redux/reducer";
// import { updateAction } from "@/redux/reducer";


export default function Form ({editProker, setEditProker, handleEditChange}) {


    const formId = useSelector((state) => state.app.client.formId)
    // console.log(formId)
    // const flag = true;

    return (

            <div className="container mx-auto py-5">
                {formId ? <UpdateProkerForm editProker ={editProker} setEditProker ={setEditProker} handleEditChange = {handleEditChange} /> : <AddProkerForm/>}
            </div>

    )
}

