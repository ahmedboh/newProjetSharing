import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { Alert, AlertTitle } from '@material-ui/lab';
import MessageInfo from '../MessageInfo';
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
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
  
const ModifierMembSociete=()=> {
    const [nom,setNom]=useState("");
    const [prenom,setPrenom]=useState("");
    const [email,setEmail]=useState("");
    const [login,setLogin]=useState("")
    const [motDePasse,setMotDePasse]=useState("");
    const [role,setRole]=useState("");
    const [erreur,setErreur]=useState(false)
    const [messageInfo, setMessageInfo] = useState(<div></div>)
    const [idMS,setIdMS]=useState("");
    const [showLabelMp,setShowLabelMp]=useState(true);
    let history = useHistory();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/v1/membSociete/${history.location.state.idMembSociete}`)
            .then(res => {
              setNom(res.data.data.nom)
              setPrenom(res.data.data.prenom)
              setEmail(res.data.data.email)
              setRole(res.data.data.role)
              setIdMS(res.data.data._id)
        })
    }, []);

    const classes = useStyles();
    const  afficherErreur=()=>{
      setErreur(true);
      setTimeout(()=>{setErreur(false)},4000);
    }
    const envoyer=(event,r)=>{
      const ob= r==="motdepasse"  
      ?{
        motDePasse
      } 
      :{
            nom,
            prenom,
            email,
            login,
            role
        }
        if((nom!=="" && prenom!=="" && email!=="" && login!=="" && role!==""&& r!=='motdepasse')||(motDePasse!==""&&r!=='motdepasse') ){
        Axios.patch(`http://localhost:3001/api/v1/membSociete/${idMS}`,ob ).then( res => {
            setMessageInfo(<MessageInfo>le membre de la société <b> {nom} {prenom} </b>à été modifier avec succes !</MessageInfo> );
            console.log(res)
            if (r==="motdepasse") {
              setMotDePasse("")
              setShowLabelMp(true)
            }
        })
        }else{
          afficherErreur();
        }
        event.preventDefault();
    }
  return (
    <>
      <AppBar position="absolute" xs={12} color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Modifier le membre de la société {nom} {prenom}
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
            id="nom"
            name="nom"
            label="Nom"
            fullWidth
            value={nom}
            onChange={(event)=>{setNom(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="prenom"
            name="prenom"
            label="Prénom"
            fullWidth
            value={prenom}
            onChange={(event)=>{setPrenom(event.target.value)}}
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
        <Grid item xs={12}>
            <FormLabel component="legend">Rôle</FormLabel>
            <RadioGroup aria-label="gender" name="Rôle" value={role} onChange={(event)=>{setRole(event.target.value)}}>
                <FormControlLabel value="Ad" control={<Radio />} label="Administrateur" />
                <FormControlLabel value="Rc" control={<Radio />} label="Responsable de création des fiches clients" />
                <FormControlLabel value="Ri" control={<Radio />} label="Responsable affectation des demandes interventions" />
                <FormControlLabel value="In" control={<Radio />} label="Simple intervenant" />
            </RadioGroup>
        </Grid>
      </Grid >
      <br/>
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
      <Grid item xs={12}>
        {messageInfo}
      </Grid> 
      </form>  
      </Paper>
      </main>
    </>
  );
}

export default ModifierMembSociete;