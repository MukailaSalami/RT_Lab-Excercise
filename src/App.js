
//import Pagination from "react-js-pagination";
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import store from './store/store';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState(false);

  useEffect(() => {
    //console.log(store.getState())
    //prevent te enter button from implementing since onChange event is already fetching the data
    window.addEventListener('keydown', ignoreOnEnter);
    displayResults();
  });

  const displayResults = () => {
    return (
      <table>
        <tbody>
          {
            results.map((result, index) => {
              return (<tr key={index}><a href={result?.url} rel="noreferrer" target="_blank" dangerouslySetInnerHTML={{ __html: result?._highlightResult?.title?.value }} /></tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
  const ignoreOnEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  const fetchData = async (searchItem) => {
    const apiURL = `http://hn.algolia.com/api/v1/search?query=${searchItem}`;
    await axios.get(apiURL)
      .then((response) => {
        // handle success
        setResults(response.data.hits);
        setLoading(false);
      })
      .catch((error) => {
        alert('An error occured');
        document.location.reload();
      })
  }

  const handleChange = (e) => {
    let valueEntered = e.target.value;
    if (valueEntered) {
      //DEFINE THE REDUX DISPATCH METHOD HERE
      store.dispatch({
        type: 'ADD_SEARCH_ITEM',
        payload: valueEntered
      })
      fetchData(valueEntered);

    } else {
      //Reset result panel if data is empty - user consciously deletes all searches
      setResults([]);
      document.location.reload();
    }
    setEntry(true);
  }
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input
            type="search"
            name="name"
            placeholder="Type your search query here..."
            onChange={handleChange}
            autoFocus
          />
        </form>
      </header>
      <p>RESULTS </p>
      {(loading && entry) ? <div>Loading Results...</div> : displayResults()}
    </div>
  );
}

export default App;


