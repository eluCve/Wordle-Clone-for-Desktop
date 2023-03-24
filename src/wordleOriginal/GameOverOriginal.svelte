<script>
  export let isGameWon = false;
  export let currentWord = "";
</script>
{#if isGameWon}
  <div class="win">
    <h3>YOU WON!</h3>
    <h3>Word found <span class="win-span">{currentWord.toUpperCase()}</span></h3>
  </div>
{:else}
  <div class="lose">
    <h3>You lost, try again tomorrow!</h3>
    <h3>Correct word <span class="lose-span">{currentWord.toUpperCase()}</span></h3>
  </div>
{/if}


<style>
  .win {
    text-align: center;
    font-size: 18px;
    color: #121212;
    padding: 20px 25px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 33%;
    top: 15%;
    z-index: 999;
  }
  
  .lose {
    text-align: center;
    font-size: 18px;
    color: #121212;
    padding: 20px 25px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 26.7%;
    top: 15%;
    z-index: 999;
  }

  .win span {
    color: #538D4E;
  }

  .lose span {
    color: #6c0303;
  }
</style>