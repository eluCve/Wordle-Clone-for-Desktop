<script>
  import {keyboard} from '../store';
  import KeyOriginal from './KeyOriginal.svelte'

  export let boardUpdate = () => {}

  document.addEventListener('keydown', (e) => {
		let key = e.key.toLowerCase();
		if (keyboard.rowTop.includes(key) ||
		keyboard.rowMiddle.includes(key) ||
		keyboard.rowBottom.includes(key)) {
			if (key == "enter") {
				boardUpdate("enter");
				return
			}
			if (key == "backspace") {
				boardUpdate("delete")
				return
			}
			boardUpdate("insert", key);
		}
	})
</script>

<div class="keyboardOriginal">
  <div class="row Top">
    {#each keyboard.rowTop as key}
      <KeyOriginal {key} {boardUpdate}/>
    {/each}
  </div>
  <div class="row Middle">
    {#each keyboard.rowMiddle as key}
      <KeyOriginal {key} {boardUpdate}/>
    {/each}
  </div>
  <div class="row Bottom">
    {#each keyboard.rowBottom as key}
      <KeyOriginal {key} {boardUpdate}/>
    {/each}
  </div>
</div>

<style>
  .keyboardOriginal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-bottom: 35px;
  }

  .row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>