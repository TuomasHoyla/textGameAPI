const entrance = {
  id: 1,
  name: 'Entrance',
  text: 'A huge wooden door. It seems to be open',
  itemIds: [],
  //        n   s     e      w
  exitIds: [2, null, null, null]
}

const entranceHall = {
  id: 2,
  name: 'Entrance Hall',
  text: 'A large hall. Even though it has been lit with a few torches, you cannot see to the very end. The entrance behind you is open.',
  itemIds: [2],
  exitIds: [3, 1, null, null]
}

const hall = {
  id: 3,
  name: 'Hall',
  text: 'A passway corridor. South, you see entrance hall. On west there lies armory',
  itemIds: [],
  exitIds: [null, 2, null, 4]
}

const armory = {
  id: 4,
  name: 'Armory',
  text: 'A small armory. There are racks on the wall. ',
  itemIds: [1],
  exitIds: [null, null, 3, null]
}

const map =
[
  [4, 3, '*'],
  ['*', 2, '*'],
  ['*', 1, '*'],
]

const Locations = {
  rooms : [entrance, entranceHall, hall, armory],
  map: map,
}

module.exports = Locations
