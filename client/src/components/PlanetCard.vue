<template>
    <div class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div class="relative">
          <img 
            :src="`./assets/cards/${planetInfo.name}.png`" 
            :alt="planetInfo.displayName"
            class="w-full h-72 object-cover object-center"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <button 
            @click="$emit('closeCard')" 
            class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 class="absolute bottom-4 left-6 text-4xl font-bold text-white">{{ planetInfo.displayName }}</h2>
        </div>
  
        <div class="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-18rem)]">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div v-if="planetInfo.meanTemp" class="col-span-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex justify-between items-center">
              <span class="font-semibold">Mean Temperature:</span>
              <span :class="['flex items-center font-bold', temperatureColor(planetInfo.meanTemp)]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v7.586l-2.293-2.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 10.586V3a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ planetInfo.meanTemp }} °C
              </span>
            </div>
            <div v-if="planetInfo.radius" class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex justify-between items-center">
              <span class="font-semibold">Radius:</span>
              <span>{{ planetInfo.radius }} km</span>
            </div>
            <div v-if="planetInfo.distanceFromSun" class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex justify-between items-center">
              <span class="font-semibold">Distance from Sun:</span>
              <span>{{ planetInfo.distanceFromSun }} AU</span>
            </div>
            <div v-if="planetInfo.year" class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex justify-between items-center">
              <span class="font-semibold">Year Length:</span>
              <span>{{ planetInfo.year }}</span>
            </div>
            <div v-if="planetInfo.day" class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex justify-between items-center">
              <span class="font-semibold">Day Length:</span>
              <span>{{ planetInfo.day }}</span>
            </div>
            <div v-if="planetInfo.moons != null" class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex justify-between items-center">
              <span class="font-semibold">Moons:</span>
              <span>{{ planetInfo.moons }}</span>
            </div>
          </div>
  
          <p class="text-gray-700 dark:text-gray-300">{{ planetInfo.description }}</p>
  
          <button 
            @click="openChat"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Chat with me
          </button>
        </div>
      </div>
    </div>
  
    <ChatBot :planetInfo="planetInfo" :isOpen="isChatOpen" @close="closeChat" />
  </template>
  
  <script>
  import ChatBot from './ChatBot.vue';
  
  export default {
    name: 'PlanetCard',
    components: {
      ChatBot
    },
    props: {
      planetInfo: Object,
    },
    data() {
      return {
        isChatOpen: false,
      };
    },
    emits: ['closeCard'],
    methods: {
      temperatureColor(temp) {
        if (temp < -50) return 'text-blue-500';
        if (temp < 0) return 'text-cyan-500';
        if (temp < 50) return 'text-green-500';
        if (temp < 100) return 'text-yellow-500';
        return 'text-red-500';
      },
      openChat() {
        this.isChatOpen = true;
      },
      closeChat() {
        this.isChatOpen = false;
      },
    }
  }
  </script>