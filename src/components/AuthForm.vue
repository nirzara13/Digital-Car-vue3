<template>
    <div class="bg-[#001F54] p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-white">Authentication</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block font-medium text-white">Email</label>
          <input type="email" id="email" v-model="email" class="w-full px-3 py-2 bg-[#034078] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#1282A2]" required>
        </div>
        <div class="mb-4">
          <label for="password" class="block font-medium text-white">Password</label>
          <input type="password" id="password" v-model="password" class="w-full px-3 py-2 bg-[#034078] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#1282A2]" required>
        </div>
        <button type="submit" class="w-full bg-[#1282A2] text-white px-4 py-2 rounded-md hover:bg-[#0A7F96]">
          Log in
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthForm',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        // Handle login logic here
        console.log('Logged in:', { email: this.email, password: this.password })
      }
    }
  }
  </script>