import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Grid from '@material-ui/core/Grid';
import { useState ,useEffect} from 'react';
import Chat from '../chatApp/Chat';
import InfosBody from './InfosBody';
import CardBody from './CardBody';
import  'bootstrap/dist/css/bootstrap.min.css';
import Badge from '@material-ui/core/Badge';
import io from "socket.io-client";
let socket;





export default function Interv(props) {
    const {contenu,user,labelContrat}=props
    const [etatActuelle, setEtatActuelle] = useState('ticket');
    const [count, setCount] = useState(0);

    useEffect(() => {
        socket=io('http://localhost:3001/')
        socket.emit('messagesNomLu',{IDTicket:contenu._id});
    },[]);
    
    useEffect(() => {
        socket.on('messageNonVu', tab => {
            const index=tab.findIndex((ob)=>ob.IDTicket === contenu._id) 
            index!==-1&&setCount(tab[index].nbr)
        });

    },[]);

    return (
        <Grid  item   lg={4} md={6} xs={12}   >
            <Card style={{borderRadius:'15px', border :'2px #60c8b7 solid'}}>
                <Card.Header style={{height:'55px'}}>
                    <Nav variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link href="#first" onClick={()=>{setEtatActuelle('ticket')}}>Ticket</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#infos"   onClick={()=>{setEtatActuelle('infos')}}>infos</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#chat" onClick={()=>{setEtatActuelle('msg');setCount(0)}}><Badge color="secondary" badgeContent={count}>messages</Badge></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body style={{height:'350px'}} >
                    {etatActuelle==='ticket'
                    ?<div style={{marginTop:'5%'}}><CardBody  contenu={contenu} contrat={labelContrat} /> </div>
                    : etatActuelle==='infos'
                        ?<InfosBody  contenu={contenu} />
                        :<div  ><Chat name={user.raisonSociale} IDTicket={contenu._id} role='Cl' nameCo={'Sharing'}/> </div>
                    }
                </Card.Body>   
            </Card> 
        </Grid>
    )
}
