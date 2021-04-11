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
    //const {idClient}=props;
    const [contrat,setContrat]=useState(-1)
    const [nature,setNature]=useState("Maintenance")
    const [priorite,setPriorite]=useState("Urgent")
    const [objet,setObjet]=useState("")
    const [details,setDetails]=useState("")
    const [objetErreur,setObjetErreur]=useState(false)
    const [messageInfo, setMessageInfo] = useState()
    const [raisonSociale,setRaisonSociale]= useState("")
    const [listeContrats,setListeContrats]=useState([])
    

    
    //  prepartin la liste de contrat 
    
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
        
        if(objet!=="" && contrat>-1){
            const ob={
                 IDclient:localStorage.getItem('idClient'),
                 dateCreation:new Date().toLocaleDateString(),
                 heureCreation:new Date().toLocaleTimeString() ,
                 contrat: listeContrats[contrat]._id,
                 nature,
                 priorite,
                 objet,
                 details
             }
        Axios.post('http://localhost:3001/api/v1/intervention',ob ).then(()=>{
            console.log("seccess");
            console.log(ob);
            setMessageInfo(<MessageInfo >L'ajout d'une nouvelle demande est passé avec succès </MessageInfo>)
            resetFroms();
        })
        }else{
          setObjetErreur(true)
          console.log("err");
           
        }
        
        }
    
        const listeDemandeParContrat=(index)=>{
            setMessageInfo()
           
            index>-1 &&
            Axios.get(`http://localhost:3001/api/v1/intervention/getInterventionsContrat/${listeContrats[index]._id}`)
            .then((res)=>{
                res.data.data.forEach(dde => {  
                    if (dde.etat !== "Clôturée") setMessageInfo(<MessageInfo type="info" >vous avez une demmande {dde.etat} sur ce contrat <br/> {listeContrats.length>1 && "Changer un autre contre pour pouvoir la posibiltée ."+<br/>+" Ou " } Esseyez dans un autre temps pour la déposer.    </MessageInfo>)
                })
            })
        }
        
        

        const getRaisonSocialClient=(id)=>{
            Axios.get(`http://localhost:3001/api/v1/client/`+id)
            .then((res)=>{
                console.log("10"+res.data.data.raisonSociale)
                setRaisonSociale(res.data.data.raisonSociale);
            })  
        }
        
        const getlisteContrats=(client)=>{
            Axios.get(`http://localhost:3001/api/v1/contrat/getContratsClient/${client}`)
            .then((res)=>{
                setListeContrats(res.data.data);
                if(res.data.data.length===0)  setMessageInfo(<MessageInfo type="warning" >vous n'avez pas aucun contrat pour ajouter vos demandes.<br/> S'il vous plaît  contacter  l'adminastration de sharing  pour résoudre ce probleme </MessageInfo>);
            })  
        }

        
        useEffect(() => {
            getlisteContrats(localStorage.getItem('idClient'))

            getRaisonSocialClient(localStorage.getItem('idClient'))
          },[]);
    
    const options=listeContrats.length>0 && listeContrats.map((contrat,index)=>{return <option value={index} key={contrat._id}>Contrat n°{index+1}</option>});
          
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
                <Form.Control type="text" placeholder={raisonSociale} disabled />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalContrat">
                <Form.Label column sm={2}>
                Contrat
                </Form.Label>
                
                <Col sm={12}>
                    <Form.Control as="select" value={contrat}   onChange={(event)=>{
                        setContrat(event.target.value);listeDemandeParContrat(event.target.value);setObjetErreur(false)
                    }}
                     >  <option value={-1}>-------------</option>
                        {options}
                    </Form.Control>
                    <Alert severity="error" hidden={!(objetErreur&&contrat===-1)} >
                        <AlertTitle style={{fontSize:"14px"}}>S'il vous plait choisissez un contrat</AlertTitle>
                    </Alert>
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
                error={objetErreur&& objet===""}
            />
            <Alert severity="error" hidden={!(objetErreur&&objet==="")} >
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
                            disabled={messageInfo}
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