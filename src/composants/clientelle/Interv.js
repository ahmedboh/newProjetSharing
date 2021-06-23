import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Grid from '@material-ui/core/Grid';
import { useState ,useEffect} from 'react';
import Chat from '../chatApp/Chat';
import InfosBody from './InfosBody';
import CardBody from './CardBody';
import FeedBody from './FeedBody';

import  'bootstrap/dist/css/bootstrap.min.css';
import Badge from '@material-ui/core/Badge';
import io from "socket.io-client";
let socket;





export default function Interv(props) {
    const {fnContrat,fnTicket,contenu,user,labelContrat}=props
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
                            <Nav.Link href="#first" onClick={()=>{setEtatActuelle('ticket')}}><div  style={{padding:'1px'}}>Ticket</div></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#infos"   onClick={()=>{setEtatActuelle('infos')}}><div  style={{padding:'1px'}}>Infos</div></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#chat" onClick={()=>{setEtatActuelle('msg');setCount(0)}}><Badge color="secondary" badgeContent={count}>Messages</Badge></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#feedBack" hidden={contenu.etat==='clôture'} onClick={()=>{setEtatActuelle('feed')}} ><div style={{padding:'1px'}} >FeedBack</div></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body style={{height:'350px'}} >
                    {etatActuelle==='ticket'
                    ?<CardBody showDetailContrat={fnContrat} showDetailTicket={fnTicket} contenu={contenu} contrat={labelContrat} /> 
                    : etatActuelle==='infos'
                        ?<InfosBody  contenu={contenu} />
                        :etatActuelle==='msg'
                            ?<Chat name={user.raisonSociale} IDTicket={contenu._id} role='Cl' nameCo={'Sharing'}/> 
                            :<FeedBody IDTicket={contenu._id} />
                    }
                </Card.Body>   
            </Card> 
        </Grid>
    )
}
