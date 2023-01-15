import { useState } from "react";
import { Configuration, OpenAIApi, OpenAIApiAxiosParamCreator } from "openai";
import Inputs  from "./components/Inputs";
import "./App.css";
import axios from "axios";
function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI,
  });
  const openai = new OpenAIApi(configuration);
  const [greeting, setGreeting] = useState("Sample Greeting");
  const [text, setText] = useState("");
  const [inputs, setInputs] = useState([
    {
      id: Math.floor(Math.random() * 10000) + 1,
      value:"",
    },
  ]);
  const [error, setError] = useState("");
  const generateGreeting = async () => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${text}`,
        temperature: 0.9,
        max_tokens: 150,
      });
      if (response.data.choices[0].text !== undefined)
        setGreeting(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };
  const addInput = (val) => {
    setInputs([
      ...inputs,
      {
        id: Math.floor(Math.random() * 10000) + 1,
        value:val
      },
    ]);
  }
  const deleteInput = (key) => {
    setInputs(inputs.filter((input) => input.id !== key));
  }
  const updateValue = (id, val) => {
    const arr = [...inputs];
    const idx = arr.findIndex((ele) => ele.id === id);
    if (idx !== null) {
      arr[idx].value = val;
      setInputs(arr);
    }
  }
  return (
    <div>
      <div className="header">MyGreeter</div>
      <div className="component">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (text !== "") generateGreeting();
          }}
        >
          <input
            className="greetingInput"
            type="text"
            value={text}
            placeholder="Type your message"
            onChange={(e) => setText(e.target.value)}
          />
          <input type="submit" className="submitBtn" value="Submit" />
        </form>
        <div className="greeting">{greeting}</div>
        <p className="contactsHeader">My Contacts</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          axios.post('http://localhost:8080/api/home', {
            Users: inputs,
            Message:greeting
          }).then((res) => {
            if (res.success) {
              setInputs([
                {
                  id: Math.floor(Math.random() * 10000) + 1,
                  value: "",
                },
              ]);
            }
          }).catch((Error) => {
            setError(Error);
          });
        }}>
          <Inputs
            inputs={inputs}
            addInput={addInput}
            deleteInput={deleteInput}
            updateValue={updateValue}
          />
          <input type="submit" className="submitBtn" value="Submit" />
          {error}
        </form>
      </div>
    </div>
  );
}

export default App;
