import React, { useEffect, useState } from 'react';
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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    const [messageInfo, setMessageInfo] = useState(<div></div>);
    const [idCl,setIdCl]=useState("");
    const [showLabelMp,setShowLabelMp]=useState(true);

    let history = useHistory();
    
    const classes = useStyles();
    const getClient=async()=>{
     const res =await Axios.get(`client/${history.location.state.idClient}`)
     setRaisonSociale(res.data.data.raisonSociale)
     setAdresse(res.data.data.adresse)
     setTel(res.data.data.tel)
     setFax(res.data.data.fax)
     setEmail(res.data.data.email)
     setNRegistreCommerce(res.data.data.nRegistreCommerce)
     setCodeTVA(res.data.data.codeTVA)
     setLogin(res.data.data.login)
     setIdCl(res.data.data._id)
    }
    useEffect(() => {
      getClient()
    }, []);

    const  afficherErreur=()=>{
      setErreur(true);
      setTimeout(()=>{setErreur(false)},4000);
    }
    const envoyer=async(event,r)=>{
      const ob= r==="motdepasse"  
      ?{
        motDePasse
      } 
      : {
        raisonSociale,
        adresse,
        tel,
        fax,
        email,
        nRegistreCommerce,
        codeTVA,
        login
      }
        if((raisonSociale!=="" && adresse!=="" && tel!=="" &&
        email!=="" && nRegistreCommerce!=="" && codeTVA!=="" && 
        login!=="" &&fax!=="" && r!=="motdepasse") ){
        const res=await Axios.patch(`client/${idCl}`,ob )
        setMessageInfo(<MessageInfo >le Client <b> {raisonSociale} </b>à été modifier avec succès </MessageInfo>);
        }else if(motDePasse!=="" && r==="motdepasse"){
        const res=await  Axios.patch(`client/updateMotDePasse/${idCl}`,ob )
        setMessageInfo(<MessageInfo >le mot de passe de  <b> {raisonSociale} </b>à été modifier avec succès </MessageInfo>);
        setMotDePasse("");
        setShowLabelMp(true);
        }else{
          afficherErreur()
        }
        event.preventDefault();
    }
   

  
  const ajoutCon=()=>{
    history.push("/ajouterContrat/"+idCl)
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
      <form id="form">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="raisonSociale"
            name="raisonSociale"
            label="Raison Sociale"
            fullWidth
            value={raisonSociale}
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
            value={adresse}
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
            value={tel}
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
            value={fax}
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
            value={nRegistreCommerce}
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
            value={codeTVA}
            onChange={(event)=>{setCodeTVA(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Adresse email"
            fullWidth
            value={email}
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
            value={login}
            onChange={(event)=>{setLogin(event.target.value)}}
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
            onClick={envoyer}
            >
            Modifier
      </Button>
    
          <Row hidden={showLabelMp}>
            <Col style={{paddingLeft:'30px',paddingTop:'20px'}}>
          <TextField
            id="motDePasse"
            name="motDePasse"
            label="Nouveau mot de passe"
            fullWidth 
            value={motDePasse}
            onChange={(event)=>{setMotDePasse(event.target.value)}}
          />
          </Col>
          </Row>
          <Row hidden={!showLabelMp}>
           <Col>  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={event=>{setShowLabelMp(!showLabelMp);event.preventDefault();}}
            >
              
            Changer mot de passe
          </Button>
          </Col>
          </Row>

          <Row  hidden={showLabelMp}>
          <Col>  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={event=>{setShowLabelMp(!showLabelMp);event.preventDefault();}}
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
            onClick={e=>{envoyer(e,'motdepasse')}}
            >
              
            Enregister 
          </Button>
          </Col>
          </Row>
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

export default ModifierClient;