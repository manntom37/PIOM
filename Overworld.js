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
      // lower layer
      this.map.drawLowerImage(this.ctx);
      // game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction
        });
        object.sprite.draw(this.ctx);
      });
      // upper layer
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction;
    this.startGameLoop();
  }
}
