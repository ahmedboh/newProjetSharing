import React, { useState,useEffect } from 'react';
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

const SignInClient=(props)=> {
  const{fnc,fn,type}=props
  const classes = useStyles();
  const [login,setLogin]=useState("")
  const [motDePasse,setMotDePasse]=useState("")
  const [loginErreur,setLoginErreur]=useState("")
  const [motDePasseErreur,setMotDePasseErreur]=useState("")

  let history = useHistory();
  
  const envoyer = async (event)=>{
    event.preventDefault();
    const ob={
        login,
        motDePasse
    }
    if(login!==""){
        if(motDePasse!==""){
              
              const res= await Axios.post(type==='c'?'auth/loginClient':'auth/loginMembS',ob )
              if(res.status===200){
              localStorage.setItem(type==='c'?'connectCl':"connectMb",true)
              localStorage.setItem('token',res.data.token)
              history.push(type==='c'?"/deposer":"/accueil")
              fnc(false)
              fn(true)  
              }else{
                res.data.errors.login
                ?setLoginErreur(res.data.errors.login)
                :setMotDePasseErreur(res.data.errors.motDePasse) 
              }
        }else{
            setMotDePasseErreur("S'il vous plait tapez votre mot de passe")
        }
    }else{
      setLoginErreur("S'il vous plait tapez votre login")  
    } 
    
  }

  useEffect(() => {
    if(type==='c'){
      localStorage.getItem('connectMb')!==null&& localStorage.clear();
      localStorage.getItem('connectCl')!==null&& history.push('/deposer');
    }else{
      localStorage.getItem('connectCl')!==null&& localStorage.clear();
      localStorage.getItem('connectMb')!==null&& history.push('/accueil');
    }
  }, [])
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
                setLogin(event.target.value);setLoginErreur('')
            }}
            error={loginErreur!==""}
          />
          <Alert severity="error" hidden={!loginErreur} >
            <AlertTitle style={{fontSize:"14px"}}>{loginErreur}</AlertTitle>
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
                setMotDePasse(event.target.value);setMotDePasseErreur('')
            }}
            error={motDePasseErreur!==""}
            />
            <Alert severity="error" hidden={!motDePasseErreur} >
                <AlertTitle style={{fontSize:"14px"}}>{motDePasseErreur} </AlertTitle>
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

export default SignInClient
