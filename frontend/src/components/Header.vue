<template>
  <div class="text-center py-3 rounded-sm mt-2">
    <h1 class="text-5xl font-bold mb-4 text-teal-600 effect text-teal-300">
      {{ mainHeading }}
    </h1>
    <VueWriter
      class="text-3xl font-bold mb-2 text-gray-300"
      :array="subHeading"
      :eraseSpeed="30"
      :typeSpeed="50"
    ></VueWriter>
  </div>
</template>

<script>
import VueWriter from "vue-writer";

export default {
  name: "Header",
  props: {
    mainHeading: String,
    subHeading: String,
  },
  components: {
    VueWriter,
  },
};
</script>

<style scoped>
.effect {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s forwards;
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
