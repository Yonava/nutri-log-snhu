<template>
  <ion-page>
    <ion-content :force-overscroll="false">
      <div class="reset-box" v-if="enterEmail">
        <h1>Forgot Password?</h1>
        <div class="form">
          <div class="text-field">
            <input type="text" v-model="email" @keyup.enter="sendReset" required>
            <span></span>
            <label>Email</label>
          </div>
          <div class="reset-err" v-if="emailErr != ''">{{ emailErr }}</div>
          <input type="submit" value="Submit" @click="sendReset">
          <div class="register">Back to <router-link class="register-link" to="/signin">Sign-In</router-link></div>
        </div>
      </div>
      <div class="reset-box" v-if="enterCode">
        <h1>Reset Code</h1>
        <h5>If an account with that email exists, you will receive a confirmation code</h5>
        <div class="form">
          <div class="text-field">
            <input type="text" v-model="code" @keyup.enter="confirmReset" required>
            <span></span>
            <label>Code</label>
          </div>
          <div class="reset-err" v-if="codeErr != ''">{{ codeErr }}</div>
          <input type="submit" value="Verify" @click="confirmReset">
          <div class="register">Back to <router-link class="register-link" to="/signin">Sign-In</router-link></div>
        </div>
      </div>
      <div class="reset-box" v-if="enterNewPwd">
        <h1>Enter New Password</h1>
        <div class="form">
          <div class="text-field">
            <input type="text" v-model="firstPass" @keyup.enter="resetPassword" required>
            <span></span>
            <label>Type New Password</label>
          </div>
          <div class="text-field">
            <input type="text" v-model="secondPass" @keyup.enter="resetPassword" required>
            <span></span>
            <label>Retype New Password</label>
          </div>
          <div class="reset-err" v-if="resetErr != ''">{{ resetErr }}</div>
          <input type="submit" value="Verify" @click="resetPassword">
          <div class="register">Back to <router-link class="register-link" to="/signin">Sign-In</router-link></div>
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
  data() {
    return {
      userId: "",
      tempUserList: [],
      email: "",
      code: "",
      firstPass: "",
      secondPass: "",
      emailErr: "",
      codeErr: "",
      resetErr: "",
      enterEmail: true,
      enterCode: false,
      enterNewPwd: false
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
  methods: {
    async sendReset() {
        try {
            await Auth.forgotPassword(this.email);
            
            this.enterEmail = false;
            this.enterCode = true;
        }
        catch (err) {
            const strErr = String(err);
            this.emailErr = strErr.replace(/.+: /, "");
            this.emailErr = this.emailErr.replace(/Username/, "Email");
        }
        
    },
    confirmReset() {
        this.enterCode = false;
        this.enterNewPwd = true;
    },
    matchPwd() {
        return (this.firstPass == this.secondPass);
    },
    async resetPassword() {
        try {
            if (!this.matchPwd()) throw Error("Passwords do not match");

            await Auth.forgotPasswordSubmit(this.email, this.code, this.secondPass);
        }
        catch (err) {
            const strErr = String(err);
            this.emailErr = strErr.replace(/.+: /, "");
        }
    }
  },
  watch: {
    firstPass() {
        if (!this.matchPwd()) this.resetErr = "Passwords do not match";
    },
    secondPass() {
        if (!this.matchPwd()) this.resetErr = "Passwords do not match";
    }
  }
});
</script>

<style scoped>
/* page */
ion-content {
  --background: linear-gradient(0deg, rgba(0,34,50,1) 0%, rgba(16,71,154,1) 54%, rgb(7, 120, 165) 100%);
}

/* Login box */
.reset-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  width: 390px;
  background: rgba(4, 42, 112, 0.925);
  border-radius: 10px;
}

/* Login heading */
.reset-box h1 {
  color: rgb(192, 185, 185);
  font-size: 40px;
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid rgb(192, 185, 185);
}

.reset-box h5 {
    text-align: center;
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
.reset-err {
  color: rgb(214, 26, 26);
  text-align: center;
  margin: 0 0 20px 0;
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