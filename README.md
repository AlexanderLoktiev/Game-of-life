# Game of Life

<p align="center">
    <img width="100" height="100" src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Game_of_life_animated_glider.gif" alt="Glider">
</p>
The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

Here you can check a [demo](https://alexanderloktiev.github.io/Game-of-life/) page.

## Rules
The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
1. Any live cell with two or three neighbors survives.
2. Any dead cell with three live neighbors becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
<div>The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.</div>

<p align="center">
    <img src="https://lh3.googleusercontent.com/KKgK_EFPmeTtvIjAoLo-c8XbkD7e0NgIz4ybG0TECMc5f4k8JYwpcNw8_lNlw3nL3OVCTpkFIiImX8CdPdTwWaIN9R7M6ITYi80m-9GRrbZ5H6q1EHezEg8yBdEQFpadUOtdBjZJO2bmLxgayzwldnvrcoeJbNeEX1Eqbcx8o6V-yi6WV9MJ0ZKzqU9kYBjhkz0_1dVaATPqLs744LwmUensg8LWSaRb7m0i62mfNN5ile1Pe1NGofDG4vrZI1XfB1T176XJ6_lveCnxHCgGCMGzm4SPJyKRNyv_NFyA8Y3oyHm3G0NuZWB5F8tOhTuNijy2oUf2KgUsdji7AeKRom1Xwkepy9dTHX1u3RGWZGub_sY9qCJO4N_j-avPGBo8D1TnK6w-TnjVFxBE4VaWWbBZnaVEdFTDafU41Yr0ld8JYbw4bvLdESwu-QFWrR_qx1dojMMvqwybOH5kBm1xCs4o2hYQuW5J_qPaSbqrFjGiF0oCP0sVJchK6KaQc9MwWnzK-vSSDVAXoWonX_kqZiiEJh3LUxf0jiUCSj7bs1cca8PFeoYFgxFmOiz_Y50MFvz5bbw7M8hQV1062lvBcP6SosM2-WQol8sCsfjeGxFgZPXOXL2y0xhCdyFP1TCQW2A7d3Y2jstgJfAmLdPKUYYRG5oostkFU0onr8TuTjCDc9pXynKnJOEWSMZPFA=w1853-h949-ft" alt="Game of life">
</p>