import TextField from '@material-ui/core/TextField';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import MessageInfo from '../MessageInfo'
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CancelIcon from '@material-ui/icons/Cancel';

const ModifierRapportInter=()=>{
    const [intervenantLabel,setIntervenantLabel]=useState('')
    const [heureDebut,setHeureDebut]=useState("")
    const [dateDebut,setDateDebut]=useState("")
    const [heureFin,setHeureFin]=useState("")
    const [dateFin,setDateFin]=useState("")
    const [attachement,setAttachement]=useState()
    const [description,setDescription]=useState("")  
    const [messageInfo, setMessageInfo] = useState(<div></div>)
    let history = useHistory();
    
    const getRapport = async()=>{
       const res=await Axios.get(`rapportInter/${history.location.state.idRapportInter}`)
       console.log(res.data.data)
       setDateDebut(res.data.data.dateDebut)
       setDateFin(res.data.data.dateFin)
       setDescription(res.data.data.detailinter)
       setAttachement(res.data.data.nomAttachement)   
       const res2=await Axios.get(`membSociete/${res.data.data.IDintervenant}`)
       setIntervenantLabel(res2.data.data.nom+" "+res2.data.data.prenom)               
    }
    useEffect(() => { 
        getRapport()
    },[])
    const fileAttacher=attachement===undefined
        ?<CancelIcon />
        :<IconButton color="primary" component="span" onClick={() => {
          history.push("/LirePDF",{idRapport:history.location.state.idRapportInter})
        }}>
          <AttachFileIcon />
        </IconButton>
    const enregistrer=async()=>{
        const formData = new FormData();
        formData.append('dateCreation',new Date());
        formData.append('dateDebut',new Date(dateDebut.substr(0,4),dateDebut.substr(5,2),dateDebut.substr(8,2),heureDebut.substr(0,2),heureDebut.substr(3,2),0));
        formData.append('dateFin',new Date(dateFin.substr(0,4)  ,dateFin.substr(5,2),dateFin.substr(8,2),heureFin.substr(0,2),heureFin.substr(3,2),0));
        formData.append('detailinter',description); 
        formData.append('attachement',attachement); 
            const res =await Axios.patch(`rapportInter/${history.location.state.idRapportInter}`,formData )
            setMessageInfo(<MessageInfo >Le rapport est modifié avec seccess</MessageInfo>)
    }

     return(
         
        <div className="container" style={{border:'2px rgb(0, 153, 204) solid',borderRadius:'50px',marginTop:'20px',padding:'20px'}}>
            <br/>
        <h2  className="text-info" style={{textAlign:'center'}}>Modifier rapport d'intervention</h2><br/><br/>
        <form>
        <Row style={{marginLeft:'15%'}}> 

           <Col sm={8}>
            <Form.Group as={Row}  controlId="formHorizontalEmail">
                <Form.Label column >
                l'intervenant 
                </Form.Label>
                <Col sm={12}>
                <Form.Control type="text" placeholder={intervenantLabel} disabled />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalContrat">
                <Form.Label column >
                    Date de debut de l'itervention
                </Form.Label>
                
                <Col >
                 <TextField id="date" label="Date" type="date" value={dateDebut}onChange={(event)=>{ setDateDebut(event.target.value) }}
                        InputLabelProps={{shrink: true,}}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontaNature">
                <Form.Label column >
                     Heure Début de l'intervention
                </Form.Label>
                <Col >
                <TextField id="time" label=" Heure" type="time" value={heureDebut} onChange={(event)=>{ setHeureDebut(event.target.value) }} 
                    InputLabelProps={{shrink: true,}}   inputProps={{step: 300}}/>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formHorizontalContrat">
                <Form.Label column >
                    Date de fin de l'itervention
                </Form.Label>
                
                <Col >
                 <TextField id="date" label="Date" type="date" value={dateFin} onChange={(event)=>{ setDateFin(event.target.value) }}
                         InputLabelProps={{shrink: true,}}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontaNature">
                <Form.Label column >
                     Heure fin de l'intervention
                </Form.Label>
                <Col >
                <TextField id="time" label="Heure" type="time" value={heureFin} onChange={(event)=>{ setHeureFin(event.target.value) }} 
                    InputLabelProps={{shrink: true,}}   inputProps={{step: 300}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontaNature">
                   <Form.Label column  >
                            Description
                   </Form.Label>
                   <Col >
                    <TextField fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            onChange={(event)=>{
                                setDescription(event.target.value)
                            }}
                            multiline
                            rows={6}
                            placeholder="Descriptions ... ."
                            value={description}
                            variant="outlined"
                        />
                    </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontaNature">
                <Form.Label column >
                     PV d'intervention
                </Form.Label>
                <Col >
                <input type="file"
                onChange={event => { setAttachement( event.target.files[0] ); }}/>
                {fileAttacher}
                </Col>
            </Form.Group>
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
                            onClick={enregistrer}
                            endIcon={<SaveIcon />}
                        >
                            Modifier
                </Button> 
            
            </Col>
            </Row>
                    
            </form>
        </div>)
}

export default ModifierRapportInter;