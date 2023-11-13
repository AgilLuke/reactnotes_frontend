import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import NotesServices from '../services/NotesServices';

const AddNote = () => {
    const [open,setOpen]=useState(true); 
    const [noteObj,setNoteObj]=useState({});
    const handleChange=(typ,e)=>{
        if(typ=='cancel'){
            setOpen(false);
        }else{
            setOpen(false);
            // e.preventDefault();
            const note={title,body,cat};
            //console.log(note)
            NotesServices.create(note)
                .then(resp=>{
                    console.log('Note added succeffuly',resp.data);
                })
                .catch(err=>{
                    console.log('error',err);
                })
        }        
    }
    
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [cat,setCat]=useState('');
    const handleTextChange=(id,val)=>{
        if(id=='title'){setTitle(val)}
        else if(id=='body'){setBody(val)}
        else if(id=='cat'){setCat(val)}
        else{}
    }

    useEffect(()=>{
        console.log(noteObj);
    },[]);
    return ( 
        <Dialog open={open} onClose={handleChange}>
            <DialogTitle>Add Note</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill all the details to add the note below.
                </DialogContentText>
                <TextField id="title" variant='standard' label='Title' type='text' value={title} onChange={(e)=>handleTextChange('title',e.target.value)}/><br/>
                <TextField id="body" variant='standard' label='Description' type='text' value={body} onChange={(e)=>handleTextChange('body',e.target.value)}/><br/>
                <TextField id="cat" variant='standard' label='Category' type='text' value={cat} onChange={(e)=>handleTextChange('cat',e.target.value)}/>
            </DialogContent>
            <DialogActions>
          <Button onClick={()=>handleChange('cancel')}>Cancel</Button>
          <Button onClick={(e)=>handleChange('add',e)}>Add Note</Button>
        </DialogActions>
        </Dialog> 
    );
}
 
export default AddNote;<div>
</div>