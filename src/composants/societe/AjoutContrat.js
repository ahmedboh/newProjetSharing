import { useParams } from 'react-router';
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



const AjoutContrat=()=>{
    const{idClient,raisonSocial}=useParams()
    const [type,setType]=useState("Garantie")
    const [visitesMainPreventive,setVisitesMainPreventive]=useState(0)
    const [visitesMainCurative,setVisitesMainCurative]=useState(0)
    const [prixInterSupp,setPrixInterSupp]=useState(0)
    const [contact,setContact]=useState("")
    const [telContact,setTelContact]=useState("")
    const [emailContact,setEmailContact]=useState("")
    const [nbrContrat,setNbrContrat]=useState(0)
    const [messageInfo, setMessageInfo] = useState(<div></div>);
    const [erreur,setErreur]=useState(false);
    let history = useHistory();
    
    const  afficherErreur=()=>{

        setErreur(true);
        setTimeout(()=>{setErreur(false)},4000);
      }
      const getContrats = async ()=>{
       const res =await Axios.get(`contrat/getContratsClient/${idClient}`)
       setNbrContrat(res.data.data.length)  
      }

    useEffect(() => {
        getContrats();
    }, [idClient])
    const ajouter=async()=>{

        const ob={
            IDclient:idClient,
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
        const res= await Axios.post('contrat',ob )
        setMessageInfo(<MessageInfo >le nouveau contrat à ajouter avec succès </MessageInfo>);
        setNbrContrat(nbrContrat+1)
        document.getElementById("form").reset();
        }else{
            afficherErreur()
            console.log("ereur")
            
        }


    }
   
    
    
    return(
        <div className='container' style={{marginBottom:'20px',padding:'20px'}}> 
          <h1 align='center'>Ajout des contrats</h1>
          <h2 >{raisonSocial}   <p style={{float:'right'}} >{nbrContrat} :Contrat(s)</p> </h2><hr/><br/>
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
                        <TextField required id="nVistePreventive" name="nVistePreventive"  label="Nombre viste par anneé"
                            type="number" fullWidth onChange={(event)=>{setVisitesMainPreventive(event.target.value);setMessageInfo(<div></div>)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                        Nombre de visites de maintenance curative par an
                    </Form.Label>
                    <Col >
                        <TextField required id="nVisteCurative" name="nVisteCurative"  label="Nombre viste par anneé"
                            type="number" fullWidth onChange={(event)=>{setVisitesMainCurative(event.target.value);setMessageInfo(<div></div>)}} />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} controlId="formHorizontalContrat">
                    <Form.Label column >
                         Prix unitaire des interventions supplémentaires
                    </Form.Label>
                    
                    <Col >
                    <TextField required id="prixUnitaire" name="prixUnitaire"  label="Prix"
                            type="number" fullWidth onChange={(event)=>{setPrixInterSupp(event.target.value);setMessageInfo(<div></div>)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                         Contact
                    </Form.Label>
                    <Col >
                         <TextField id="Contact" label="Contact"   onChange={(event)=>{ setContact(event.target.value);setMessageInfo(<div></div>) }} />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                        N° téléphone contact
                    </Form.Label>
                    <Col >
                       <TextField id="tel" label="Tel" type="tel"  onChange={(event)=>{ setTelContact(event.target.value) ;setMessageInfo(<div></div>)}} />
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
                                
                                onChange={(event)=>{setEmailContact(event.target.value);setMessageInfo(<div></div>)}}
                            />
                    </Col>
                </Form.Group>
                </Col>
                    
                <br/>
                <Col sm={8}>
                    <Button
                       onClick={()=>history.push(history.location.state.page,{idClient:history.location.state.idClient,raisonSociale:raisonSocial})}
                        variant="contained"
                        color="secondary"
                    >Terminer
                    </Button>
                </Col> 
                <Col >
                    <Button
                                variant="contained"
                                color="primary"
                                style={{backgroundColor:'rgb(0, 153, 204)'}}
                                onClick={ajouter}
                                endIcon={<SaveIcon />}
                            >
                                Enregistrer
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

export default AjoutContrat;