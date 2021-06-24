import TextField from '@material-ui/core/TextField';
import  'bootstrap/dist/css/bootstrap.min.css';
import '../../style/interv.css'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import MessageInfo from '../MessageInfo'
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import { useParams } from 'react-router';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const AjouterRapport=(props)=>{
    const {user}=props
    const {id}=useParams()
    const [intervenantLabel,setIntervenantLabel]=useState('')
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
    

    useEffect(() => {     
       user.nom!==undefined&&setIntervenantLabel(user.nom+" "+user.prenom) 
     },[user])
    
     const [heureDebut,setHeureDebut]=useState("08:00")
     const [dateDebut,setDateDebut]=useState(formatDate(new Date()))
     const [heureFin,setHeureFin]=useState("11:00")
     const [dateFin,setDateFin]=useState(formatDate(new Date()))
     const [attachement,setAttachement]=useState()
     const [description,setDescription]=useState()
     const [messageInfo, setMessageInfo] = useState(<div></div>)
    
    const enregistrer=async()=>{
        console.log(dateDebut, heureDebut)
        const formData = new FormData();
            formData.append('IDTicket',id);
            formData.append('IDintervenant',user._id);
            formData.append('dateCreation',new Date());
            formData.append('dateDebut',new Date(dateDebut.substr(0,4),dateDebut.substr(5,2),dateDebut.substr(8,2),heureDebut.substr(0,2),heureDebut.substr(3,2),0));
            formData.append('dateFin',new Date(dateFin.substr(0,4)  ,dateFin.substr(5,2),dateFin.substr(8,2),heureFin.substr(0,2),heureFin.substr(3,2),0));
            formData.append('detailinter',description); 
            formData.append('attachement',attachement); 

        const res = await Axios.get(`rapportInter/getRapportIntersTicket/${id}`)
        if (res.data.data.length === 0) {
            const res2=await Axios.get(`affectation/getAffectationsIntervenantTicket/${id}/${user._id}`)
            if(res2.data.data !== null){
                if(res2.data.data.annule === false){           
                const res3=await  Axios.post(`rapportInter`,formData )
                console.log(res3)
                setMessageInfo(<MessageInfo >L'ajout d'un nouveau rapport est passeé avec seccess </MessageInfo>)
                }
              }
            
          }else{
              setMessageInfo(<MessageInfo >le rapport de cette intervention existe vous ne pouvez pas ajouter un autre rapport</MessageInfo>)
          }    
                
    }
     return(
         
        <div className="container box" >
            <h2  className="titre" >Ajouter un nouveau rapport  </h2>
            <br/>
        <form>
        <Row > 
           <Col sm={6}>
            <Form.Group as={Row}  controlId="formHorizontalEmail">
                <Form.Label column className='text' >
                L'intervenant 
                </Form.Label>
                <Col sm={12}>
                <Form.Control type="text" placeholder={intervenantLabel} disabled />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalContrat">
                <Form.Label column  className='text'>
                    Date de début du ticket
                </Form.Label>
                
                <Col >
                 <TextField id="date" label="Date" type="date" value={dateDebut}onChange={(event)=>{ setDateDebut(event.target.value) }}
                        InputLabelProps={{shrink: true,}}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontaNature">
                <Form.Label column className='text' >
                     Heure de début du ticket
                </Form.Label>
                <Col >
                <TextField id="time" label=" Heure" type="time" value={heureDebut} onChange={(event)=>{ setHeureDebut(event.target.value) }} 
                    InputLabelProps={{shrink: true,}}   inputProps={{step: 300}}/>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formHorizontalContrat">
                <Form.Label column className='text'>
                    Date de fin du ticket
                </Form.Label>
                
                <Col >
                 <TextField id="date" label="Date" type="date" value={dateFin} onChange={(event)=>{ setDateFin(event.target.value) }}
                         InputLabelProps={{shrink: true,}}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontaNature">
                <Form.Label column className='text'>
                     Heure fin du ticket
                </Form.Label>
                <Col >
                <TextField id="time" label="Heure" type="time" value={heureFin} onChange={(event)=>{ setHeureFin(event.target.value) }} 
                    InputLabelProps={{shrink: true,}}   inputProps={{step: 300}}/>
                </Col>
            </Form.Group>


            
            </Col>
            <Col><br/><br/>
                   <Form.Label column  className='text' >
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
                        /><br/><br/><br/>
                    <Form.Group as={Row} controlId="formHorizontaNature">
                        <Form.Label column sm={8} className='text' >
                            PV du ticket
                        </Form.Label>
                        <input type="file" id='filera' hidden
                        accept="application/pdf"   
                        onChange={event => { setAttachement( event.target.files[0] ); }}/>
                        <Col >
                            <label htmlFor="filera">
                                <Button
                                    variant="contained"
                                    color="primary"  component="span"
                                    style={{backgroundColor:'rgb(0, 153, 204)'}}
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
                            style={{backgroundColor:'rgb(0, 153, 204)'}}
                            onClick={enregistrer}
                            endIcon={<SaveIcon />}
                        >
                            Enregistrer
                </Button> 
            
            </Col>
            </Row>
                    
            </form>
        </div>)
}

export default AjouterRapport;