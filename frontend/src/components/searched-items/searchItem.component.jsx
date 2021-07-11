import { Chip } from '@material-ui/core';
import './style.css';

const deleteItem = (searchValue, stateArr, setState) => {
  let arr = stateArr.slice();
  let idx = arr.findIndex((el) => el === searchValue);
  arr.splice(idx, 1);
  setState(arr);
};

const SearchedItem = ({ searchValue, storageArr, setStorageArr }) => {
  return (
    <Chip
      size={'small'}
      style={{ fontSize: '.8vw' }}
      label={searchValue}
      onDelete={() => {
        deleteItem(searchValue, storageArr, setStorageArr);
      }}
      className="prev-searches"
    />
  );
};

export default SearchedItem;
