<template>
    <div class="absolute right-6 top-6 w-56 z-10 bg-gray-800 bg-opacity-80 rounded p-4 text-white">
      <div class="text-center">
        <label class="block text-lg font-semibold mb-2">Speed</label>
        <div class="space-y-2">
          <div class="flex items-center justify-between bg-gray-700 rounded-md overflow-hidden">
            <input name="speed" id="realtime" type="radio" value="realtime" v-model="speed" @change="onSpeedChange"
                   class="sr-only peer" />
            <label for="realtime"
                   class="w-full py-2 px-3 text-sm cursor-pointer transition-colors duration-200 peer-checked:bg-blue-600">
              Realtime
            </label>
          </div>
          <div class="flex items-center justify-between bg-gray-700 rounded-md overflow-hidden">
            <input name="speed" id="day_sec" type="radio" value="day_sec" v-model="speed" @change="onSpeedChange"
                   class="sr-only peer" checked />
            <label for="day_sec"
                   class="w-full py-2 px-3 text-sm cursor-pointer transition-colors duration-200 peer-checked:bg-blue-600">
              1 day/sec
            </label>
          </div>
          <div class="flex items-center justify-between bg-gray-700 rounded-md overflow-hidden">
            <input name="speed" id="mon_sec" type="radio" value="mon_sec" v-model="speed" @change="onSpeedChange"
                   class="sr-only peer" />
            <label for="mon_sec"
                   class="w-full py-2 px-3 text-sm cursor-pointer transition-colors duration-200 peer-checked:bg-blue-600">
              1 mon/sec
            </label>
          </div>
          <div class="flex items-center justify-between bg-gray-700 rounded-md overflow-hidden">
            <input name="speed" id="idealized" type="radio" value="idealized" v-model="speed" @change="onSpeedChange"
                   class="sr-only peer" />
            <label for="idealized"
                   class="w-full py-2 px-3 text-sm cursor-pointer transition-colors duration-200 peer-checked:bg-blue-600">
              Idealized
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        speed: "day_sec"
      }
    },
    emits: ["speedChanged"],
    methods: {
      onSpeedChange(e) {
        const value = e.target.value;
        this.$emit('speedChanged', value);
      }
    },
    mounted() {
      this.$emit('speedChanged', this.speed);
    }
  }
  </script>