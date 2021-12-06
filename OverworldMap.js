class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;
    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }
  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/PIOM/MAPS/demomap2.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true, 
        x: utils.withGrid(4),
        y: utils.withGrid(9),
        src: "/PIOM/CHARS/mainchar2.png",
    
      }),

    //   npc1: new Person({
    //     x: utils.withGrid(1),
    //     y: utils.withGrid(3),
    //     src: "/PIOM/CHARS/rachel.png",
    //   }),
    },
  },
};
