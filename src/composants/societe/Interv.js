import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import React,{ useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Interv = (props) => {
    const { idt,traiter,raisonSociale,contenu} = props
    const [interv, setInterv] = useState({})
    const [msg, setMsg] = useState("")
    const [rapportexiste,setRapportexiste]= useState(false)
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
        if(idt){
        Axios.get(`http://localhost:3001/api/v1/intervention/${idt}`)
            .then((res) => {
                setInterv(res.data.data);

            })     
        }else{
            setInterv(contenu);
        }    
    },[])
    
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const cloturer =()=>{
            if (interv.dateDebut===""&& interv.dateFin===""){
               setMsg("Ajouter un rapport pour pouvoir clôturer la damande")                  
            }else{
               Axios.patch(`http://localhost:3001/api/v1/intervention/${interv._id}`,{etat:"Clôturée",} ).then(()=>{
                    setMsg("Demande est clôtureé")
                }) 
                setMsg("la clôturation n'est pas encore passee"+interv._id)
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
                <Col sm={3}>{interv.dateCreation}  </Col>
                <Col >  {interv.heureCreation}   </Col>

            </Row><br />
            <Row>
                <Col>Contrat :</Col>
                <Col> {interv.contrat}</Col>
            </Row><br />

            <Row>
                <Col>Nature de la demande :</Col>
                <Col>{interv.nature}</Col>
            </Row><br />
            <Row>
                <Col>Objet</Col>
            </Row><br />
            <Row>
                <Col sm={8}>{interv.objet}</Col>
            </Row><br />
            <Row>
                <Col >Details</Col>
            </Row><br />
            <Row>
                <Col><pre>{interv.details}</pre></Col>
            </Row>
            <br/><br/>
            <Row hidden={!traiter}>
                <Col><Button variant="contained" onClick={cloturer} color="secondary" >Clôturer</Button></Col>
                <Col><Link to={'/ajouterRapport/'+ idt+"/"+interv.IDintervenant} disabled={!(interv.dateDebut===""&& interv.dateFin==="")} ><Button disabled={!(interv.dateDebut===""&& interv.dateFin==="")} variant="contained"  color="primary">Ajouter un rapport </Button></Link></Col>
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