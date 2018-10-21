class protagonist {

  constructor(health = 50) {
    this.health = health
  }

  setHealth(health) {this.health = health}
  getHealth() {return this.health}

}

module.exports = protagonist
