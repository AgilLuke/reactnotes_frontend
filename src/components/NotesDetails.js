import { useEffect,useState,useRef} from "react";
import {Typography,Box,TextField} from '@mui/material';
import NotesServices from "../services/NotesServices";
import {useParams} from "react-router";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LandingPage from "./LandingPage";

const NotesDetails = () => {
    const {id}=useParams();
    const [curntNote,setCurntNote]=useState({});
    const [open,setOpen]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        console.log('Note Details refreshed...')
        NotesServices.get(id)
            .then(note=>{
                setCurntNote(note.data);
            })
            .catch(err=>{
                console.log('Something went wrong...',err)
            })
    },[])
    const handleChange=(typ,e)=>{
            setOpen(false);   
            navigate("/");          
    }
    const handleDelete=()=>{
        NotesServices.remove(id)
            .then(resp=>{
                navigate("/");
            })
            .catch(err=>{
                console.log('Something went wrong...',err);
                console.log(id,"<<<");
            })
        setOpen(false);               
    }
    const handleUpdate=()=>{
        console.log("Update clicked....",curntNote);
        console.log("id=",curntNote.id);
        navigate(`/notes/add/${curntNote.id}`)
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
                <Button onClick={()=>handleUpdate()}>Edit</Button>
                <Button onClick={()=>handleDelete()}>Delete</Button>
            </DialogActions>
        </Dialog>
    </div> );
}
 
export default NotesDetails;