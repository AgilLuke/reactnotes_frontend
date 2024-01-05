import { useEffect,useState } from "react";
import NotesServices from "../services/NotesServices";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddNote from "./AddNote";
import { Container,Link } from "@mui/material";
import httpClient from '../http-common'
import { useNavigate } from "react-router-dom";

const NotesList=()=>{
    const navigate=useNavigate();
    const [notes,setNotes]=useState([]);
    // const [dialogStat,setDialogStat]=useState(false);
    const handleAddNote=()=>{
        console.log('action test');
        navigate("/notes/add")
    }
    useEffect(()=>{
        NotesServices.getAll()
            .then(response=>{
                console.log("...printing response",response.data);
                setNotes(response.data);
            })
            .catch(error=>{
                console.log("something went wrong...",error);
            })
    },[]);
    return(
        <div>
            <Container>
                <Typography variant="h3" gutterBottom>List of Notes</Typography>
                <Button onClick={()=>handleAddNote()}>Add Note</Button>
            </Container>
            {notes.length>0 ? notes.map(note=>(
                <Card key={note.id} style={{marginBottom:5}}>
                    <CardContent>
                        <Typography variant="h5" component="div">{note.title}</Typography>
                        <Typography variant="body2">
                            {note.body}
                        </Typography>
                    </CardContent>
                    <CardActions style={{backgroundColor:'white'}}>
                        <Link href={`/notes/${note.id}`}>Learn More</Link>
                    </CardActions>
                </Card>
            ))
            : <Card key={0} style={{marginBottom:5}}>
                <CardContent>
                    <Typography variant="body2">
                            No Notes Available...
                    </Typography>
                </CardContent>
            </Card>
            }
        </div>
    )
}
export default NotesList;