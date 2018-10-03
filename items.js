const axe = {
  id: 1,
  name: 'An axe',
  text: 'One hand axe',
  'damage': 2,
  'isTakeable' : true,
}

const torch = {
  id: 2,
  name: 'A torch',
  text: 'It has been lit',
  'damage': null,
  'isTakeable' : true,
}

const flagon = {
  id: 3,
  name: 'A leather flagon',
  text: 'It is full',
  'damage': null,
  'isTakeable' : true,
}

const Items = [axe, torch, flagon]

module.exports = Items
