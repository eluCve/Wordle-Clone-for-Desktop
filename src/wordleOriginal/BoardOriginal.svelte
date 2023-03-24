<script>
  import CellOriginal from './CellOriginal.svelte'
  import {wordleBoard} from '../store'
</script>

<div class="board">
  {#each $wordleBoard as row, y}
    <div class="row">
      {#each row as letter, x}
        <CellOriginal {letter} {x} {y}/>
      {/each}
    </div>
  {/each}
</div>

<style>
  .board {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    color: white;
  }

  .row {
    display: flex;
    justify-content: center;
  }
  
</style>