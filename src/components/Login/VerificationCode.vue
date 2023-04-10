<template>
<div class="reset-box">
        <h1>Reset Code</h1>
        <h5>If an account with that email exists, you will receive a confirmation code</h5>
        <div class="form">
          <div class="text-field">
            <input type="text" v-model="code" @keyup.enter="confirmReset" required>
            <span></span>
            <label>Confirmation Code</label>
          </div>
          <div class="reset-err" v-if="codeErr != ''">{{ codeErr }}</div>
          <div class="register">Back to <router-link class="register-link" to="/signin">Sign-In</router-link></div>
        </div>
      </div>
</template>

<script setup>
import { watch, ref, defineEmits } from 'vue';

const emit = defineEmits(['confirmCode']);
const code = ref("");
const codeErr = ref("");

function confirmReset() {
  if (code.value.length == 6) emit('confirmCode', code.value);
}

watch(code, () => {
    confirmReset();
})
</script>

<style scoped>

/* Login box */
.reset-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  width: 390px;
  background: rgba(9, 26, 63, 0.925);
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