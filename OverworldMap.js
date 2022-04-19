class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
    console.log("Thank you for playing my game :)");
    console.log("email: thomasemann4@gmail.com");
    console.log("please listen with sound on!");
    console.log("");
    console.log(`CONTROLS:
WASD, ARROW KEYS FOR MOVEMENT
TALK TO NPCs BY PRESSING ENTER NEAR THEM
    `);
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
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key];
      object.id = key;
      //TODO: determine if this object should actually mount
      object.mount(this);
    });
  }
  async startCutScene(events) {
    this.isCutscenePlaying = true;
    // async events
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;
    // reset idlr behaviours
    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this)
    );
  }
  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutScene(match.talking[0].events);
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutScene(match[0].events);
    }
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
    lowerSrc: "/PIOM/MAPS/cv-land-map.png",
    upperSrc: "/PIOM/MAPS/cvmap-upper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,

        x: utils.withGrid(26),
        y: utils.withGrid(43),
        src: "/PIOM/CHARS/heroNew.png",
      }),

      npc1: new Person({
        x: utils.withGrid(27),
        y: utils.withGrid(37),
        src: "/PIOM/CHARS/rachel.png",
        behaviorLoop: [
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "up", time: 900 },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up" },
        ],
      }),
      npc2: new Person({
        x: utils.withGrid(25),
        y: utils.withGrid(35),
        src: "/PIOM/CHARS/rachel.png",

        behaviorLoop: [
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "left", time: 1000 },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 1000 },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "right", time: 1000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "right", time: 1000 },
        ],
      }),
    },

    walls: {
      //  sea, bridge and beach
      [utils.asGridCoord(25, 42)]: true,
      [utils.asGridCoord(29, 30)]: true,
      [utils.asGridCoord(29, 37)]: true,
      [utils.asGridCoord(29, 38)]: true,
      [utils.asGridCoord(29, 39)]: true,
      [utils.asGridCoord(29, 40)]: true,
      [utils.asGridCoord(29, 29)]: true,
      [utils.asGridCoord(26, 32)]: true,
      [utils.asGridCoord(25, 43)]: true,
      [utils.asGridCoord(25, 44)]: true,
      [utils.asGridCoord(26, 44)]: true,
      [utils.asGridCoord(27, 44)]: true,
      [utils.asGridCoord(0, 44)]: true,
      [utils.asGridCoord(1, 44)]: true,
      [utils.asGridCoord(2, 44)]: true,
      [utils.asGridCoord(3, 44)]: true,
      [utils.asGridCoord(4, 44)]: true,
      [utils.asGridCoord(5, 44)]: true,
      [utils.asGridCoord(6, 44)]: true,
      [utils.asGridCoord(7, 44)]: true,
      [utils.asGridCoord(8, 44)]: true,
      [utils.asGridCoord(9, 44)]: true,
      [utils.asGridCoord(10, 44)]: true,
      [utils.asGridCoord(11, 44)]: true,
      [utils.asGridCoord(12, 44)]: true,
      [utils.asGridCoord(13, 44)]: true,
      [utils.asGridCoord(14, 44)]: true,
      [utils.asGridCoord(15, 44)]: true,
      [utils.asGridCoord(16, 44)]: true,
      [utils.asGridCoord(17, 44)]: true,
      [utils.asGridCoord(18, 44)]: true,
      [utils.asGridCoord(19, 44)]: true,
      [utils.asGridCoord(20, 44)]: true,
      [utils.asGridCoord(21, 44)]: true,
      [utils.asGridCoord(22, 44)]: true,
      [utils.asGridCoord(23, 44)]: true,
      [utils.asGridCoord(24, 44)]: true,
      [utils.asGridCoord(25, 44)]: true,
      [utils.asGridCoord(26, 44)]: true,
      [utils.asGridCoord(27, 44)]: true,
      [utils.asGridCoord(28, 44)]: true,
      [utils.asGridCoord(29, 44)]: true,
      [utils.asGridCoord(30, 44)]: true,
      [utils.asGridCoord(31, 44)]: true,
      [utils.asGridCoord(32, 44)]: true,
      [utils.asGridCoord(33, 44)]: true,
      [utils.asGridCoord(34, 44)]: true,
      [utils.asGridCoord(35, 44)]: true,
      [utils.asGridCoord(36, 44)]: true,
      [utils.asGridCoord(37, 44)]: true,
      [utils.asGridCoord(38, 44)]: true,
      [utils.asGridCoord(39, 44)]: true,
      [utils.asGridCoord(40, 44)]: true,
      [utils.asGridCoord(41, 44)]: true,
      [utils.asGridCoord(42, 44)]: true,
      [utils.asGridCoord(43, 44)]: true,
      [utils.asGridCoord(44, 44)]: true,
      [utils.asGridCoord(45, 44)]: true,
      [utils.asGridCoord(46, 44)]: true,
      [utils.asGridCoord(47, 44)]: true,
      [utils.asGridCoord(48, 44)]: true,
      [utils.asGridCoord(49, 44)]: true,
      [utils.asGridCoord(50, 44)]: true,
      [utils.asGridCoord(51, 44)]: true,
      [utils.asGridCoord(52, 44)]: true,
      [utils.asGridCoord(53, 44)]: true,
      [utils.asGridCoord(54, 44)]: true,
      [utils.asGridCoord(55, 44)]: true,
      [utils.asGridCoord(56, 44)]: true,
      [utils.asGridCoord(57, 44)]: true,
      [utils.asGridCoord(58, 44)]: true,
      [utils.asGridCoord(59, 44)]: true,
      [utils.asGridCoord(60, 44)]: true,
      [utils.asGridCoord(61, 44)]: true,
      [utils.asGridCoord(62, 44)]: true,
      [utils.asGridCoord(63, 44)]: true,
      [utils.asGridCoord(64, 44)]: true,
      [utils.asGridCoord(65, 44)]: true,
      [utils.asGridCoord(66, 44)]: true,
      [utils.asGridCoord(67, 44)]: true,
      [utils.asGridCoord(68, 44)]: true,
      [utils.asGridCoord(69, 44)]: true,
      [utils.asGridCoord(70, 44)]: true,
      [utils.asGridCoord(71, 44)]: true,
      [utils.asGridCoord(72, 44)]: true,
      [utils.asGridCoord(73, 44)]: true,
      [utils.asGridCoord(74, 44)]: true,
      [utils.asGridCoord(75, 44)]: true,
      [utils.asGridCoord(76, 44)]: true,
      [utils.asGridCoord(77, 44)]: true,
      [utils.asGridCoord(78, 44)]: true,
      [utils.asGridCoord(79, 44)]: true,
      [utils.asGridCoord(80, 44)]: true,
      [utils.asGridCoord(81, 44)]: true,
      [utils.asGridCoord(82, 44)]: true,
      [utils.asGridCoord(83, 44)]: true,
      [utils.asGridCoord(84, 44)]: true,
      [utils.asGridCoord(85, 44)]: true,
      [utils.asGridCoord(86, 44)]: true,
      [utils.asGridCoord(87, 44)]: true,
      [utils.asGridCoord(88, 44)]: true,
      [utils.asGridCoord(89, 44)]: true,
      [utils.asGridCoord(90, 44)]: true,
      [utils.asGridCoord(91, 44)]: true,
      [utils.asGridCoord(92, 44)]: true,
      [utils.asGridCoord(93, 44)]: true,
      [utils.asGridCoord(94, 44)]: true,
      [utils.asGridCoord(95, 44)]: true,
      [utils.asGridCoord(96, 44)]: true,
      [utils.asGridCoord(97, 44)]: true,
      [utils.asGridCoord(98, 44)]: true,
      [utils.asGridCoord(99, 44)]: true,
      // ^ sea ^
      [utils.asGridCoord(11, 0)]: true,
      [utils.asGridCoord(11, 1)]: true,
      [utils.asGridCoord(11, 2)]: true,
      [utils.asGridCoord(11, 3)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(11, 5)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(11, 8)]: true,
      [utils.asGridCoord(11, 9)]: true,
      [utils.asGridCoord(11, 10)]: true,
      [utils.asGridCoord(11, 11)]: true,
      [utils.asGridCoord(11, 12)]: true,
      [utils.asGridCoord(11, 13)]: true,
      [utils.asGridCoord(11, 14)]: true,
      [utils.asGridCoord(11, 15)]: true,
      [utils.asGridCoord(11, 16)]: true,
      [utils.asGridCoord(11, 17)]: true,
      [utils.asGridCoord(11, 18)]: true,
      [utils.asGridCoord(11, 19)]: true,
      [utils.asGridCoord(11, 20)]: true,
      [utils.asGridCoord(11, 21)]: true,
      [utils.asGridCoord(11, 22)]: true,
      [utils.asGridCoord(11, 23)]: true,
      [utils.asGridCoord(11, 24)]: true,
      [utils.asGridCoord(11, 25)]: true,
      [utils.asGridCoord(11, 26)]: true,
      [utils.asGridCoord(11, 27)]: true,
      [utils.asGridCoord(11, 28)]: true,
      [utils.asGridCoord(11, 29)]: true,
      [utils.asGridCoord(11, 30)]: true,
      [utils.asGridCoord(11, 31)]: true,
      [utils.asGridCoord(11, 32)]: true,
      [utils.asGridCoord(11, 33)]: true,
      [utils.asGridCoord(11, 34)]: true,
      [utils.asGridCoord(11, 35)]: true,
      [utils.asGridCoord(11, 36)]: true,
      [utils.asGridCoord(11, 37)]: true,
      [utils.asGridCoord(11, 38)]: true,
      [utils.asGridCoord(11, 39)]: true,
      [utils.asGridCoord(11, 40)]: true,
      [utils.asGridCoord(11, 41)]: true,
      [utils.asGridCoord(11, 42)]: true,
      [utils.asGridCoord(11, 43)]: true,
      [utils.asGridCoord(11, 44)]: true,
      [utils.asGridCoord(11, 45)]: true,
      [utils.asGridCoord(11, 46)]: true,
      [utils.asGridCoord(11, 47)]: true,
      [utils.asGridCoord(11, 48)]: true,
      [utils.asGridCoord(11, 49)]: true,

      // ^  left wall
      [utils.asGridCoord(12, 10)]: true,
      [utils.asGridCoord(13, 10)]: true,
      [utils.asGridCoord(14, 10)]: true,
      [utils.asGridCoord(15, 10)]: true,
      [utils.asGridCoord(16, 10)]: true,
      [utils.asGridCoord(17, 10)]: true,
      [utils.asGridCoord(18, 10)]: true,
      [utils.asGridCoord(19, 10)]: true,
      [utils.asGridCoord(20, 10)]: true,
      [utils.asGridCoord(21, 10)]: true,
      [utils.asGridCoord(22, 10)]: true,
      [utils.asGridCoord(23, 10)]: true,
      [utils.asGridCoord(24, 10)]: true,
      [utils.asGridCoord(25, 10)]: true,
      [utils.asGridCoord(26, 10)]: true,
      [utils.asGridCoord(27, 10)]: true,
      [utils.asGridCoord(28, 10)]: true,
      [utils.asGridCoord(29, 10)]: true,
      [utils.asGridCoord(30, 10)]: true,
      [utils.asGridCoord(31, 10)]: true,
      [utils.asGridCoord(32, 10)]: true,
      [utils.asGridCoord(33, 10)]: true,
      [utils.asGridCoord(34, 10)]: true,
      [utils.asGridCoord(35, 10)]: true,
      [utils.asGridCoord(36, 10)]: true,
      [utils.asGridCoord(37, 10)]: true,
      [utils.asGridCoord(38, 10)]: true,
      [utils.asGridCoord(39, 10)]: true,
      [utils.asGridCoord(40, 10)]: true,
      [utils.asGridCoord(41, 10)]: true,
      [utils.asGridCoord(42, 10)]: true,
      [utils.asGridCoord(43, 10)]: true,
      [utils.asGridCoord(44, 10)]: true,
      [utils.asGridCoord(45, 10)]: true,
      [utils.asGridCoord(46, 10)]: true,
      [utils.asGridCoord(47, 10)]: true,
      [utils.asGridCoord(48, 10)]: true,
      [utils.asGridCoord(49, 10)]: true,
      [utils.asGridCoord(50, 10)]: true,
      [utils.asGridCoord(51, 10)]: true,
      [utils.asGridCoord(52, 10)]: true,
      [utils.asGridCoord(53, 10)]: true,
      [utils.asGridCoord(54, 10)]: true,
      [utils.asGridCoord(55, 10)]: true,
      [utils.asGridCoord(56, 10)]: true,
      // ^ top wall
      [utils.asGridCoord(56, 11)]: true,
      [utils.asGridCoord(56, 12)]: true,
      [utils.asGridCoord(56, 13)]: true,
      [utils.asGridCoord(56, 14)]: true,
      [utils.asGridCoord(56, 15)]: true,
      [utils.asGridCoord(56, 16)]: true,
      [utils.asGridCoord(56, 17)]: true,
      [utils.asGridCoord(56, 18)]: true,
      [utils.asGridCoord(56, 19)]: true,
      [utils.asGridCoord(56, 20)]: true,
      [utils.asGridCoord(56, 21)]: true,
      [utils.asGridCoord(56, 22)]: true,
      [utils.asGridCoord(56, 23)]: true,
      [utils.asGridCoord(56, 24)]: true,
      [utils.asGridCoord(56, 25)]: true,
      [utils.asGridCoord(56, 26)]: true,
      [utils.asGridCoord(56, 27)]: true,
      [utils.asGridCoord(56, 28)]: true,
      [utils.asGridCoord(56, 29)]: true,
      [utils.asGridCoord(56, 30)]: true,
      [utils.asGridCoord(56, 31)]: true,
      [utils.asGridCoord(56, 32)]: true,
      [utils.asGridCoord(56, 33)]: true,
      [utils.asGridCoord(56, 34)]: true,
      [utils.asGridCoord(56, 35)]: true,
      [utils.asGridCoord(56, 36)]: true,
      [utils.asGridCoord(56, 37)]: true,
      [utils.asGridCoord(56, 38)]: true,
      [utils.asGridCoord(56, 39)]: true,
      [utils.asGridCoord(56, 40)]: true,
      [utils.asGridCoord(56, 41)]: true,
      [utils.asGridCoord(56, 42)]: true,
      [utils.asGridCoord(56, 43)]: true,
      [utils.asGridCoord(56, 44)]: true,
      [utils.asGridCoord(56, 45)]: true,
      [utils.asGridCoord(56, 46)]: true,
      [utils.asGridCoord(56, 47)]: true,
      [utils.asGridCoord(56, 48)]: true,
      [utils.asGridCoord(56, 49)]: true,
      // ^ wall right
      [utils.asGridCoord(12, 41)]: true,
      [utils.asGridCoord(13, 41)]: true,
      [utils.asGridCoord(14, 41)]: true,
      [utils.asGridCoord(15, 41)]: true,
      [utils.asGridCoord(16, 41)]: true,
      [utils.asGridCoord(17, 41)]: true,
      [utils.asGridCoord(18, 41)]: true,
      [utils.asGridCoord(19, 41)]: true,
      [utils.asGridCoord(20, 41)]: true,
      [utils.asGridCoord(21, 41)]: true,
      [utils.asGridCoord(22, 41)]: true,
      [utils.asGridCoord(23, 41)]: true,
      [utils.asGridCoord(24, 41)]: true,
      [utils.asGridCoord(25, 41)]: true,
      // ^ sea to l of bridge
      [utils.asGridCoord(28, 41)]: true,
      [utils.asGridCoord(28, 42)]: true,
      [utils.asGridCoord(28, 43)]: true,
      [utils.asGridCoord(28, 44)]: true,
      [utils.asGridCoord(28, 45)]: true,
      [utils.asGridCoord(28, 46)]: true,
      [utils.asGridCoord(28, 47)]: true,
      [utils.asGridCoord(28, 48)]: true,
      [utils.asGridCoord(28, 49)]: true,
      // ^ r of bridge
    },
    cutsceneSpaces: {
      [utils.asGridCoord(29, 32)]: [
        { events: [{ type: "changeMap", map: "ITCenter" }] },
      ],
    },
  },
  ITCenter: {
    lowerSrc: "/PIOM/MAPS/itcenter.png",
    upperSrc: "",
    gameObjects: {
      pc: new Person({
        x: utils.withGrid(19),
        y: utils.withGrid(18),
        src: "/PIOM/CHARS/pc.png",
        talking: [
          {
            events: [{ type: "textMessage", text: `Computer: Please click <a href="/PIOM/PDF/cv.pdf" target="blank">here</a> for your file.`,}],
          },
        ],
      }),
      hero: new Person({
        isPlayerControlled: true,

        x: utils.withGrid(20),
        y: utils.withGrid(25),
        src: "/PIOM/CHARS/heroNew.png",
      }),
      npc2: new Person({
        x: utils.withGrid(20),
        y: utils.withGrid(20),
        src: "/PIOM/CHARS/rachel.png",
        talking: [
          {
            events: [{ type: "textMessage", text: "He said he left you a file on the computer!", faceHero: ["npc2"] }],
          },
        ],
      }),
    },
    cutsceneSpaces: {
      [utils.asGridCoord(20, 26)]: [
        { events: [{ type: "changeMap", map: "DemoRoom" }] },
      ],
    },
  },
};
