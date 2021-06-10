import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index,...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



export default function MenuVer(props) {
  const { data, dataLabels,changeState} = props;
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeState!==undefined&& changeState((newValue!==2&&newValue!==3))
  };



  return (
    <div >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          // onClick={()=>{console.log('aa',changeState)}}
        > 
        {dataLabels.map((data,index)=>(<Tab key={index} label={data} {...a11yProps(index)} />))}
          
        </Tabs>
      </AppBar>
        {data.map((data,index)=>(<TabPanel   key={index} value={value}  index={index} > {data}</TabPanel>))} 
    </div>
  );
}
