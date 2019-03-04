/**
 * Controls user mouse actions.
 * Inits interection on container and applies actions to container's
 * children.
 *
 * @export
 * @param {*} container PIXI container
 * @param {*} hitArea PIXI.Rectangle
 */
export default function initPixiMouseController(container, hitArea) {
  let isDragMode = false;
  let startMousePosition = {};

  container.interactive = true;
  container.hitArea = hitArea;

  function tranform(x, y) {
    for (const child of container.children) {
      const currentPosition = child.position;
      child.position.set(currentPosition.x + x, currentPosition.y + y);
    }
  }

  container.on("pointerdown", (e) => {
    startMousePosition = {
      x: e.data.originalEvent.x,
      y: e.data.originalEvent.y,
    };
    isDragMode = true;
  });
  container.on("pointerup", (e) => {
    isDragMode = false;
  });
  container.on("pointerout", (e) => {
    isDragMode = false;
  });
  container.on("pointermove", (e) => {
    if (isDragMode) {
      tranform(
        e.data.originalEvent.x - startMousePosition.x,
        e.data.originalEvent.y - startMousePosition.y,
      );
      startMousePosition = {
        x: e.data.originalEvent.x,
        y: e.data.originalEvent.y,
      };
    }
  });
}