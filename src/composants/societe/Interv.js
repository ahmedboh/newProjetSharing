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
const Interv = (props) => {
    const { traiter,raisonSociale,contenu,contrat ,user} = props
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
        //setMsg("la clôturation n'est pas encore passee"+contenu._id)                  
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
                    <Col>Client Demandeur :</Col>
                    <Col> {raisonSociale}</Col>
                </Row><br />
                <Row>
                    <Col  >Date de  Création  :</Col>
                    <Col >{contenu.dateCreation} </Col>

                </Row><br />
                <Row>
                    <Col  >Heure de  Création  :</Col>
                    <Col >{contenu.heureCreation}  </Col>

                </Row><br />
                <Row hidden={!traiter}>
                    <Col>Contrat :</Col>
                    <Col> {contrat}</Col>
                </Row><br />

                <Row>
                    <Col>Nature de la demande :</Col>
                    <Col>{contenu.nature}</Col>
                </Row><br />
                <Row>
                    <Col>Objet</Col>
                </Row><br />
                <Row>
                    <Col sm={8}>{contenu.objet}</Col>
                </Row><br />
                <Row>
                    <Col >Details</Col>
                </Row><br />
                <Row>
                    <Col><pre>{contenu.details}</pre></Col>
                </Row>
                {   
                        traiter&&  <Row><Comment  name={user.prenom+""+user.nom} room={contenu._id} role='In' /> </Row>
                }
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
    
                <Col>
                    
                    {   
                        traiter&&  <Row><Chat name={user.prenom+""+user.nom} room={contenu._id} role='In' nameCo={raisonSociale}/> </Row>
                    }
                </Col>
        
            </Row>
        </div>
    )
}

export default Interv;