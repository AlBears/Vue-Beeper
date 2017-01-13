<template>
  <div>
    <h3 class=text-center>Register</h3>

    <input v-model="user.email" type="email" class="form-control m-b-15" placeholder="Email address">
    <input v-model="user.username" type="text" class="form-control m-b-15" placeholder="Username">
    <input v-model="user.password" type="password" class="form-control m-b-15" placeholder="Password">

    <hr>

    <button class="btn btn-lg btn-primary btn-block m-b-15" @click='register'>Register</button>

    <p class="text-center">
      Already have an account? <router-link to="/auth/login">Login!</router-link>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data(){
      return {
        user: {
          email: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      register(){
        this.$http.post('http://localhost:9090/users', this.user)
                .then(() => {
                  alertify.success('You can now login with your email and password');
                  this.$router.push('/auth/login');
                })
                .catch((res) => {
                  if (res.status == 422){
                    res.body.errors.forEach((e) => alertify.error(e)
                  )}
                })
      }
    }
  }
</script>

<style>
</style>
