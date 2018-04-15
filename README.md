# Shape Struggle

## Background and Overview

Shape Struggle is a game inspired by Geometry Wars and Asteroids.

 With various type of enemies to avoid and attack the
 game increases with difficulty as more enemy types are introduced as the game progresses.

The enemy types will have differing AI that dictates how they pursue the user.
    * Enemies that wander
    * Enemies that pursue the player when they get near to them
    * Enemies that pursue the player right away
    * Swarms of enemies that pursue the player at a slower pace
Adding more enemy types will be the goal depending on how well and fast
everything else proceeds.

## Functionality & MVP

In Shape Struggle, users will be able to:

- [ ] Navigate around the game board with their ship
- [ ] Shoot down and collide with enemies which would lead to a fail state
- [ ] Start, pause and restart the game

In addition, this project will include:
- [ ] Various enemy types and various AI
- [ ] Music/sound effects

## Wireframes

 This app will consist of a single screen with a game canvas, a mute button
 a display to list controls, an about button to give credit to the
 inspiration of the game, Geometry Wars, and a link to my Github and LinkedIn

![Wireframe](https://github.com/gabrieltal/shape_struggle/blob/master/docs/shape_struggle.png)

 ## Architecture and Technologies

 This project will be implemented with teh following technologies:
     * Vanilla JavaScript for overall structure and game logic,
     * HTML5 Canvas for DOM manipulation and rendering,
     * Webpack to bundle and serve up the various scripts

In addition to the webpack entry file, there will be various scripts involved:
  `board.js`: This script will handle the logic for creating and updating the DOM elements.
  `enemy.js`: This will house some basic logic for enemy types and create a prototype that
  other enemy types will be able to inherit from when their logic differs in how their AI will work
  `ship.js`: This script will handle the logic for player movement and firing ability

## Implementation Timeline

**Over the weekend:**
- [ ] Create canvas board
- [ ] Create a movable ship with player controls

**Day 1:**
- [ ] Setup webpack
- [ ] Create physics collision and allow player to fire
- [ ] Get first enemy type on screen and wandering around

**Day 2:**
- [ ] Create next enemy type with a smarter AI that tracks player
- [ ] Polish anything that looks rough, add color
- [ ] Add particle effects after enemies are destroyed

**Day 3:**
- [ ] Figure out audio and have sound effects for ships being destroyed
- [ ] Ensure that starting, pausing and restarting game works
- [ ] Add a swarm enemy type that also has a smarter AI

**Day 4:**
- [ ] Give player 3 lives
- [ ] Adding another enemy type that creates three little enemies after
 initially being destroyed
- [ ] Adding a simple music track in the background
- [ ] Add a score counter that gives players points for destroying enemies
- [ ] Adding a backend that allows to keep track of high scores

**Day 5:**
- [ ] Polish and style everything

## Bonus features

- [ ] Add more enemy types
- [ ] Give player a 'bomb' that wipes the board
- [ ] Allow users to import their own sounds
- [ ] Allow players to change the physics and speed of their ship and enemies
