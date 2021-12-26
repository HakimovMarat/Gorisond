const express = require ('express');
const router = express.Router();

const card  = require('../models/card');
const pass  = require('../models/pass');
const find  = require('../models/find');
const avat  = require('../models/avat');
const user  = require('../models/user');
const love  = require('../models/love');
const pers  = require('../models/pers');

router.get('/pers', (req, res) => {
  pers(req, res)
});
router.get('/card', (req, res) => {
  card(req, res)
});
router.get('/pass', (req, res) => {
  pass(req, res)
});
router.get('/find', (req, res) => {
  find(req, res)
});
router.get('/avat', (req, res) => {
  avat(req, res)
});
router.get('/user', (req, res) => {
  user(req, res)
});
router.get('/love', (req, res) => {
  love(req, res)
});

module.exports = router;
