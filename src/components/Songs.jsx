import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Container,Select,FormControl,MenuItem,Box,CircularProgress,Typography} from '@mui/material';
import Details from './Details';
/* import {result} from '../data' */




function Songs() {
    const [sorting, setSorting] = useState(false);
    const [result, setResult] = useState([]);
    const [show, setShow] = useState(false);
    const [song, setSong] = useState(null);

    const Sorting = (data,sorting) => {
        let sorted = null;
        if(!sorting){
             sorted = data.sort((a,b) => {
                return a.duration - b.duration;
            })
            setResult(sorted);
            setSorting(true)
            setSong(sorted[0].title)
        }
        else{
             sorted = data.sort((a,b) => {
                return b.duration - a.duration;
            })
            setResult(sorted);
            setSorting(false)
            setSong(sorted[0].title)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart'
                );
                const {tracks} = data;
                Sorting(tracks.data, sorting);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
        
        
    },[])

    const showModal = (value) => {
        setSong(value)
        setShow(true);

    }
    
    const hideModal = () => {
        setShow(false);
    }

   if(song){
    return(
        <Container>
        <Box>
            <Typography variant='h5'>Izaberi jednu od top 10 pjesama: </Typography>
            <br />
            <Box sx={{minWidth:120}}>
                <FormControl fullWidth>
                <Select
                    onChange={e => showModal(e.target.value)}
                    value={song ? song :''}>
                {
                    result.map((el) => {
                        return(
                        <MenuItem key={el.id} value={el.title}>{el.title}</MenuItem>
                        )
                    })
                }
                </Select>
                </FormControl>
            </Box>
        </Box>
        <Details show={show} hideModal={hideModal} result={result} song={song}/>
        
        </Container>
        
    );
   }
   else{
    return  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
   }
}

export default Songs