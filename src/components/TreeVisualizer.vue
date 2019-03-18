<script>
import * as PIXI from "pixi.js";
import BinaryTree from "./binaryTree/binaryTree";
import initPixiMouseController from "./MouseController";

export default {
  name: "TreeVisualizer",
  // components: { TreeLevel },
  data() {
    return {
      array: [],
      binaryTree: new BinaryTree(),
      traversal: [],
      pixiApp: undefined,
      nodesAmount: 20,
      treeNodeWidth: 35,
      treeNodeHeight: 25,
      verticalMargin: 50,
      minIndent: 10,
      fontSize: 10,
      startMousePosition: {},
      isDragMode: false,
    };
  },

  mounted() {
    const min = 1;
    const max = 50;
    for (let i = 0; i < this.nodesAmount; i++) {
      const rand = min - 0.5 + Math.random() * (max - min + 1);
      this.array.push(Math.round(rand));
      this.binaryTree.insert(Math.round(rand));
    }
    console.log(this.array);
    console.log(this.binaryTree);

    // this.traversal = this.binaryTree.preOrderTraversal();
    console.log(this.traversal);

    this.initCanvas();
  },

  methods: {
    initCanvas() {
      const { width: sceneWidth, height: sceneHeight } = this.$el
        .getBoundingClientRect();
      // const sceneWidth = 1000;
      // const sceneHeight = 600;
      this.pixiApp = new PIXI.Application({
        width: sceneWidth,
        height: sceneHeight,
        autoResize: true,
        // antialias: true,
        forceFXAA: true,
        transparent: true,
      });
      // const { stage } = this.pixiApp;
      this.controlableContainer = new PIXI.Container();
      this.$el.appendChild(this.pixiApp.view);

      this.preOrderTraversal(
        this.binaryTree.root,
        sceneWidth / 2,
        0,
        this.minIndent * (2 ** this.binaryTree.maxLevel) / 2,
      );

      this.pixiApp.stage.addChild(this.controlableContainer);

      /** Draw container border. */
      // const border = new PIXI.Graphics();
      // border.lineStyle(1, 0xFF3300, 1);
      // border.drawRect(
      //   0, 0,
      //   this.controlableContainer.width, this.controlableContainer.height,
      // );
      // this.controlableContainer.addChild(border);


      initPixiMouseController(
        this.pixiApp.stage,
        this.controlableContainer,
        this.$el,
        new PIXI.Rectangle(
          0, 0, sceneWidth, sceneHeight,
        ),
      );
    },

    drawCircle(x, y, radius = 10) {
      const circleFigure = new PIXI.Graphics();
      circleFigure.lineStyle(1, 0xFF3300, 1);
      circleFigure.beginFill(0xFF0000);
      circleFigure.drawCircle(0, 0, radius);
      circleFigure.endFill();
      circleFigure.position.set(x, y);
      this.controlableContainer.addChild(circleFigure);
    },

    drawNode(x, y, value) {
      const startPosX = x - this.treeNodeWidth / 2;
      const startPosY = y;

      const nodeFigure = new PIXI.Graphics();
      nodeFigure.lineStyle(1, 0xFF3300, 1);
      nodeFigure.beginFill(0x66CCFF);
      nodeFigure.drawRect(0, 0, this.treeNodeWidth, this.treeNodeHeight);
      nodeFigure.endFill();
      nodeFigure.position.set(startPosX, startPosY);
      this.controlableContainer.addChild(nodeFigure);

      const valueText = new PIXI.Text(value, { fontSize: this.fontSize });
      valueText.position.set(x - valueText.width / 2, y);
      this.controlableContainer.addChild(valueText);

      /** Draw coords. */
      // const coordText = new PIXI.Text(
      //   `${x} ${y}`,
      //   { fontSize: this.fontSize },
      // );
      // coordText.position.set(x - coordText.width / 2, y+10);
      // this.controlableContainer.addChild(coordText);
    },

    drawLine(x1, y1, x2, y2) {
      const lineObject = new PIXI.Graphics();
      lineObject.lineStyle(1, 0xFF3300, 1);
      lineObject.moveTo(x1, y1);
      lineObject.lineTo(x2, y2);
      this.controlableContainer.addChild(lineObject);
    },

    preOrderTraversal(current, xPosition, yPosition, indent) {
      this.drawNode(xPosition, yPosition, current.value);

      const nodeBottomY = yPosition + this.treeNodeHeight;
      const childNodeTopY = nodeBottomY + this.verticalMargin;
      if (current.leftChild) {
        this.drawLine(
          xPosition, nodeBottomY, xPosition - indent, childNodeTopY,
        );

        this.preOrderTraversal(
          current.leftChild,
          xPosition - indent,
          childNodeTopY,
          indent / 2,
        );
      }

      if (current.rightChild) {
        this.drawLine(
          xPosition, nodeBottomY, xPosition + indent, childNodeTopY,
        );

        this.preOrderTraversal(
          current.rightChild,
          xPosition + indent,
          childNodeTopY,
          indent / 2,
        );
      }
    },
  },
};
</script>

<template>
  <div class="tree-visualizer" />
</template>

<style>
.tree-visualizer {
  height: 100%;
  width: 100%;
  border: 1px solid gray;
  overflow: hidden;
}
</style>
