<template>
  <form class="text-center" enctype="multipart/form-data">
    <Modal
      header="Oops... An error has encountered."
      :body="errMsg"
      ref="modal"
    ></Modal>
    <div
      class="w-full mb-4 border border-gray-200 rounded-lg mt-4 bg-gray-900"
    >
      <div
        class="flex items-center justify-between px-3 py-2 border-b border-gray-600 mt-3"
      >
        <div class="flex flex-wrap items-center">
          <div class="flex items-center space-x-1 sm:pr-4">
            <input type="file" ref="file" @change="processFile" hidden />
            <button
              class="p-2 rounded cursor-pointer flex space-x-2 text-gray-300 hover:bg-gray-800"
              @click.prevent="this.$refs.file.click()"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="">Text from image</span>
            </button>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 rounded-b-lg h-80 bg-gray-900">
        <div
          role="status"
          v-if="loading"
          class="flex justify-center h-full items-center"
        >
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 animate-spin fill-teal-600 text-gray-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <textarea
          rows="12"
          class="block w-full h-full px-0 text-gray-200 bg-gray-900 placeholder-gray-200 text-lg"
          placeholder="Type Here..."
          v-model="this.$store.state.text"
          v-else
        ></textarea>
      </div>
    </div>
    <div class="container flex space-x-3 justify-center">
      <Button
        iconStyle="fa-solid fa-check"
        :btnStyle="`${
          loading
            ? 'bg-gray-300'
            : 'bg-teal-500'
        } text-sm`"
        text="Correct"
        :disabled="loading"
        @click.prevent="correct"
      ></Button>
      <Button
        iconStyle="fa-solid fa-trash"
        :btnStyle="`${
          loading
            ? 'bg-gray-300'
            : 'bg-red-600 hover:bg-red-500'
        } text-sm`"
        text="Clear"
        :disabled="loading"
        @click.prevent="clearTextArea"
      ></Button>
      <Button
        iconStyle="fa-solid fa-clipboard"
        btnStyle="bg-yellow-500 hover:bg-yellow-400 text-sm"
        :text="isCopied ? 'Copied' : 'Copy'"
        @click.prevent="copyToClipboard"
      ></Button>
    </div>
  </form>
</template>

<script>
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "TextArea",
  components: {
    Button,
    Modal,
  },
  data() {
    return {
      loading: false,
      errMsg: "",
      isCopied: false,
    };
  },
  methods: {
    clearTextArea() {
      this.$store.commit("setText", "");
    },
    copyToClipboard() {
      this.$store.dispatch("copy").then(() => {
        this.isCopied = this.$store.getters.getText.length != 0;
        if (this.isCopied) {
          setTimeout(() => {
            this.isCopied = false;
          }, 2000);
        }
      });
    },
    correct() {
      this.loading = true;
      let toggleModalBtn = this.$refs.modal.$refs.toggleModal;
      this.$store
        .dispatch("send")
        .then((res) => {
          let resp = res.data;

          if (resp.status_code != 200) {
            toggleModalBtn.click();
            this.errMsg = resp.response;
          } else {
            this.$store.commit("setText", resp.response);
          }

          this.loading = false;
        })
        .catch((err) => {
          toggleModalBtn.click();
          this.errMsg =
            "Either you are not connected or the Server didn't respond. Consider retrying...";
          this.loading = false;
          console.error(err);
        });
    },
    processFile(e) {
      this.$store.commit("setImage", e.target.files[0]);
      this.correct();
      this.$store.commit("setImage", new Blob()); // Reset the image once processed
    },
  },
};
</script>

<style scoped>
textarea {
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
}
</style>
