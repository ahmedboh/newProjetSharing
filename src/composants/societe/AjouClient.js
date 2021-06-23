import React, { useState } from 'react';
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

  

const AjouClient=()=> {
    const [ajoutAutre,setAjoutAutre]=useState(true);
    const [messageInfo, setMessageInfo] = useState();
    const [idCl,setIdCl]=useState("");
    const [loginErreur,setLoginErreur]=useState("");


    
    const classes = useStyles();
    


    const envoyer=async(event,validate,values)=>{
      console.log(event,validate,values)
     if(validate){
      const ob1={
        to:values.email,
        subject:"Compte Sharing",
        text:`Bonjour,\nFélicitation, votre compte Sharing a été créé. Voici les paramètres :\nEmail : ${values.email}\nMot de passe : ${values.motDePasse}\nCe compte Sharing vous permettra de vous déposer une demande d'intervention sur http://localhost:3000/ `
      }
  
      const res= await Axios.post('auth/signupClient',values )  
      if(res.status===200){
        setMessageInfo(<MessageInfo >le nouveau membre de la société <b> {values.raisonSociale} </b>à ajouter avec succès </MessageInfo>);
        setAjoutAutre(false)
        setIdCl(res.data.client)
        const res2=await Axios.post('mailing',ob1 )
      }else{
        setLoginErreur(res.data.errors.login)
      }
    }
   
  }

   
  const ajouterAutre=()=>{
          setAjoutAutre(true)
          setMessageInfo();        
  }  

  let history = useHistory();
  
  const ajoutCon=(raisonSociale)=>{
    history.push("/ajouterContrat/"+idCl+"/"+raisonSociale,{page:'/AjouterClient'})
  }

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
      .required('Login  est obligatoire'), 
    motDePasse: Yup.string()
      .matches(/^.*[0-9].*$/,"Bessoin d'un chiffre")
      .min(8, 'Le mot de passe doit être au moins de 8 caractères')    
      .required('motDePasse est obligatoire'),
   
  })

  return (
    <>
      <AppBar position="absolute" xs={12} color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Ajouter un nouveau client
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
      <Paper className={classes.paper}>
      <Formik
      initialValues={{
        raisonSociale: '',
        adresse: '',
        tel:'',
        fax:'',
        nRegistreCommerce:'',
        codeTVA:'',
        email: '',
        login:'',
        motDePasse:''
      }}
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
            onChange={formik.handleChange}
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
            onChange={(event)=>{formik.handleChange(event);setLoginErreur("")}}
            value={formik.values.login}
            error={((formik.touched.login&&formik.errors.login)||loginErreur!=="")}
            helperText={loginErreur===""?formik.touched.login&&formik.errors.login:loginErreur } 
            />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      
      </Grid><br/>
      <Button
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={()=>{ajoutCon(formik.values.raisonSociale)}}
            hidden={ajoutAutre}
            >
            Ajouter des contrats
      </Button>
      {ajoutAutre?
      <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
           onClick={(event)=>envoyer(event,formik.isValid,formik.values)}
          
            >
            Ajouter
      </Button>
      :
      <Button
            type="reset"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={ajouterAutre}
            >
            Ajouter autre client
      </Button>
      }
      <br/>
      <Grid item xs={12}>
        {messageInfo}
      </Grid>  
      </Form> 
       )}
      </Formik>
      </Paper>
      </main>
    </>
  );
}

export default AjouClient;