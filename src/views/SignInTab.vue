<template>
    <ion-page>
        <ion-content
            :force-overscroll="false"
            :fullscreen="true"
        >
            <ion-header>
                <h3 class="center">NutriLog SNHU</h3>
            </ion-header>

            <Authenticator>
                <template v-slot="{ user }">
                    <h1>Hello {{ user.username }}!</h1>
                    <button @click="signOut">Sign Out</button>
                    <br>
                    <button @click="deleteUser">Delete User</button>
                </template>
            </Authenticator>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import { Hub, Auth, I18n } from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';
import { defineComponent } from 'vue';

import {
    IonPage,
    IonContent,
    IonHeader
} from '@ionic/vue';

// Typographical changes for the UI
I18n.putVocabulariesForLanguage('en', {
    'Sign in': 'Sign In',
    'Forgot your password? ': 'Reset Password',
});

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        IonHeader,
        Authenticator
    },
    setup() {
        return {
        }
    },
    mounted() {
        // Listen for Auth events
        const AuthListener = (data: any) => {
            switch (data.payload.event) {
                case 'signIn':
                    console.log('User signed in.');
                    break;
                case 'signOut':
                    console.log('User signed out.');
                    break;
            }
        }

        Hub.listen('auth', AuthListener);
    },
    methods: {
        async signOut() {
            await Auth.signOut();
        },
        async deleteUser() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                await Auth.deleteUser();
                console.log(`User ${user.username} deleted.`);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
});

</script>

<style scoped>
  ion-toolbar {
    --opacity: 0.0;
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