import * as THREE from "three";

/**
 * Draws a stylised website onto a 2D canvas and exposes it as a texture, so
 * the laptop in the hero shows a page that actually scrolls rather than a
 * static image.
 *
 * The page is drawn twice, one virtual height apart, and the scroll offset
 * wraps — which makes the loop seamless without any extra bookkeeping.
 */

const W = 640;
const H = 400;
const PAGE = 940; // virtual page height that scrolls past the viewport

const COLORS = {
  bg: "#0e1420",
  panel: "#1a2333",
  panelEdge: "#26324a",
  bar: "#3c4a63",
  barDim: "#2a344a",
  accent: "#f0b429",
  text: "#5a6b88",
  white: "#c9d4e6",
};

/** Rounded rectangle helper — canvas has roundRect but not everywhere. */
const rr = (ctx, x, y, w, h, r = 4) => {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  ctx.fill();
};

const bar = (ctx, x, y, w, h, color) => {
  ctx.fillStyle = color;
  rr(ctx, x, y, w, h, h / 2);
};

/** One full pass of the fake page, drawn from y = top. */
const drawPage = (ctx, top) => {
  // ---- sticky nav ----
  ctx.fillStyle = COLORS.panel;
  ctx.fillRect(0, top, W, 44);
  ctx.fillStyle = COLORS.accent;
  rr(ctx, 24, top + 14, 16, 16, 4);
  [90, 150, 210, 270].forEach((x, i) => {
    bar(ctx, x, top + 20, i === 0 ? 34 : 42, 5, i === 0 ? COLORS.white : COLORS.bar);
  });
  bar(ctx, W - 96, top + 15, 72, 15, COLORS.accent);

  // ---- hero ----
  bar(ctx, 40, top + 92, 96, 7, COLORS.accent);
  bar(ctx, 40, top + 116, 330, 20, COLORS.white);
  bar(ctx, 40, top + 148, 250, 20, COLORS.white);
  bar(ctx, 40, top + 188, 300, 7, COLORS.text);
  bar(ctx, 40, top + 204, 240, 7, COLORS.text);

  ctx.fillStyle = COLORS.accent;
  rr(ctx, 40, top + 230, 104, 26, 6);
  ctx.fillStyle = COLORS.panelEdge;
  rr(ctx, 156, top + 230, 104, 26, 6);

  // hero side visual
  ctx.fillStyle = COLORS.panel;
  rr(ctx, 410, top + 96, 190, 160, 10);
  ctx.fillStyle = COLORS.panelEdge;
  rr(ctx, 426, top + 112, 158, 10, 5);
  [0, 1, 2, 3].forEach((row) => {
    bar(ctx, 426, top + 136 + row * 22, row % 2 ? 110 : 140, 6, COLORS.bar);
  });
  ctx.fillStyle = COLORS.accent;
  rr(ctx, 426, top + 224, 60, 16, 4);

  // ---- three cards ----
  [0, 1, 2].forEach((col) => {
    const x = 40 + col * 190;
    ctx.fillStyle = COLORS.panel;
    rr(ctx, x, top + 300, 170, 120, 10);
    ctx.fillStyle = col === 1 ? COLORS.accent : COLORS.panelEdge;
    rr(ctx, x + 16, top + 316, 26, 26, 6);
    bar(ctx, x + 16, top + 356, 108, 8, COLORS.white);
    bar(ctx, x + 16, top + 374, 138, 6, COLORS.text);
    bar(ctx, x + 16, top + 388, 96, 6, COLORS.text);
  });

  // ---- chart panel ----
  ctx.fillStyle = COLORS.panel;
  rr(ctx, 40, top + 458, 560, 190, 10);
  bar(ctx, 64, top + 480, 120, 8, COLORS.white);
  bar(ctx, W - 140, top + 480, 76, 8, COLORS.bar);

  const heights = [54, 88, 42, 104, 70, 124, 60, 96, 78, 132, 66, 110];
  heights.forEach((h, i) => {
    const x = 64 + i * 44;
    ctx.fillStyle = i % 4 === 3 ? COLORS.accent : COLORS.panelEdge;
    rr(ctx, x, top + 620 - h, 28, h, 4);
  });

  // ---- list rows ----
  [0, 1, 2, 3].forEach((row) => {
    const y = top + 680 + row * 52;
    ctx.fillStyle = COLORS.panel;
    rr(ctx, 40, y, 560, 42, 8);
    ctx.fillStyle = row === 0 ? COLORS.accent : COLORS.panelEdge;
    rr(ctx, 56, y + 11, 20, 20, 5);
    bar(ctx, 90, y + 14, 160, 6, COLORS.white);
    bar(ctx, 90, y + 27, 240, 5, COLORS.text);
    bar(ctx, W - 110, y + 18, 54, 6, COLORS.bar);
  });

  // ---- footer ----
  ctx.fillStyle = COLORS.panel;
  ctx.fillRect(0, top + 896, W, 44);
  bar(ctx, 40, top + 914, 90, 6, COLORS.text);
  [W - 190, W - 130, W - 70].forEach((x) => {
    bar(ctx, x, top + 914, 44, 6, COLORS.bar);
  });
};

/** Creates the canvas, texture, and a draw(scroll) function. */
export const createScreenTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const draw = (scroll) => {
    const offset = -(scroll % PAGE);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    // Two copies one page apart make the wrap invisible.
    drawPage(ctx, offset);
    drawPage(ctx, offset + PAGE);

    texture.needsUpdate = true;
  };

  draw(0);

  return { texture, draw, dispose: () => texture.dispose() };
};
