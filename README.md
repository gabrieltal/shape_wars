# Shape Wars

## Overview

Shape Wars is a Vanilla JavaScript game using HTML5 Canvas. Heavily inspired by Geometry Wars and Asteroids.
The game is a top down action arcade shooter. I programmed the various enemy types, some enemies follow you around the board, others avoid your incoming bullets, and the rest wander aimlessly.

[shapewars.xyz](https://www.shapewars.xyz)

## Installation

### Requirements

- [Webpack](https://webpack.js.org/guides/getting-started/)

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

Players are able to move around and rotate with WASD and left and right arrow keys respectively. Players are given one bomb to wipe the screen. The player must navigate and maneuver around the various enemy types and take them out before they are taken out.

![Avoiders](https://github.com/gabrieltal/shape_wars/blob/master/docs/avoiders.gif)

### AI Enemies
   * Enemies are able to follow and pursue the player by a simple method of simply tracking the player's location compared to their own positioning and moving in the direction of the player
   * Another enemy detects when bullets are near them and heading in their direction and proceed to try and dodge the bullets

### Projectiles
   * When firing bullets the bullets are released and proceed in the direction of the user at the moment of firing

### Particles!
   * After each enemy is destroy a parade of particles are released and give life and color to the game

![Particles](https://github.com/gabrieltal/shape_wars/blob/master/docs/particles.gif)

## TODOS
  * Optimize and clean up code so it is object oriented
  * I'd like to add music and sound effects
  * I would like to add a backend to hold high scores
  * Power ups left on the grid to be picked up and give players bonus lives, bombs, etc
  * More enemy types!
