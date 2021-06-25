import  '../../style/style.css';
import { useState ,useEffect} from 'react';


const Accueil=()=>{

    useEffect(() => {
            
        document.body.style.backgroundColor = '#b6eee5';
  return ()=>{document.body.style.backgroundColor = 'white'}
   }, [])
return(        
<div>
    
                <div className="text-box text-box1">
                    <h1> Sharing Technologies </h1>
                    <span></span>
                     <p>C’est dans la banlieue de nord de Tunis, et plus précisément à la Marsa que le centre <b class="text-danger">Bbeaute</b> s’est installé, marquant officiellement son ouverture  pour le plus grand bonheur des férues de la beauté et du bien-être.
                     Cette ouverture a été rehaussée par la présence de Mme Christelle Galais, coiffeur styliste-visagiste de Vitality’s, le spécialiste capillaire italien, venue spécialement de l’Italie pour partager avec les premières clientes du centre, son expertise et son savoir faire et apporter une touche finale à la formation de l’équipe JetSet Beauty.</p>
                </div>
        
</div> )
}
export default Accueil;