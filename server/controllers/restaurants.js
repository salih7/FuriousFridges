'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');
const config = require('config')['Google_Places'];


module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      models.Stats.where({ city: result.attributes.destination }).fetch()
      .then((data) => {
        request.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${config.clientID}&address=${result.attributes.destination}`,
              (error, response, body) => {
                if (error) {
                  console.error(err);
                } else {
                  var geoCoords = JSON.parse(body).results[0].geometry['location'];
                  request.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geoCoords.lat},${geoCoords.lng}&radius=500&type=restaurant&key=${config.clientID}`, 
                    (error, response, body) => {
                      if (error) {
                        console.error(error);
                      }
                      var body = JSON.parse(body);
                      var restaurants = body.results;
                      var restaurantData = {};
                      var dataLength = 10;
                      var currentIndex = 0;
                      var validData = true;
                      while (dataLength > 0 && validData) {
                        var restaurantObj = {};
                        restaurantObj['name'] = restaurants[currentIndex].name;
                        restaurantObj['rating'] = restaurants[currentIndex].rating;
                        if (restaurants[currentIndex].icon) {
                          restaurantObj['image'] = restaurants[currentIndex].icon; 
                        } else {
                          restaurantObj['image'] = 'http://tctechcrunch2011.files.wordpress.com/2011/01/meetuplogo.jpeg';
                        }
                        restaurantData[currentIndex] = restaurantObj;
                        dataLength--;
                        if (!restaurants[currentIndex + 1]) {
                          validData = false;
                        }
                        currentIndex++;
                      }
                      res.send(restaurantData);
                    });
                 
                }
              });
      }); 
    });
};
