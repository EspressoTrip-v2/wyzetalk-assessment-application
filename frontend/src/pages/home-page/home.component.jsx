// React components
import { useEffect, useState } from 'react';
import SearchedItem from '../../components/searched-items/searchItem.component';
import Start from '../../components/start/start.component';
import './style.css';

const HomePage = (props) => {
  const [storageArr, setStorageArr] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('search-results')) {
      setStorageArr(JSON.parse(localStorage.getItem('search-results')));
    }
  }, []);

  // useEffect(() => {
  //   return () => {
  //     localStorage.setItem('search-results', JSON.stringify(storageArr));
  //   };
  // });

  return (
    <div className="home">
      <div>
        <Start {...props} />
        <div className="prev-search">
          <span className="label">Your Previous Searches:</span>
          <div className="prev-search-container">
            {storageArr.map((el, idx) => (
              <SearchedItem
                storageArr={storageArr}
                setStorageArr={setStorageArr}
                key={idx}
                searchValue={el}
              ></SearchedItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
