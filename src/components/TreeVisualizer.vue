<script>
import * as PIXI from "pixi.js";
import BinaryTree from "./binaryTree/binaryTree";
// import TreeLevel from "./TreeLevel.vue";

export default {
  name: "TreeVisualizer",
  // components: { TreeLevel },
  data() {
    return {
      array: [],
      binaryTree: new BinaryTree(),
      traversal: [],
      pixiApp: undefined,
      nodesAmount: 30,
      treeNodeWidth: 30,
      treeNodeHeight: 30,
      verticalMargin: 50,
      minIndent: 20,
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
      const sceneWidth = 1500;
      const sceneHeight = 800;
      this.pixiApp = new PIXI.Application({
        width: sceneWidth,
        height: sceneHeight,
        transparent: true,
      });
      this.$el.appendChild(this.pixiApp.view);

      this.preOrderTraversal(
        this.binaryTree.root,
        sceneWidth / 2,
        0,
        this.minIndent * (2 ** this.binaryTree.maxLevel) / 2,
      );
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
      this.pixiApp.stage.addChild(nodeFigure);

      const valueText = new PIXI.Text(value);
      valueText.position.set(x - valueText.width / 2, y);
      this.pixiApp.stage.addChild(valueText);
    },

    drawLine(x1, y1, x2, y2) {
      const lineObject = new PIXI.Graphics();
      lineObject.lineStyle(1, 0xFF3300, 1);
      lineObject.moveTo(x1, y1);
      lineObject.lineTo(x2, y2);
      this.pixiApp.stage.addChild(lineObject);
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
#example {
  height: 800px;
  width: 1024px;
  border: 1px black solid;
}
</style>
