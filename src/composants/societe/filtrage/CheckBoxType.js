import  { useState } from 'react'
import { Checkbox, Collapse } from 'antd';
const { Panel } = Collapse
const CheckBoxType=(props)=>{
const [checkedPriorite, setCheckedPriorite] = useState([])
const [checkedNature, setCheckedNature] = useState([])
const [checkedEtat, setCheckedEtat] = useState([])



const conserverFiltreNature = (value) => {

    const currentIndex = checkedNature.indexOf(value);
    const newChecked = [...checkedNature];

    if (currentIndex === -1) {
        newChecked.push(value)
    } else {
        newChecked.splice(currentIndex, 1)
    }

    setCheckedNature(newChecked)
    props.handleFilters(newChecked,'nature')
    

}


const conserverFiltrePriorite = (value) => {

    const currentIndex = checkedPriorite.indexOf(value);
    const newChecked = [...checkedPriorite];

    if (currentIndex === -1) {
        newChecked.push(value)
    } else {
        newChecked.splice(currentIndex, 1)
    }

    setCheckedPriorite(newChecked)
    props.handleFilters(newChecked,'priorite')

}

const conserverFiltreEtat = (value) => {

    const currentIndex = checkedEtat.indexOf(value);
    const newChecked = [...checkedEtat];

    if (currentIndex === -1) {
        newChecked.push(value)
    } else {
        newChecked.splice(currentIndex, 1)
    }

    setCheckedEtat(newChecked)
    props.handleFilters(newChecked,'etat')

}
 return(<div>
    <Collapse defaultActiveKey={['1']} >
        <Panel header="PAR TYPE" key="1">
        Priorite  &nbsp;&nbsp;
        <Checkbox
                onChange={() => conserverFiltrePriorite("Normal")}
                type="checkbox"
                checked={checkedPriorite.indexOf("Normal") === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>Normal</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox
                onChange={() => conserverFiltrePriorite("Urgent")}
                type="checkbox"
                checked={checkedPriorite.indexOf("Urgent") === -1 ? false : true}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Urgent</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox
                onChange={() => conserverFiltrePriorite("Critique")}
                type="checkbox"
                checked={checkedPriorite.indexOf("Critique") === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>Critique</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         
        <hr/> Nature  &nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox
                onChange={() => conserverFiltreNature("Maintenance")}
                type="checkbox"
                checked={checkedNature.indexOf("Maintenance") === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>Maintenance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox
                onChange={() => conserverFiltreNature("Neauvau besoin")}
                type="checkbox"
                checked={checkedNature.indexOf("Neauvau besoin") === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>Neauvau besoin</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            <hr/> Etat  &nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox
                onChange={() => conserverFiltreEtat("En attente")}
                type="checkbox"
                checked={checkedEtat.indexOf("En attente") === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>En attente</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox
                onChange={() => conserverFiltreEtat("En cour")}
                type="checkbox"
                checked={checkedEtat.indexOf("En cour") === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>En cour</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <Checkbox
                onChange={() => conserverFiltreEtat("Clôturée")}
                type="checkbox"
                checked={checkedEtat.indexOf("Clôturée") === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>Clôturée</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Panel>
    </Collapse>
    </div>)
}
export default CheckBoxType