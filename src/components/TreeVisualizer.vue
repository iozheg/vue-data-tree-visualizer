<script>
import * as PIXI from "pixi.js";
import BinaryTree from "./binaryTree/binaryTree";
import initPixiMouseController from "./MouseController";

export default {
  name: "TreeVisualizer",
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
      minIndent: 30,
      maxIndent: 0,
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
    console.log(this.traversal);

    this.initCanvas();
  },

  methods: {
    initCanvas() {
      const { width: sceneWidth, height: sceneHeight } = this.$el
        .getBoundingClientRect();
      this.pixiApp = new PIXI.Application({
        width: sceneWidth,
        height: sceneHeight,
        autoResize: true,
        antialias: true,
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
        sceneWidth / 2,
        -this.treeNodeHeight,
        this.minIndent * (2 ** this.binaryTree.maxLevel) / 2,
      );

      this.pixiApp.stage.addChild(this.controlableContainer);

      /** Draw container border. */
      // const border = new PIXI.Graphics();
      // border.lineStyle(1, 0xFF3300, 1);
      // border.drawRect(
      //   0, 0,
      //   this.controlableContainer.width,
      //   this.controlableContainer.height,
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

    /**
     * Draw node and line from parent's bottom to current's top.
     * @property {number} x current node x.
     * @property {number} y current node y.
     * @property {number} parentX parent node x.
     * @property {number} parentY parent node y.
     * @property {number} value value to display.
     */
    drawNode(x, y, parentX, parentY, value) {
      const startPosX = x - this.treeNodeWidth / 2;
      const startPosY = y;

      const nodeFigure = new PIXI.Graphics();
      nodeFigure.lineStyle(1, 0xFF3300, 1);
      nodeFigure.beginFill(0x66CCFF);
      nodeFigure.drawEllipse(
        this.treeNodeWidth / 2,
        this.treeNodeHeight / 2,
        this.treeNodeWidth / 2,
        this.treeNodeHeight / 2,
      );
      nodeFigure.endFill();
      nodeFigure.position.set(startPosX, startPosY);
      this.controlableContainer.addChild(nodeFigure);

      const valueText = new PIXI.Text(value, { fontSize: this.fontSize });
      valueText.position.set(x - valueText.width / 2, y);
      this.controlableContainer.addChild(valueText);

      this.drawLine(parentX, parentY + this.treeNodeHeight, x, y);

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

    /**
     * Get next node, draw it and go to it's children.
     * @property {BinaryTreeNode} current current node.
     * @property {number} currentX current node x.
     * @property {number} currentY current node y.
     * @property {number} parentX parent node x.
     * @property {number} parentY parent node y.
     * @property {number} indentByX indent by x for current node.
     */
    preOrderTraversal(
      current, currentX, currentY, parentX, parentY, indentByX,
    ) {
      // If one or zero child - decrease indent.
      const hasBothChilds = current.leftChild && current.rightChild;
      const adoptedIndentByX = hasBothChilds ? indentByX : indentByX / 2;

      this.drawNode(currentX, currentY, parentX, parentY, current.value);

      if (current.leftChild) {
        this.preOrderTraversal(
          current.leftChild,
          currentX - adoptedIndentByX,
          currentY + this.verticalMargin,
          currentX,
          currentY,
          indentByX / 2,
        );
      }
      if (current.rightChild) {
        this.preOrderTraversal(
          current.rightChild,
          currentX + adoptedIndentByX,
          currentY + this.verticalMargin,
          currentX,
          currentY,
          indentByX / 2,
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
