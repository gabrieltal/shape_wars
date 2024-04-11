# Shape Wars

<img width="100%" alt="shape wars homepage" src="https://user-images.githubusercontent.com/20470949/135734409-e0747f68-a9eb-4d38-bebf-164b6cc10b4c.png">


## Overview

Shape Wars is a vanilla JavaScript game using HTML5 Canvas.

[shapewars.xyz](https://www.shapewars.xyz)

## Background

I made this project while attending App Academy.

Heavily inspired by [Geometry Wars](https://store.steampowered.com/app/8400/Geometry_Wars_Retro_Evolved/) and [Asteroids](https://store.steampowered.com/app/2058260/Asteroids/).
The game is a top down arcade shooter. I programmed the various enemy types, some enemies follow you around, others avoid your incoming bullets, and the rest wander aimlessly.

The point of the game is to survive waves of incoming enemies in order to obtain the high score.

One thing I would like to point out is recently (December 2020) I did a rewrite of the code to make it more object oriented, modular and actually utilized Webpack (Young me was so stuck trying to figure this out in 2018!). Check out [this pull request](https://github.com/gabrieltal/shape_wars/pull/1) I issued with the full refactor. If I ever do something like this again I'll try to do a better job at making smaller PRs so my updates and refactors can be easier to follow along with.

I was happy how the game came out. After the refactor, I was very happy with how the code came out.

## Development

### Setup

```bash
git clone https://github.com/gabrieltal/shape_wars.git
cd shape_wars
npm install
```

To have webpack compile and watch:
```bash
npm run dev
```

Then go to localhost:8080 to see the game running.

## Features

You play as a ship and are able to move around the board with WASD commands. You can rotate the ship with the left and right arrow keys.

Players shoot projectiles with the goal to survive waves of enemies and destroy as many enemies as possible. Players only have 3 lives and they are given 2 bombs that can wipe the board of enemies.

![Avoiders](https://github.com/gabrieltal/shape_wars/blob/master/documents/avoiders.gif)

### Enemy types

The game has three enemy types.

  * Enemies that wander aimlessly
  * Enemies that follow and pursue the player.
  * Enemies that follow and pursue the player and also try to dodge the player's projectiles.

### Projectiles

When firing bullets the bullets are released and proceed in a straight line.

### Particles!

After each enemy is destroyed a parade of particles are released and give life and color to the game.

![Particles](https://github.com/gabrieltal/shape_wars/blob/master/documents/particles.gif)

## TODOS

  * I would like to add a backend to hold high scores
  * Add power ups to give players bonus lives, bombs, etc
  * Add more enemy types!
