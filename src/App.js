import './App.css';
import {useState, useEffect} from 'react';
function App() {
  const [allChats, setAllChats] = useState([{text:"Hi it's me greg.", user:"Greg"}, {text:"What's up", user:"Bartholemew"}]);
  const addChat = (newChat) =>{
    setAllChats([...allChats, newChat])
  }
  return (
    <div className="App">
      <ChatHistory setAllChats={setAllChats} allChats={allChats}/>
      <ChatInput addChat={addChat}/>
    </div>
  );
}
function ChatHistory(props){
  let {allChats, setAllChats} = props;
  let chatsObjects = allChats.map((chatItem)=>{
    return <ChatMessage text={chatItem.text} user={chatItem.user}/>
  })
  useEffect(() =>{
    setAllChats(allChats);
    // TODO: this breaks everything, find out why
    //chatsObjects[chatsObjects.length - 1].scrollIntoView( {behavior:"smooth"} );
  }, [allChats, setAllChats, chatsObjects])
  return (
    <div className="chatHistory">
      {chatsObjects}
    </div>
  )
}

function ChatMessage(props){
  const [messageClass, setMessageClass] = useState("");
  return (
    <div className={`chatMessage ${props.user == "Me" ? 'userMessage' : ''}`}>
      <span className='chatText'>{props.user}: {props.text}</span>  
    </div>
  )
}

function ChatInput(props){
  const [messageText, setMessageText] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault();
    props.addChat({text:messageText, user:"Me"})
    setMessageText("")
  }
  const handleInput = (e) => {
    setMessageText(e.target.value);
  }
  return (
    <div className="chatInput">
      <form onSubmit={handleSubmit} className='chatForm'>
        <input onChange={handleInput} value={messageText} className='chatBox'>
        </input>
        <button type='submit' value='Submit' className="chatSubmit">
          Send
        </button>
      </form>
    </div>
  )
}
export default App;
