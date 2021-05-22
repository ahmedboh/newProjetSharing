import  'bootstrap/dist/css/bootstrap.min.css';
import '../../style/interv.css'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import MessageInfo from '../MessageInfo'
import Icon from '@material-ui/core/Icon';
import { useState ,useEffect} from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Axios from 'axios';

function DeposerTicket (props){
    const {user}=props
    const [nature,setNature]=useState("Maintenance")
    const [priorite,setPriorite]=useState("Urgent")
    const [objet,setObjet]=useState("")
    const [details,setDetails]=useState("")
    const [objetErreur,setObjetErreur]=useState(false)
    const [messageInfo, setMessageInfo] = useState()
    const [image,setImage]=useState()
    const [imageErreur,setImageErreur]=useState('')    


    
    //  prepartin la liste de contrat 
    
    // rinsialier les donnes
    const resetFroms=()=>{
        setObjet("");
        setDetails("");
        setNature("Maintenance");
        setPriorite("Urgent");
    }
    
    // deposer le dde 
    const envoyer=async()=>{
        
        if(objet!==""){
            const formData = new FormData();
            formData.append('IDclient',user._id);
            formData.append('dateCreation',new Date().toLocaleDateString());
            formData.append('heureCreation',new Date().toLocaleTimeString());
            formData.append('nature',nature);
            formData.append('priorite',priorite);
            formData.append('objet',objet);
            formData.append('details',details);
            formData.append('image',image);
        
            const ob1={
                to:"sharingticket@gmail.com",
                subject:"Un nouvel ticket",
                text:`Bonjour,\nLe client ${user.raisonSociale} à déposer un nouvel ticket qu'il à les détails suivante:\nNature : ${nature}\nPriorite : ${priorite}\nObjet : ${objet}\nDetails : ${details}\nVeuillez traiter cette ticket sur la plateforme SharingTicket: http://localhost:3000/ `
            }
           const res=await Axios.post('ticket',formData)
           setMessageInfo(<MessageInfo >L'ajout d'une nouvelle demande est passé avec succès </MessageInfo>)
           resetFroms()
           const res2=await Axios.post('http://localhost:3001/api/v1/mailing',ob1 )
                    
        }else{
          setObjetErreur(true)
          console.log("err");
           
        }
        
        }
    
        
        function validateImage(value){
            setImageErreur('') 
            var idxDot = value.name.lastIndexOf(".") + 1;
            var extFile = value.name.substr(idxDot, value.name.length).toLowerCase();
            if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
               setImage(value)
            }else{
                setImage()
                setImageErreur("S'il vous chosir une fichier de type image");
            }   
        }

        
     
    
          
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
                <Form.Control type="text" placeholder={user.raisonSociale} disabled />
                </Col>
            </Form.Group><br/>


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
            <br/><br/>
            
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
             <div className="ligneInterv" ></div>
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
            <br/><br/>
            <input type="file"  id="imageTiket" hidden accept="image/*" onChange={event => { 
                    validateImage( event.target.files[0] ) 
                  }} />
                  
             <Row>
                    <Col sm={6}>   Ajouter une photho  </Col>  
                    
                    <Col sm={6}>
                        <label htmlFor="imageTiket">
                            <Button variant="contained" color={image?'primary':'inherit'} component="span">
                                <PhotoCamera />
                            </Button> {image && image.name}
                        </label>
                    </Col>     
            </Row>
            <Alert severity="error" hidden={!imageErreur} >
                 <AlertTitle style={{fontSize:"14px"}}>{imageErreur}</AlertTitle>
            </Alert>

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
export default DeposerTicket;