<template>
  <button
    :class="`flex justify-center items-center px-5 py-2 text-sm space-x-2 font-medium text-center text-white rounded-lg ${btnStyle}`"
  >
    <i :class="`${iconStyle}`"></i>
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    iconStyle: String,
    btnStyle: String,
    text: String,
  },
};
</script>
