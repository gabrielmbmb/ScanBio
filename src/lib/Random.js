const Chance = require('chance');
const Sports = require('../../data/sports.json');
const Ethnic = require('../../data/ethnic.json');
const Diseases = require('../../data/diseases.json');
const Analytics = require('../../data/analytics.json');

function randomSports() {
  var chance = new Chance();
  var sportsNum = chance.integer({min: 3, max: 8});
  var sportsAvailable = Sports.sports.length - 1;
  var randomSports = [];
  var sportsAlreadyUsed = [];

  // select sports randomly and give to each one random performance
  for (let i = 0; i < sportsNum; i++) {
    let index = chance.integer({min: 0, max: sportsAvailable});
    if (!sportsAlreadyUsed.find(j => {
      return j === index;
    })) {
      sportsAlreadyUsed.push(index);
      var randomSport = Sports.sports[index];
      randomSport['performance'] = chance.integer({min: 20, max: 100});
      randomSports.push(randomSport);  
    }
  }

  // sort data by performance
  randomSports.sort((sportA, sportB) => 
    sportA.performance < sportB.performance ? 1 : -1
  );

  //stringify
  randomSports.forEach(country => country['performance'] = parseInt(country['performance'], 10) + '%');

  return randomSports;
}

function randomEthnic() {
  var chance = new Chance();
  var countriesNum = chance.integer({min: 3, max: 10});
  var countriesAvailable = Ethnic.ethnic.length - 1;
  var randomCountries = [];
  var countriesAlreadyUsed = [];
  var sum = 0;

  for (let i = 0; i < countriesNum; i++) {
    let index = chance.integer({min: 0, max: countriesAvailable});
    if (!countriesAlreadyUsed.find(j => {
      return j === index;
    })) {
      countriesAlreadyUsed.push(index);
      var randomCountry = Ethnic.ethnic[index];
      randomCountry['percentage'] = chance.integer({min: 1, max: 100});
      sum += randomCountry['percentage'];
      randomCountries.push(randomCountry);  
    }
  }

  // calculate percentage to sum 100%
  randomCountries.forEach(country => {
    country['percentage'] = Math.round(country['percentage'] / sum * 100);
  });

  // sort data by percentage
  randomCountries.sort((countryA, countryB) => 
    countryA.percentage < countryB.percentage ? 1 : -1
  );

  // stringify
  randomCountries.forEach(country => {
    country['percentage'] = parseInt(country['percentage'], 10) + '%';
  });

  return randomCountries;
}

function randomDiseases() {
  var chance = new Chance();
  var diseasesNum = chance.integer({min: 3, max: 8});
  var diseasesAvailable = Sports.sports.length - 1;
  var randomDiseases = [];
  var diseasesAlreadyUsed = [];

  // select disease randomly and give to each one random probability
  for (let i = 0; i < diseasesNum; i++) {
    let index = chance.integer({min: 0, max: diseasesAvailable});
    if (!diseasesAlreadyUsed.find(j => {
      return j === index;
    })) {
      diseasesAlreadyUsed.push(index);
      var randomDisease = Diseases.diseases[index];
      randomDisease['probability'] = chance.integer({min: 5, max: 85});
      randomDiseases.push(randomDisease);  
    }
  }

  // sort data by probability
  randomDiseases.sort((diseaseA, diseaseB) => 
    diseaseA.probability < diseaseB.probability ? 1 : -1
  );

  //stringify
  randomDiseases.forEach(disease => disease['probability'] = parseInt(disease['probability'], 10) + '%');

  return randomDiseases;
}

function randomAnalytics() {
  var chance = new Chance();
  var namesAvailable = Analytics.analytics.length - 1;
  var randomAnalytics = [];
  for (let i = 0; i < namesAvailable; i++) {
    var randomAnalytic = Analytics.analytics[i];
    randomAnalytic['value'] = chance.floating({ 
      min: randomAnalytic['min'], 
      max: randomAnalytic['max'], 
      fixed: 2 
    }) + randomAnalytic['unit'];
    randomAnalytics.push(randomAnalytic);
  }

  return randomAnalytics;
}

module.exports = {
  randomSports,
  randomEthnic,
  randomDiseases,
  randomAnalytics
}

