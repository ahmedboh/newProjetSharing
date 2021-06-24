import { useState } from 'react';
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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageInfo from '../MessageInfo';
import MessageEreur from '../MessageEreur';
import Switch from '@material-ui/core/Switch';
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
        width: 800,
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
    const [role,setRole]=useState([]);
    const [messageInfo, setMessageInfo] = useState()
    const [messageErreur, setMessageErreur] = useState()
    const [stateSwitch,setStateSwitch]=useState({Ad:false,Rc:false,Ri:false,In:false,Ins:false})
    const [loginErreur,setLoginErreur]=useState("");

    const validate = Yup.object({
      nom: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "le nom doit être uniquement des chiffres")
        .min(3, 'Le nom doit être au moins de 3 caractères')
        .required('Le nom est obligatoire'),
      prenom: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "le prenom doit être uniquement des chiffres")
        .min(3, "Le prenom doit être au moins de 3 caractères")
        .required("Le prenom est obligatoire"),     
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
  
    const classes = useStyles();
    const ajouterAutre=()=>{
      setMessageInfo(); 
      setStateSwitch({Ad:false,Rc:false,Ri:false,In:false,Ins:false})
    }  
    
    const ajouterRole=async(event)=>{
      setMessageErreur()
      let tabR=[]
      let obj= { ...stateSwitch, [event.target.value]: event.target.checked }
      if(obj.Ins) obj={...obj,'In':true};
      for (let role in obj) obj[role] && tabR.push(role)
     setStateSwitch(obj);
     setRole(tabR)
    }
    
    const envoyer=async(event,validate,values)=>{
        const ob={... values,role}
        console.log(ob)
        if(validate&&role.length>0  ){
          const res=await Axios.post('auth/signupMembS',ob )
          if(res.status===200){
          setMessageInfo(<MessageInfo>le nouveau membre de la société <b> {ob.nom} {ob.prenom} </b>à ajouter avec succes !</MessageInfo> )
           }else{
            setLoginErreur(res.data.errors.login)
            }
        }else{
          role.length===0&&setMessageErreur(<MessageEreur>le Rôle est obligatoire</MessageEreur>)
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

      <Formik
      initialValues={{
        nom: '',
        prenom: '',
        email: '',
        login:'',
        motDePasse:''
      }}
      validationSchema={validate}
    
    >
      {formik => ( 
      <Form id="form">

      <Grid container spacing={3}>
      <Row><Col> 
        <Grid item xs={12} >
          <TextField
            id="nom"
            name="nom"
            label="Nom"
            onBlur={formik.handleBlur}
            fullWidth
            error={(formik.touched.nom&&formik.errors.nom)}
            helperText={formik.touched.nom&&formik.errors.nom} 
            onChange={formik.handleChange}
            value={formik.values.nom}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            id="prenom"
            name="prenom"
            label="Prénom"
            onBlur={formik.handleBlur}
            fullWidth
            error={(formik.touched.prenom&&formik.errors.prenom)}
            helperText={formik.touched.prenom&&formik.errors.prenom} 
            onChange={formik.handleChange}
            value={formik.values.prenom}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Adresse email"
            onBlur={formik.handleBlur}
            fullWidth
            error={(formik.touched.email&&formik.errors.email)}
            helperText={formik.touched.email&&formik.errors.email} 
            onChange={formik.handleChange}
            value={formik.values.email}
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
        </Col>
        <Col style={{paddingLeft:'8%'}}>
        <Grid item xs={12} >
            <FormLabel component="legend">Rôle</FormLabel>
            <FormGroup onChange={ajouterRole}  >
                <FormControlLabel value="Ad"  control={<Switch name='role' color="primary" checked={stateSwitch.Ad}    />} label="Administrateur" />
                <FormControlLabel value="Rc" control={<Switch name='role' color="primary"    checked={stateSwitch.Rc}   />} label="Responsable de création des fiches clients" />
                <FormControlLabel value="Ri" control={<Switch  name='role' color="primary" checked={stateSwitch.Ri}  />} label="Responsable affectation des demandes interventions" />
                <FormControlLabel value="Ins" control={<Switch name='role' color="primary"   checked={stateSwitch.Ins}    />} label="Intervenant Supérieur" />
                <FormControlLabel value="In" control={<Switch name='role' color="primary"  checked={stateSwitch.In||stateSwitch.Ins}   />} label="Intervenant Simple" />
            </FormGroup>
            {messageErreur}
        </Grid>
      </Col>
      </Row>
      </Grid >
     
      <br/>
      <Grid item xs={12}>
        {messageInfo}
      </Grid>
      <Button
            hidden={messageInfo}
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={(event)=>envoyer(event,formik.isValid,formik.values)}
            >
            Ajouter
      </Button>
      <Button
            hidden={!messageInfo}
            type="reset"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={ajouterAutre}
            >
            Ajouter autre membre
      </Button>
      </Form>
      )}
      </Formik>  
      </Paper>
      </main>
    </>
  );
}

export default AjouMembSociete;