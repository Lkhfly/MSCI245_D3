import React from 'react'
import { useState } from 'react'
import { AppBar,Toolbar, Typography,Button,IconButton, Link,TextField,Grid,Box,Divider} from '@material-ui/core';
import history from '../Navigation/history';
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3016"
const Search = () => {
  let [title, setTitle] = useState('')
  let [actorName, setActorName] = useState('')
  let [directorName, setDirectorName] = useState('')
  let [error, setError] = useState('')
  let [movies, setMovies] = useState([])
  let [success, setSuccess] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  let [isEmpty, setIsEmpty] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleActorNameChange = (e) => {
    setActorName(e.target.value)
  }
  const handleDirectorNameChange = (e) => {
    setDirectorName(e.target.value)
  }
  const searchMovies = () => {
    callApiSearchMovies().
    then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        setMovies(parsed)
        // parsed.map (({name})=>setMovieId(movieId.push(name)))
        setIsLoading(false)
        if(parsed.length == 0){
          setIsEmpty("No matching results")
        }
    })
  }
  const callApiSearchMovies = async() => {
    const url = serverURL + "/api/searchMovies";
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        title : title? title : "%",
        actorFirstName : actorName? actorName.split(" ")[0] : "%",
        actorLastName : actorName? actorName.split(" ")[1] : "%",
        directorFirstName : directorName? directorName.split(" ")[0] : "%",
        directorLastName : directorName? directorName.split(" ")[1] : "%",
      })
    })
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message)
    console.log(body);
    console.log(directorName.split(" ")[0]);
    console.log(directorName.split(" ")[1]);
    return body;
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title && !actorName && !directorName){
      setSuccess(false)
      setError("Please fill in at least 1 field")
    }
    if (title || actorName || directorName){
      setIsEmpty("")
      setIsLoading(true)
      searchMovies()
      setSuccess(true)
    }
  }
  return (
    <>
    <AppBarComponent />
    <div className = "review">
      <Box ml= {4} mb = {2} mt = {2}>
      <Typography variant = "h4">Search for Movies</Typography>
      <TextField label="Title" sx = {{mr : 2}}value={title} onChange={handleTitleChange} />
      <TextField label="Actor Name" value={actorName} onChange={handleActorNameChange} />
      <TextField label="Director Name" value={directorName} onChange={handleDirectorNameChange} />
      </Box>
      <Box ml = {4}>
      <Button variant="contained" color="primary" style={{ marginTop: 7 }} onClick={handleSubmit}>Search</Button>
      </Box>
    </div>
    <div className = "output">
      <Box ml= {4} mb = {2} mt = {2} mr = {4}>
      {error && <Typography variant = "h7" style={{color: 'red'}}>{error}</Typography>}
      {success && (
      <>
      <Typography variant = "h6" >Search Result</Typography>
      <hr />
      </>
      )}
      <div>
      {movies.map(({name,first_name,last_name})=>(
        <>
        <p><strong>Movie Title : </strong>{name}</p>
        <p><strong>Director Name : </strong>{first_name + " " + last_name}</p>
        <hr />
        </>
      ))}
      </div>
      {isLoading && (<Typography variant = "h7" style={{color: 'red'}}>Loading...</Typography>)}
      {isEmpty && (<Typography variant = "h7" style={{color: 'red'}}>{isEmpty}</Typography>)}
      </Box>
    </div>
    </>
  );
}
const AppBarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
          <IconButton color="inherit"  onClick={() => history.push('/')}>Landing</IconButton>
          <Divider />
          <IconButton color="inherit"  onClick={() => history.push('/reviews')}>Reviews</IconButton>
          <IconButton color="inherit"  onClick={() => history.push('/mypage')}>MyPage</IconButton>
      </Toolbar>
    </AppBar>
  )
}
export default Search;