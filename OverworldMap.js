class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.values(this.gameObjects).forEach((o) => {
      //TODO: determine if this object should actually mount
      o.mount(this);
    });
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/PIOM/MAPS/biggerandbetter2.png",
    upperSrc: "",

    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(14),
        y: utils.withGrid(39),
        src: "/PIOM/CHARS/mainchar2.png",
      }),

      npc1: new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(37),
        src: "/PIOM/CHARS/rachel.png",
      }),

      redBoat: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(39),
        src: "/PIOM/MAPS/redBoat.png",
      }),
    },
    walls: {
      //  sea and bridge
      [utils.asGridCoord(13, 37)]: true,
      [utils.asGridCoord(12, 37)]: true,
      [utils.asGridCoord(11, 37)]: true,
      [utils.asGridCoord(10, 37)]: true,
      [utils.asGridCoord(9, 37)]: true,
      [utils.asGridCoord(8, 37)]: true,
      [utils.asGridCoord(7, 37)]: true,
      [utils.asGridCoord(6, 37)]: true,
      [utils.asGridCoord(5, 37)]: true,
      [utils.asGridCoord(4, 37)]: true,
      [utils.asGridCoord(3, 37)]: true,
      [utils.asGridCoord(2, 37)]: true,
      [utils.asGridCoord(1, 37)]: true,
      [utils.asGridCoord(0, 37)]: true,
      [utils.asGridCoord(13, 38)]: true,
      [utils.asGridCoord(13, 39)]: true,
      [utils.asGridCoord(16, 38)]: true,
      [utils.asGridCoord(16, 37)]: true,
      [utils.asGridCoord(16, 39)]: true,
      [utils.asGridCoord(17, 37)]: true,
      [utils.asGridCoord(18, 37)]: true,
      [utils.asGridCoord(19, 37)]: true,
      [utils.asGridCoord(20, 37)]: true,
      [utils.asGridCoord(21, 37)]: true,
      [utils.asGridCoord(22, 37)]: true,
      [utils.asGridCoord(23, 37)]: true,
      [utils.asGridCoord(24, 37)]: true,
      [utils.asGridCoord(25, 37)]: true,
      [utils.asGridCoord(26, 37)]: true,
      [utils.asGridCoord(27, 37)]: true,
      [utils.asGridCoord(28, 37)]: true,
      [utils.asGridCoord(29, 37)]: true,
      [utils.asGridCoord(30, 37)]: true,
      [utils.asGridCoord(31, 37)]: true,
      [utils.asGridCoord(32, 37)]: true,
      [utils.asGridCoord(33, 37)]: true,
      [utils.asGridCoord(34, 37)]: true,
      [utils.asGridCoord(35, 37)]: true,
      [utils.asGridCoord(36, 37)]: true,
      [utils.asGridCoord(37, 37)]: true,
      [utils.asGridCoord(38, 37)]: true,
      [utils.asGridCoord(39, 37)]: true,
      [utils.asGridCoord(40, 37)]: true,
      [utils.asGridCoord(41, 37)]: true,
      [utils.asGridCoord(42, 37)]: true,
      [utils.asGridCoord(43, 37)]: true,
      [utils.asGridCoord(44, 37)]: true,
      [utils.asGridCoord(45, 37)]: true,
      [utils.asGridCoord(46, 37)]: true,
      [utils.asGridCoord(47, 37)]: true,
      [utils.asGridCoord(48, 37)]: true,
      [utils.asGridCoord(49, 37)]: true,
      //  sea and bridge
    },
  },
};
