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


const x = 1;
const y = 1;

const shadow = new Image();
shadow.onload = () => {
  this.ctx.drawImage(shadow,
    0, // left cut
    0, // top cut
    32, // width
    32, // height
    x * 16 - 8,
    y * 16 - 18,
    32,
    32

   )
}
shadow.src = '/PION/CHARS/shadow.png'
    const hero = new Image();
    hero.onload = () => {
      this.ctx.drawImage(hero,
         0, // left cut
         0, // top cut
         32, // width
         32, // height
         x * 16 - 8,
         y * 16 - 18,
         32,
         32

        )
    };
    hero.src = "/PIOM/CHARS/mainchar2.png";
  }
}
