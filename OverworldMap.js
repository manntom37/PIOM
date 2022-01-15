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
    lowerSrc: "/PIOM/MAPS/bigBoy2.png",
    upperSrc: "",

    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(14),
        y: utils.withGrid(39),
        src: "/PIOM/CHARS/heroNew.png",
      }),

      npc1: new Person({
        x: utils.withGrid(15),
        y: utils.withGrid(34),
        src: "/PIOM/CHARS/rachel.png",
      }),

      guard: new Person({
        x: utils.withGrid(14),
        y: utils.withGrid(13),
        src: "/PIOM/CHARS/guard1.png",
      }),

      guard2: new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(13),
        src: "/PIOM/CHARS/guard1.png",
      }),

      guard3: new Person({
        x: utils.withGrid(8),
        y: utils.withGrid(20),
        src: "/PIOM/CHARS/guard1.png",
      }),
      guard4: new Person({
        x: utils.withGrid(12),
        y: utils.withGrid(20),
        src: "/PIOM/CHARS/guard1.png",
      }),
      // fisherman: new Person({
      //   x: utils.withGrid(22),
      //   y: utils.withGrid(38),
      //   src: "/PIOM/CHARS/fisherman.png",
      // }),
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
      //  ^ sea and bridge
      [utils.asGridCoord(6, 36)]: true,
      [utils.asGridCoord(6, 35)]: true,
      [utils.asGridCoord(6, 34)]: true,
      [utils.asGridCoord(6, 33)]: true,
      [utils.asGridCoord(5, 33)]: true,
      [utils.asGridCoord(4, 33)]: true,
      [utils.asGridCoord(3, 33)]: true,
      [utils.asGridCoord(2, 33)]: true,
      [utils.asGridCoord(1, 33)]: true,
      [utils.asGridCoord(0, 33)]: true,
      [utils.asGridCoord(0, 34)]: true,
      [utils.asGridCoord(0, 35)]: true,
      [utils.asGridCoord(0, 36)]: true,
      // ^ building left down of bridge
      [utils.asGridCoord(6, 28)]: true,
      [utils.asGridCoord(6, 27)]: true,
      [utils.asGridCoord(6, 26)]: true,
      [utils.asGridCoord(6, 25)]: true,
      [utils.asGridCoord(5, 25)]: true,
      [utils.asGridCoord(4, 25)]: true,
      [utils.asGridCoord(3, 25)]: true,
      [utils.asGridCoord(2, 25)]: true,
      [utils.asGridCoord(1, 25)]: true,
      [utils.asGridCoord(0, 25)]: true,
      [utils.asGridCoord(0, 26)]: true,
      [utils.asGridCoord(0, 27)]: true,
      [utils.asGridCoord(0, 28)]: true,
      [utils.asGridCoord(1, 28)]: true,
      [utils.asGridCoord(2, 28)]: true,
      [utils.asGridCoord(3, 28)]: true,
      [utils.asGridCoord(4, 28)]: true,
      [utils.asGridCoord(5, 28)]: true,
      // ^ shop left above ^
      [utils.asGridCoord(14, 28)]: true,
      [utils.asGridCoord(15, 28)]: true,
      [utils.asGridCoord(16, 28)]: true,
      [utils.asGridCoord(18, 28)]: true,
      [utils.asGridCoord(19, 28)]: true,
      [utils.asGridCoord(20, 28)]: true,
      [utils.asGridCoord(20, 27)]: true,
      [utils.asGridCoord(20, 26)]: true,
      [utils.asGridCoord(20, 25)]: true,
      [utils.asGridCoord(19, 25)]: true,
      [utils.asGridCoord(18, 25)]: true,
      [utils.asGridCoord(17, 25)]: true,
      [utils.asGridCoord(16, 25)]: true,
      [utils.asGridCoord(15, 25)]: true,
      [utils.asGridCoord(14, 25)]: true,
      [utils.asGridCoord(14, 28)]: true,
      [utils.asGridCoord(14, 27)]: true,
      [utils.asGridCoord(14, 26)]: true,
      [utils.asGridCoord(14, 25)]: true,
      [utils.asGridCoord(17, 27)]: true,
      [utils.asGridCoord(17, 26)]: true,
      // ^ tavern?
    },
  },
};
