import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CardMovies = ({ movie }) => {
  const { title, year, poster, type } = movie;

  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: 2,
        m: 5,
        alignItems: 'center',
        flexDirection: 'row',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
      }}
    >
      <CardMedia sx={{ maxHeight: 700, minHeight: 350 }} image={poster} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {type}
        </Typography>
      </CardContent>
    </Card>
  );
};

CardMovies.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardMovies;