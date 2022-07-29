import React from 'react'
import { AppBar,Toolbar, Typography,Button,IconButton, Link, Grid,Paper,Box} from '@material-ui/core';
import history from '../Navigation/history';
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3016"
const Landing = () => {
  return (
    <div style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1603126004256-4110103b999a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80")`, backgroundSize: "contain", minHeight : "100vh"
    }}>
    <AppBarComponent />
    <Box ml = {4} mt = {1}>
      <Typography variant = "h3" style={{color: 'black'}} align = "center">Welcome to the IMDB Database Site</Typography>
      <Typography variant = "h6" style={{color: 'white'}}>The main functionalities are : </Typography>
      <Typography variant = "subtitle1" style={{color: 'white'}} >+ <strong style = {{cursor : "pointer"}} onClick={() => history.push('/search')}>Search : </strong>Search for Movies using the movie title/actor names/director name</Typography>
      <Typography variant = "subtitle1" style={{color: 'white'}} >+ <strong style = {{cursor : "pointer"}} onClick={() => history.push('/reviews')}>Reviews : </strong>Review and give ratings for movies</Typography>
      <Typography variant = "subtitle1" style={{color: 'white'}} >+ <strong style = {{cursor : "pointer"}} onClick={() => history.push('/mypage')}>MyPage : </strong>Search and view movie trailers</Typography>
    </Box>
    </div>
  )
}
const AppBarComponent = () => {
  return (
    <AppBar position = "static">
      <Toolbar>
          <IconButton color="inherit"  onClick={() => history.push('/search')}>Search</IconButton>
          <IconButton color="inherit"  onClick={() => history.push('/reviews')}>Reviews</IconButton>
          <IconButton color="inherit"  onClick={() => history.push('/mypage')}>MyPage</IconButton>
      </Toolbar>
    </AppBar>
  )
}
export default Landing;