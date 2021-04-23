
import TextField from '@material-ui/core/TextField';
import  'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import MessageInfo from '../MessageInfo'
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from "react-router-dom";



const ModifContrat=()=>{
    const [type,setType]=useState("Garantie")
    const [visitesMainPreventive,setVisitesMainPreventive]=useState(0)
    const [visitesMainCurative,setVisitesMainCurative]=useState(0)
    const [prixInterSupp,setPrixInterSupp]=useState(0)
    const [contact,setContact]=useState("")
    const [telContact,setTelContact]=useState("")
    const [emailContact,setEmailContact]=useState("")
    const [messageInfo, setMessageInfo] = useState(<div></div>);
    const [erreur,setErreur]=useState(false);
    let history = useHistory();
    
    const  afficherErreur=()=>{

        setErreur(true);
        setTimeout(()=>{setErreur(false)},4000);
      }
    useEffect(() => {
          Axios.get(`http://localhost:3001/api/v1/contrat/${history.location.state.idContrat}`)
          .then(res => {
            setType(res.data.data.type)
            setVisitesMainPreventive(res.data.data.visitesMainPreventive)
            setVisitesMainCurative(res.data.data.visitesMainCurative)
            setPrixInterSupp(res.data.data.prixInterSupp)
            setContact(res.data.data.contact)
            setTelContact(res.data.data.telContact)
            setEmailContact(res.data.data.emailContact)
      })
     }
    , [])
    const modifier=()=>{
        const ob={
            type,
            visitesMainPreventive,
            visitesMainCurative,
            prixInterSupp,
            contact,
            telContact,
            emailContact
        }
        if(type!=="" && visitesMainPreventive!=="" && visitesMainCurative!=="" &&
        prixInterSupp!=="" && contact!=="" && telContact!=="" &&  emailContact!==""){
        Axios.patch(`http://localhost:3001/api/v1/contrat/${history.location.state.idContrat}`,ob ).then( res => {
            setMessageInfo(<MessageInfo >La modification est passée avec succès </MessageInfo>);
            console.log("seccues")

        })
        }else{
            afficherErreur()
            console.log("ereur")
            
        }


    }
   
    
    
    return(
        <div className='container' style={{marginBottom:'20px',padding:'20px'}}> 
          <h1 > Modifier Contrat   <p style={{float:'right'}} >{history.location.state.raisonSociale}</p> </h1><hr/><br/>
          <form id="form" >
            <Row style={{marginLeft:'15%'}}> 
            <Col sm={8}>
                <Form.Group as={Row}  controlId="formHorizontalEmail">
                    <Form.Label column >
                    Type de contrat :
                    </Form.Label>
                     <Col sm={6}>
                    
                     <Form.Check
                            type="radio"
                            label="Garantie "
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            
                            value="Garantie"
                            onChange={(event)=>{
                                setType(event.target.value);setMessageInfo(<div></div>)
                            }}
                            checked={type==='Garantie'}
                    />
                    <Form.Check
                        type="radio"
                        label="Contrat de maintenance"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        value="Contrat de maintenance"
                        onChange={(event)=>{
                            setType(event.target.value);setMessageInfo(<div></div>)
                         }}
                        checked={type==='Contrat de maintenance'}
                        />

                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalContrat">
                    <Form.Label column  >
                        Nombre de visites de maintenance préventive par an
                    </Form.Label>
                    
                    <Col >
                        <TextField required id="nVistePreventive" name="nVistePreventive"  label="Nombre viste par anneé" value={visitesMainPreventive}
                            type="number" fullWidth onChange={(event)=>{setVisitesMainPreventive(event.target.value);setMessageInfo(<div></div>)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                        Nombre de visites de maintenance curative par an
                    </Form.Label>
                    <Col >
                        <TextField required id="nVisteCurative" name="nVisteCurative"  label="Nombre viste par anneé" value={visitesMainCurative}
                            type="number" fullWidth onChange={(event)=>{setVisitesMainCurative(event.target.value);setMessageInfo(<div></div>)}} />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} controlId="formHorizontalContrat">
                    <Form.Label column >
                         Prix unitaire des interventions supplémentaires
                    </Form.Label>
                    
                    <Col >
                    <TextField required id="prixUnitaire" name="prixUnitaire"  label="Prix" value={prixInterSupp}
                            type="number" fullWidth onChange={(event)=>{setPrixInterSupp(event.target.value);setMessageInfo(<div></div>)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                         Contact
                    </Form.Label>
                    <Col >
                         <TextField id="Contact" label="Contact" value={contact}   onChange={(event)=>{ setContact(event.target.value);setMessageInfo(<div></div>) }} />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                        N° téléphone contact
                    </Form.Label>
                    <Col >
                       <TextField id="tel" label="Tel" type="tel"   value={telContact}onChange={(event)=>{ setTelContact(event.target.value) ;setMessageInfo(<div></div>)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                         Adresse email contact
                    </Form.Label>
                    <Col >
                    <TextField
                                required
                                id="email"
                                name="email"
                                label="Adresse email"
                                fullWidth
                                type="email"
                                value={emailContact}
                                onChange={(event)=>{setEmailContact(event.target.value);setMessageInfo(<div></div>)}}
                            />
                    </Col>
                </Form.Group>
                </Col>
                    
                <br/>
                <Col sm={8}>
                    <Button
                       onClick={()=>history.push(history.location.state.page,{idClient:history.location.state.idClient,raisonSociale:history.location.state.raisonSociale})}
                        variant="contained"
                        color="secondary"
                    >Terminer
                    </Button>
                </Col> 
                <Col >
                    <Button
                                variant="contained"
                                color="primary"
                                style={{backgroundColor:'#ffea00'}}
                                onClick={modifier}
                                endIcon={<SaveIcon />}
                            >
                                Modifier
                    </Button> 
                
                </Col>
                <Alert severity="error" hidden={!erreur} >
                    <AlertTitle style={{fontSize:"14px",paddingLeft:"10vw"}}>Veuillez remplir tous les champs</AlertTitle>
                </Alert>
                {messageInfo}
             </Row>
                    
            </form>
          
          </div>

    )
}

export default ModifContrat;