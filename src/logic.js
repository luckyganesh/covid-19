const { table } = require('table')
const configuration = require('../config.json');

const countField = function (districtData, field) {
    return districtData.reduce((count, districtData) => {
        return count + districtData[ field ]
    }, 0)
}

const provideMultiple = function (data, fields, element) {
    const myData = data[ element ];
    return [ element, ...fields.map(field => myData[ field ]) ]
}

const showStatesTable = function (data) {
    const statesData = {}
    const fields = [ "confirmed", "active" ]
    data.forEach(({ state, districtData }) => {
        const stateData = {}
        fields.forEach(field => {
            stateData[ field ] = countField(districtData, field);
        })
        statesData[ state ] = stateData;
    })
    const tableData = configuration.states.map(provideMultiple.bind(null, statesData, fields))
    tableData.unshift([ "State", ...fields ])
    console.log(table(tableData))
}

const showDistrictsTable = function (data) {
    const districtsData = {}
    const fields = [ "confirmed", "active" ]
    data.forEach(({ districtData }) => {
        districtData.forEach((district) => {
            const requiredData = {};
            fields.forEach(field => {
                requiredData[ field ] = district[ field ]
            })
            districtsData[ district[ "district" ] ] = requiredData
        })
    })
    const tableData = configuration.districts.map(provideMultiple.bind(null, districtsData, fields))
    tableData.unshift([ "District", ...fields ])
    console.log(table(tableData))
}

const showTotalTable = function (data) {
    const tableData = []
    tableData.push([ "Total", "Analysis", "Percentage" ])
    const analysisFields = [ "confirmed", "active", "recovered", "deaths" ];
    const confirmed = data["confirmed"];
    analysisFields.forEach(x => {
        const count = data[ x ];
        tableData.push([ x,count , (count*100/confirmed).toFixed(2)  ])
    })
    console.log(table(tableData))
}

const processData = function (totalData, districtData) {
    showTotalTable(totalData[ "statewise" ].find(x => x[ "state" ] === "Total"))
    showStatesTable(districtData)
    showDistrictsTable(districtData)
}

module.exports = {
    processData
}