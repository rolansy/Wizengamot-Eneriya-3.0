import express from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:5173',
  clientID: 'FzaGfDjRwGhlXLXc75AWhtMb3DrQSfq4',
  issuerBaseURL: 'https://dev-n4wg3rh5bvvgj2bw.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(5173, function() {
  console.log('Listening on http://localhost:5173');
});