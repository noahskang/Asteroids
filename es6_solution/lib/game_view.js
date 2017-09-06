class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.ship_two = this.game.addShipTwo();
  }

  bindKeyHandlers() {
    const ship = this.ship;
    const ship_two = this.shiptwo;

    Object.keys(GameView.MOVES_TWO).forEach((k) => {
      let move = GameView.MOVES_TWO[k];
      key(k, () => { ship_two.power(move); });
    });

    key("return", () => { ship_two.fireBullet() });

    Object.keys(GameView.MOVES_ONE).forEach((k) => {
      let move = GameView.MOVES_ONE[k];
      key(k, () => { ship.power(move); });
    });

    key("space", () => { ship.fireBullet() });


  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES_ONE = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

GameView.MOVES_TWO = {
  'up': [ 0, -1],
  'left': [-1,  0],
  'down': [ 0,  1],
  'right': [ 1,  0],
};

module.exports = GameView;
