'use strict';

//loading environment variables
require('dotenv').config();

//load npm modules
const expect = require('expect');
const superagent = require('superagent');

//load application modules
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;

describe('testing user router', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /user route', () => {
    it('should create a user and responde with a token', () => {
      return superagent.post(`${API_URL}/user`)
      .send({
        email: 'test@email.com',
        password: 'password',
        isAdmin: 'true',
        isActive: 'true',
      })
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
    it('should respond with a 400 code', () => {
      return superagent.post(`${API_URL}/user`)
        .send({
          password: 'wrong-pwd',
          isAdmin: 'true',
          isActive: 'true',
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with a 400 code', () => {
      return superagent.post(`${API_URL}/user`)
        .send({
          email: 'test@email.com',
          isAdmin: 'true',
          isActive: 'true',
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
});
