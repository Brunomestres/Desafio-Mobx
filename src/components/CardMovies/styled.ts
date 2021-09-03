import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  cover: {
    width: '200px',
    height: '110px',
    borderRadius: '10px'
  },
  cardMovie: {
    margin: '5px',
    display: 'flex'
  },
  title: {
    marginLeft: '15px',
    fontSize: '20px'
  },
  pagination: {
    height: '100px',
    margin: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  paginationItem:{
    marginTop: '15px'
  }
}))


