const Chance = require('chance');
const Sports = require('../../data/sports.json');

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
      randomSport['performance'] = parseInt(chance.integer({min: 20, max: 100}), 10) + '%'; 
      randomSports.push(randomSport);  
    }
  }

  // sort data by performance
  randomSports.sort((a,b) => 
    (a.performance < b.performance) ? 1 : -1
  );

  return randomSports;
}

randomSports();

module.exports = {
  randomSports
}

