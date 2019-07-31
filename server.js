import express from 'express'
import startups from './startups-mock'

const app = express()
const port = 3000

// with recursive
const interestMatch = (interests, startups, index = startups.length - 1, matches = []) => {
  if (index < 0) {
    return matches
  } else {
    for (let i = 0; i < interests.length; i++) {
      if (startups[index].interests.indexOf(interests[i]) !== -1) {
        const duplicate = matches.filter(match => (match.name === startups[index].name))
        if (duplicate.length < 1) {
          matches.push(startups[index])
        }
      }
    }

    return interestMatch(interests, startups, index - 1, matches)
  }
}

// without recursive
const interestMatchNonRecursive = (interests, startups) => {
  let matches = []
  for (let i = 0; i < interests.length; i++) {
    for (let x = 0; x < startups.length; x++) {
      if (startups[x].interests.indexOf(interests[i]) !== -1) {
        const duplicate = matches.filter(match => (match.name === startups[x].name))
        if (duplicate.length < 1) {
          matches.push(startups[x])
        }
      }
    }
  }

  return matches
}

// Why do we use recursive?

app.use(express.json())

app.get('/', (req, res) => {
  res.send(startups)
})

app.post('/match', (req, res) => {
  const { interests } = req.body
  const matches = interestMatch(interests, startups)

  res.send(matches)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))