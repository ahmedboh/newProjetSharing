import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import ContratCard from './ContratCard'
import './style/contrat.css'


const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width:'65vw',
    overflow:"auto",
    overflowY:'hidden',
   padding:'15px',
   backgroundColor:'rgb(241, 241, 241)',
   borderTopLeftRadius:'20px',
   borderTopRightRadius:'20px',
  },
}));





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

  const fnStyle=(n)=>{
      n=n%4;
      return(n===0?'#203f52':n===1?'#4d137f':n===2?'#ff9900':'#34241e')
  }
    return (
        <div align="center" className='container  boxContrat'>
            <h2 align='left' className="titreC">Liste des contrats</h2><br/>
            <Grid classes={gridStyles}  container spacing={4} wrap={'nowrap'}>
            {    rows.map((row,index) => (
                    <Grid item key={index}>
                        <ContratCard
                            color={fnStyle(index)}
                            title={'Contrat '+(index+1)}
                            contenu={row}
                        />
                    </Grid>
                ))}
            
            </Grid>
            <br/>
        </div>
    )
}

export default ListeContratCl
