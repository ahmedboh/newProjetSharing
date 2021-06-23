import  { useState } from 'react'
import { Checkbox } from 'antd';
import  '../../style/interv.css';

const CheckBoxType=(props)=>{
const [checked, setChecked] = useState([])

const conserverFiltre = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
        newChecked.push(value)
    } else {
        newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
    props.handleFilters(newChecked,props.label)

}


 return(<>
      <span className="labelTextChekBok"> {props.label.toUpperCase()} </span> &nbsp;
      {props.data.map((data,index)=>(
            <span  key={index}>
                <Checkbox type="checkbox"
                onChange={() => conserverFiltre(data)}
                checked={checked.indexOf(data) === -1 ? false : true}/>&nbsp;&nbsp;
                <span>{data}</span>&nbsp;&nbsp;&nbsp;
            </span>
            ))}  
        
    </>)
}
export default CheckBoxType