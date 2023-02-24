<template>
  <ion-page>
    <ion-content :force-overscroll="false">
      <div class="login-box">
        <h1>Login</h1>
        <div class="form">
          <div class="text-field">
            <input type="text" v-model="email" required>
            <span></span>
            <label>Email</label>
          </div>
          <div class="text-field">
            <input type="password" v-model="password" required>
            <span></span>
            <label>Password</label>
          </div>
          <div class="pass-reset">Forgot Password?</div>
          <input type="submit" value="Login" @click="signIn">
          <div class="register">Don't have an account? <router-link class="register-link" to="/register">Register</router-link></div>
        </div>
      </div>
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
      email: "",
      password: ""
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
          console.log("signed in")
          break;
        case "signOut":
          // Do sign out stuff
          break;
      }
    };

    Hub.listen("auth", AuthListener);
  },
  methods: {
    async signIn() {
      try {
        await Auth.signIn(this.email, this.password);
        this.$router.push({ path: '/' });
      } catch (error) {
        console.log(error);
      }
    },
    async signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log(error);
      }
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
  }
});
</script>

<style scoped>

/* Login box */
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  width: 350px;
  background: white;
  border-radius: 10px;
}

/* Login heading */
.login-box h1 {
  color: black;
  font-size: 40px;
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid silver;
}

/* Adjust the contents of the login box */
.form {
  padding: 0 40px;
  box-sizing: border-box;
}

.text-field {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}

.text-field input {
  width: 100;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  color: black;
}

.text-field label {
  color: black;
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.25s;
}

/* input field select */
.text-field span::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #2691d9;
}

.text-field input:focus ~ label,
.text-field input:valid ~ label {
  top: -5px;
  color: #2691d9;
}

.text-field input:focus ~ span::before,
.text-field input:valid ~ span::before {
  width: 100%;
}

/* forgot password */
.pass-reset {
  color: #adadad;
  text-align: center;
  margin: 0 0 20px 0;
  cursor: pointer;
}

.pass-reset:hover {
  text-decoration: underline;
}

/* login button */
input[type="submit"] {
  width: 100%;
  height: 40px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 20px;
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
  cursor: pointer;
}

input[type="submit"]:hover {
  border-color: #2691d9;
  transition: 0.25s;
}

/* sign up */
.register {
  color: #696969;
  font-size: 14px;
  text-align: center;
  margin: 0 0 30px 0;
}

.register-link {
  color: #2691d9;
  text-decoration: none;
}

</style>