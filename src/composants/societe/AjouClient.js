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
import { Alert, AlertTitle } from '@material-ui/lab';
import MessageInfo from '../MessageInfo';
import { useHistory } from "react-router-dom";

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
    const [raisonSociale,setRaisonSociale]=useState("");
    const [adresse,setAdresse]=useState("");
    const [tel,setTel]=useState("");
    const [fax,setFax]=useState("");
    const [email,setEmail]=useState("");
    const [nRegistreCommerce,setNRegistreCommerce]=useState("");
    const [codeTVA,setCodeTVA]=useState("");
    const [login,setLogin]=useState("");
    const [motDePasse,setMotDePasse]=useState("");
    const [erreur,setErreur]=useState(false);
    const [ajoutAutre,setAjoutAutre]=useState(true);
    const [messageInfo, setMessageInfo] = useState(<div></div>);
    const [idCl,setIdCl]=useState("");

    
    const classes = useStyles();
    
    const  afficherErreur=()=>{
      setErreur(true);
      setTimeout(()=>{setErreur(false)},4000);
    }

    const envoyer=(event)=>{
      const ob={
          raisonSociale,
          adresse,
          tel,
          fax,
          email,
          nRegistreCommerce,
          codeTVA,
          login,
          motDePasse
      }
      const ob1={
        to:email,
        subject:"Compte Sharing",
        text:`Bonjour,\nFélicitation, votre compte Sharing a été créé. Voici les paramètres :\nEmail : ${email}\nMot de passe : ${motDePasse}\nCe compte Sharing vous permettra de vous déposer une demande d'intervention sur http://localhost:3000/ `
      }
      if(raisonSociale!=="" && adresse!=="" && tel!=="" &&
      email!=="" && nRegistreCommerce!=="" && codeTVA!=="" && 
      login!=="" && motDePasse!==""&&fax!=="" ){
      Axios.post('http://localhost:3001/api/v1/auth/signupClient',ob ).then( res => {
          setMessageInfo(<MessageInfo >le nouveau membre de la société <b> {raisonSociale} </b>à ajouter avec succès </MessageInfo>);
          setAjoutAutre(false)
          setIdCl(res.data.client)
          console.log(res)
          console.log(ob1);
          Axios.post('http://localhost:3001/api/v1/mailing',ob1 ).then( res => {
            console.log(res)
          })
      })
      }else{
        afficherErreur()

      }
      event.preventDefault();
  }

   
  const ajouterAutre=()=>{
          document.getElementById("form").reset();
          setAjoutAutre(true)
          setMessageInfo(<div></div>);

          
  }  
  let history = useHistory();
  
  const ajoutCon=()=>{
    history.push("/ajouterContrat/"+idCl+"/"+raisonSociale,{page:'/AjouterClient'})
  }
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
      <form id="form">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="raisonSociale"
            name="raisonSociale"
            label="Raison Sociale"
            fullWidth
            onChange={(event)=>{setRaisonSociale(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="adresse"
            name="adresse"
            label="Adresse"
            fullWidth
            onChange={(event)=>{setAdresse(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tel"
            name="tel"
            label="Tél"
            type="tel"
            fullWidth
            onChange={(event)=>{setTel(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fax"
            name="fax"
            label="Fax"
            type="tel"
            fullWidth
            onChange={(event)=>{setFax(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nRegistreCommerce"
            name="nRegistreCommerce"
            label="N° Registre du commerce"
            type="number"
            fullWidth
            onChange={(event)=>{setNRegistreCommerce(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="codeTVA"
            name="codeTVA"
            label="Code TVA"
            fullWidth
            onChange={(event)=>{setCodeTVA(event.target.value)}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Adresse email"
            fullWidth
            onChange={(event)=>{setEmail(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="login"
            name="login"
            label="Login"
            fullWidth
            onChange={(event)=>{setLogin(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="motDePasse"
            name="motDePasse"
            label="Mot de passe"
            fullWidth
            onChange={(event)=>{setMotDePasse(event.target.value)}}
          />
        </Grid>
      
      </Grid><br/>
      <Alert severity="error" hidden={!erreur} >
        <AlertTitle style={{fontSize:"14px",paddingLeft:"10vw"}}>Veuillez remplir tous les champs</AlertTitle>
      </Alert>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={ajoutCon}
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
            onClick={envoyer}
            >
            Ajouter
      </Button>
      :
      <Button
            type="submit"
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
      </form>  
      </Paper>
      </main>
    </>
  );
}

export default AjouClient;