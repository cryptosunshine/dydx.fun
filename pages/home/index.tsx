import { useEffect } from 'react'
import { useIntl } from "react-intl";
import $ from 'jquery';


export default function Home() {
  const { formatMessage } = useIntl()
  const t = (id: string) => formatMessage({ id })

  useEffect(() => {
    console.log('init')
    // Size the canvas to fill the browser viewport.
    $(window).resize(function () {
      (window as any).cr_sizeCanvas($(window).width(), $(window).height());
    });

    // Start the Construct 2 project running on window load.
    $(document).ready(function () {
      // Create new runtime using the c2canvas
      (window as any).cr_createRuntime("c2canvas");
    });

    // Pause and resume on page becoming visible/invisible
    function onVisibilityChanged() {
      if (
        document.hidden ||
        document.mozHidden ||
        document.webkitHidden ||
        document.msHidden
      )
      (window as any).cr_setSuspended(true);
      else (window as any).cr_setSuspended(false);
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
  }, []);
  return (
    <div id="c2canvasdiv">
        <canvas id="c2canvas" width="656" height="656"> </canvas>
      </div>
  )
}
