import React, { useState } from 'react';
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
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { Alert, AlertTitle } from '@material-ui/lab';
import MessageInfo from '../MessageInfo';
import Switch from '@material-ui/core/Switch';

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

  
const AjouMembSociete=()=> {
    const [nom,setNom]=useState("");
    const [prenom,setPrenom]=useState("");
    const [email,setEmail]=useState("");
    const [login,setLogin]=useState("")
    const [motDePasse,setMotDePasse]=useState("");
    const [role,setRole]=useState([]);
    const [erreur,setErreur]=useState(false)
    const [messageInfo, setMessageInfo] = useState(<div></div>)
    const [stateSwitch,setStateSwitch]=useState({Ad:false,Rc:false,Ri:false,In:false,Ins:false})

    
    const classes = useStyles();
    const  afficherErreur=()=>{
      setErreur(true);
      setTimeout(()=>{setErreur(false);},4000);
    }
    
    const ajouterRole=async(event)=>{
       setStateSwitch({ ...stateSwitch, [event.target.value]: event.target.checked });
       let tabR=await role
       tabR.indexOf(event.target.value)===-1
       ?tabR.push(event.target.value)
       :tabR.splice(tabR.indexOf(event.target.value),1)
      setRole(tabR)
      tabR=[]
    }
    
    const envoyer=async(event)=>{
      event.preventDefault()
        const ob={
            nom,
            prenom,
            email,
            login,
            motDePasse,
            role
        }
        console.log(ob)
        if(nom!=="" && prenom!=="" && email!=="" && login!=="" && motDePasse!=="" && role.length>0 ){
          const res=await Axios.post('auth/signupMembS',ob )
          setMessageInfo(<MessageInfo>le nouveau membre de la société <b> {nom} {prenom} </b>à ajouter avec succes !</MessageInfo> )
          document.getElementById("form").reset()
          setStateSwitch({Ad:false,Rc:false,Ri:false,In:false,Ins:false})
          
        }else{
          afficherErreur();
        }
    }
  return (
    <>
      <AppBar position="absolute" xs={12} color="default" className={classes.appBar}>
        <Toolbar >
          <Typography variant="h6" color="inherit" noWrap>
            Ajouter un nouveau membre de la société
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
        <Grid item xs={12}>
            <FormLabel component="legend">Rôle</FormLabel>
            <FormGroup onChange={ajouterRole}  >
                <FormControlLabel value="Ad"  control={<Switch name='role' color="primary" checked={stateSwitch.Ad}    />} label="Administrateur" />
                <FormControlLabel value="Rc" control={<Switch name='role' color="primary"    checked={stateSwitch.Rc}   />} label="Responsable de création des fiches clients" />
                <FormControlLabel value="Ri" control={<Switch  name='role' color="primary" checked={stateSwitch.Ri}  />} label="Responsable affectation des demandes interventions" />
                <FormControlLabel value="Ins" control={<Switch name='role' color="primary"   checked={stateSwitch.Ins}    />} label="Intervenant Supérieur" />
                <FormControlLabel value="In" control={<Switch name='role' color="primary"  checked={stateSwitch.In}   />} label="Intervenant Simple" />
            </FormGroup>
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
            Ajouter
      </Button>
      <Grid item xs={12}>
        {messageInfo}
      </Grid> 
      </form>  
      </Paper>
      </main>
    </>
  );
}

export default AjouMembSociete;