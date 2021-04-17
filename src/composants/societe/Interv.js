import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Interv = (props) => {
    const { traiter,raisonSociale,contenu,contrat} = props
    const [msg, setMsg] = useState("")
    const [open, setOpen] = useState(false);
    
    useEffect(() => {       
    },[])
    
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const cloturer =()=>{
            if (contenu.dateDebut===""&& contenu.dateFin===""){
               setMsg("Ajouter un rapport pour pouvoir clôturer la damande")                  
            }else{
               Axios.patch(`http://localhost:3001/api/v1/intervention/${contenu._id}`,{etat:"Clôturée",} ).then(()=>{
                    setMsg("Demande est clôtureé")
                }) 
                setMsg("la clôturation n'est pas encore passee"+contenu._id)
            }

            setOpen(true);
    }
    return (
        <div className="container" >

            <Row >
                <Col>Client Demandeur :</Col>
                <Col> {raisonSociale}</Col>
            </Row><br />
            <Row>
                <Col sm={3} >Date de  Création  :</Col>
                <Col sm={3}>{contenu.dateCreation}  </Col>
                <Col >  {contenu.heureCreation}   </Col>

            </Row><br />
            <Row>
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
            <br/><br/>
            <Row hidden={!traiter}>
                <Col><Button variant="contained" onClick={cloturer} color="secondary" >Clôturer</Button></Col>
                <Col><Link to={'/ajouterRapport/'+ contenu._id+"/"+contenu.IDintervenant} disabled={!(contenu.dateDebut===""&& contenu.dateFin==="")} ><Button disabled={!(contenu.dateDebut===""&& contenu.dateFin==="")} variant="contained"  color="primary">Ajouter un rapport </Button></Link></Col>
            </Row>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                {msg}
                </Alert>
            </Snackbar>
            <br />
        </div>
    )
}

export default Interv;