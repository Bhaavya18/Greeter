
import { GrAddCircle } from "react-icons/gr"
import { FiMinusCircle } from "react-icons/fi";
function Input({ input, addInput, deleteInput,updateValue }) {
    return (
        <div>
            <input value={input.value} onChange={(e)=>updateValue(input.id,e.target.value)} className={"myInput"} placeholder="Sample Name" required/>
            <GrAddCircle onClick={(e)=>addInput()} className="add"/>
            <FiMinusCircle onClick={(e)=>deleteInput(input.id)} className="remove"/>
        </div>
    );
}
export default Input;