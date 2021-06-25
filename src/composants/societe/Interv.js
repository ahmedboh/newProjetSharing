import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Comment from '../chatApp/Comment'
import Chat  from '../chatApp/Chat'
import MenuVer  from '../menuVer'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import  '../../style/interv.css';
import Dialog from '@material-ui/core/Dialog';
import PanoramaIcon from '@material-ui/icons/Panorama';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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



const Interv = (props) => {
    const { traiter,contenu,contrat ,user} = props
    const [msg, setMsg] = useState("")
    const [open, setOpen] = useState(false);
    const [rapportExiste, setRapportExiste] = useState(false);
    const [openimg, setOpenimg] = useState(false);
   


    const handleClickOpenimg = () => {
        setOpenimg(true);
      };
      const handleCloseimg = () => {
        setOpenimg(false);
      };

    const verifRapport = async ()=>{
      const res =await  Axios.get(`rapportInter/getRapportIntersTicket/${contenu._id}`)
      res.data.data.length !== 0&&  setRapportExiste(true);  
    }
    useEffect(() => {  
        verifRapport()
    },[contenu._id])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

const cloturer =async()=>{
    if (rapportExiste){
        const res = await Axios.patch(`ticket/${contenu._id}`,{etat:"Clôturée",} )
        setMsg("Demande est clôtureé")                
    }else{
        setMsg("Ajouter un rapport pour pouvoir clôturer la damande")
    }
    setOpen(true);
}
    return (
        <div className="container" >
          <Row>
              <Col>  
                <Row >
                    <Col  className="labelText">Client Demandeur :</Col>
                    <Col className="labelText2" style={{color:'red',fontWeight:'bold',textDecoration:'underline'}}> {contenu.IDclient.raisonSociale}</Col>
                </Row><br />
                
                <Row>
                    <Col className="labelText" style={{fontSize:15}} >Date et heure de Création :</Col>
                    <Col className="labelText2" >{new Date(contenu.dateCreation).toLocaleDateString()}||{new Date(contenu.dateCreation).toLocaleTimeString().substr(0,5)}</Col>
                </Row><br />
                <Row >
                    <Col className="labelText" >Référence ticket :</Col>
                    <Col className="labelText2"> {contenu.ref}</Col>
                </Row><br />
                <Row >
                        <Col className="labelText"  >Capture  </Col>
                        <Col  style={{position:'relative',top:'-10px'}}  className="text2">
                        {(contenu.image && contenu.image!="dW5kZWZpbmVk")?'img.jpg':'Accune'}  
                        <Tooltip title='Ouvrir image '  arrow>
                        <IconButton aria-label="upload picture" component="span" onClick={handleClickOpenimg} style={{ color:`${(contenu.image && contenu.image!="dW5kZWZpbmVk")?'orange':'gray'}`   }} disabled={!(contenu.image && contenu.image!="dW5kZWZpbmVk")} >
                            <PanoramaIcon  /> 
                        </IconButton>
                        </Tooltip>
                        <Dialog fullWidth={true} maxWidth={'lg'} onClose={handleCloseimg} aria-labelledby="customized-dialog-title" open={openimg}>
                            <DialogTitle id="customized-dialog-title" onClose={handleCloseimg}>
                                Image
                            </DialogTitle>
                            <DialogContent dividers>
                            <center><img src={`data:image/*;base64,${contenu.image}`}/></center>
                            </DialogContent>
                        </Dialog>
                        </Col>
                </Row>
                <Row hidden={!traiter}>
                    <Col className="labelText">Contrat :</Col>
                    <Col className="labelText2"> contrat 2</Col>
                </Row><br hidden={!traiter} />

                <Row>
                    <Col className="labelText">Nature du ticket :</Col>
                    <Col className="labelText2">{contenu.nature}</Col>
                </Row><br />
                <Row>
                    <Col className="labelText">Objet :</Col>
                    <Col className="labelText2">{contenu.objet}</Col>
                </Row><br />
                <Row>
                    <Col className="labelText">Détail</Col>
                </Row>
                <Row>
                    <Col >
                    <TextField fullWidth
                    id="outlined-multiline-static"
                    multiline
                    aria-readonly
                    value={contenu.details}
                    rows={4}
                    
                    />
                   </Col>
                </Row>
               
                <br/>
                <Row hidden={!traiter} >
                    <Col><Button size="medium" variant="contained" onClick={cloturer} color="secondary" >Clôturer</Button></Col>
                    <Col><Link  to={'/ajouterRapport/'+ contenu._id} disabled={!rapportExiste} ><Button size="medium" disabled={rapportExiste} variant="contained"  color="primary">Ajouter  rapport </Button></Link></Col>
                </Row>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    {msg}
                    </Alert>
                </Snackbar>
                
                <br />
              </Col>
    
                <Col hidden={!traiter}  >
                     <MenuVer  dataLabels={[" Chat client ","Commentaire"]} data={[<Chat name={user.prenom+""+user.nom} IDTicket={contenu._id} role='In' nameCo={contenu.IDclient.raisonSociale}/> , <Comment  name={user.prenom+""+user.nom} IDTicket={contenu._id} role='In' /> ]} />     
                         {/* <Row><Chat name={user.prenom+""+user.nom} IDTicket={contenu._id} role='In' nameCo={contenu.IDclient.raisonSociale}/> </Row> */}
                         {/* <Row ><Comment  name={user.prenom+""+user.nom} IDTicket={contenu._id} role='In' /> </Row>      */}
                </Col>
        
            </Row>
        </div>
    )
}

export default Interv;