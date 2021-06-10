import  { useEffect,useState } from 'react'
import './comment.css'
import { KeyboardArrowDown} from '@material-ui/icons/';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import ReportIcon from '@material-ui/icons/Report';
import ReportOffIcon from '@material-ui/icons/ReportOff';
import io from "socket.io-client";
let socket;

export default function Comment(props) {
    const {name,IDTicket,role}=props
    const [open, setOpen] = useState(role==='Ad'?false:true)
    const [moreDetails, setMoreDetails] = useState(false)
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
    
    //const role=window.location.search.substr(window.location.search.length-2)
    const scrollmsag=()=>{
        var element = document.getElementsByClassName("comment__body")[0];
        if (element!==undefined)element.scrollTop = element.scrollHeight;
    }
    
    useEffect(() => {  
      socket=io('http://localhost:3001/')
      socket.emit('joinComment', { name , IDTicket ,role }
      );
      return  closingCode;
    }, [IDTicket])


    useEffect(() => {
        socket.on('oldComments', comments => {
            setComments(comments );
            scrollmsag()  
        });
        socket.on('comment', comment => {
            setComments(comments => [ ...comments, comment ])
          scrollmsag()
        }); 

       
    },[IDTicket]);

    const sendComment = (event) => {
        event.preventDefault();
    
        if(comment) {
          socket.emit('sendComment', {comment, name , IDTicket }, () =>{ setComment('');document.getElementById('input').focus();});
        }
         scrollmsag()
        
      }

       window.onbeforeunload = closingCode;
       function closingCode(){
        role!=='Ad'&& socket.emit('disconnectComment', { name , IDTicket  })
          return null;
       } 


    return (
        <div     className="comment"> 
           <div hidden={role!=='Ad'} className={`comment__header ${!open&& "comment__hederClose"}`} >
                <div  className="comment__headerText">
                    
                    Commentaire
                </div> 
                <IconButton hidden={role!=='Ad'||!open} onClick={()=>{ setMoreDetails(!moreDetails);scrollmsag()}}>
                        {moreDetails?<ReportIcon style={{color:'white'}}/> : <ReportOffIcon style={{color:'white'}}/> }                     
                </IconButton> 
                <IconButton onClick={()=>{setOpen(!open)}}>
                       {!open?<KeyboardArrowDown style={{color:'white' }} /> :<CloseIcon style={{color:'white'}} /> }      
                </IconButton>  
                 
           </div>
           <Collapse  in={open}>
           <div className="comment__body"  >     
            {comments.map((msg,index)=>(
                comments.findIndex((ms)=>ms.text === msg.text && ms.date === msg.date)===index&&
                <p hidden={!moreDetails && msg.user==="chatAdmin" } key={index}  className={msg.user==="chatAdmin" ?"comment__chatAdmin":"comment__message"}>
                    <span hidden={msg.user==="chatAdmin" } className="comment__name">{msg.user}</span>
                    {msg.text}
                    <span  className="comment__timestamp" >{ new Date(msg.date).toUTCString()}</span>      
                </p>
            ))}
            </div>   
                    
            <div hidden={role==='Ad'} className="comment__footer">
    
                <form>
                    <input id="input" placeholder="type a message" value={comment}   onKeyPress={event => event.key === 'Enter' ? sendComment(event) : null} onChange={(event)=>{setComment(event.target.value)}} type="text"/>
                    <Button variant="contained" onClick={sendComment} color="primary" 
                    endIcon={<Icon>send</Icon>}> Send </Button>
                </form>
         
            </div> 
            </Collapse> 
            
        </div>
        
    )
}
