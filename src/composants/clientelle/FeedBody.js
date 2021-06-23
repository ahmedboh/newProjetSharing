import Rating from '@material-ui/lab/Rating';
import '../../style/interv.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useState ,useEffect} from 'react';
import MessageInfo from '../MessageInfo'
import Axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FeedBody(props) {
    const{IDTicket}=props
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const [commentaire, setCommentaire] = useState();
    const [messageInfo, setMessageInfo] = useState()
    const [buttonModif, setButtonModif] = useState(false)
    const [idFeedback, setIdFeedback] = useState()


    const envoyer=async()=>{
           const res=await Axios.post('feedBack',{IDTicket,rate:value,commentaire})
           setButtonModif(true)
           setMessageInfo(<MessageInfo >FeedBack est envoyée</MessageInfo>)
           setTimeout(()=>{setMessageInfo()},4000);             
        }
    
    const modifier=async()=>{
            const res=await Axios.patch('feedBack/'+idFeedback,{rate:value,commentaire})
            console.log(res)
            setMessageInfo(<MessageInfo >FeedBack est modifiée</MessageInfo>)
            setTimeout(()=>{setMessageInfo()},4000);             
    }
    const getFeedBack=async()=>{
           const res=await Axios.get('feedBack/getFeedBackTicket/'+IDTicket);
           if(res.data.data!==null){
             setButtonModif(true)
             setIdFeedback(res.data.data._id)
             setCommentaire(res.data.data.commentaire)
             setValue(res.data.data.rate)  
           }
    }   
    useEffect(() => {
        getFeedBack()   
       }, [])    
     
    
    const labels = {
        0:'',
        1: 'Mauvais',
        2: 'Normal',
        3: 'Bien',
        4: 'Très bien ',
        5: 'Excellent ',
      };
    return (
        <div>
            <div className="labelText">
                    Niveau de satisfaction : 
            </div><br/>
            <div align='center' style={{display:'flex',alignItems:'center' ,marginLeft:'10%',marginBottom:'2%'}}>            
                <Rating value={value} size='large' 
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                setHover(newHover);
                }}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <h6>{labels[hover !== -1 ? hover : value]}</h6>
            </div>
            <div className="labelText">
                    Ajouter un commentaire : 
            </div><br/>
            <TextField fullWidth
                    onChange={(event)=>{
                        setCommentaire(event.target.value)
                    }}
                    multiline
                    rows={3}
                    placeholder="commentaire ... ."
                    value={commentaire}
                    variant="outlined"
                /><br/><br/>
                <Row>
                    <Col sm={8}>
                        {messageInfo}
                    </Col>
                    <Col>
                        <Button
                                    variant="contained"
                                    style={!buttonModif?{backgroundColor:'rgb(0, 153, 204)',color:"white",position:'absolute' ,right:'10px'}:{backgroundColor:'green',color:"white",position:'absolute' ,right:'10px'}}
                                    onClick={buttonModif?modifier:envoyer}
                                    endIcon={<Icon>send</Icon>}
                                    disabled={messageInfo}
                                    size='small'
                                >
                                   {buttonModif?'Mofifier':'Envoyer'} 
                        </Button> 
                    </Col>
                </Row>
                   
    </div>
    
  );

}

export default FeedBody
