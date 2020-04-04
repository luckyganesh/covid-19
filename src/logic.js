const {table} = require('table')

const districtsToMonitor = [
  'East Godavari',
  'Coimbatore',
  'Pune',
  'Hyderabad',
  'Lucknow',
]

const processData = function(data) {
  const newData = {}
  Object.keys(data).forEach(state => {
    const stateData = data[state]["districtData"]
    Object.keys(stateData).forEach(district => {
      newData[district] = stateData[district]["confirmed"]
    })
  })
  const tableData = districtsToMonitor.map(district => {
    return [district, newData[district]]
  })
  console.log(table(tableData))
}

module.exports = {
  processData
}