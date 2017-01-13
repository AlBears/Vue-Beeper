<template>
  <div>
    <h3 class=text-center>Login</h3>
    <input v-model="user.username" type="text" class="form-control m-b-15" placeholder="Username">
    <input v-model="user.password" type="password" class="form-control" placeholder="Password">

    <hr>

    <button class="btn btn-lg btn-primary btn-block m-b-15" @click="login">Sign in!</button>

    <p class="text-center">
      Don't have an account? <router-link to="/auth/register">Sign up!</router-link>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login(){
        this.$http.post('/auth', this.user)
                    .then((res) => {

                    })

      }
    }
  }
</script>

<style>
</style>
