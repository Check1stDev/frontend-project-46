import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

function parseFilepath(filepath) {
  const absPath = path.resolve(process.cwd(), filepath)
  const ext = path.extname(absPath)
  const content = fs.readFileSync(absPath, 'utf-8')

  let data
  if (ext === '.json') {
    data = JSON.parse(content)
  }
  else if (ext === '.yml' || ext === '.yaml') {
    data = yaml.load(content)
  }
  else {
    throw new Error(`Unsupported file format: ${ext}`)
  }
  return data
}

export default parseFilepath
