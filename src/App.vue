<template>
  <div id="app">
    <div id="c2canvasdiv">
      <!-- The canvas the project will render to.  If you change its ID, don't forget to change the
      ID the runtime looks for in the jQuery events above (ready() and cr_sizeCanvas()). -->
      <canvas id="c2canvas" width="656" height="656"> </canvas>
    </div>

  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    // Size the canvas to fill the browser viewport.
    jQuery(window).resize(function () {
      cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());
    });

    // Start the Construct 2 project running on window load.
    jQuery(document).ready(function () {
      // Create new runtime using the c2canvas
      cr_createRuntime("c2canvas");
    });

    // Pause and resume on page becoming visible/invisible
    function onVisibilityChanged() {
      if (
        document.hidden ||
        document.mozHidden ||
        document.webkitHidden ||
        document.msHidden
      )
        cr_setSuspended(true);
      else cr_setSuspended(false);
    }

    document.addEventListener("visibilitychange", onVisibilityChanged, false);
    document.addEventListener(
      "mozvisibilitychange",
      onVisibilityChanged,
      false
    );
    document.addEventListener(
      "webkitvisibilitychange",
      onVisibilityChanged,
      false
    );
    document.addEventListener("msvisibilitychange", onVisibilityChanged, false);
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #13131c;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  verflow: hidden;
  touch-action: none;
  -ms-touch-action: none;
}
.logo {
  width: 100%;
  position: absolute;
  bottom: 0;
}
canvas {
  touch-action-delay: none;
  touch-action: none;
  -ms-touch-action: none;
}
</style>
