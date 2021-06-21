import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import Row from 'react-bootstrap/Row';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Col from 'react-bootstrap/Col';
import  'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@material-ui/icons/Visibility';



const  CardBody=({contenu,contrat})=>{
    
    return(<>
                <Card.Title ><center><h5>{new Date(contenu.dateCreation).toLocaleDateString()} | {new Date(contenu.dateCreation).toLocaleTimeString()} &nbsp;&nbsp; </h5></center> </Card.Title><br/>
                <Card.Text style={{marginLeft:'10%'}} >
                <Row >   
                <Col><b>Nature  :</b></Col><Col>{contenu.nature}</Col>
                </Row>
                <Row>
                <Col><b>Etat  :</b></Col><Col>{contenu.etat}</Col> 
                </Row>
                <Row>
                <Col><b>objet  :</b></Col><Col>{contenu.objet}</Col> 
                </Row>   
                <Row>
                <Col><b>capture  :</b></Col>
                <Col  style={{position:'relative',top:'-10px'}}>
                {contenu.image?'img.jpg':'Accune'}   
                <IconButton aria-label="upload picture" component="span">{contenu.image? <VisibilityIcon  style={{ color: 'green' }} />:<VisibilityIcon  style={{ color: 'red' }} />} </IconButton>
                </Col> 
                </Row>  
                <Row style={{position:'relative',top:'-10px'}}>
                <Col><b>Contrat :</b></Col>
                <Col  style={{position:'relative',top:'-10px'}}>
                    {contrat!==-1?`Num ° ${contrat+1}`:'Sans contrat'} 
                    <IconButton aria-label="upload picture" style={{ color:`${contrat!==-1?'green':'gray'}`   }} disabled={contrat===-1} component="span"> <ContactMailIcon   /> </IconButton>
                </Col> 
                </Row> 
                </Card.Text>
                <center><Button variant="primary">plus deatille</Button></center>
            
         </>
    )
}
export default CardBody;