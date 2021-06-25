import { useState,useEffect } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


const Nav = styled.div`
background: #15171c;
height: 60px;
display: flex;
justify-content: felx-start;
align-items: center;
// position: fixed; 
// top: 0; 
// width: 100%; 
// z-index:1;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #15171c;
width: 250px;
height:100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
transition: 350ms;
z-index: 10;

`;

const SidebarWrap = styled.div`
width: 100%;
`;

const Sidebar = (props) => {
    const{user,decon,fn}=props
    let history = useHistory();

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
   

    
    const deconn=()=>{
        localStorage.removeItem('connectMb')
        localStorage.removeItem('token')
        fn(false)
        setSidebar(false)
        history.push('/SharingSignIn')
    }
    useEffect(() => {
        console.log("11")
      }, [])
    useEffect(() => {
      decon&&deconn()
    }, [decon])
    return (
        <>
        <IconContext.Provider  value={{ color: '#fff'}}>
            <Nav  >
                <NavIcon to='#'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </NavIcon>
                <span style={{position:'absolute',right:'15px',color:"white",textTransform:'uppercase',fontFamily:'cursive'}}>
                 {user?user.prenom===undefined?" ":user.prenom+" "+user.nom:""}   &nbsp;&nbsp;&nbsp;&nbsp;  
                <Button variant="contained"  onClick={deconn} color="secondary" size="medium" >Déconnecter</Button>
                </span>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap >
                    <NavIcon to='#'>
                        <AiIcons.AiOutlineClose onClick={showSidebar} />
                    </NavIcon>
                    {
                    SidebarData.map((item, index) => {
                        return <SubMenu item={item} fn={showSidebar} key={index} role={user&&user.role}  />;
                    })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
        </>
    )
}

export default Sidebar
