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
     const [messageInfo, setMessageInfo] = useState(<div></div>)
    
    const enregistrer=async()=>{
        const formData = new FormData();
            formData.append('IDTicket',id);
            formData.append('IDintervenant',user._id);
            formData.append('dateCreation',new Date().toLocaleDateString());
            formData.append('heureCreation',new Date().toLocaleTimeString());
            formData.append('dateDebut',dateDebut);
            formData.append('heureDebut',heureDebut);
            formData.append('dateFin',dateFin);
            formData.append('heureFin',heureFin);
            formData.append('attachement',attachement);
        
       let ob={
                IDTicket:id,
                IDintervenant:user._id,
                dateCreation:new Date().toLocaleDateString(),
                heureCreation:new Date().toLocaleTimeString(),
                dateDebut,
                heureDebut,
                dateFin,
                heureFin,
                attachement
             }
        const res = await Axios.get(`rapportInter/getRapportIntersTicket/${id}`)
        if (res.data.data.length === 0) {
            const res2=await Axios.get(`affectation/getAffectationsIntervenantTicket/${id}/${user._id}`)
            if(res2.data.data.length !== 0){
                if(res2.data.data[0].annule === false){
                const res3=await  Axios.post(`rapportInter`,formData )
                setMessageInfo(<MessageInfo >L'ajout d'un nouvel rapport est passeé avec seccess </MessageInfo>)
                }
              }
            
          }else{
              setMessageInfo(<MessageInfo >le rapport de cette intervention existe vous ne pouvez pas ajouter un autre rapport</MessageInfo>)
          }    
                
    }
     return(
         
        <div className="container" style={{border:'2px rgb(0, 153, 204) solid',borderRadius:'50px',marginTop:'20px',padding:'20px'}}>
            <br/>
        <h2  className="text-info" style={{textAlign:'center'}}>Ajouter un nouvel rapport  </h2><br/><br/>
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
                accept="application/pdf"   
                onChange={event => { setAttachement( event.target.files[0] ); }}/>
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