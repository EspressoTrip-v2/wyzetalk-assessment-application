import { Button, Tooltip } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import uniqid from 'uniqid';
import Loader from '../loader/loader.component';
import logo from './none.png';
import './style.css';

const AlbumsList = ({ albums }) => {
  return (
    <div key={uniqid.process()} className="album-list-container">
      {albums.data.map((el, idx) => {
        return (
          <div className="album-element" key={uniqid.process()}>
            {el.title}
          </div>
        );
      })}
    </div>
  );
};

const SongsList = ({ songs }) => {
  return (
    <div className="songs-list-container">
      {songs.data.map((el, idx) => {
        return (
          <div key={uniqid.process()}>
            <Tooltip key={uniqid.process()} title={'Album name: ' + el.album.title} arrow>
              <div className="songs-element" key={uniqid.process()}>
                {el.title}
              </div>
            </Tooltip>
            <ReactAudioPlayer
              key={uniqid.process()}
              style={{
                height: '3.5vh',
                width: '23vw',
                marginBottom: '1.5vh',
                marginTop: '0.5vh',
              }}
              src={el.preview}
              controls
            />
          </div>
        );
      })}
    </div>
  );
};

const CardPopUp = ({ popUp, setPopUp, artist, ...props }) => {
  const [albums, setAlbums] = useState('');
  const [songs, setSongs] = useState('');
  const [loaderAlbums, setLoaderAlbums] = useState(true);
  const [loaderSongs, setLoaderSongs] = useState(true);

  // Album requests to BFF API
  const requestAlbums = async () => {
    let response = await axios.get('/api/server/albums/' + artist.id);
    if (response.data === 'error' || response.data.total === 0) {
      setAlbums({ error: 0 });
    } else {
      setAlbums(response.data);
    }
    setTimeout(() => {
      setLoaderAlbums(false);
    }, 500);
  };

  // Album requests to BFF API
  const requestSongs = async () => {
    let response = await axios.get('/api/server/top/' + artist.id);
    if (response.data === 'error' || response.data.total === 0) {
      setSongs({ error: 0 });
    } else {
      setSongs(response.data);
    }
    setTimeout(() => {
      setLoaderSongs(false);
    }, 500);
  };
  useEffect(() => {
    requestAlbums();
    requestSongs();
  }, []);

  return popUp ? (
    <div className="blur">
      <div className="card-popup">
        <div className="popup-btn">
          <Button
            onClick={() => {
              setPopUp(false);
            }}
            style={{
              zIndex: 4,
              backgroundColor: '#E81C46',
              color: '#fff',
              fontSize: '.8vw',
              height: '1.8vw',
              width: '2vw',
              maxWidth: '3vw',
              position: 'relative',
              borderRadius: '1vw',
            }}
            variant="contained"
          >
            Close
          </Button>
        </div>
        <div className="detail-container">
          <div className="img-container">
            <img className="artist-img-popup" src={artist.picture_big} alt={artist.name} />
            <div className="name-popup">
              <span>{artist.name}</span>
            </div>
          </div>
          <div className="artist-albums">
            <div className="albums-label">Albums</div>
            <div className="loader-control"> {loaderAlbums && <Loader />}</div>
            {albums.data && (
              <AlbumsList
                albums={albums}
                loaderAlbums={loaderAlbums}
                setLoaderAlbums={setLoaderAlbums}
              />
            )}
            {!albums.data && !loaderAlbums ? (
              <div className="filler-popup">
                <img className="none-img" src={logo} alt="no result" />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="artist-detail">
            <div className="songs-label">Top 5 Songs</div>
            <div className="loader-control">{loaderSongs && <Loader />}</div>
            {songs.data && (
              <SongsList
                songs={songs}
                loaderSongs={loaderSongs}
                setLoaderSongs={setLoaderSongs}
              />
            )}
            {!songs.data && !loaderSongs ? (
              <div className="filler-popup">
                <img className="none-img" src={logo} alt="no result" />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

export default CardPopUp;
