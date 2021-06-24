import {AttachFile,MoreVert} from '@material-ui/icons/';
import {IconButton,Avatar} from '@material-ui/core';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import './chat.css'
import io from "socket.io-client";
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import { useEffect, useState } from 'react'
import StyledBadge from './StyledBadge'
import ImageMsg from './ImageMsg';
import Picker from 'emoji-picker-react';
let socket;

export default function Chat(props) {
    const {name,nameCo,IDTicket,role}=props
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [connecte,setConnecte]= useState(false);
    const [showEmoji, setShowEmoji] = useState(true);
    const [positionEnd, setPositionEnd] = useState(0);


 
    const onEmojiClick = (event, emojiObject) => {
      document.getElementById(`${IDTicket}`).focus()
      console.log(document.getElementById(`${IDTicket}`).selectionStart)
      const start=message.substring(0,document.getElementById(`${IDTicket}`).selectionStart)
      const end=message.substring(document.getElementById(`${IDTicket}`).selectionStart)
      setMessage(start+emojiObject.emoji+end)
      setPositionEnd(start.length+emojiObject.emoji.length)
    };

    useEffect(() => {  
      document.getElementById(`${IDTicket}`).selectionEnd=positionEnd;
    }, [positionEnd])
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
      const  getBase64=(file1)=>{
        return new Promise(resolve => {
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
          // Convert the file to base64 text
          reader.readAsDataURL(file1);
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            //console.log(baseURL);
            resolve(baseURL);
          };
        });
      };
      
      const sendImage = (event) => {
       // event.preventDefault();
          //console.log(e.target.files[0]);
          let file ;
          let message ;
          file = event.target.files[0];
          var idxDot = file.name.lastIndexOf(".") + 1;
          var extFile = file.name.substr(idxDot, file.name.length).toLowerCase();
          if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
          getBase64(file)
            .then(result => {
              file["base64"] = result;
              message = result;
              console.log("File Is", message);  
              socket.emit('sendMessage', {message,name,IDTicket,connecte,role,type:'image'}, () =>{console.log('image uploade')});
            })
            .catch(err => {
              //console.log(err);
            });
          }
        scrollmsag()
      }

       window.onbeforeunload = closingCode;
       function closingCode(){
        role!=='Ad'&& socket.emit('disconnectChat', { name , IDTicket  })
          return null;
       } 

    return (
        <div className='chat'   >
            <div className="chat__header" onClick={()=>{setShowEmoji(true)}}>
                <StyledBadge  overlap="circle" style={{marginBottom:'20px'}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}  variant={connecte?"dot":'standard'}>
                    <Avatar  className="avatar" style={{backgroundColor:'orangered',color:'white'}}>{nameCo[0].toUpperCase()}</Avatar>
                </StyledBadge>   
                <div className="chat__headerInfo">
                    <h3>{nameCo}</h3>
                    <p>{connecte?'Connecte..':'Deconnecte..'}</p>
                </div>
                <div className="chat__headerRight">
                    <label htmlFor="imageTiket">
                      <Tooltip title='Choisir une photo'  arrow>  
                        <IconButton variant="contained" component="span">
                            <PermMediaIcon />
                        </IconButton>
                      </Tooltip>
                    </label>
                    <Tooltip title='Choisir un fichier'  arrow>
                      <IconButton >
                          <AttachFile/>
                      </IconButton>
                    </Tooltip>  
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body" onClick={()=>{setShowEmoji(true)}} >     
            {messages.map((msg,index)=>(
                messages.findIndex((ms)=>ms.text === msg.text && ms.date === msg.date)===index&&
                msg.type === 'text' ?
                <p  key={index}  className={msg.user===name ?"chat__message":"chat__message chat__reciever "}>
                    <span className="chat__name">{msg.user}</span>
                    {msg.contenu}
                    <span  className="chat__timestamp" >{new Date(msg.date).toUTCString().substr(0,22)}</span>        
                </p>
                : msg.type === 'image' ?
                <ImageMsg msg={msg} name={name}/>
                :msg.type === 'fichier' && <><p>fichier</p></>
            ))}
            </div> 
            
            <div className="chat__footer">
                <span hidden={showEmoji} style={{width:'300px',height:'80px',position:'absolute',top:'30px'}}>
                  <Picker onEmojiClick={onEmojiClick} />
                </span>
                <Tooltip title='Choisir un emoji'  arrow>
                <IconButton onClick={()=>{setShowEmoji(!showEmoji)}}>
                  <EmojiEmotionsTwoToneIcon style={showEmoji?{color:'#2196f3'}:{color:'#ffc400'}}/>
                </IconButton>
                </Tooltip>
                <form>
                    <input type="file"  id="imageTiket" hidden accept="image/*" onChange={event => sendImage(event)} />
                    <input id={IDTicket} placeholder="type a message" value={message}   onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} onChange={(event)=>{setMessage(event.target.value)}} type="text"/>    
                </form>
            </div>

        </div>
    )
}
