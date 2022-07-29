import React from 'react'
import { useState } from 'react'
import { AppBar,Toolbar, Typography,Button,IconButton, Link, CardMedia,Grid,Box,TextField} from '@material-ui/core';
import history from '../Navigation/history';
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3016"
const MyPage = () => {
  let [movies,setMovies] = useState([])
  let [title, setTitle] = useState("")
  let [video, setVideo] = useState([])
  let [error, setError] = useState("")
  let [isLoading, setIsLoading] = useState(false)
  let [isEmpty, setIsEmpty] = useState('')


  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  React.useEffect(()=>{
    loadMovies()
  },[])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title){
      setError("Please enter the movie title")
      setIsEmpty("")
      setIsLoading(false)
    }else{
      setError("")
      setIsEmpty("")
      setIsLoading(true)
      searchMovieTrailers()
    }
  }
  const loadMovies = () => {
    callApiLoadMovies().
    then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        setMovies(parsed)
    })
  }
  const callApiLoadMovies = async () => {
    const url = serverURL + "/api/loadMovieTrailers";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  }
  const searchMovieTrailers = () => {
    callApiSearchMovieTrailers().
    then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        setVideo(parsed)
        setIsLoading(false)
        if(parsed.length == 0){
          setIsEmpty("No matching results")
        }
    })
  }
  const callApiSearchMovieTrailers = async() => {
    const url = serverURL + "/api/searchMovieTrailers";
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        title : title,
      })
    })
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message)
    console.log(body);
    return body;
  }
  return (
    <>
    <AppBarComponent />
    <Box ml = {4} mr = {4} mt = {1}>
      <Typography variant = "h4">Search for movie trailers below !</Typography>
      <Typography variant = "h8">As of date, trailers for the following movies have been added :  
      {movies.map(({name})=>(
        <strong style={{display:"inline"}}> {name} ,</strong>
      ))} more could be added by updating the newly-created "trailers" column in the "movies" table in the database
      </Typography>
      <TextField label=" Search Movie Title" value={title} onChange={handleTitleChange} fullWidth/>
      <Button variant="contained" color="primary" style={{ marginTop: 7 }} onClick={handleSubmit}>Search</Button>
    </Box>
    <Box ml = {4} mr = {4} mt = {1}>
      {error && <Typography variant = "h7" style={{color: 'red'}}>{error}</Typography>}
      {isLoading && (<Typography variant = "h7" style={{color: 'red'}}>Loading...</Typography>)}
      {isEmpty && (<Typography variant = "h7" style={{color: 'red'}}>{isEmpty}</Typography>)}
    </Box>
    <Box ml = {25} mt = {5}>
      {video.map(({trailers})=>(
        <>
        <CardMedia
      component="iframe"
      style = {{width : 1000, height : 900}}
      image= {trailers}/>
          </>
      ))}
    </Box>
    </>
  )
}

const AppBarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
          <IconButton color="inherit"  onClick={() => history.push('/')}>Landing</IconButton>
          <IconButton color="inherit"  onClick={() => history.push('/search')}>Search</IconButton>
          <IconButton color="inherit"  onClick={() => history.push('/reviews')}>Reviews</IconButton>
      </Toolbar>
    </AppBar>
  )
}
export default MyPage;