<script>
  
  function closeApp() {
    window.api.close()
  }

  function minimizeApp() {
    window.api.minimize()
  }
  
</script>

<nav>
  <div id="author">
    <p><span>by</span> Dimitris Linardos  </p>
    <a id="linkedIn" href="https://www.linkedin.com/in/dimitris-linardos" target="_blank">
      <i id="linkedInIcon" class="fa-brands fa-linkedin-in fa-sm"></i>
    </a>
    <a id="buyMeCoffee" href="https://www.buymeacoffee.com/dimlin" target="_blank">
      buy me a coffee
      <i id="buyMeCoffeeIcon" class="fa-solid fa-mug-saucer fa-2xs"></i>
    </a>
  </div>
  <div class="nav-btns">
    <div class="minimize" on:click={minimizeApp}>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="close" on:click={closeApp}>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</nav>

<style>
  .icon {
    width: 20px;
    height: 20px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    padding-left: 10px;
    color: #919191;
    -webkit-app-region: drag;
  }

  nav p {
    padding: 0px 4px;
  }

  #linkedIn {
    margin: 0 4px;
    border: 0;
    padding: 6px 10px;
    border-radius: 5px;
    background-color: #0077B5;
  }

  #linkedIn:hover {
    background-color: #3aa1d9;
    color: #fff;
  }

  #linkedInIcon {
    color: #fff;
  }

  #buyMeCoffee {
    display: flex;
    justify-content: baseline;
    align-items: baseline;
    gap: 5px;
    font-weight: 900;
    text-decoration: none;
    font-family: 'Zen Loop';
    font-size: 16px;
    font-weight: 500px;
    color: #fff;
    margin: 0 4px;
    border: 0;
    padding: 5px 8px;
    border-radius: 5px;
    background-color: #FFDD00;
  }

  #buyMeCoffee:hover {
    color: #121212;
  }

  #buyMeCoffeeIcon {
    color: #fff;
  }

  #author {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 500px;
    padding: 0 15px;
    -webkit-app-region: no-drag;
  }

  nav .nav-btns {
  display: flex;
  -webkit-app-region: no-drag;
  }

  nav .minimize, nav .close {
    font-size: 25px;
    padding: 5px 15px;
  }

  nav .minimize:hover, nav .close:hover {
    background-color: rgb(129, 129, 129);
    color: #fff;
    cursor: pointer;
  }
</style>