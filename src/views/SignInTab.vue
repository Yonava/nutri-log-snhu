<template>
  <ion-page>
    <ion-content :force-overscroll="false">
      <div class="login-box">
        <h1>Login</h1>
        <div class="form">
          <div class="text-field">
            <input type="text" v-model="email" @keyup.enter="signIn" required>
            <span></span>
            <label>Email</label>
          </div>
          <div class="text-field">
            <input type="password" v-model="password" @keyup.enter="signIn" required>
            <span></span>
            <label>Password</label>
          </div>
          <div class="login-err" v-if="loginErr != ''">{{ loginErr }}</div>
          <input type="submit" value="Login" @click="signIn">
          <div class="pass-reset"><router-link class="reset-link" to="/reset-password">Forgot Password?</router-link></div>
          <div class="register">Don't have an account? <router-link class="register-link" to="/register">Register</router-link></div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-vue/styles.css";
import { defineComponent } from "vue";

import { IonPage, IonContent } from "@ionic/vue";

import axios from "axios";

export default defineComponent({
  components: {
    IonPage,
    IonContent
  },
  setup() {
    async function signIn() {
      try {
        if (this.email === "" || this.password === "") throw Error("Username and password cannot be empty");

        const user = await Auth.signIn(this.email, this.password);
        console.log(`User: ${user.username}`);
        this.$router.push({ path: '/' });
      } catch (err) {
        const strErr = String(err); // make the error a string for printing
        // Remove the error type from the string
        if (strErr.includes("User does not exist")) {
          this.loginErr = "Username or password is incorrect";
          return;
        }
        this.loginErr = strErr.replace(/.+: /, "");
      }
    }

    function tempSignIn(userId) {
      localStorage.setItem("userId", userId);
      window.location.replace("/");
    }

    return {
      userId: "",
      tempUserList: [],
      email: "",
      password: "",
      loginErr: ""
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
  }
});
</script>

<style scoped>
/* page */
ion-content {
  --background: linear-gradient(45deg, rgba(4,1,55,1) 9%, rgba(45,116,195,1) 81%, rgba(38,145,217,1) 100%);
}

/* Login box */
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  width: 350px;
  background: rgba(9, 26, 63, 0.925);
  border-radius: 10px;
}

/* Login heading */
.login-box h1 {
  color: rgb(192, 185, 185);
  font-size: 40px;
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid rgb(192, 185, 185);
}

/* Adjust the contents of the login box */
.form {
  padding: 0 40px;
  box-sizing: border-box;
}

.text-field {
  position: relative;
  border-bottom: 2px solid rgb(192, 185, 185);
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
  color: rgb(192, 185, 185);
}

.text-field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: rgb(192, 185, 185);
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

/* login errors */
.login-err {
  color: rgb(214, 26, 26);
  text-align: center;
  margin: 0 0 20px 0;
}

/* forgot password */
.pass-reset {
  text-align: center;
  margin: 0 0 20px 0;
  cursor: pointer;
}

.reset-link {
  color: rgb(192, 185, 185);
  text-decoration: none;
}

.reset-link:hover {
  text-decoration: underline;
}

/* login button */
input[type="submit"] {
  width: 100%;
  height: 40px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 20px;
  border-color: rgba(9, 26, 63, 0.925);
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: rgb(230, 227, 227);
  cursor: pointer;
}

input[type="submit"]:hover {
  border-color: #2691d9;
  transition: 0.25s;
}

/* sign up */
.register {
  color: rgb(192, 185, 185);
  font-size: 14px;
  text-align: center;
  margin: 0 0 30px 0;
}

.register-link {
  color: #2691d9;
  text-decoration: none;
}

</style>