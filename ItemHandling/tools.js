
const drawMap = (currentLocation, visited, mapIn) => {

    let map = JSON.parse(JSON.stringify(mapIn));

    for (let x = 0; x < map.length; x++) {

      for (let y = 0; y < map[x].length; y++) {
        if (visited.includes(map[x][y])) {
            map[x][y] = (currentLocation === map[x][y]) ? 'x' : '-'
          } else {
            map[x][y] = '*'
          }
        }
      }

      return map
}

module.exports = {
  drawMap,
}
