import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';


const MessageInfo=(props)=>{
    const msg=props.children
    const type=props.type ||"success"
    const [open, setOpen] = useState(true)
    return(<div><Collapse in={open}>
        <Alert hidden={!open}  severity={type} action={
        <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
            setOpen(false);
            }} >
        <CloseIcon fontSize="inherit" />
        </IconButton>}
        
        >
        {msg}
        </Alert>
        </Collapse>
        <Button  variant="outlined" hidden={open} onClick={() => { setOpen(true);}}>
            Re-ouvrir
        </Button> 
        </div>)



}
export default MessageInfo;