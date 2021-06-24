import React, { useEffect , useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Row from 'react-bootstrap/Row';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import InfoIcon from '@material-ui/icons/Info';
import Col from 'react-bootstrap/Col';
import PanoramaIcon from '@material-ui/icons/Panorama';
import  'bootstrap/dist/css/bootstrap.min.css';
import Tooltip from '@material-ui/core/Tooltip';
import './style/contrat.css'
import  'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

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

const  CardBody=({showDetailContrat,showDetailTicket,contenu,contrat})=>{
  const [image , setImage]=useState();
  const [open, setOpen] = React.useState(false);
  const getImage= async()=>{
      const res =await Axios.get(`ticket/image/${contenu._id}`)
      setImage(res.data.data);
    }
  useEffect(() => {
      if(contenu.image){
          getImage()
      }
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
    return(<>
                <Card.Title className="text" ><center><h5>{new Date(contenu.dateCreation).toLocaleDateString()} | {new Date(contenu.dateCreation).toLocaleTimeString()} &nbsp;&nbsp; </h5></center> </Card.Title><br/>
                <Card.Text style={{marginLeft:'10%'}} >
                <Row >   
                <Col sm="5"><b>Nature  :</b></Col><Col className="text2" >{contenu.nature}</Col>
                </Row>
                <Row>
                <Col sm="5"><b>Etat  :</b></Col><Col  className="text2">{contenu.etat}</Col> 
                </Row>
                <Row>
                <Col sm="5"><b>objet  :</b></Col><Col  className="text2">{contenu.objet}</Col> 
                </Row>   
                <Row>
                <Col sm="5"><b>capture  :</b></Col>
                <Col  style={{position:'relative',top:'-10px'}}  className="text2">
                {(contenu.image && image!="dW5kZWZpbmVk")?'img.jpg':'Accune'}  
                <Tooltip title='Ouvrir image '  arrow>
                  <IconButton aria-label="upload picture" component="span" onClick={handleClickOpen} style={{ color:`${(contenu.image && image!="dW5kZWZpbmVk")?'orange':'gray'}`   }} disabled={!(contenu.image && image!="dW5kZWZpbmVk")} >
                     <PanoramaIcon  /> 
                  </IconButton>
                </Tooltip>
                <Dialog fullWidth={true} maxWidth={'lg'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Image
                    </DialogTitle>
                    <DialogContent dividers>
                      <center><img src={`data:image/*;base64,${image}`}/></center>
                    </DialogContent>
                </Dialog>
                </Col> 
                </Row>  
                <Row style={{position:'relative',top:'-10px'}}  >
                <Col sm="5"><b>Contrat :</b></Col>
                <Col  style={{position:'relative',top:'-10px'}} className="text2">
                    {contrat!==-1?`Num ° ${contrat+1}`:'Sans contrat'} 
                    <Tooltip title='Ouvrir contrat'  arrow>
                      <IconButton aria-label="upload picture" onClick={(event)=>{showDetailContrat(event,contrat)}} style={{ color:`${contrat!==-1?'green':'gray'}`   }} disabled={contrat===-1} component="span">
                         <ContactMailIcon   /> 
                      </IconButton>
                    </Tooltip>  
                </Col> 
                </Row> 
                </Card.Text>
                <center><Button onClick={(event)=>{showDetailTicket(event,contenu)}} startIcon={<InfoIcon/>} endIcon={<InfoIcon/>} variant="contained" size='small' color='primary' style={{backgroundColor:'rgb(0, 153, 204)'}}>Voir detailles ticket</Button></center>
            
         </>
    )
}
export default CardBody;