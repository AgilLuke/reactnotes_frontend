import * as React from 'react';
import lodash from 'lodash';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NotesList from "./NotesList";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import NotFound from './NotFound';
import AddNote from './AddNote';
import { Button } from '@mui/material';

const LandingPage = () => {
    const tabLists=[{name:'Home'},{name:'Notes'},{name:'New'}];
    console.log('use lodash map',tabLists);
    const [value, setValue] = React.useState(0);
    const handleChange = (i) => {
        setValue(i);
    }
    return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="lg">
            <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }}>                
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList>
                        <Tab label="Home" value={0} onClick={()=>handleChange(0)}/>
                        <Tab label="Notes" value={1} onClick={()=>handleChange(1)}/>
                    </TabList>
                </Box>
                    <TabPanel value={0}><NotFound/></TabPanel>
                    <TabPanel value={1}><NotesList/></TabPanel>
                </TabContext>
            </Box>
        </Container>
    </React.Fragment>
    );
}
 
export default LandingPage;