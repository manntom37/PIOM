class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "/PIOM/MAPS/demomap2.png";

    // place game objects!
    const hero = new GameObject({
      x: 4,
      y: 9,
      src: "/PIOM/CHARS/mainchar2.png",
    });
    const npc1 = new GameObject({
      x: 1,
      y: 3,
      src: "/PIOM/CHARS/rachel.png",
    });

    setTimeout(() => {
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
  }
}
