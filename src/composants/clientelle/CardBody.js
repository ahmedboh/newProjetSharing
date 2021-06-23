import Card from 'react-bootstrap/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Row from 'react-bootstrap/Row';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import InfoIcon from '@material-ui/icons/Info';
import Col from 'react-bootstrap/Col';
import  'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import './style/contrat.css'



const  CardBody=({showDetailContrat,showDetailTicket,contenu,contrat})=>{
    
    return(<>
                <Card.Title className="text" ><center><h5>{new Date(contenu.dateCreation).toLocaleDateString()} | {new Date(contenu.dateCreation).toLocaleTimeString()} &nbsp;&nbsp; </h5></center> </Card.Title><br/>
                <Card.Text style={{marginLeft:'10%'}} >
                <Row >   
                <Col sm="5"><b>Nature  :</b></Col><Col className="text2" >{contenu.nature}</Col>
                </Row>
                <Row>
                <Col sm="5"><b>Etat  :</b></Col><Col  className="text2">{contenu.etat}</Col> 
                </Row>
                <Row>
                <Col sm="5"><b>objet  :</b></Col><Col  className="text2">{contenu.objet}</Col> 
                </Row>   
                <Row>
                <Col sm="5"><b>capture  :</b></Col>
                <Col  style={{position:'relative',top:'-10px'}}  className="text2">
                {contenu.image?'img.jpg':'Accune'}   
                <IconButton aria-label="upload picture" component="span">{contenu.image? <VisibilityIcon  style={{ color: 'green' }} />:<VisibilityIcon  style={{ color: 'red' }} />} </IconButton>
                </Col> 
                </Row>  
                <Row style={{position:'relative',top:'-10px'}}  >
                <Col sm="5"><b>Contrat :</b></Col>
                <Col  style={{position:'relative',top:'-10px'}} className="text2">
                    {contrat!==-1?`Num ° ${contrat+1}`:'Sans contrat'} 
                    <IconButton aria-label="upload picture" onClick={(event)=>{showDetailContrat(event,contrat)}} style={{ color:`${contrat!==-1?'green':'gray'}`   }} disabled={contrat===-1} component="span"> <ContactMailIcon   /> </IconButton>
                </Col> 
                </Row> 
                </Card.Text>
                <center><Button onClick={(event)=>{showDetailTicket(event,contenu)}} startIcon={<InfoIcon/>} endIcon={<InfoIcon/>} variant="contained" size='small' color='primary' style={{backgroundColor:'rgb(0, 153, 204)'}}>Voir detailles ticket</Button></center>
            
         </>
    )
}
export default CardBody;