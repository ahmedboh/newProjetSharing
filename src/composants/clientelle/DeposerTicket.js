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
    const [priorite,setPriorite]=useState("Urgente")
    const [objet,setObjet]=useState("")
    const [details,setDetails]=useState("")
    const [objetErreur,setObjetErreur]=useState(false)
    const [messageInfo, setMessageInfo] = useState()
    const [image,setImage]=useState()
    const [imageErreur,setImageErreur]=useState('');



    
    // réinitialiser les données
    const resetFroms=()=>{
        setObjet("");
        setDetails("");
        setNature("Maintenance");
        setPriorite("Urgente");
        setImage()
    }
    
    // deposer le dde 
    const envoyer=async()=>{
        
        if(objet!==""){
            const formData = new FormData();
            formData.append('IDclient',user._id);
            formData.append('dateCreation',new Date());
            formData.append('nature',nature);
            formData.append('priorite',priorite);
            formData.append('objet',objet);
            formData.append('details',details);
            formData.append('image',image);
            const ob1={
                to:"sharingticket@gmail.com",
                subject:"Un nouveau ticket",
                text:`Bonjour,\nLe client ${user.raisonSociale} à déposer un nouveau ticket qu'il à les détails suivante:\nNature : ${nature}\nPriorite : ${priorite}\nObjet : ${objet}\nDetails : ${details}\nVeuillez traiter ce ticket sur la plateforme SharingTicket: http://localhost:3000/ `
            }
           const res=await Axios.post('ticket',formData)
           console.log(res.data.data)
           setMessageInfo(<MessageInfo >L'ajout d'un nouveau Ticket est passé avec succès </MessageInfo>)
           setTimeout(()=>{setMessageInfo();resetFroms()},4000);
           const res2=await Axios.post('mailing',ob1 )
           
                    
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
       
    

        useEffect(() => {
            
            document.body.style.backgroundColor = 'rgb(204, 193, 193)';
      return ()=>{document.body.style.backgroundColor = 'white'}
       }, [])
     

    return(
        
            <div className="container box">
                <br/>
            <h2  className="titre">Déposer un nouveau ticket </h2><br/>
            <form>

            <Row> 
            <Col sm={5}>
                <Form.Group as={Row}  controlId="formHorizontalEmail">
                    <Form.Label column className="labelText">
                    Client Demandeur 
                    </Form.Label>
                    <Col sm={12}>
                    <Form.Control type="text" placeholder={user.raisonSociale} disabled />
                    </Col>
                </Form.Group><br/>


                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column className="labelText" >
                        Nature du Ticket
                    </Form.Label>
                    <Col sm={12}>
                        <Form.Control as="select" value={nature}  onChange={(event)=>{
                            setNature(event.target.value)
                        }}>
                            <option>Maintenance</option>
                            <option>Nouveau besoin</option>
                        </Form.Control>
                    </Col>

                </Form.Group>
                <br/><br/>
                
                    <Form.Group as={Row}>
                    <Form.Label as="legend" column className="labelText" sm={6}>
                        Priorité du ticket
                    </Form.Label>
                    <Col sm={5}>
                    <Form.Check
                        type="radio"
                        label="Normale"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        value="Normale"
                        className="labelText"
                        onChange={(event)=>{
                            setPriorite(event.target.value)
                        }}
                        checked={priorite==='Normale'}
                        />
                        <Form.Check
                        type="radio"
                        label="Urgente"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        value="Urgente"
                        className="labelText"
                        onChange={(event)=>{
                            setPriorite(event.target.value)
                        }}
                        checked={priorite==='Urgente'}
                        />
                        <Form.Check
                        type="radio"
                        className="labelText"
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
                <br/>   
                <TextField fullWidth
                    id="outlined-multiline-static"
                    label="Objet"
                    onChange={(event)=>{
                        setObjet(event.target.value);setObjetErreur(false)
                    }}
                    multiline
                    rows={1}
                    placeholder="Objet"
                    value={objet}
                    variant="outlined"
                    error={objetErreur&& objet===""}
                />
                <Alert severity="error" hidden={!(objetErreur&&objet==="")} >
                    <AlertTitle style={{fontSize:"14px"}}>S'il vous plait tapez l'objet du ticket</AlertTitle>
                </Alert>
                <br/><br/>
                <TextField fullWidth
                    id="outlined-multiline-static"
                    label="Détail"
                    onChange={(event)=>{
                        setDetails(event.target.value)
                    }}
                    multiline
                    rows={6}
                    placeholder="Plus détail ... ."
                    value={details}
                    variant="outlined"
                />
                <br/><br/>
                <input type="file"  id="imageTiket" hidden accept="image/*" onChange={event => { 
                    validateImage( event.target.files[0] ) 
                }} />
                    
                <Row>
                        <Col sm={6} className="labelText">   Ajouter une photo  </Col>  
                        
                        <Col sm={6}>
                            <label htmlFor="imageTiket">
                                <Button variant="contained" color={image?'primary':'inherit'} component="span">
                                    <PhotoCamera />
                                </Button><span className="labelText"> {image && (image.name.length>15?image.name.substr(0,10)+'... .jpg':image.name)}</span>
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