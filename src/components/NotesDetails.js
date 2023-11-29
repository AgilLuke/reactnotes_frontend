import { useEffect,useState,useRef} from "react";
import {Typography,Box} from '@mui/material';
import NotesServices from "../services/NotesServices";
import {useParams} from "react-router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const NotesDetails = () => {
    const {id}=useParams();
    const [curntNote,setCurntNote]=useState({});
    const [open,setOpen]=useState(true);
    useEffect(()=>{
        console.log('Note Details refreshed...')
        NotesServices.get(id)
            .then(note=>{
                setCurntNote(note.data);
            })
            .catch(err=>{
                console.log('Something went wrong...',err)
            })
    },[curntNote])
    const handleChange=(typ,e)=>{
            setOpen(false);               
    }
    return ( <div>
        <Dialog open={open} onClose={handleChange}>
            <DialogTitle>{curntNote.id}Notes Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Details of the current note.
                </DialogContentText>
                <Typography id="title">{curntNote.title}</Typography><br/>
                <Typography id="body">{curntNote.body}</Typography><br/>
                <Typography id="cat">{curntNote.category}</Typography>
            </DialogContent>
            <DialogActions>
          <Button onClick={()=>handleChange()}>Cancel</Button>
        </DialogActions>
        </Dialog> 
    </div> );
}
 
export default NotesDetails;