<template>
  <ion-page>
    <ion-content :force-overscroll="false">
      <div class="center login-header">NutriLog SNHU</div>
      <div class="center login-box"></div>
      <div class="center login-content">Sign In</div>
      <!-- <Authenticator>
        <template v-slot="{ user }">
          <h1>Hello {{ user.username }}!</h1>
          <button @click="signOut">Sign Out</button>
          <br />
          <button @click="deleteUser">Delete User</button>
        </template>
      </Authenticator> -->
      <!-- <p class="center">Don't have an account?<router-link to="/register">Register Here</router-link></p> -->
      <!-- <button 
        v-for="user in tempUserList"
        :key="user._id"
        style="margin: 10px; color: white; background-color: #3b3b3b; border-radius: 5px; padding: 5px;"
        @click.once="tempSignIn(user._id)"
      >
        {{ user.firstName }} {{ user.lastName }}
      </button> -->
    </ion-content>
  </ion-page>
</template>

<script>
// import { Authenticator } from "@aws-amplify/ui-vue";
import { Hub, Auth, I18n } from "aws-amplify";
import "@aws-amplify/ui-vue/styles.css";
import { defineComponent } from "vue";

import { IonPage, IonContent } from "@ionic/vue";

import axios from "axios";

// Typographical changes for the UI
I18n.putVocabulariesForLanguage("en", {
  "Sign in": "Sign In",
  "Forgot your password? ": "Reset Password",
});

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    // IonHeader,
    // Authenticator,
  },
  data() {
    return {
      userId: "",
      tempUserList: [],
    }
  },
  created() {
    axios
      .get("/users")
      .then((res) => {
        this.tempUserList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    // Listen for Auth events
    const AuthListener = (data) => {
      switch (data.payload.event) {
        case "signIn":
          // Do sign in stuff
          break;
        case "signOut":
          // Do sign out stuff
          break;
      }
    };

    Hub.listen("auth", AuthListener);
  },
  methods: {
    async signOut() {
      await Auth.signOut();
    },
    async deleteUser() {
      try {
        await Auth.deleteUser();
      } catch (error) {
        console.log(error);
      }
    },
    tempSignIn(userId) {
      localStorage.setItem("userId", userId);
      window.location.replace("/");
    },
  },
});
</script>

<style scoped>
ion-toolbar {
  --opacity: 0;
}

.login-header {
  margin-top: 50px;
  font-size: 2rem;
  font-weight: 800;
}

.login-box {
  margin-top: 50px;
  margin-left: 36.7%;
  width: 400px;
  height: 500px;
  background-color: #3b3b3b4b;
  border-radius: 10px;
  z-index: 0;
}

.login-content {
  margin-top: 50px;
  font-size: 1.5rem;
  font-weight: 800;
  z-index: 2;
}

</style>