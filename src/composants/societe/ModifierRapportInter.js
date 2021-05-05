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
    const [messageInfo, setMessageInfo] = useState(<div></div>)
    let history = useHistory();
    useEffect(() => { 
        Axios.get(`http://localhost:3001/api/v1/rapportInter/${history.location.state.idRapportInter}`)
            .then(res => {
                setDateDebut(res.data.data.dateDebut)
                setHeureDebut(res.data.data.heureDebut)
                setDateFin(res.data.data.dateFin)
                setHeureFin(res.data.data.heureFin)
                setAttachement(res.data.data.nomAttachement)
                Axios.get(`http://localhost:3001/api/v1/membSociete/${res.data.data.IDintervenant}`)
                .then((res)=>{
                    setIntervenantLabel(res.data.data.nom+" "+res.data.data.prenom);
                })
        })    
    },[])
    const fileAttacher=attachement===undefined
        ?<CancelIcon />
        :<IconButton color="primary" component="span" onClick={() => {
          history.push("/LirePDF",{idRapport:history.location.state.idRapportInter})
        }}>
          <AttachFileIcon />
        </IconButton>
    const enregistrer=()=>{
        const formData = new FormData();
            formData.append('dateDebut',dateDebut);
            formData.append('heureDebut',heureDebut);
            formData.append('dateFin',dateFin);
            formData.append('heureFin',heureFin);
            formData.append('attachement',attachement);

            Axios.patch(`http://localhost:3001/api/v1/rapportInter/${history.location.state.idRapportInter}`,formData ).then(res =>{
                console.log(res);
                setMessageInfo(<MessageInfo >Le rapport est modifié avec seccess</MessageInfo>)
            })
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