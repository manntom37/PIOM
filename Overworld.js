class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }
  startGameLoop() {
    const step = () => {
      //
      // clear canvas rect
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // establish camera person
      const cameraPerson = this.map.gameObjects.hero;

       //Update all objects
       Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
      })
      // draw lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);
      // draw game objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });
      // upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }
  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //Is there a person here to talk to?
      this.map.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        //Hero's position has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }
startMap(mapConfig) {
  this.map = new OverworldMap(mapConfig);
  this.map.overworld = this 
  this.map.mountObjects();
}
  init() {
   this.startMap(window.OverworldMaps.DemoRoom)

    this.bindActionInput();
    this.bindHeroPositionCheck();



    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction;
    this.startGameLoop();

    this.map.startCutScene([
      { who: "hero", type: "stand", direction: "up", time: 800 },
      { who: "hero", type: "walk", direction: "up" },

      { who: "hero", type: "walk", direction: "up" },
      { who: "hero", type: "walk", direction: "up" },
      { who: "hero", type: "walk", direction: "up" },
      { who: "npc1", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "left" },
      { who: "npc1", type: "stand", direction: "down", time: 400 },
      { type: "textMessage", text: "Ah! Tom said you'd be stopping by!" },
      {
        type: "textMessage",
        text: "He left something for you in the Information Centre behind me.",
      },
      {
        type: "textMessage",
        text: "There's no rush. Feel free to look around, take in the sights, talk to the locals, listen to the sounds!",
      },
    ]);
  }
}
