<template>
    <div id="sidebar" class="text-center">
      <div v-if="loggedIn">
        <h4 class="text-center">@{{ user.username }}</h4>
        <hr>
        <div class="row">
            <div class="col-sm-6">
                <router-link :to="`/profile/${user.username}`" class="btn btn-block btn-default">
                  <i class="fa fa-user"></i> Profile
                </router-link>
            </div>
            <div class="col-sm-6">
                <router-link to="/newsfeed" class="btn btn-block btn-default">
                  <i class="fa fa-newspaper-o"></i> Feed
                </router-link>
            </div>
        </div>

        <div class="beepNowWrap m-t-20 m-b-20">
            <textarea class="form-control" rows="10" placeholder="Start writing your beep here!" maxlength="320" v-model="newBeep"></textarea>
            <p class="text-muted">{{ 320 - newBeep.length }} character{{ 320 - newBeep.length == 1 ? '' : 's' }}</p>
            <p class="text-center no-margin"><button class="btn btn-primary" @click="beep">Beep Now!</button></p>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <p class="text-center no-margin">
                    <router-link to="/settings"><i class="fa fa-cog"></i> Settings</router-link>
                </p>
            </div>
            <div class="col-sm-6">
                <p class="text-center no-margin">
                    <a href="#" @click.prevent="logout"><i class="fa fa-power-off" ></i> Logout</a>
                </p>
            </div>
        </div>
      </div>
      <div v-if="!loggedIn">
            <h1>Welcome!</h1>
            <p>Beeper is a microblogging social network, come join the fun!</p>
            <p class="text-center">
                <router-link to="/auth/register" class="btn btn-primary btn-block">Register</router-link><br>
                <router-link to="/auth/login" class="btn btn-default btn-block">Login</router-link>
            </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'sidebar',
        created() {

        },
        data(){
          return {
            newBeep: "",
            loggedIn: this.$auth.loggedIn()
          }
        },
        computed: {
          user() {
            return this.$store.state.currentUser;
          }
        },
        methods: {
          beep() {
            this.$http.post('/beeps', { text: this.newBeep })
                  .then((res) => {
                    this.$root.$emit('newBeep', res.data);
                    this.newBeep = '';
                    alertify.success('Beep published');
                  })
          },
          logout() {
            this.$auth.destroyToken();
            this.user = {};
            this.$router.push('/auth/login');
          }

        }
    }
</script>

<style scoped>
    #sidebar {
        background: #fff;
        padding: 20px;
        border-radius: 6px;
    }

    .beepNowWrap {
        background: #f0f0f0;
        margin: 20px -20px;
        padding: 20px;
    }

    .beepNowWrap textarea {
        background: transparent;
        border: transparent;
        box-shadow: none;
        resize: vertical;
    }
</style>
