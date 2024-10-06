<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div class="relative">
                <img :src="`./assets/cards/${planetInfo.name}.png`" :alt="planetInfo.displayName"
                    class="w-full h-64 object-cover rounded-t-lg">
                <button @click="$emit('closeCard')" class="absolute top-2 right-2 text-white hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-6 text-gray-800">
                <h2 class="text-3xl font-bold text-center mb-4">{{ planetInfo.displayName }}</h2>

                <div class="space-y-2 mb-4">
                    <p v-if="planetInfo.meanTemp" class="flex items-center justify-between">
                        <span class="font-semibold">Mean Temperature:</span>
                        <span :class="['flex items-center', temperatureColor(planetInfo.meanTemp)]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 2a1 1 0 00-1 1v7.586l-2.293-2.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 10.586V3a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ planetInfo.meanTemp }} °C
                        </span>
                    </p>
                    <p v-if="planetInfo.radius" class="flex justify-between">
                        <span class="font-semibold">Radius:</span>
                        <span>{{ planetInfo.radius }} km</span>
                    </p>
                    <p v-if="planetInfo.distanceFromSun" class="flex justify-between">
                        <span class="font-semibold">Distance from Sun:</span>
                        <span>{{ planetInfo.distanceFromSun }} AU</span>
                    </p>
                    <p v-if="planetInfo.year" class="flex justify-between">
                        <span class="font-semibold">Year Length:</span>
                        <span>{{ planetInfo.year }}</span>
                    </p>
                    <p v-if="planetInfo.day" class="flex justify-between">
                        <span class="font-semibold">Day Length:</span>
                        <span>{{ planetInfo.day }}</span>
                    </p>
                    <p v-if="planetInfo.moons != null" class="flex justify-between">
                        <span class="font-semibold">Moons:</span>
                        <span>{{ planetInfo.moons }}</span>
                    </p>
                </div>

                <p class="text-gray-700 mb-4">{{ planetInfo.description }}</p>

                <button @click="openChat"
                    class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                    Chat with me
                </button>
            </div>
        </div>
    </div>

    <ChatBot :planetInfo="planetInfo"  :isOpen="isChatOpen" @close="closeChat" />
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