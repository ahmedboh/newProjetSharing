import {SearchOutlined,AttachFile,MoreVert,InsertEmoticon,Mic} from '@material-ui/icons/';
import {IconButton,Avatar} from '@material-ui/core';
import './chat.css'
import io from "socket.io-client";
import { useEffect, useState } from 'react'
import StyledBadge from './StyledBadge'


let socket;

export default function Chat(props) {
    const {name,nameCo,room,role}=props
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [connecte,setConnecte]= useState(false);


    const scrollmsag=()=>{
        var element = document.getElementsByClassName("chat__body")[0];
        element.scrollTop = element.scrollHeight;
    }
    
    useEffect(() => {  
      socket=io('http://localhost:3001/')
      socket.emit('joinChat', { name,  room,role }
      );
    //   socket.emit('oldStatus', {name:nameCo,  room }
    //   );
      return  closingCode;
    }, [room])


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
            setConnecte(users.findIndex((us)=>us.name ===nameCo && us.room === room)!==-1?true:false); 
        });
        // socket.on('status', status => {
        //     setConnecte(status==='true'?true:false); 
        // }); 
    },[room]);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', {message,name,room}, () =>{ setMessage('');document.getElementById('inputMsg').focus();});
        }
         scrollmsag()
        
      }

       window.onbeforeunload = closingCode;
       function closingCode(){
        role!=='Ad'&& socket.emit('disconnectChat', { name , room  })
          return null;
       } 

    


    return (
        <div className='chat'>
            <div className="chat__header" >
                <StyledBadge  overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}  variant={connecte?"dot":'standard'}>
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
                    {msg.text}
                    <span  className="chat__timestamp" >{msg.date}</span>        
                </p>
            ))}
            </div> 
            
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input id="inputMsg" placeholder="type a message" value={message}   onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} onChange={(event)=>{setMessage(event.target.value)}} type="text"/>    
                    <button type="submit" >send a message</button>
                </form>
                <Mic/>
            </div>

        </div>
    )
}
