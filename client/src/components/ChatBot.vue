<template>
    <div v-if="isOpen" class="chatbot-container">
      <div class="chatbot">
        <div class="chatbot-header">
          <h3>Chat with {{ planetInfo.name }}</h3>
          <button @click="close" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="chatbot-messages" ref="messageContainer">
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
            
            <template v-if="Array.isArray(message?.text)">
              <div class="message-content">
                <div v-for="(text, index) in message.text" :key="index">
                  <p>{{ text }}</p>
                </div>
              </div>
            </template>
            <template v-else>
                <div class="message-content">{{ message.text }}</div>
            </template>
            
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>
        <div class="chatbot-input">
          <input class="text"
            v-model="userInput" 
            @keyup.enter="sendMessage" 
            placeholder="Type your message..." 
          />
          <button @click="sendMessage" class="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ChatBot',
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      planetInfo: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        messages: [],
        userInput: ''
      }
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
        deep: true
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async sendMessage() {
        if (this.userInput.trim() === '') return;
        
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.messages.push({ text: this.userInput, sender: 'user', time: currentTime });
        
        const userMessage = this.userInput;
        this.userInput = '';
        
        try {
          const response = await axios.post("https://cosmic-converse.onrender.com/generate", {
            gemini_content: userMessage,
            planet_info: this.planetInfo,
            
          });
          
          const botResponse = response.data.data;
       
          this.messages.push({ 
            text: botResponse, 
            sender: 'bot', 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          });
        } catch (error) {
          console.error('Error sending message:', error);
          this.messages.push({ 
            text: 'Sorry, I encountered an error. Please try again later.', 
            sender: 'bot', 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          });
        }
      },
      initializeChat() {
        console.log(this.planetInfo.name);
        
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.messages = [{ text: `Hello! I'm ${this.planetInfo.name}. What would you like to know about me?`, sender: 'bot', time: currentTime }];
      },
      scrollToBottom() {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      }
    }
  }
  </script>
  <style scoped>
  .chatbot-container {
    position: fixed;
    top: 0px;  
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .chatbot {
    width: 100VH;
    height: 100%;
    background-color: var(--primary);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  
  .chatbot-header {
    background-color: var(--secondary);
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  .chatbot-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .message {
    margin-bottom: 15px;
    max-width: 80%;
  }
  
  .message-content {
    padding: 10px;
    border-radius: 18px;
    display: inline-block;
  }
  
  .message-time {
    font-size: 0.8em;
    color: #888;
    margin-top: 5px;
  }
  
  .user {
    align-self: flex-end;
  }
  
  .user .message-content {
    background-color: var(--tertiary);
    color: white;
  }
  
  .bot .message-content {
    background-color: #f0f0f0;
    color: black;
  }
  .text{
    color: black;
  }
  
  .chatbot-input {
    display: flex;
    padding: 15px;
    background-color: white;
  }
  
  .chatbot-input input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
  }
  
  .send-button {
    background-color: var(--secondary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .send-button:hover {
    background-color: var(--tertiary);
  }
  </style>