import SearchedItems from '../../components/prev-search/prevSearch.component';
import Start from '../../components/start/start.component';
import './style.css';

const HomePage = (props) => {
  return (
    <div className="home">
      <div className="home-container">
        <Start {...props} />
        <SearchedItems />
      </div>
    </div>
  );
};

export default HomePage;
