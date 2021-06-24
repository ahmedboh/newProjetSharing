import {IconButton} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {  useState } from 'react'
import './chat.css'

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
  
function ImageMsg(props) {
    const {msg,name}=props
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    return (
        <div>
          <p    className={msg.user===name ?"chat__messageImage":"chat__messageImage chat__reciever "}>
           <span className="chat__name">{msg.user}</span>
           <span  className="chat__timestampImage" >{new Date(msg.date).toUTCString().substr(0,22)}</span>   
           <img src={`${msg.contenu}`} style={{maxWidth:'250px',borderRadius: '10px',cursor:'zoom-in'}} onClick={handleClickOpen} />
                <Dialog fullWidth={true} maxWidth={'lg'} onClose={handleClose}  open={open}>
                    <DialogTitle onClose={handleClose}>
                        Image
                    </DialogTitle>
                    <DialogContent dividers>
                        <center><img src={`${msg.contenu}`} /></center>
                    </DialogContent>
                </Dialog> 
            </p>    
        </div>
    )
}

export default ImageMsg
