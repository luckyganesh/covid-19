const { table } = require('table')

const districtsToMonitor = [
  "East Godavari",
  "Coimbatore",
  "Pune",
  "Mumbai"
]

const statesToMonitor = [
  "Andhra Pradesh",
  "Tamil Nadu",
  "Maharashtra"
]

const countConfirmed = function (districtsData) {
  return districtsData.reduce((count, dirstrictData) => {
    return count + dirstrictData["confirmed"]
  }, 0)
}

const showStatesTable = function (data) {
  const statesData = {}
  data.forEach(({ state, districtData }) => {
    statesData[state] = countConfirmed(districtData)
  })
  const tableData = statesToMonitor.map(state => {
    return [state, statesData[state]]
  })
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
  const tableData = districtsToMonitor.map(district => {
    return [district, districtsData[district]]
  })
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