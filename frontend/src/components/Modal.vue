<template>
  <div class="container">
    <button
      data-modal-target="defaultModal"
      data-modal-toggle="defaultModal"
      type="button"
      ref="toggleModal"
      hidden
    >
      Toggle modal
    </button>
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
      <div class="relative w-full max-w-2xl md:h-auto border rounded-lg">
        <div class="relative rounded-lg shadow bg-gray-900">
          <div class="flex items-start justify-between p-4 border-b rounded-t">
            <h3 class="text-xl font-semibold text-gray-200">
              {{ header }}
            </h3>
            <button
              type="button"
              class="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center text-gray-200"
              data-modal-hide="defaultModal"
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
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-lg text-gray-300">
              {{ body }}
            </p>
          </div>

          <div
            class="flex items-center p-6 space-x-2 border-t rounded-b border-gray-600"
          >
            <button
              data-modal-hide="defaultModal"
              type="button"
              class="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-teal-300 hover:bg-teal-400"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    header: String,
    body: String,
  },
};
</script>

<style></style>
