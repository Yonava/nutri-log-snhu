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

<script lang="ts">
import { watch, ref, defineComponent } from "vue";
import { Auth } from "aws-amplify";

export default defineComponent({
    components: {

    },
    setup() {
        const code = ref("");
        const codeErr = ref("");

        watch(code, () => {
            if (code.value.length == 6) confirmReset();
        })

        return {
            code,
            codeErr
        }
    }
});

</script>