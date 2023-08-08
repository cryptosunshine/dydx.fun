interface Window {
  window:any,
  ethereum: any
  gtag: any,
  document: any
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