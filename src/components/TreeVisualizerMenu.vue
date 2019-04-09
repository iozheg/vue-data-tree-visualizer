<script>
export default {
  name: "TreeVisualizerControlPanel",
  props: {
    values: { type: Array, default: () => [] },
  },
  data() {
    return {
      addValue: undefined,
    };
  },

  methods: {
    emitNewValue() {
      this.$emit("add-value", this.addValue);
      this.addValue = null;
    },
    clearScene() {
      this.$emit("clear-scene");
    },
    drawScene() {
      this.$emit("draw-scene");
    },
  },
};
</script>

<template>
  <div class="tree-visualizer-control-panel">
    <div class="tree-visualizer-control-panel__section">
      <label
        class="tree-visualizer-control-panel__input-label"
        for="add-value-input"
      >
        Add new value
      </label>
      <input
        id="add-value-input"
        v-model="addValue"
        type="text"
      />
      <button @click="emitNewValue">Add</button>
    </div>
    <div class="tree-visualizer-control-panel__section">
      <button @click="clearScene">Clear scene</button>
      <button @click="drawScene">Draw scene</button>
    </div>
  </div>
</template>

<style>
.tree-visualizer-control-panel {
  background: lightgray;
}
.tree-visualizer-control-panel__section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3px;
}
.tree-visualizer-control-panel__input-label {
  font-size: 14px;
}
</style>
