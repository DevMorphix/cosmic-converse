<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white dark:bg-gray-800 w-full max-w-md h-[32rem] rounded-xl shadow-2xl flex flex-col overflow-hidden">
      <div class="bg-blue-600 dark:bg-blue-800 text-white p-4 flex justify-between items-center">
        <h3 class="text-xl font-semibold">Chat with {{ planetInfo.name }}</h3>
        <button @click="close" class="text-white hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="flex-grow overflow-y-auto p-4 space-y-4" ref="messageContainer">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['flex flex-col', message.sender === 'user' ? 'items-end' : 'items-start']">
          <div :class="['max-w-[80%] rounded-lg p-3 mb-1', 
                        message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white']">
            <template v-if="Array.isArray(message?.text)">
              <p v-for="(text, textIndex) in message.text" :key="textIndex" class="mb-1 last:mb-0">
                {{ text }}
              </p>
            </template>
            <template v-else>
              <p>{{ message.text }}</p>
            </template>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ message.time }}</span>
        </div>
      </div>
      
      <div class="p-4 bg-gray-100 dark:bg-gray-900">
        <div class="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md">
          <input v-model="userInput" @keyup.enter="sendMessage" 
                 class="flex-grow px-4 py-2 bg-transparent focus:outline-none dark:text-white"
                 placeholder="Type your message..." />
          <button @click="sendMessage" class="p-2 text-blue-500 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatBot",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    planetInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      messages: [],
      userInput: "",
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.initializeChat();
      }
    },
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async sendMessage() {
      if (this.userInput.trim() === "") return;

      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.messages.push({
        text: this.userInput,
        sender: "user",
        time: currentTime,
      });

      const userMessage = this.userInput;
      this.userInput = "";

      try {
        const response = await axios.post(
          "https://cosmic-converse.onrender.com/generate",
          {
            gemini_content: userMessage,
            planet_info: this.planetInfo,
            previous_content: this.getPreviousContent(),
          }
        );

        const botResponse = response.data.data;

        this.messages.push({
          text: botResponse,
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } catch (error) {
        console.error("Error sending message:", error);
        this.messages.push({
          text: "Sorry, I encountered an error. Please try again later.",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }
    },
    initializeChat() {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.messages = [
        {
          text: `Hello! I'm me your ${this.planetInfo.name}. I can help you know more about me. Ask me anything!`,
          sender: "bot",
          time: currentTime,
        },
      ];
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    },
    getPreviousContent() {
      return this.messages.length > 1
        ? this.messages.map((message) => ({
            text: message.text,
            sender: message.sender,
          }))
        : "No previous content";
    },
  },
};
</script>