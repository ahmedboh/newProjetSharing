import { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MessageInfo from '../MessageInfo';
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        zIndex:0
      },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    }, 
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

  

const ModifierClient=()=> {
    var history = useHistory();
    const [raisonSociale,setRaisonSociale]=useState(history.location.state.client.raisonSociale);
    const [messageInfo, setMessageInfo] = useState();
    const [showLabelMp,setShowLabelMp]=useState(true);
    
     
    const validate = Yup.object({
      raisonSociale: Yup.string()
        .min(3, 'La raison sociale doit être au moins de 3 caractères')
        .required('La raison sociale est obligatoire'),
      adresse: Yup.string()
        .min(4, "L'adresse doit être au moins de 4 caractères")
        .required("L'adresse est obligatoire"),
      tel: Yup.string()
        .required('Tel est obligatoire')
        .matches(/^[0-9]+$/, "Tel doit être uniquement des chiffres")
        .test('len', 'Tel doit être exactement de  8 chiffres', val => val&&val.length === 8),
      fax: Yup.string()
        .matches(/^[0-9]+$/, "Fax doit être uniquement des chiffres")  
        .required('Fax est obligatoire')
        .test('len', 'Fax doit être exactement de  8 chiffres', val => val&&val.length === 8),
      nRegistreCommerce: Yup.string()
        .min(4, "N° Registre du commerce doit être au moins de 4 caractères")
        .required('N° Registre du commerce est obligatoire'),
      codeTVA: Yup.string()
        .min(4, "L'adresse doit être au moins de 4 caractères")
        .required('Code TVA est obligatoire'),        
      email: Yup.string()
        .email('Email est invalide')
        .required('Email est obligatoire'),
      login: Yup.string()
        .min(4, "Login doit être au moins de 4 caractères")
        .required('Login  est obligatoire')  
    })
  
  const validate2= Yup.object({
    motDePasse: Yup.string()
        .matches(/^.*[0-9].*$/,"Bessoin d'un chiffre")
        .min(8, 'Le mot de passe doit être au moins de 8 caractères')    
        .required('motDePasse est obligatoire')
  })

    const classes = useStyles();

    const envoyer=async(event,validation,values,r)=>{
      const ob= r==="motdepasse"  
      ?values
      : {
        raisonSociale:values.raisonSociale,
        adresse:values.adresse,
        tel:values.tel,
        fax:values.fax,
        email:values.email,
        nRegistreCommerce:values.nRegistreCommerce,
        codeTVA:values.codeTVA,
        login:values.login
      }
       if(validation){
        if( r!=="motdepasse") {
        const res=await Axios.patch(`client/${history.location.state.client._id}`,ob )
        setMessageInfo(<MessageInfo >le Client <b> {raisonSociale} </b>à été modifier avec succès </MessageInfo>);
        history.replace(history.location.pathname,{client:values})
        }else {
        const res=await  Axios.patch(`client/updateMotDePasse/${history.location.state.client._id}`,ob )
        setMessageInfo(<MessageInfo >le mot de passe de  <b> {raisonSociale} </b>à été modifier avec succès </MessageInfo>);
        setShowLabelMp(true);
      }
      }
    }
   
  return (
    <>
      <AppBar position="absolute" xs={12} color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Modifier le client {raisonSociale}
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
      <Paper className={classes.paper}>
      <Formik
      initialValues={{...history.location.state.client}}
      validationSchema={validate}
    
      >
      {formik => (
      <Form >   
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="raisonSociale"
            name="raisonSociale"
            label="Raison Sociale"
            onBlur={formik.handleBlur}
            fullWidth
            error={(formik.touched.raisonSociale&&formik.errors.raisonSociale)}
            helperText={formik.touched.raisonSociale&&formik.errors.raisonSociale} 
            onChange={(event)=>{formik.handleChange(event);setRaisonSociale(event.target.value)}}
            value={formik.values.raisonSociale}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="adresse"
            name="adresse"
            label="Adresse"
            fullWidth
            onBlur={formik.handleBlur}
            value={formik.values.adresse}
            onChange={formik.handleChange}
            error={(formik.touched.adresse&&formik.errors.adresse)}
            helperText={formik.touched.adresse&&formik.errors.adresse} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="tel"
            name="tel"
            label="Tél"
            type="tel"
            min={0}
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.tel}
            error={(formik.touched.tel&&formik.errors.tel)}
            helperText={formik.touched.tel&&formik.errors.tel} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fax"
            name="fax"
            label="Fax"
            type="tel"
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.fax}
            error={(formik.touched.fax&&formik.errors.fax)}
            helperText={formik.touched.fax&&formik.errors.fax} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nRegistreCommerce"
            name="nRegistreCommerce"
            label="N° Registre du commerce"
            type="number"
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={(formik.touched.nRegistreCommerce&&formik.errors.nRegistreCommerce)}
            helperText={formik.touched.nRegistreCommerce&&formik.errors.nRegistreCommerce} 
            value={formik.values.nRegistreCommerce}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="codeTVA"
            name="codeTVA"
            label="Code TVA"
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={(formik.touched.codeTVA&&formik.errors.codeTVA)}
            helperText={formik.touched.codeTVA&&formik.errors.codeTVA} 
            value={formik.values.codeTVA}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Adresse email"
            fullWidth
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={(formik.touched.email&&formik.errors.email)}
            helperText={formik.touched.email&&formik.errors.email} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="login"
            name="login"
            label="Login"
            fullWidth
            onBlur={formik.handleBlur}
            onChange={(event)=>{formik.handleChange(event);}}
            value={formik.values.login}
            error={formik.touched.login&&formik.errors.login}
            helperText={formik.touched.login&&formik.errors.login } 
            />
        </Grid>
      </Grid><br/>
      <Grid item xs={12}>
        {messageInfo}
      </Grid>  
      <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={(event)=>envoyer(event,formik.isValid,formik.values)}
            >
            Modifier
      </Button>
      </Form> 
      )}
     </Formik>
    {/* ---------------------------------------------------------------------------------------------------------- */}
     <Formik
      initialValues={{motDePasse:''}}
      validationSchema={validate2}
    
      >
      {formik => (
      <Form >   
          <Row hidden={showLabelMp}>
            <Col style={{paddingLeft:'30px',paddingTop:'20px'}}>
              <TextField
              id="motDePasse"
              name="motDePasse"
              label="Mot de passe"
              fullWidth
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.motDePasse}
              error={(formik.touched.motDePasse&&formik.errors.motDePasse)}
              helperText={formik.touched.motDePasse&&formik.errors.motDePasse} 
              />        
            </Col>
          </Row>
          <Row hidden={!showLabelMp}>
           <Col>  
          <Button
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={event=>{setShowLabelMp(!showLabelMp)}}
            >
              
            Changer mot de passe
          </Button>
          </Col>
          </Row>

          <Row  hidden={showLabelMp}>
          <Col>  
          <Button
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={event=>{setShowLabelMp(!showLabelMp);}}
            >   
            Annuler
          </Button>
          </Col>
          <Col>  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={e=>{envoyer(e,formik.isValid,formik.values,'motdepasse')}}
            >
              
            Enregister 
          </Button>
          </Col>
          </Row>
      <br/>
     
      </Form> 
      )}
     </Formik>
      </Paper>
      </main>
    </>
  );
}

export default ModifierClient;