const https = require('https')
const {processData} = require('./src/logic')

const DISTRICT_URL_OPTIONS = {
  hostname: "api.covid19india.org",
  path: "/v2/state_district_wise.json",
  method: "GET"
}

const TOTAL_COUNT_URL_OPTIONS = {
  hostname: "api.covid19india.org",
  path: "/data.json",
  method: "GET"
}

const parseAndProcess = function(totalData, res) {
  let data = '';

  res.on('data', d => {
    data += d
  })

  res.on('end', () => {
    processData(totalData,JSON.parse(data))
  })
}

const main = function(){
  const totalDataRequest = https.request(TOTAL_COUNT_URL_OPTIONS,(res) =>{
    let data = '';

    res.on('data', d => {
      data += d
    })

    res.on('end', () => {
      const districtDataReq = https.request(DISTRICT_URL_OPTIONS, parseAndProcess.bind(null,JSON.parse(data)))
      districtDataReq.end();
    })
  })
  
  totalDataRequest.end();
}

main()