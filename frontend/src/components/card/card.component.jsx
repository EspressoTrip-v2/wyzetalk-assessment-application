import './style.css';
const Card = ({ setPopUp, artist, setStaticArtist }) => {
  const staticArtist = artist;
  return (
    <div
      onClick={() => {
        setPopUp(true);
        setStaticArtist(staticArtist);
      }}
      className="card"
    >
      <span className="fan">Fans: &nbsp; {artist.nb_fan}</span>
      <img className="artist-img" alt="artist" src={artist.picture_medium} />
      <div className="name">
        <span>{artist.name}</span>
      </div>
    </div>
  );
};

export default Card;
