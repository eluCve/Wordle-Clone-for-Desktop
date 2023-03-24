<script>
  export let letter; 
  export let x;
  export let y;
</script>

<div id={`cells${y}${x}`} class="cells">
  <div class={`cell-front`}>{letter.toUpperCase()}</div>
  <div id={`cell${y}${x}`} class={`cell-back`}>{letter.toUpperCase()}</div>
</div>

<style>
  .cells {
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    transition: transform 0.7s ease;
  }
  
  .cell-front, .cell-back {
    width: 45px;
    height: 45px;
    color: #fff;
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    border: 1px solid rgb(58, 58, 58);
    border-radius: 5px;
    transition: all 0.4s;
    backface-visibility: hidden;
  }

  .cell-back {
    position: absolute;
    transform: rotateY(180deg);
  }
</style>