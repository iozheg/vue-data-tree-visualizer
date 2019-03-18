const scaleStep = 0.1;
const scaleLimits = {
  min: 0.5,
  max: 5,
};

/**
 * Controls user mouse actions.
 * Inits interaction on container and applies actions to container's
 * children.
 *
 * @export
 * @param {PIXI.Container} container Container that will listen events.
 * @param {PIXI.Container} controlableContainer Container will be
 * transformed.
 * @param {HTMLElement} HTMLElement Element that will listen wheel events.
 * @param {PIXI.Rectangle} hitArea Area for container to listen events.
 */
export default function initPixiMouseController(
  container,
  controlableContainer,
  HTMLElement,
  hitArea,
) {
  let isDragMode = false;
  let startMousePosition = {};

  container.interactive = true;
  container.hitArea = hitArea;

  function translate(x, y) {
    const currentPosition = controlableContainer.position;
    controlableContainer.position.set(
      currentPosition.x + x, currentPosition.y + y,
    );
  }

  function normalizeScale(value) {
    return Math.max(scaleLimits.min, Math.min(scaleLimits.max, value));
  }

  function basicScaling(direction) {
    const currentScale = controlableContainer.scale;

    const newScale = {
      x: currentScale.x + direction * scaleStep * currentScale.x,
      y: currentScale.y + direction * scaleStep * currentScale.y,
    };

    newScale.x = normalizeScale(newScale.x);
    newScale.y = normalizeScale(newScale.y);
    controlableContainer.scale.set(newScale.x, newScale.y);
  }

  function scaleToCenter(direction) {
    const startSize = {
      width: controlableContainer.width,
      height: controlableContainer.height,
    };

    basicScaling(direction);

    const newSize = {
      width: controlableContainer.width,
      height: controlableContainer.height,
    };

    translate(
      -(newSize.width - startSize.width) / 2,
      -(newSize.height - startSize.height) / 2,
    );
  }

  function scaleToPoint(direction, x, y) {
    const scalePoint = {
      x: x * controlableContainer.scale.x + controlableContainer.x,
      y: y * controlableContainer.scale.y + controlableContainer.y,
    };

    basicScaling(direction);

    const newScalePoint = {
      x: x * controlableContainer.scale.x + controlableContainer.x,
      y: y * controlableContainer.scale.y + controlableContainer.y,
    };

    translate(
      -(newScalePoint.x - scalePoint.x),
      -(newScalePoint.y - scalePoint.y),
    );
  }

  function zoom(zoomIn, x, y) {
    const direction = (zoomIn ? -1 : 1);

    scaleToPoint(direction, x, y);
  }

  container.on("pointerdown", (e) => {
    startMousePosition = {
      x: e.data.originalEvent.x,
      y: e.data.originalEvent.y,
    };
    isDragMode = true;
  });
  container.on("pointerup", () => {
    isDragMode = false;
  });
  container.on("pointerout", () => {
    isDragMode = false;
  });
  container.on("pointermove", (e) => {
    if (isDragMode) {
      translate(
        e.data.originalEvent.x - startMousePosition.x,
        e.data.originalEvent.y - startMousePosition.y,
      );
    }
    startMousePosition = {
      x: e.data.originalEvent.x,
      y: e.data.originalEvent.y,
    };
  });
  HTMLElement.addEventListener("wheel", (e) => {
    e.preventDefault();
    zoom(e.deltaY > 0, e.offsetX, e.offsetY);
  });
}
