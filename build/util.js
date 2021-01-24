const yaml = require('yamljs')
const fs = require('fs')
const p = require('path')

const configPath = p.join(__dirname, './config.yml')
exports.configPath = configPath

function loadYamlSync (path) {
  return yaml.parse(fs.readFileSync(path).toString())
}

function getConfig () {
  const config = loadYamlSync(configPath)

  return (refresh) => {
    if (refresh) {
      config = loadYamlSync(configPath)
    }
    return config
  }
}

exports.loadYamlSync = loadYamlSync
exports.getConfig = getConfig()
