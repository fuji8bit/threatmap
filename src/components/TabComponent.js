import {useState} from 'react'
import ControlGrid from './ControlGrid'
import OwaspGrid from './OwaspGrid'
import MitreGrid from './MitreGrid'
import {Box} from '@material-ui/core'
import {Tab} from '@mui/material'
import {TabContext, TabPanel, TabList} from '@mui/lab'


const TabComponent = (props) => {
  const [tabValue, setTabValue] = useState('1');

  const handleChange = (event, newValue)=>{
    setTabValue(newValue); 
  }

  return (
    <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Controls" value="1" />
            <Tab label="Sub-Techniques" value="2" />
            <Tab label="OWASP" value="3" />
        </TabList>
        </Box>
            <TabPanel value="1">
                <ControlGrid control={props.tabEntity} setControl={props.setTabEntity} />
            </TabPanel>
            <TabPanel value="2">
                <MitreGrid mitre={props.tabEntity} setMitre={props.setTabEntity} />  
            </TabPanel>
            <TabPanel value="3">
                <OwaspGrid owasp={props.tabEntity} setOwasp={props.setTabEntity} />
            </TabPanel>
    </TabContext>
  )
}

export default TabComponent