import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import NotesServices from '../services/NotesServices';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AddNote = (props) => {
    const [open,setOpen]=useState(true); 
    const [noteObj,setNoteObj]=useState({});
    const [editMode,setEditMode]=useState(false);
    const navigate=useNavigate();
    const handleChange=(typ,e)=>{
        if(typ=='cancel'){
            setOpen(false);
            navigate("/");
        }else if(typ=='add'){
            setOpen(false);
            const note={id,title,body,category};
            if(id){
                NotesServices.update(note)
                //---Not a recommended way: since it calls a unneccesary error in frontend and update service is succesfull,I'm just commenting the then() and catch()---------------
                // .then(resp=>{
                //     console.log("Note edited succeffuly",resp.data);
                // })
                // .catch(err=>{
                //     console.log("Error occured in updating note",err);
                // })
                //---------
                navigate("/");
            }else{
                NotesServices.create(note)
                .then(resp=>{
                    console.log('Note added succeffuly',resp.data);
                })
                .catch(err=>{
                    console.log('error in adding note',err);
                    console.log(note);
                })
                navigate("/");
            }
            
        }else{
            navigate("/");
        }       
    }
    
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [category,setCategory]=useState('');
    const handleTextChange=(id,val)=>{
        if(id=='title'){setTitle(val)}
        else if(id=='body'){setBody(val)}
        else if(id=='cat'){setCategory(val)}
        else{}
    }

    // useEffect(()=>{
    //     console.log(noteObj);
    // },[]);

    const {id}=useParams();
    useEffect(()=>{
        if(id){
            setEditMode(true);
            NotesServices.get(id)
                .then(note=>{
                    setTitle(note.data.title);
                    setBody(note.data.body);
                    setCategory(note.data.category);
                })
                .catch(err=>{
                    console.log("Error occured",err);
                })
        }
    },[]);
    return ( 
        <Dialog open={open} onClose={handleChange}>
            <DialogTitle>{editMode?`Edit`:`Add`} Note</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill all the details to {editMode?`edit`:`add`} the note below.
                </DialogContentText>
                <TextField id="title" variant='standard' label='Title' type='text' value={title} onChange={(e)=>handleTextChange('title',e.target.value)}/><br/>
                <TextField id="body" variant='standard' label='Description' type='text' value={body} onChange={(e)=>handleTextChange('body',e.target.value)}/><br/>
                <TextField id="cat" variant='standard' label='Category' type='text' value={category} onChange={(e)=>handleTextChange('cat',e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>handleChange('cancel')}>Cancel</Button>
                <Button onClick={(e)=>handleChange('add',e)}>{editMode?`Edit`:`Add`} Note</Button>
            </DialogActions>
        </Dialog> 
    );
}
 
export default AddNote;
