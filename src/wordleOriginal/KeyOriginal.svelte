<script>
  export let key;
  export let boardUpdate = () => {};
</script>

{#if key == "enter"}
  <div class="key special" on:click={boardUpdate("enter")}>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </div>
{:else if key == "backspace"}
  <div class="key special" on:click={boardUpdate("delete")}>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
    </svg>
  </div>
{:else}
  <div class="key" id={key} on:click={boardUpdate("insert", key)}>
    <p>{key.toUpperCase()}</p>
  </div>
{/if}

<style>
  .key {
    width: 35px;
    height: 35px;
    background-color: #818283;
    color: #fff;
    fill: #fff;
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    border-radius: 5px;
    transition: all 0.4s;
  }

  .key:hover {
    filter: brightness(1.20);
    color: #fff;
    cursor: pointer;
  }

  .icon {
    width: 24px;
    height: 24px;
  }
  .special {
    padding: 0px 15px;
  }
</style>