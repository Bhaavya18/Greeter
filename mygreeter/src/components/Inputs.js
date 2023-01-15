import Input from "./Input";
function Inputs({
  inputs,
  addInput,
  deleteInput,
  updateValue
}) {
    return (
        <>
          {
                inputs.map((input) => (
                  <Input key={input.id} input={input} addInput={addInput} deleteInput={deleteInput} updateValue={updateValue} />
             ))     
          }
        </>
    );

}
export default Inputs;