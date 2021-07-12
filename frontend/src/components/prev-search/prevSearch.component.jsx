import { Chip } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import './style.css';

const getSearched = () => {
  let arr = JSON.parse(localStorage.getItem('searched'));
  return arr;
};

const setLocal = (value) => {
  let temp = getSearched(),
    idx = temp.indexOf(value);
  temp.splice(idx, 1);
  localStorage.setItem('searched', JSON.stringify(temp));
};

const SearchedItems = (props) => {
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    let arr = getSearched(),
      temp = [];
    arr.forEach((el) => {
      temp.push({ key: uniqid.process(), label: el });
    });
    setSearched(temp);
  }, []);

  const handleDelete = (chipToDelete) => {
    setSearched((displayed) => displayed.filter((chip) => chip.key !== chipToDelete.key));
    setLocal(chipToDelete.label);
    axios.delete('/api/mongoose/delete/' + chipToDelete.label);
  };

  return (
    <div className="searched-container">
      <div className="searched-label">Previous searches:</div>
      <div className="searched-border">
        {searched.map((chip) => {
          return (
            <div className="chip-container" key={chip.key}>
              <Chip
                color={'secondary'}
                size={'small'}
                style={{ fontSize: '.9vw', minWidth: '5vw', backgroundColor: '#e81c45a2' }}
                label={chip.label}
                onDelete={() => handleDelete(chip)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchedItems;
