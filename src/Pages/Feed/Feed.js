import React from 'react';
import styles from './Feed.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const APIKEY = 'f5292c7d';

const Feed = () => {
  const [search, setSearch]   = React.useState('');
  const [movies, setMovies]   = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const data                  = [] 

  const searchMovies = async () => {
    if (!validation()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setMovies([]);

    try {
      for (let page = 1; page <= 5; page++) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${search}&page=${page}`);
        const json = await response.json();

        if (json.Response === 'False' && page === 1) {
          toast.warning(json.Error);
          setLoading(false);
          return;
        }

        if (json.Search) {
          data.push(...json.Search)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('An error occurred while fetching data');
    } finally {
      setMovies([...data]);
      setLoading(false);
    }
  };

  const validation = () => {
    return search.trim().length > 0;
  };

  return (
    <>
      <ToastContainer />
      <span className={styles.span}>Search for your Movie or Series</span>
      <div className={styles.box}>
        <Input name="search" label="" type="text" value={search} setValue={setSearch} />
        <Button onClick={searchMovies} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
        {movies.length > 0 && <Table metaData={movies} />}
        {movies.length === 0 && !loading }
      </div>
    </>
  );
};

export default Feed;