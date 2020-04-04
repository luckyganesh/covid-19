const https = require('https')
const {processData} = require('./src/logic')

const options = {
  hostname: "api.covid19india.org",
  path: "/v2/state_district_wise.json",
  method: "GET"
}

const req = https.request(options, res => {
  let data = '';

  res.on('data', d => {
    data += d
  })

  res.on('end', () => {
    processData(JSON.parse(data))
  })
})

req.on('error', error => {
  console.log(error);
})

req.end();