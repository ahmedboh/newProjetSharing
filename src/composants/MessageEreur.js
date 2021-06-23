import { Alert, AlertTitle } from '@material-ui/lab';


function MessageEreur(props) {
    return (
        <Alert  severity="error" hidden={props.children==''} style={{fontSize:"14px"}}>{props.children}</Alert>
    )
}

export default MessageEreur
