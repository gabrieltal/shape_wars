# Shape Wars

## Overview

Shape Wars is a vanilla JavaScript game using HTML5 Canvas. Heavily inspired by Geometry Wars and Asteroids.
The game is a top down action arcade shooter. I programmed the various enemy types, some enemies follow you around the board, others avoid your incoming bullets, and the rest wander aimlessly.

[shapewars.xyz](https://www.shapewars.xyz)

## Installation

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

Players are a ship and able to move around the board with WASD and they can rotate their ship with the left and right arrow keys.
Players shoot projectiles and have to survive waves of enemies. Players only have 3 lives and they are given 2 bombs that can wipe the board of enemies. The goal is to get the high score.

![Avoiders](https://github.com/gabrieltal/shape_wars/blob/master/documents/avoiders.gif)

### AI Enemies

The game has three enemy types.

  * Enemies that wander aimlessly
  * Enemies that are able to follow and pursue the player. This is done by the enemy tracking the player's location and compared to their own current location are able to determine the direction to move in.
  * The last enemy type also follows and pursues the player, but they are able to dodge the player's incoming bullets. The player is still able to shoot them since they aren't the fastest at dodging bullets (I needed to give the player a shot so I didn't make them super quick at dodging bullets)

### Projectiles

When firing bullets the bullets are released and proceed in the direction of the user at the moment of firing

### Particles!

After each enemy is destroy a parade of particles are released and give life and color to the game

![Particles](https://github.com/gabrieltal/shape_wars/blob/master/documents/particles.gif)

## TODOS

  * I would like to add a backend to hold high scores
  * Add power ups to give players bonus lives, bombs, etc
  * Add more enemy types!
