import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInMembre=()=> {
  const classes = useStyles();
  const [idUser,setIdUser]=useState("")
  const [tokenUser,setTokenUser]=useState("")
  const [login,setLogin]=useState("")
  const [motDePasse,setMotDePasse]=useState("")
  const [loginErreur,setLoginErreur]=useState(false)
  const [motDePasseErreur,setMotDePasseErreur]=useState(false)
  let history = useHistory();
  const envoyer=(event)=>{
    const ob={
        login,
        motDePasse
    }
    if(login!==""){
        if(motDePasse!==""){
              Axios.post('http://localhost:3001/api/v1/auth/loginClient',ob )
              .then(res => {
                console.log(res.data);
                setIdUser(res.data.client);
                setTokenUser(res.data.token);
                localStorage.setItem('idClient', res.data.client);

                history.push("/appClient/de")
              

              })
              .catch(res=>{
                console.log(res);
              })
        }else{
            setMotDePasseErreur(true)
        }
    }else{
      setLoginErreur(true)  
    } 
    event.preventDefault();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Je me connecte
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="login"
            autoFocus
            onChange={(event)=>{
                setLogin(event.target.value);setLoginErreur(false)
            }}
            error={loginErreur}
          />
          <Alert severity="error" hidden={!loginErreur} >
            <AlertTitle style={{fontSize:"14px"}}>S'il vous plait tapez votre login</AlertTitle>
          </Alert>
          <TextField
            variant="outlined"
            margin="normal"
            
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event)=>{
                setMotDePasse(event.target.value);setMotDePasseErreur(false)
            }}
            error={motDePasseErreur}
            />
            <Alert severity="error" hidden={!motDePasseErreur} >
                <AlertTitle style={{fontSize:"14px"}}>S'il vous plait tapez votre mot de passe</AlertTitle>
            </Alert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={envoyer}
          >
            Connecter
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Mot de passe oublié?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}

export default SignInMembre
