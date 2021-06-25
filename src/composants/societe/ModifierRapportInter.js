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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const ModifierRapportInter=(props)=>{
    
    const {user}=props
    let history = useHistory();
    const [intervenantLabel,setIntervenantLabel]=useState()
    const [heureDebut,setHeureDebut]=useState(formatheure(history.location.state.rapportInter.dateDebut))
    const [dateDebut,setDateDebut]=useState(formatDate(history.location.state.rapportInter.dateDebut))
    const [heureFin,setHeureFin]=useState(formatheure(history.location.state.rapportInter.dateFin))
    const [dateFin,setDateFin]=useState(formatDate(history.location.state.rapportInter.dateFin))
    const [attachement,setAttachement]=useState(history.location.state.rapportInter.attachement?{name:history.location.state.rapportInter.nomAttachement}:undefined)
    const [description,setDescription]=useState(history.location.state.rapportInter.detailinter)  
    const [messageInfo, setMessageInfo] = useState(<div></div>)
    
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    function formatheure(date) {
        var d = new Date(date),
            heure = '' + d.getHours() ,
            minute = '' + d.getMinutes();
        if (heure.length < 2) 
            heure = '0' + heure;
        if (minute.length < 2) 
            minute = '0' + minute;
        return [heure, minute].join(':');
    }

    useEffect(() => {     
        user.nom!==undefined&&setIntervenantLabel(user.nom+" "+user.prenom) 
      },[user])

    const enregistrer=async()=>{
        const formData = new FormData();
        formData.append('dateCreation',new Date());
        formData.append('dateDebut',new Date(dateDebut.substr(0,4),dateDebut.substr(5,2),dateDebut.substr(8,2),heureDebut.substr(0,2),heureDebut.substr(3,2),0));
        formData.append('dateFin',new Date(dateFin.substr(0,4)  ,dateFin.substr(5,2),dateFin.substr(8,2),heureFin.substr(0,2),heureFin.substr(3,2),0));
        formData.append('detailinter',description); 
        formData.append('attachement',attachement); 
            const res =await Axios.patch(`rapportInter/${history.location.state.rapportInter._id}`,formData )
            setMessageInfo(<MessageInfo >Le rapport est modifié avec seccess</MessageInfo>)
          history.replace(history.location.pathname,{rapportInter:res.data.data});
    }

     return(
         
        <div className="container box" >
        <h2  className="titre" >Modifier rapport d'intervention</h2><br/><br/>
        <form>
        <Row > 
           <Col sm={6}>
            <Form.Group as={Row}  controlId="formHorizontalEmail">
                <Form.Label column  className='labelText'>
                    L'intervenant 
                </Form.Label>
                <Col sm={12}>
                <Form.Control type="text" placeholder={intervenantLabel} disabled />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalContrat">
                <Form.Label column  className='labelText'>
                    Date de début du ticket
                </Form.Label>
                
                <Col >
                 <TextField id="date" label="Date" type="date" value={dateDebut}onChange={(event)=>{ setDateDebut(event.target.value) }}
                        InputLabelProps={{shrink: true,}}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontaNature">
                <Form.Label column className='labelText' >
                    Heure de début du ticket
                </Form.Label>
                <Col >
                <TextField id="time" label=" Heure" type="time" value={heureDebut} onChange={(event)=>{ setHeureDebut(event.target.value) }} 
                    InputLabelProps={{shrink: true,}}   inputProps={{step: 300}}/>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formHorizontalContrat">
                <Form.Label column className='labelText'>
                        Date de fin du ticket
                </Form.Label>
                
                <Col >
                 <TextField id="date" label="Date" type="date" value={dateFin} onChange={(event)=>{ setDateFin(event.target.value) }}
                         InputLabelProps={{shrink: true,}}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontaNature">
                <Form.Label column className='labelText'>
                     Heure de fin du ticket
                </Form.Label>
                <Col >
                <TextField id="time" label="Heure" type="time" value={heureFin} onChange={(event)=>{ setHeureFin(event.target.value) }} 
                    InputLabelProps={{shrink: true,}}   inputProps={{step: 300}}/>
                </Col>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group as={Row} controlId="formHorizontaNature">
                   <Form.Label column  className='labelText'>
                            Description
                   </Form.Label>
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
            </Form.Group><br/><br/><br/>
            <Form.Group as={Row}  controlId="formHorizontaNature">
                <Form.Label column sm={3} className='labelText'>
                    PV du ticket 
                </Form.Label>
                <Form.Label column sm={5} className='text' >
                             {attachement && (attachement.name.length>25?attachement.name.substr(0,20)+'... .'+attachement.name.substr(attachement.name.lastIndexOf(".") ):attachement.name)}  
                </Form.Label>
                <Col >
                    <input type="file" hidden id='filera'
                    onChange={event => { setAttachement( event.target.files[0] ); }}/>
                    <label htmlFor="filera">
                                <Button
                                    variant="contained"
                                    color="primary"  component="span"
                                    style={attachement?{backgroundColor:'rgb(0, 153, 204)'}:{backgroundColor:'gray'}}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload
                                </Button>
                    </label> 
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
                            style={{backgroundColor:'orange'}}
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