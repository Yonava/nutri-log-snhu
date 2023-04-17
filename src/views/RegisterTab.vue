<template>
  <ion-page>
    <ion-content :force-overscroll="false">
      <div class="register-box" v-if="registerUser">
        <h1>Register</h1>
        <div class="form">
          <div class="text-field">
            <input type="text" v-model="fname" @keyup.enter="createAcct" required>
            <span></span>
            <label>First Name</label>
          </div>
          <div class="text-field">
            <input type="text" v-model="lname" @keyup.enter="createAcct" required>
            <span></span>
            <label>Last Name</label>
          </div>
          <div class="text-field">
            <input type="text" v-model="email" @keyup.enter="createAcct" required>
            <span></span>
            <label>Enter Your Email</label>
          </div>
          <div class="text-field">
            <input type="password" v-model="firstPass" @keyup.enter="createAcct" required>
            <span></span>
            <label>Create a Password</label>
          </div>
          <div class="text-field">
            <input type="password" v-model="secondPass" @keyup.enter="createAcct" required>
            <span></span>
            <label>Confirm Password</label>
          </div>
          <div class="register-err" v-if="registerErr != ''">{{ registerErr }}</div>
          <input type="submit" value="Create Account" @click="createAcct">
          <div class="subtext">Already have an account? <a class="subtext-link" @click="$router.back()">Sign In</a></div>
        </div>
      </div>
      <VerificationCode
        v-if="confirmSignUp"
        @confirmCode="code = $event"
        :email="email"
      />
    </ion-content>
  </ion-page>
</template>

<script>
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-vue/styles.css";
import { watch, ref, defineComponent } from "vue";
import { useRouter } from 'vue-router';
import { IonPage, IonContent } from "@ionic/vue";
import axios from "axios";
import VerificationCode from "../components/Login/VerificationCode.vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    VerificationCode
  },
  setup() {
    const router = useRouter();
    const fname = ref("");
    const lname = ref("");
    const email = ref("");
    const firstPass = ref("");
    const secondPass = ref("");
    const code = ref("");
    const registerErr = ref("");
    const confirmErr = ref("");
    const registerUser = ref(true);
    const confirmSignUp = ref(false);
    const sendLevel = ref("sent");
    
    function matchPwd() {
        return (firstPass.value == secondPass.value);
    }

    async function createAcct() {
        try {
            if (!matchPwd()) throw Error("Passwords do not match");

            const user = await Auth.signUp(email.value, secondPass.value);
            console.log(user);

            registerUser.value = false;
            confirmSignUp.value = true;
        }
        catch (err) {
            const strErr = String(err);
            registerErr.value = strErr.replace(/.+: /, "");
            registerErr.value = registerErr.value.replace(/Username/, "Email");
        }
    }

    async function confirmAcct() {
        try {
            await Auth.confirmSignUp(email.value, code.value);
            router.push({ path: '/' });
        }
        catch (err) {
            const strErr = String(err);
            confirmErr.value = strErr.replace(/.+: /, "");
            confirmErr.value = registerErr.value.replace(/Username/, "Email");
        }
    }

    watch(firstPass, () => {
        if (!matchPwd()) registerErr.value = "Passwords do not match";
        else registerErr.value = "";
    });

    watch(secondPass, () => {
        if (!matchPwd()) registerErr.value = "Passwords do not match";
        else registerErr.value = "";
    });

    watch(code, () => {
        if (code.value.length == 6) confirmAcct();
    });

    return {
      fname,
      lname,
      email,
      firstPass,
      secondPass,
      code,
      registerErr,
      confirmErr,
      registerUser,
      confirmSignUp,
      sendLevel,
      matchPwd,
      createAcct,
      confirmAcct
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
  --background: linear-gradient(-45deg, rgba(0,34,50,1) 0%, rgba(11,80,98,1) 54%, rgba(38,193,217,1) 100%);
}

/* Register box */
.register-box {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -80%);
  width: 350px;
  background: rgba(9, 26, 63, 0.925);
  border-radius: 10px;
}

/* Register heading */
.register-box h1 {
  color: rgb(192, 185, 185);
  font-size: 40px;
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid rgb(192, 185, 185);
}

.register-box h5 {
    text-align: center;
}

/* Adjust the contents of the register box */
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

/* pwd reset errors */
.register-err {
  color: rgb(214, 26, 26);
  text-align: center;
  margin: 0 0 20px 0;
}

/* create acct button */
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

/* sign in */
.subtext {
  color: rgb(192, 185, 185);
  font-size: 14px;
  text-align: center;
  margin: 0 0 30px 0;
}

.subtext-link {
  color: #2691d9;
  text-decoration: none;
  background: none;
}

</style>