import Interv from "./Interv"
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
import { useHistory } from "react-router-dom";
import Comment from '../chatApp/Comment'



const Affecter=(props)=>{
        const{user}=props
        let history = useHistory();
        const [interv,setInterv]=useState(history.location.state.interv)
        const [intervenants,setIntervenants]=useState([])
        const [intervenant,setIntervenant]=useState('')
        const [periode,setPeriode]=useState(24)
        const [etatActuel,setEtatActuel]=useState('')
        const [intervenantLabel,setIntervenantLabel]=useState('')
        const [client,setClient]=useState()
        const [priorite,setPriorite]=useState(24)
        const [contrat,setContrat]=useState(-1)
        const [contratS,setContratS]=useState()
        const [listeContrats,setListeContrats]=useState([]) 
        
        const intialiserDonnees=async ()=>{
          const res =await  Axios.get(`membSociete/getMembSocietesRole/${"In"}`)
          setIntervenants(res.data.data)
          const res2 =await  Axios.get("client/"+interv.IDclient)
          setClient(res2.data.data)  
          const res3=await  Axios.get(`affectation/getAffectationsTicket/${interv._id}`)
          if(res3.data.data){
                const res4 = await Axios.get(`membSociete/${res3.data.data.IDintervenant}`)       
                setIntervenantLabel(res4.data.data.nom+" "+res4.data.data.prenom)
                setIntervenant(res3.data.data.IDintervenant)
                setPeriode(res3.data.data.dureeTraitement) 
                setPriorite(interv.priorite) 
          }
        } 
        
        const misAjourTicket=async(object)=>{
            const res = await Axios.patch(`ticket/${interv._id}`,object )
            setInterv(res.data.data);
        }
        const getlisteContrats=async(client)=>{
            const res = await Axios.get(`http://localhost:3001/api/v1/contrat/getContratsClient/${client}`)
            setListeContrats(res.data.data); 
        }

        useEffect(() => {
            console.log(interv)
            setEtatActuel(interv.etat)
            setPriorite(interv.priorite)
            interv.contrat!==''&&setContrat(interv.contrat)
            interv.contrat!==undefined&&setContrat(interv.contrat)
            getlisteContrats(interv.IDclient)
            intialiserDonnees()
        
         },[user])

         const options=listeContrats.length>0 && listeContrats.map((contrat,index)=>{return <option value={contrat._id} key={contrat._id}>Contrat n°{index+1}</option>});
        
        const Affecter=async(role,action)=>{
           

            const ob={
                IDTicket:interv._id,
                IDMembSociete:user._id,
                IDintervenant:role==='Ri'?intervenant:user._id,
                dateAffectation:new Date().toLocaleDateString(),
                heureAffectation:new Date().toLocaleTimeString(),
                dureeTraitement:periode,
            }
            const ob1={
                to:client.email,
                subject:"Votre ticket est affecté",
                text:`Bonjour,\nVotre ticket déposé le ${interv.dateCreation} à ${interv.heureCreation} est affecter à l'intervenant ${intervenantLabel} avec une durée de traitment ${periode}\nVeuillez consulter votre ticket sur la plateforme SharingTicket: http://localhost:3000/ `
            }
            const ob2=listeContrats.length>0
            ?{
                etat:"En cour",contrat:contrat===-1?'':contrat,priorite
             }
            :{
                etat:"En cour",contratS,priorite
             }
            if((intervenant!==""||role==='In')&&(action==="aff")){
                const res1 = await Axios.post(`affectation`,ob)
                misAjourTicket(ob2);
                setEtatActuel("En cour");
                const res2=await  Axios.post('mailing',ob1 )
            }else if((intervenant!=="")&&(action==="reaff")){
                   const res = await Axios.get(`affectation/getAffectationsTicket/${interv._id}`)
                   const res2 = await Axios.patch(`affectation/${res.data.data._id}`,{annule:true})    
                   const res3 = await Axios.get(`affectation/getAffectationsIntervenantTicket/${interv._id}/${intervenant}`)
                   res3.data.data
                   ?await Axios.patch(`affectation/${res3.data.data._id}`,{dateAffectation:new Date().toLocaleDateString(),heureAffectation:new Date().toLocaleTimeString(),dureeTraitement:periode,annule:false})
                   :await Axios.post(`affectation`,ob) 
                   misAjourTicket(ob2);                          
            }else{
              console.log("error"); 
            } 
        }    
        
        const onCloture=async()=>{
             const res = await Axios.patch(`ticket/${interv._id}`,{etat:"Clôturée",} )
             setEtatActuel("Clôturée")
        }
        const composant=etatActuel==="Clôturée"
        ?intervenantLabel
            ?<MessageInfo >Cette demande a été affectuer a l'intervenant <b> {intervenantLabel}</b>  </MessageInfo>
            :<MessageInfo >Cette demande a été cloturée sans traitment  </MessageInfo>
        :etatActuel==="En attente"
            ?<Button variant="contained"color="primary"style={{backgroundColor:'rgb(0, 153, 204)'}}startIcon={<SaveIcon />}onClick={()=>{Affecter('Ri','aff')}}>Affecter</Button> 
            :<Button variant="contained"color="primary"style={{backgroundColor:'#ffc107'}}startIcon={<SaveIcon />}onClick={()=>{Affecter('Ri','reaff')}}>Reaffecter</Button>          
        
        return (<div className="container" style={{border:'2px rgb(0, 153, 204) solid',borderRadius:'50px',marginTop:'20px',padding:'20px'}}>
                <Row >
                <Col sm={user&&user.role.indexOf('Ri')===-1?12:6} >
                    <h2  className="text-info" style={{textAlign:'center'}}>La Demande D'intervention </h2><br/><br/>
                    <Interv contenu={interv} user={user} contrat={history.location.state.contrat} traiter={false} raisonSociale={history.location.state.raisonSociale}/>
                    <Button variant="contained"color="primary" hidden={etatActuel!=="En attente" ||user.role.indexOf('Ins')===-1 } style={{backgroundColor:'rgb(0, 153, 204)',left:"40%"}} startIcon={<SaveIcon />}endIcon={<SaveIcon />}onClick={()=>{Affecter('In','aff')}}>Prendre en charge</Button> 
                </Col>  
                <Col sm={6} hidden={user&&user.role.indexOf('Ri')===-1}>
                    <h2  className="text-info" style={{textAlign:'left'}}>Zone D'affectation </h2><br/><br/>
                    <Form>
                        <Form.Group as={Row}  controlId="formHorizontalEmail">
                            <Form.Label column sm={5} >
                                l'intervenant :
                            </Form.Label>
                            <Col sm={7}>
                                <Autocomplete
                                id="combo-box-demo"
                                options={intervenants}
                                getOptionLabel={(option) => {return (option.nom+" "+option.prenom)}}
                                disabled={etatActuel==="Clôturée"}
                                size="small"
                                onChange={ (event, values) => {
                                    setIntervenant(values?values._id:'');
                                    setIntervenantLabel(values?values.nom+" "+values.prenom:"")    
                                  }}
                            
                                renderInput={(params) => <TextField {...params}  label={etatActuel==="En attente"?"Intervenant":intervenantLabel} variant="outlined" />}
                        />   </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} controlId="formHorizontaNature">
                            <Form.Label  column sm={5} >
                                Priorite de la demande
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control as="select" value={priorite} disabled={etatActuel==="Clôturée"}  onChange={(event)=>{
                                    setPriorite(event.target.value)
                                }}>
                                    <option>Normal</option>
                                    <option>Urgent</option>
                                    <option>Critique</option>
                                </Form.Control>
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row}  controlId="formHorizontalEmail">
                            <Form.Label column sm={5} >
                                Duree :
                            </Form.Label>
                            <Col sm={3}>
                                    <TextField id="time" type="number" value={periode} disabled={etatActuel==="Clôturée"}
                                        onChange={(event)=>{
                                            setPeriode(event.target.value)
                                        }}
                                         style={{ width: 100 }}
                                    /> 
                            </Col>
                            <Col sm={3}>
                                <Form.Label >Heure(s)</Form.Label>
                            </Col>
                        </Form.Group>    

                        <Form.Group as={Row} controlId="formHorizontaNature">
                            <Form.Label  column sm={5} >
                                contrat 
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control as="select" value={contrat} disabled={etatActuel==="Clôturée"} controlid='contrat' onChange={(event)=>{
                                    setContrat(event.target.value);
                                }}>
                                    <option value={-1}>-------------</option>
                                    {options}
                                </Form.Control>
                            </Col>
                              
                        </Form.Group> 
                        <Form.Group>
                                <TextField fullWidth
                                    id="outlined-multiline-static"
                                    label="suplèment contrat"
                                    onChange={(event)=>{
                                        setContratS(event.target.value);
                                    }}
                                    multiline
                                    rows={2}
                                    placeholder="contrat..."
                                    value={contratS}
                                    variant="outlined"
                                    hidden={listeContrats.length>0}
                                    disabled={etatActuel==="Clôturée"}
                                /> 
                        </Form.Group>               
                        <Form.Group as={Row}   controlId="formHorizontalEmail">
                            <Col >
                                <Form.Label >
                                    {composant}
                                </Form.Label>
                            </Col> 
                            <Col hidden={etatActuel!=="En attente"}>
                                <Button variant="contained"  onClick={onCloture}   color="secondary" >Clôturer</Button>
                            </Col>
                        </Form.Group>

                        
                    </Form>
                    <span hidden={etatActuel==="En attente"||!intervenant} >
                    <Comment name={user.prenom+""+user.nom} room={interv._id} role='Ad'/>
                    </span>
                </Col>
               
                </Row>


            </div>)

}
export default Affecter; 