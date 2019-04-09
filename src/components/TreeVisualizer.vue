<script>
import * as PIXI from "pixi.js";
import TreeVisualizerMenu from "./TreeVisualizerMenu.vue";
import BinaryTree from "./binaryTree/binaryTree";
import TreeVizualizerPixiDrawer from "./TreeVizualizerPixiDrawer";

export default {
  name: "TreeVisualizer",
  components: { TreeVisualizerMenu },

  data() {
    return {
      array: [],
      binaryTree: new BinaryTree(),
      nodesAmount: 20,
      drawer: undefined,
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

    const { width: sceneWidth, height: sceneHeight } = this.$el
      .getBoundingClientRect();
    this.drawer = new TreeVizualizerPixiDrawer(
      this.$el, sceneWidth, sceneHeight,
    );

    this.$el.appendChild(this.drawer.view);
    this.drawer.drawTree(this.binaryTree);
  },

  methods: {
    onAddValue(value) {
      console.log("new value:", value);
      this.binaryTree.insert(value);
      this.drawer.clearScene();
      this.drawer.drawTree(this.binaryTree);
    },
    onClearScene() {
      this.drawer.clearScene();
    },
    onDrawTree() {
      this.drawer.drawTree(this.binaryTree);
    },
  },
};
</script>

<template>
  <div class="tree-visualizer">
    <div class="tree-visualizer-menu__wrapper">
      <TreeVisualizerMenu
        @add-value="onAddValue"
        @clear-scene="onClearScene"
        @draw-scene="onDrawTree"
      />
    </div>
  </div>
</template>

<style>
.tree-visualizer {
  height: 100%;
  width: 100%;
  border: 1px solid gray;
  overflow: hidden;
}
.tree-visualizer .tree-visualizer-menu__wrapper {
  position: absolute;
}
</style>
