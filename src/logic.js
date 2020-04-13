const { table } = require('table')
const configuration = require('../config.json');
const districtsToMonitor = configuration.districts;
const statesToMonitor = configuration.states;

const countConfirmed = function (districtsData) {
  return districtsData.reduce((count, dirstrictData) => {
    return count + dirstrictData["confirmed"]
  }, 0)
}

const provide = function(data,element) {
  return [element, data[element]]
}

const showStatesTable = function (data) {
  const statesData = {}
  data.forEach(({ state, districtData }) => {
    statesData[state] = countConfirmed(districtData)
  })
  const tableData = configuration.states.map(provide.bind(null,statesData))
  tableData.unshift(["State", "confirmed"])
  console.log(table(tableData))
}

const showDistrictsTable = function (data) {
  const districtsData = {}
  data.forEach(({ districtData }) => {
    districtData.forEach(({ district, confirmed }) => {
      districtsData[district] = (districtData[district] || 0) + confirmed
    })
  })
  const tableData = configuration.districts.map(provide.bind(null,districtsData))
  tableData.unshift(["District", "Confirmed"])
  console.log(table(tableData))
}

const showTotalTable = function(data){
  const tableData = []
  tableData.push(["Total", "Analysis"])
  const analysisFields = ["confirmed", "active", "recovered" , "deaths"];
  analysisFields.forEach(x => {
    tableData.push([x, data[x]])
  })
  console.log(table(tableData))
}

const processData = function (totalData, districtData) {
  showTotalTable(totalData["statewise"].find(x => x["state"] == "Total"))
  showStatesTable(districtData)
  showDistrictsTable(districtData)
}

module.exports = {
  processData
}