import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import CardPopUp from '../../components/card-popup/cardPopup.component';
import Card from '../../components/card/card.component';
import Header from '../../components/header/header.component.style';
import Loader from '../../components/loader/loader.component';
import ServerLogo from '../../components/server-logo/serverLogo.component';
import './style.css';

function Grid(props) {
  const [popUp, setPopUp] = useState(false);
  const [staticArtist, setStaticArtist] = useState({});

  useEffect(() => {
    setTimeout(() => {
      props.setLoaderVal(false);
    }, 500);
  });
  return (
    <div className="grid">
      {props.requestArtist.data.map((el) => {
        return (
          <Card
            setStaticArtist={setStaticArtist}
            setPopUp={setPopUp}
            key={uniqid.process()}
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
      <ServerLogo {...props} />
    </div>
  );
};

export default GridPage;
