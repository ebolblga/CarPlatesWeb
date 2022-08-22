<script setup>
let isOpen = ref(false);
</script>

<template>
  <div>
    <button
      id="dropdownRadioButton"
      data-dropdown-toggle="dropdownDefaultRadio"
      @click="isOpen = !isOpen"
      class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      type="button"
    >
      Формат поиска
      <svg
        class="ml-2 w-4 h-4"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      id="dropdownDefaultRadio"
      class="z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block"
      :class="{hidden: !isOpen, block: isOpen}"
      style="
        position: absolute;
        inset: 0px auto auto 0px;
        margin: 0px;
        transform: translate(238px, 70px);
      "
      data-popper-reference-hidden=""
      data-popper-escaped=""
      data-popper-placement="bottom"
    >
      <ul
        class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownRadioButton"
      >
        <li>
          <div class="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
            />
            <label
              for="default-radio-1"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >3</label
            >
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
            />
            <label
              for="default-radio-2"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >6</label
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
