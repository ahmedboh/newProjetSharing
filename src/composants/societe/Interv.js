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
import TextField from '@material-ui/core/TextField';
import  '../../style/interv.css';

const Interv = (props) => {
    const { traiter,contenu,contrat ,user} = props
    const [msg, setMsg] = useState("")
    const [open, setOpen] = useState(false);
    const [rapportExiste, setRapportExiste] = useState(false);
   
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
                    <Col className="labelText" style={{fontSize:15}} >Date et heure de Creation :</Col>
                    <Col className="labelText2" >{new Date(contenu.dateCreation).toLocaleDateString()}||{new Date(contenu.dateCreation).toLocaleTimeString().substr(0,5)}</Col>
                </Row><br />
                <Row >
                    <Col className="labelText" >Reference ticket :</Col>
                    <Col className="labelText2"> {contenu.ref}</Col>
                </Row><br />
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
                    <Col className="labelText">Detailles</Col>
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
               
                <br/><br/>
                <Row hidden={!traiter}>
                    <Col><Button variant="contained" onClick={cloturer} color="secondary" >Clôturer</Button></Col>
                    <Col><Link to={'/ajouterRapport/'+ contenu._id} disabled={!rapportExiste} ><Button disabled={rapportExiste} variant="contained"  color="primary">Ajouter un rapport </Button></Link></Col>
                </Row>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    {msg}
                    </Alert>
                </Snackbar>
                
                <br />
              </Col>
    
                <Col hidden={!traiter}  ><br/><br/><br/><br/>
                         <Row><Chat name={user.prenom+""+user.nom} IDTicket={contenu._id} role='In' nameCo={contenu.IDclient.raisonSociale}/> </Row>
                         {/* <Row ><Comment  name={user.prenom+""+user.nom} IDTicket={contenu._id} role='In' /> </Row>      */}
                </Col>
        
            </Row>
        </div>
    )
}

export default Interv;