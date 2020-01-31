// global game settings
let game;

//main game functions for each game step
window.onload = function () {
    maxHeight = document.getElementById('container').scrollHeight;
    maxWidth = document.getElementById('container').scrollWidth;
    mapHeight = Math.floor(maxHeight);
    mapWidth = Math.floor(maxWidth);

    viewport = {w: mapWidth, h: mapHeight};
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', null, false, false, null);
    game.state.add('boot', gameBoot);
    game.state.start('boot');
};