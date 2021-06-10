import {SearchOutlined,AttachFile,MoreVert,InsertEmoticon,Mic} from '@material-ui/icons/';
import {IconButton,Avatar} from '@material-ui/core';
import './chat.css'
import io from "socket.io-client";
import { useEffect, useState } from 'react'
import StyledBadge from './StyledBadge'


let socket;

export default function Chat(props) {
    const {name,nameCo,IDTicket,role}=props
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [connecte,setConnecte]= useState(false);


    const scrollmsag=()=>{
        var element = document.getElementsByClassName("chat__body")[0];
        if(element) element.scrollTop = element.scrollHeight;
    }
    
    useEffect(() => {  
      socket=io('http://localhost:3001/')
      socket.emit('joinChat', { name,  IDTicket,role }
      );
      return  closingCode;
    }, [IDTicket])


    useEffect(() => {
        socket.on('oldMessages', messages => {
            setMessages(messages );
            scrollmsag()  
        });

        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
          scrollmsag()
        }); 
        socket.on('usermessage', users => {
                setConnecte(users.findIndex((us)=>us.role !==role && us.IDTicket === IDTicket)!==-1?true:false); 
        });
    },[IDTicket]);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', {message,name,IDTicket,connecte,role,type:'text'}, () =>{ setMessage('');document.getElementById(`${IDTicket}`).focus();});
        }
         scrollmsag()
        
      }

       window.onbeforeunload = closingCode;
       function closingCode(){
        role!=='Ad'&& socket.emit('disconnectChat', { name , IDTicket  })
          return null;
       } 

    


    return (
        <div className='chat'>
            <div className="chat__header" >
                <StyledBadge  overlap="circle" style={{marginBottom:'20px'}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}  variant={connecte?"dot":'standard'}>
                    <Avatar  className="avatar" style={{backgroundColor:'orangered',color:'white'}}>{nameCo[0].toUpperCase()}</Avatar>
                </StyledBadge>   
                <div className="chat__headerInfo">
                    <h3>{nameCo}</h3>
                    <p>{connecte?'Connecte..':'Deconnecte..'}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body"  >     
            {messages.map((msg,index)=>(
                messages.findIndex((ms)=>ms.text === msg.text && ms.date === msg.date)===index&&
                <p  key={index}  className={msg.user===name ?"chat__message":"chat__message chat__reciever "}>
                    <span className="chat__name">{msg.user}</span>
                    {msg.contenu}
                    <span  className="chat__timestamp" >{new Date(msg.date).toUTCString()}</span>        
                </p>
            ))}
            </div> 
            
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input id={IDTicket} placeholder="type a message" value={message}   onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} onChange={(event)=>{setMessage(event.target.value)}} type="text"/>    
                </form>
                <Mic/>
            </div>

        </div>
    )
}
