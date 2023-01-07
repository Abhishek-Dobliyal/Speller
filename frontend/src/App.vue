<template>
  <div class="container text-center mx-auto">
    <Header :mainHeading="mainHeading" :subHeading="subHeading"></Header>
    <TextArea></TextArea>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import TextArea from "@/components/TextArea.vue";
import Button from "@/components/Button.vue";

export default {
  name: "App",
  components: {
    Header,
    TextArea,
    Button,
  },
  data() {
    return {
      mainHeading: "Speller",
      subHeading: [
        "Grammar Correction",
        "Error Highlight",
        "Sentence Reframing",
      ],
    };
  },
  created() {
    document.title = "Speller";
  },
};
</script>

<style>
body {
  /* background: linear-gradient(-45deg, #044f2f, #1c0d52, #044f4e, #252426);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
  height: 100vh; */
  background: #13142b
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

#app {
  font-family: "Josefin Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
