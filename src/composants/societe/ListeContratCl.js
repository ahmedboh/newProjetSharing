import React from 'react';
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import '../../style/interv.css'

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width:'60vw',
    overflow:"auto",
    overflowY:'hidden',
   padding:'50px'
  },
}));

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: '1rem 1.5rem 1.5rem',
     
    };
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '2rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  contenu: {
    fontFamily: 'sans-serif',
    color: '#fff',
    opacity: 0.87,
    marginTop: '1rem',
    fontWeight: 500,
    fontSize: 12,
  },
}));


const CustomCard = ({ classes,title, contenu }) => {
    return (
      <CardActionArea className={classes.actionArea}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} variant={'h2'}>
              {title}
            </Typography>
            <Typography className={classes.contenu }>type : {contenu.type}</Typography>
            <Typography className={classes.contenu}>Nombre de visites de maintenance préventive par ans : {contenu.visitesMainPreventive} viste(s)</Typography>
            <Typography className={classes.contenu}>Nombre de visites de maintenance préventive par ans : {contenu.visitesMainCurative} viste(s)</Typography>
            <Typography className={classes.contenu}>Prix unitaire des interventions supplémentaires : {contenu.prixInterSupp} dt </Typography>
            <Typography className={classes.contenu}>Contat : {contenu.contact} </Typography>
            <Typography className={classes.contenu}>Telephone: {contenu.telContact} </Typography>
            <Typography className={classes.contenu}> {contenu.emailContact} </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    );
  };

function ListeContratCl(props) {
    const {user}=props
    const [rows , setRows ]=useState([]);
    const listeContrat=async()=>{
        const res =await Axios.get(`contrat/getContratsClient/${user._id}`)
        setRows( res.data.data );
      }
      
      useEffect(() => {
        user!=={}&&listeContrat()
      }, [user]);
  

    const gridStyles = useGridStyles();

  const styles0 = useStyles({ color: '#203f52' });
  const styles1 = useStyles({ color: '#4d137f' });
  const styles2 = useStyles({ color: '#ff9900' });
  const styles3 = useStyles({ color: '#34241e' });
  const fnStyle=(n)=>{
      n=n%4;
      return(n===0?styles0:n===1?styles1:n===2?styles2:styles3)
  }
    return (
        <div align="center" style={{border:'2px solid red'}}>
            <Grid classes={gridStyles}  container spacing={4} wrap={'nowrap'}>
            {    rows.map((row,index) => (
                    <Grid item key={index}>
                        <CustomCard
                            classes={fnStyle(index)}
                            title={'Contrat '+index}
                            contenu={row}
                        />
                    </Grid>
                ))}
            
            </Grid>

        </div>
    )
}

export default ListeContratCl
