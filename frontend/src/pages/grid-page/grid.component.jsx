import { useEffect, useState } from 'react';
import CardPopUp from '../../components/card-popup/cardPopup.component';
import Card from '../../components/card/card.component';
import Header from '../../components/header/header.component.style';
import Loader from '../../components/loader/loader.component';
import './style.css';

function Grid({ requestArtist, setLoaderVal, ...props }) {
  const [popUp, setPopUp] = useState(false);
  const [staticArtist, setStaticArtist] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoaderVal(false);
    }, 500);
  });
  return (
    <div className="grid">
      {requestArtist.data.map((el) => {
        return (
          <Card
            setStaticArtist={setStaticArtist}
            setPopUp={setPopUp}
            key={el.id}
            artist={el}
          />
        );
      })}
      {popUp && (
        <CardPopUp artist={staticArtist} popUp={popUp} setPopUp={setPopUp} {...props} />
      )}
    </div>
  );
}

const GridPage = (props) => {
  const [loaderVal, setLoaderVal] = useState(true);
  return (
    <div className="grid-container">
      <Header {...props} />
      {loaderVal && (
        <div className="grid-loader-control">
          {' '}
          <Loader />
        </div>
      )}
      {!props.loadingData && <Grid setLoaderVal={setLoaderVal} {...props} />}
    </div>
  );
};

export default GridPage;
