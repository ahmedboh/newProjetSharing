import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BSIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';


export const SidebarData = [
    {
        title: 'ListeDemandes',
        path: '#',
        icon: <FaIcons.FaListAlt color="primary" />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        acces:['Ad','Ri','In'],
        subNav: [
            {
                title: 'ToutesLesDemandes',
                path: '/liste',
                acces:['Ad','Ri','In'],
                icon: <FaIcons.FaList />,
            },
            {
                title: 'MesDemandes',
                path: '/maliste',
                acces:['In'],
                icon: <RiIcons.RiPlayList2Line/>,
            },
            {
                title: 'listeRapports',
                path: '/ListeRapportsInterventions',
                acces:['In','Ad'],
                icon: <BSIcons.BsBookmarks/>,
            },
            {
                title: 'MalisteRapports',
                path: '/ListeRapportsIntervenant',
                acces:['In','Ad'],
                icon: <BSIcons.BsBookmarkCheck/>,
            },
        ]
    },
    {
        title: 'MembreSociete',
        path: '#',
        icon: <ImIcons.ImUserTie/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        acces:['Ad'],
        subNav: [
            {
                title: 'AjouterNouveau',
                path: '/AjouterMembre',
                acces:['Ad'],
                icon: <AiIcons.AiOutlineUserAdd/>,
            },
            {
                title: 'TousLesMembres',
                path: '/ListeMembSocietes',
                acces:['Ad'],
                icon: <CgIcons.CgUserList/>,
            },
        ]
    },
    {
        title: 'Client',
        path: '#',
        icon: <FaIcons.FaUsers/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        acces:['Ad','Rc'],
        subNav: [
            {
                title: 'AjouterNouveau',
                path: '/AjouterClient',
                acces:['Rc'],
                icon: <AiIcons.AiOutlineUserAdd/>,
            },
            {
                title: 'TousLesClient',
                path: '/ListeClients',
                acces:['Ad','Rc'],
                icon: <CgIcons.CgUserList/>,
            },
        ]
    }
    
    
];
