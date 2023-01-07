import { createStore } from "vuex";
import axios from "axios";

const url = "http://localhost:5000/process";
const headers = {
  "Content-Type": "multipart/form-data",
};

export default createStore({
  state: {
    text: "",
    image: new Blob(),
  },
  getters: {
    getText(state) {
      return state.text;
    },
    getImage(state) {
      return state.image;
    },
  },
  mutations: {
    setText(state, payload) {
      state.text = payload;
    },
    setImage(state, payload) {
      state.image = payload;
    },
  },
  actions: {
    copy() {
      navigator.clipboard
        .writeText(this.getters.getText)
        .then(() => {
          console.info("Copied!");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    send() {
      let formData = new FormData();
      formData.append("text", this.getters.getText);
      formData.append("imgFile", this.getters.getImage);
      return axios.post(url, formData, headers);
    },
  },
  modules: {},
});
