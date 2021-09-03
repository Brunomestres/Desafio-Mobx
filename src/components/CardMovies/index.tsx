import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, CardMedia,Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Movie } from '../../interfaces/movie';
import { useStyles } from './styled';

function CardMovies(props: any) {
  const {search, store } = props;
  const [movies, setMovies] = useState<Movie>( () => props.store.movies);
  const classes = useStyles();

  const handleChange = (event: any, value:number) => {
    props.store.setPage(value)
  };

  useEffect(() => {
    const load = async () => {
      await store.BuscarMovies(search, store.page);
      setMovies(store.movies);
    }
    load();
  }, [search, store.page ,store])


  return (
    <>
    {store.loading ? <h1 style={{ marginLeft: '40%' }}> Carregando... </h1>
      :
      <>
        {movies && movies?.results.length > 0 ?
          <div>
            {movies.results.map( (movie) => (
              <Card key={movie.id} className={classes.cardMovie}>
                <CardMedia
                  className={classes.cover}
                  image={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                />
                <Typography className={classes.title} variant="subtitle1" component="h2">
                  {movie.title}
                </Typography>
              </Card>
            ))}
            <div className={classes.pagination}>
              <Pagination count={10} color="secondary" page={props.store.page}  onChange={handleChange} className={classes.paginationItem} />
            </div>
          </div>
          :
          <></>
          }
      </>

    }

  </>
  )
}

export default observer(CardMovies);


