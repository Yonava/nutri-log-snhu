<template>
  <ion-page>
    <ion-content :force-overscroll="false">
      <ion-header style="margin-top: 20px">
        <h3 class="center">NutriLog SNHU</h3>
      </ion-header>
      <Authenticator>
        <template v-slot="{ user }">
          <h1>Hello {{ user.username }}!</h1>
          <button @click="signOut">Sign Out</button>
          <br />
          <button @click="deleteUser">Delete User</button>
        </template>
      </Authenticator>
      <input type="text" v-model="userId">
    </ion-content>
  </ion-page>
</template>

<script>
import { Authenticator } from "@aws-amplify/ui-vue";
import { Hub, Auth, I18n } from "aws-amplify";
import "@aws-amplify/ui-vue/styles.css";
import { defineComponent } from "vue";

import { IonPage, IonContent, IonHeader } from "@ionic/vue";

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
    IonHeader,
    Authenticator,
  },
  data() {
    return {
      userId: "",
    }
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
  },
  watch: {
    userId(newVal) {
      if (newVal.length < 10) return;
      axios
        .get(`/users/${newVal}`)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          this.$router.push('/');
          localStorage.setItem("userId", newVal);
          setTimeout(() => {
            location.reload();
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>

<style scoped>
ion-toolbar {
  --opacity: 0;
}

.sign-in-box {
  background-color: #f0f0f0;
  border-radius: 10px;
  border-width: 4px;
  margin-top: 25vh;
  height: 240px;
  width: 300px;
}

#sign-in-text {
  font-size: 20px;
  color: #000000;
  font-weight: bold;
  margin-top: 100px;
  margin-left: 115px;
}

.sign-in-btn {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: 260px;
}
</style>