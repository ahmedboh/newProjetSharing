import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
    {
        title: 'ListeDemande',
        path:'/',
        icon: <FaIcons.FaListAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'ToutesLesDemande',
                path: '/ToutesLesTickets',
                icon: <CgIcons.CgPlayListSearch />,
            },
            {
                title: 'MesDemandes',
                path: '/MesTickets',
                icon: <CgIcons.CgPlayList/>,
            },
        ]
    },
    {
        title: 'AjouterMembreSociete',
        path: '/AjouterMembre',
        icon: <AiIcons.AiOutlineUserAdd/>,
    },
    {
        title: 'AjouterClient',
        path: '/AjouterClient',
        icon: <AiIcons.AiOutlineUserAdd/>,
    }
];
