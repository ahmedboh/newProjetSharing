import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FcIcons from 'react-icons/fc';
import * as ImIcons from 'react-icons/im';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
    {
        title: 'ListeDemande',
        path: '#',
        icon: <FaIcons.FaListAlt color="primary" />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        acces:['Ad','Ri','In'],
        subNav: [
            {
                title: 'ToutesLesDemande',
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
                title: 'ToutesLesMembres',
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
                title: 'ToutesLesClient',
                path: '/ListeClients',
                acces:['Ad','Rc'],
                icon: <CgIcons.CgUserList/>,
            },
        ]
    }
    
];
