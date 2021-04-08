import Interv from "./Interv"
import { useParams } from 'react-router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Axios from 'axios';
import { useState ,useEffect} from 'react';
import MessageInfo from '../MessageInfo'


const ZoneAffectaion=(props)=>{
        const{id,raisonSociale,inter,period}=useParams()
        const [intervenants,setIntervenants]=useState([])
        const [intervenant,setIntervenant]=useState('')
        const [periode,setPeriode]=useState(24)
        const [btnOrMsg,setBtnOrMsg]=useState(true)
        

        useEffect(() => {
            Axios.get(`http://localhost:3001/api/v1/membSociete/parRole/${"In"}`)
            .then((res)=>{
                setIntervenants(res.data.data);
            
            })        
            if (inter!=="None"){
                setIntervenant(inter);
                setPeriode(period)  
                setBtnOrMsg(false)    
            }
        
         },[])
        

         
    
        const Affecter=()=>{
           
            const ob={
                IDintervenant:intervenant,
                periodeTrai:periode,
                etat:"En cours"
            }
            
            console.log(ob)
            if(intervenant!==""){
            Axios.patch(`http://localhost:3001/api/v1/intervention/${id}`,ob ).then(()=>{
                console.log("seccess");
                console.log(ob);
            })
            }else{
              console.log("error");
               
            }
            
        }    
        
        const composant=!btnOrMsg
        ?<MessageInfo >Cette demande a été affectuer a l'intervenant <b> {intervenant}</b>  </MessageInfo>
        :<Button variant="contained"color="primary"style={{backgroundColor:'rgb(0, 153, 204)'}}startIcon={<SaveIcon />}onClick={Affecter}>Affecter</Button> 
                      
        
        return (<div className="container" style={{border:'2px rgb(0, 153, 204) solid',borderRadius:'50px',marginTop:'20px',padding:'20px'}}>
                <Row>
                <Col sm={6} >
                    <h2  className="text-info" style={{textAlign:'center'}}>La Demande D'intervention </h2><br/><br/>
                    <Interv idt={id} traiter={false} raisonSociale={raisonSociale}/>
                </Col>  
                <Col sm={6} >
                    <h2  className="text-info" style={{textAlign:'left'}}>Zone D'affectation </h2><br/><br/>
                    <Form>
                        <Form.Group as={Row}  controlId="formHorizontalEmail">
                            <Form.Label >
                                l'intervenant :
                            </Form.Label> 
                        </Form.Group>
                        
                        <Form.Group as={Row}  controlId="formHorizontalEmail">

                        <Autocomplete
                                id="combo-box-demo"
                                options={intervenants}
                                getOptionLabel={(option) => {return (option.nom+" "+option.prenom)}}
                                style={{ width: 300 }}
                                disabled={!btnOrMsg}
                                onChange={ (event, values) => {
                                    setIntervenant(values._id);
                                  }}
                            
                                renderInput={(params) => <TextField {...params}  label={btnOrMsg?"Intervenant":intervenant} variant="outlined" />}
                        />
                        </Form.Group>

                        <Form.Group as={Row}  controlId="formHorizontalEmail">
                            <Form.Label  >
                                Duree :
                            </Form.Label>
                        </Form.Group>

                        <Form.Group as={Row}  controlId="formHorizontalEmail">
                            <Form.Label >
                                    <TextField
                                        id="time"
                                        label="Période"
                                        type="number"
                                        value={periode}
                                        onChange={(event)=>{
                                            setPeriode(event.target.value)
                                        }}

                                         style={{ width: 100 }}
                                    /> 
                            </Form.Label>
                        </Form.Group>    

                        <Form.Group as={Row}  controlId="formHorizontalEmail">
                            <Form.Label >
                                {composant}
                            </Form.Label>
                        </Form.Group>
                        
                    </Form>
                    
                </Col>

                </Row>


            </div>)

}
export default ZoneAffectaion; 