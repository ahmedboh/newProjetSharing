import {SearchOutlined,AttachFile,MoreVert,InsertEmoticon,Mic} from '@material-ui/icons/';
import {IconButton,Avatar} from '@material-ui/core';
import './chat.css'
import io from "socket.io-client";
import { useEffect, useState } from 'react'
import StyledBadge from './StyledBadge'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

let socket;
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Chat(props) {
    const [open, setOpen] = useState(false);
    const {name,nameCo,IDTicket,role}=props
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [connecte,setConnecte]= useState(false);
    const [image,setImage]=useState()
    const [file,setFile]=useState(null)
    const [base64URL,setBase64URL]=useState("")

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
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
        event.preventDefault();
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
              setBase64URL(result)
              setFile(file);
              //console.log("File Is", file.base64)
              socket.emit('sendMessage', {message,name,IDTicket,connecte,role,type:'image'}, () =>{ document.getElementById(`${IDTicket}`).focus();});
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
                    <label htmlFor="imageTiket">
                        <IconButton variant="contained" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
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
                msg.type === 'text' ?
                <p  key={index}  className={msg.user===name ?"chat__message":"chat__message chat__reciever "}>
                    <span className="chat__name">{msg.user}</span>
                    {msg.contenu}
                    <span  className="chat__timestamp" >{new Date(msg.date).toUTCString()}</span>        
                </p>
                : msg.type === 'image' ?
                <><IconButton aria-label="upload picture" component="span" onClick={handleClickOpen} ><VisibilityIcon  style={{ color: 'green' }}></VisibilityIcon> </IconButton>
                <Dialog fullWidth={true} maxWidth={'lg'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Image
                    </DialogTitle>
                    <DialogContent dividers>
                        <center><img src={`${msg.contenu}`} /></center>
                    </DialogContent>
                </Dialog></>
                : <><p>fichier</p></>
            ))}
            </div> 
            
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <span className="labelText"> {image && image.name}</span>
                    <input type="file"  id="imageTiket" hidden accept="image/*" onChange={event => sendImage(event)} />
                    <input id={IDTicket} placeholder="type a message" value={message}   onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} onChange={(event)=>{setMessage(event.target.value)}} type="text"/>    
                </form>
                <Button
                                variant="contained"
                                color="primary"
                                style={{backgroundColor:'rgb(0, 153, 204)'}}
                                onClick={sendImage}
                                endIcon={<Icon>send</Icon>}
                                
                            >
                                Envoyer
                    </Button> 
                <Mic/>
            </div>

        </div>
    )
}
