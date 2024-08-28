import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Movie, Rating, User } from './src/model.js';


const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next()
  }
}


// First Route: GET /api/movies
// returns a list of movies
app.get('/api/movies', async (req, res) => {
  const allMovies = await Movie.findAll();
  res.json(allMovies);
});

// Second Route: GET /api/movies/:movieId
// Should respond with details about one movie
app.get('/api/movies/:movieId', async (req, res) => {
  const { movieId } = req.params
  const oneMovie = await Movie.findByPk(movieId);
  res.json(oneMovie);
});

// Third Route: POST /api/auth
// will need a body with email and password
// will return {"success": true} or {"success": false}
app.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: {email: email } });
  if (user && user.password === password) {
    req.session.userId = user.userId;
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }   
});

// Fourth Route: POST /api/logout
// only be available if a user is logged in (if req.session.userId exists) 
// send an unauthorized error message if req.session.userId doesn't exist
// if it does exist, destroy the session and send a success message
app.post('/api/logout', loginRequired, (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Fifth Route: GET /api/ratings
// login required
// create a movie rating for the current user
app.get('/api/ratings', loginRequired, async (req, res) => {
  const { userId } = req.session;
  const user = await User.findByPk(userId);
    
    const ratings = await user.getRatings({
       include: {
        model: Movie,
        attributes: ['title'],
       },
    });
    res.json(ratings);
});

// Sixth Route: POST /api/ratings
// should create a ratings for the current user, will need a body
// should send the newly created rating as a JSON response
app.post('/api/ratings', loginRequired, async (req, res) => {
  const { userId } = req.session;
  const { movieId, score } = req.body;
  
  const user = await User.findByPk(userId);
  const newRating = await user.createRating({
      movieId: movieId, 
      score: score,
    });
    res.json(newRating);
})




ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));
