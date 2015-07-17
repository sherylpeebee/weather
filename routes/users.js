var express = require('express');
var router = express.Router();
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

    /* GET users listing. */
    router.get('/', function(req, res, next) {
      res.send('respond with a resource');
    });








module.exports = router;
