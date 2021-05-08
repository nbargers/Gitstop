const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const schema = require('./schema/dbSchema.js');
const resolvers = require('./resolvers/resolvers.js');
const loginRouter = require('./routes/loginRouter.js');
const oauthRouter = require('./routes/oauthRouter.js');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

const gqlServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

// app.use('/graphql', bodyParser.json(), gqlServer({}));

// Routes
app.use('/login', loginRouter);
app.use('/oauth-callback', oauthRouter);

gqlServer.applyMiddleware({ app });

app.get('*', (err, req, res, next) => {
  res.status(404).send('Server Error', err);
  return next();
});

app.use((err, req, res, next) => {
  console.log('Global Err', err);
  const defaultErr = {
    log: 'Express error handler caught: Unknown middleware error',
    status: 400,
    message: {
      err: 'Unexpected error occured',
    },
  };

  const errObj = Object.assign(defaultErr, err);
  console.log('Server Error:', errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(port, () => {
  console.log(`Server listening at PORT ${port}`);
});
