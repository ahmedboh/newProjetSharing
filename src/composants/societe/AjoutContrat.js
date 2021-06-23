import { useParams } from 'react-router';
import TextField from '@material-ui/core/TextField';
import  'bootstrap/dist/css/bootstrap.min.css';
import Forma from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import MessageInfo from '../MessageInfo'
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from "react-router-dom";
import { Formik, Form} from 'formik';
import * as Yup from 'yup';



const AjoutContrat=()=>{
    const{idClient,raisonSocial}=useParams()
    const [type,setType]=useState("Garantie")
    const [nbrContrat,setNbrContrat]=useState(0)
    const [messageInfo, setMessageInfo] = useState();
    let history = useHistory();
     
    const validate = Yup.object({
        visitesMainPreventive: Yup.number()
          .positive( ' le nombre des visites préventives doit être positive ')
          .required('Le nombre des visites préventives est obligatoire'),
        visitesMainCurative: Yup.number()
          .positive( ' le nombre des visites curative doit être positive ')
          .required('Le nombre des visites curative est obligatoire'),   
        prixInterSupp: Yup.number()
          .positive( ' le prix unitaire  doit être positive ')
          .required('Le prix unitaire est obligatoire'), 
        contact: Yup.string()
          .required('Le contact est obligatoire')
          .matches(/^[0-9]+$/, "Le contact  doit être uniquement des chiffres")
          .test('len', 'Le contact  être exactement de  8 chiffres', val => val&&val.length === 8),  
        telContact: Yup.string()
          .required('Tel est obligatoire')
          .matches(/^[0-9]+$/, "Tel  doit être uniquement des chiffres")
          .test('len', 'Tel  être exactement de  8 chiffres', val => val&&val.length === 8),  
        emailContact: Yup.string()
          .email('Email est invalide')
          .required('Email est obligatoire'),
       
      })

      const getContrats = async ()=>{
        const res =await Axios.get(`contrat/getContratsClient/${idClient}`)
        setNbrContrat(res.data.data.length)  
       }

    useEffect(() => {
        getContrats();
    }, [idClient])

    const ajouter=async(event,form)=>{
        console.log(form)
        const ob={
            IDclient:idClient,
            type,
            ...form.values
        }
        console.log(ob)
        if(form.isValid ){
        const res= await Axios.post('contrat',ob )
        setMessageInfo(<MessageInfo >le nouveau contrat à ajouter avec succès </MessageInfo>);
        setNbrContrat(nbrContrat+1)
        setTimeout(()=>{setMessageInfo();document.getElementById('form').reset()},4000);


        }


    }
   
    
    
    return(
        <div className='container' style={{marginBottom:'20px',padding:'20px'}}> 
          <h1 align='center'>Ajout des contrats</h1>
          <h2 >{raisonSocial}   <p style={{float:'right'}} >{nbrContrat} :Contrat(s)</p> </h2><hr/><br/>
          <Formik
            initialValues={{
                visitesMainPreventive: '',
                visitesMainCurative: '',
                prixInterSupp: '',
                contact:'',
                telContact:'',
                emailContact:''
            }}
            validationSchema={validate} 
            >
            {formik => ( 
            <Form id="form">

            <Row style={{marginLeft:'15%'}}> 
            <Col sm={8}>
                <Forma.Group as={Row}  controlId="formHorizontalEmail">
                    <Forma.Label column >
                    Type de contrat :
                    </Forma.Label>
                     <Col sm={6}>
                    
                     <Forma.Check
                            type="radio"
                            label="Garantie "
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            
                            value="Garantie"
                            onChange={(event)=>{
                                setType(event.target.value);setMessageInfo(<div></div>)
                            }}
                            checked={type==='Garantie'}
                    />
                    
                    <Forma.Check
                        type="radio"
                        label="Contrat de maintenance"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        value="Contrat de maintenance"
                        onChange={(event)=>{
                            setType(event.target.value);setMessageInfo(<div></div>)
                         }}
                        checked={type==='Contrat de maintenance'}
                        />

                    </Col>
                </Forma.Group>
                <Forma.Group as={Row} controlId="formHorizontalContrat">
                    <Forma.Label column  >
                        Nombre de visites de maintenance préventive par an
                    </Forma.Label>
                    
                    <Col >
                        <TextField  id="visitesMainPreventive" name="visitesMainPreventive"  label="Nombre viste par anneé"
                        type="number"
                        onBlur={formik.handleBlur}
                        fullWidth
                        error={(formik.touched.visitesMainPreventive&&formik.errors.visitesMainPreventive)}
                        helperText={formik.touched.visitesMainPreventive&&formik.errors.visitesMainPreventive} 
                        onChange={formik.handleChange}
                        value={formik.values.visitesMainPreventive}
                         />
                    </Col>
                </Forma.Group>

                <Forma.Group as={Row} controlId="formHorizontaNature">
                    <Forma.Label column >
                        Nombre de visites de maintenance curative par an
                    </Forma.Label>
                    <Col >
                        <TextField  id="visitesMainCurative" name="visitesMainCurative"  label="Nombre viste par anneé"
                            type="number" 
                            fullWidth
                            onBlur={formik.handleBlur}
                            error={(formik.touched.visitesMainCurative&&formik.errors.visitesMainCurative)}
                            helperText={formik.touched.visitesMainCurative&&formik.errors.visitesMainCurative} 
                            onChange={formik.handleChange}
                            value={formik.values.visitesMainCurative}
                             />
                    </Col>
                </Forma.Group>
                
                <Forma.Group as={Row} controlId="formHorizontalContrat">
                    <Forma.Label column >
                         Prix unitaire des interventions supplémentaires
                    </Forma.Label>
                    
                    <Col >
                    <TextField  id="prixInterSupp" name="prixInterSupp"  label="Prix"
                            type="number" 
                            fullWidth
                            onBlur={formik.handleBlur}
                            error={(formik.touched.prixInterSupp&&formik.errors.prixInterSupp)}
                            helperText={formik.touched.prixInterSupp&&formik.errors.prixInterSupp} 
                            onChange={formik.handleChange}
                            value={formik.values.prixInterSupp}
                            />
                    </Col>
                </Forma.Group>

                <Forma.Group as={Row} controlId="formHorizontaNature">
                    <Forma.Label column >
                         Contact
                    </Forma.Label>
                    <Col >
                         <TextField id="contact" label="Contact" type="tel"
                            onBlur={formik.handleBlur}
                            error={(formik.touched.contact&&formik.errors.contact)}
                            helperText={formik.touched.contact&&formik.errors.contact} 
                            onChange={formik.handleChange}
                            value={formik.values.contact}
                         />
                    </Col>
                </Forma.Group>


                <Forma.Group as={Row} controlId="formHorizontaNature">
                    <Forma.Label column >
                        N° téléphone contact
                    </Forma.Label>
                    <Col >
                       <TextField id="telContact" label="Tel" type="tel"  
                            onBlur={formik.handleBlur}
                            error={(formik.touched.telContact&&formik.errors.telContact)}
                            helperText={formik.touched.telContact&&formik.errors.telContact} 
                            onChange={formik.handleChange}
                            value={formik.values.telContact}
                       />
                    </Col>
                </Forma.Group>

                <Forma.Group as={Row} controlId="formHorizontaNature">
                    <Forma.Label column >
                         Adresse email contact
                    </Forma.Label>
                    <Col >
                    <TextField
                                id="emailContact"
                                name="emailContact"
                                label="Adresse email"
                                type="email"
                                fullWidth
                                onBlur={formik.handleBlur}
                                error={(formik.touched.emailContact&&formik.errors.emailContact)}
                                helperText={formik.touched.emailContact&&formik.errors.emailContact} 
                                onChange={formik.handleChange}
                                value={formik.values.emailContact}
                                    
                            />
                    </Col>
                </Forma.Group>
                </Col>
                    
                <br/>
                <Col sm={8}>
                    <Button
                       onClick={()=>history.push(history.location.state.page,{idClient:history.location.state.idClient,raisonSociale:raisonSocial})}
                        variant="contained"
                        color="secondary"
                    >Terminer
                    </Button>
                </Col> 
                <Col >
                    <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                style={{backgroundColor:'rgb(0, 153, 204)'}}
                                onClick={(event)=>{ajouter(event,formik)}}
                                endIcon={<SaveIcon />}
                            >
                                Enregistrer
                    </Button> 

                    {/* <Button
                            hidden={!messageInfo}
                            type="reset"
                            fullWidth
                            variant="contained"
                            className={classes.button}
                            onClick={ajouterAutre}
                            >
                            Ajouter autre membre
                    </Button> */}
                </Col>
                {messageInfo}
             </Row>
                    
            </Form>
             )}
            </Formik> 
          
          </div>

    )
}

export default AjoutContrat;