<template>
  <div><div>{{user}}</div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    user: Object,
  },
  setup(prop, { emit }) {
    console.log(prop.user);
  },
});
</script>

<style lang="scss" scoped></style>
