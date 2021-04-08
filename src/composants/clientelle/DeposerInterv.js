import  'bootstrap/dist/css/bootstrap.min.css';
import '../../style/ticket.css'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import MessageInfo from '../MessageInfo'
import Icon from '@material-ui/core/Icon';
import { useState ,useEffect} from 'react';
import Axios from 'axios';

function DeposerInterv (props){
    //recuperation de client 
    const {client,idClient,listeContrats}=props;
    const [contrat,setContrat]=useState(listeContrats[0])
    const [nature,setNature]=useState("Maintenance")
    const [priorite,setPriorite]=useState("Urgent")
    const [objet,setObjet]=useState("")
    const [details,setDetails]=useState("")
    const [objetErreur,setObjetErreur]=useState(false)
    const [messageInfo, setMessageInfo] = useState(<div></div>)
    const [listeDdes, setListeDdes] = useState([])
    const [demandeEnCours,setdemandeEnCours]= useState(false)
   
    

    
    //  prepartin la liste de contrat 
    const options=listeContrats.map((contrat,index)=>{return <option key={index}>{contrat}</option>});
    
    // rinsialier les donnes
    const resetFroms=()=>{
        setObjet("");
        setDetails("");
        setContrat(listeContrats[0]);
        setNature("Maintenance");
        setPriorite("Urgent");
    }
    
    // deposer le dde 
    const envoyer=()=>{
        const ob={
            IDclient:idClient,
            dateCreation:new Date().toLocaleDateString(),
            heureCreation:new Date().toLocaleTimeString() ,
            contrat,
            nature,
            priorite,
            objet,
            details
        }
        if(objet!==""){
        Axios.post('http://localhost:3001/api/v1/intervention',ob ).then(()=>{
            console.log("seccess");
            console.log(ob);
            setMessageInfo(<MessageInfo >L'ajout d'une nouvelle demande est passé avec succès </MessageInfo>)
            resetFroms();
        })
        }else{
          setObjetErreur(true)
          console.log(listeDdes);
           
        }
        
        }
    
        const listeDemandeParClient=()=>{
            Axios.get(`http://localhost:3001/api/v1/intervention/getInterventionsClient/${client}`)
            .then((res)=>{
                setListeDdes(res.data.data);
    
            })
            
          
        }
        useEffect(() => {
            listeDemandeParClient()
          });

    return(
        
        <div className="container" style={{border:'2px rgb(0, 153, 204) solid',borderRadius:'50px',marginTop:'20px',padding:'20px'}}>
            <br/>
        <h2  className="text-info" style={{textAlign:'center'}}>Déposer une nouvelle demande d'intervention </h2><br/><br/>
        <form>

        <Row> 
           <Col sm={5}>
            <Form.Group as={Row}  controlId="formHorizontalEmail">
                <Form.Label column >
                Client Demandeur 
                </Form.Label>
                <Col sm={12}>
                <Form.Control type="text" placeholder={client} disabled />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalContrat">
                <Form.Label column sm={2}>
                Contrat
                </Form.Label>
                
                <Col sm={12}>
                    <Form.Control as="select" value={contrat} onChange={(event)=>{
                        setContrat(event.target.value)
                    }}
                     >
                        {options}
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontaNature">
                <Form.Label column >
                    Nature de la demande
                </Form.Label>
                <Col sm={12}>
                    <Form.Control as="select" value={nature}  onChange={(event)=>{
                        setNature(event.target.value)
                    }}>
                        <option>Maintenance</option>
                        <option>Neauvau besoin</option>
                    </Form.Control>
                </Col>

            </Form.Group>
            
            
                <Form.Group as={Row}>
                <Form.Label as="legend" column sm={6}>
                    Priorité de la demande 
                </Form.Label>
                <Col sm={5}>
                <Form.Check
                    type="radio"
                    label="Normal "
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    value="Normal"
                    onChange={(event)=>{
                        setPriorite(event.target.value)
                    }}
                    checked={priorite==='Normal'}
                    />
                    <Form.Check
                    type="radio"
                    label="Urgent"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    value="Urgent"
                    onChange={(event)=>{
                        setPriorite(event.target.value)
                    }}
                    checked={priorite==='Urgent'}
                    />
                    <Form.Check
                    type="radio"
                    label="Critique"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    value="Critique"
                    onChange={(event)=>{
                        setPriorite(event.target.value)
                    }}
                    checked={priorite==='Critique'}
                    
                    />
                </Col>
                
                </Form.Group>
                        
            </Col>
            <Col sm={1}>
             <div className="ligneTicket" ></div>
            </Col>

            <Col sm={5}>
            <TextField fullWidth
                id="outlined-multiline-static"
                 label="Objet"
                 onChange={(event)=>{
                    setObjet(event.target.value);setObjetErreur(false)
                }}
                multiline
                rows={4}
                placeholder="Objet"
                value={objet}
                variant="outlined"
                error={objetErreur}
            />
            <Alert severity="error" hidden={!objetErreur} >
                 <AlertTitle style={{fontSize:"14px"}}>S'il vous plait tapez l'objet de la demande</AlertTitle>
            </Alert>
            <br/><br/>
            <TextField fullWidth
                id="outlined-multiline-static"
                 label="Details"
                 onChange={(event)=>{
                    setDetails(event.target.value)
                }}
                 multiline
                rows={6}
                placeholder="Plus détails"
                value={details}
                variant="outlined"
            />
            </Col>
            </Row>
            <Row>
            <Col sm={8}>
             {messageInfo}
            </Col>
            <Col sm={{span :50,offset:2}}>
                
                <Button
                            variant="contained"
                            color="primary"
                            style={{backgroundColor:'rgb(0, 153, 204)'}}
                            onClick={envoyer}
                            endIcon={<Icon>send</Icon>}
                        >
                            Envoyer
                </Button> 
            
            </Col>
            </Row>        
            </form>
        </div>
        
    )
}
export default DeposerInterv;