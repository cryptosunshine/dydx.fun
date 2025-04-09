interface Window {
  window:any,
  ethereum: any
  gtag: any,
  document: any
  _scriptsLoaded?: boolean;
  highscore?: number;
}

declare global {
  interface Window {
    cr_sizeCanvas: (width: number, height: number) => void;
  }
}

declare interface Document {
  mozHidden: any;
  webkitHidden: any;
  msHidden: any;
}