//imports
const express = require('express')
const {postgraphile} = require('postgraphile')
const path = require('path')
const run_all_sql_scripts = require('./sql_scripts/run_all_scripts')

//access process.env variables defined in gitignored .env file
require('dotenv').config()

//create express app, this defines our http request routes. 
const app = express()

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//default recommended settings for postgraphile 
const postgraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customise condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: "omit",
  pgSettings(req) {
    /* TODO */
  },
};

//run all sql scripts before
(async() => await run_all_sql_scripts())()

//this will tell express to let postgraphile handle /graphql requests. process.env.Data
app.use(postgraphile(process.env.DATABASE_URL, postgraphileOptions))
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  //res.send('hello world');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
