import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import  'bootstrap/dist/css/bootstrap.min.css';
import '../../style/ticket.css'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import MessageInfo from '../MessageInfo'
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';



const AjoutContrat=()=>{
    const{idClient}=useParams()
    const [type,setType]=useState("Garantie")
    const [visitesMainPreventive,setVisitesMainPreventive]=useState(0)
    const [visitesMainCurative,setVisitesMainCurative]=useState(0)
    const [prixInterSupp,setPrixInterSupp]=useState(0)
    const [contact,setContact]=useState("")
    const [telContact,setTelContact]=useState("")
    const [emailContact,setEmailContact]=useState("")


    
    return(
        <div> 
          <form>
            <Row style={{marginLeft:'15%'}}> 
            <Col sm={8}>
                <Form.Group as={Row}  controlId="formHorizontalEmail">
                    <Form.Label column >
                    Type de contrat :
                    </Form.Label>
                     <Col sm={12}>
                    
                     <Form.Check
                            type="radio"
                            label="Garantie "
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            value="Garantie"
                            onChange={(event)=>{
                                setType(event.target.value)
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
                            setType(event.target.value)
                         }}
                        checked={type==='Contrat de maintenance'}
                        />

                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalContrat">
                    <Form.Label column >
                        Nombre de visites de maintenance préventive par an
                    </Form.Label>
                    
                    <Col >
                        <TextField required id="nVistePreventive" name="nVistePreventive" value={visitesMainPreventive} label="Nbre viste par anneé"
                            type="number" fullWidth onChange={(event)=>{setVisitesMainPreventive(event.target.value)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                        Nombre de visites de maintenance curative par an
                    </Form.Label>
                    <Col >
                        <TextField required id="nVisteCurative" name="nVisteCurative" value={visitesMainCurative} label="Nbre viste par anneé"
                            type="number" fullWidth onChange={(event)=>{setVisitesMainCurative(event.target.value)}} />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} controlId="formHorizontalContrat">
                    <Form.Label column >
                         Prix unitaire des interventions supplémentaires
                    </Form.Label>
                    
                    <Col >
                    <TextField required id="prixUnitaire" name="prixUnitaire" value={prixInterSupp} label="Prix"
                            type="number" fullWidth onChange={(event)=>{setPrixInterSupp(event.target.value)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                         Contact
                    </Form.Label>
                    <Col >
                         <TextField id="Contact" label="Contact"  value={contact} onChange={(event)=>{ setContact(event.target.value) }} />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} controlId="formHorizontaNature">
                    <Form.Label column >
                        N° téléphone contact
                    </Form.Label>
                    <Col >
                       <TextField id="tel" label="Tel" type="tel" value={telContact} onChange={(event)=>{ setTelContact(event.target.value) }} />
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
                                value={emailContact}
                                onChange={(event)=>{setEmailContact(event.target.value)}}
                            />
                    </Col>
                </Form.Group>
                </Col>
                </Row>
                    
                <Row>
                {/* <Col sm={8}>
                {messageInfo}
                </Col> */}
                <Col sm={{span :50,offset:2}}>
                    
                    <Button
                                variant="contained"
                                color="primary"
                                style={{backgroundColor:'rgb(0, 153, 204)'}}
                                //onClick={enregistrer}
                                endIcon={<SaveIcon />}
                            >
                                Enregistrer
                    </Button> 
                
                </Col>
                </Row>
                    
            </form>
          <h2>{idClient} </h2>
          <Link to="/ajouterClient" >terminer</Link>
          </div>

    )
}

export default AjoutContrat;