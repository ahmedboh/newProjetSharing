import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './style/contrat.css'
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';


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
const  ContratCard=({ color,title, contenu }) =>{
   const classes = useStyles({ color: color });
//    useEffect(() => {
//     console.log(contenu)
//    }, [contenu]);
    
    return (
        <CardActionArea className={classes.actionArea}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography align='center' className={classes.title} variant={'h2'}>
              {title}
            </Typography>
            <Typography className={classes.contenu }>Type : <span className='text'>{contenu.type}</span> </Typography>
            <Typography className={classes.contenu}>Nombre de visites de maintenance préventive par ans : <span className='text'>{contenu.visitesMainPreventive} viste(s)</span></Typography>
            <Typography className={classes.contenu}>Nombre de visites de maintenance préventive par ans : <span className='text'>{contenu.visitesMainCurative} viste(s)</span></Typography>
            <Typography className={classes.contenu}>Prix unitaire des interventions supplémentaires : <span className='text'>{contenu.prixInterSupp} dt</span> </Typography>
            <Typography className={classes.contenu}>Contat : <span className='text'>{contenu.contact}</span></Typography>
            <Typography className={classes.contenu}>Telephone: <span className='text'>{contenu.telContact}</span></Typography>
            <Typography className={classes.contenu}> <span className='text'>{contenu.emailContact}</span> </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    )
}

export default ContratCard
