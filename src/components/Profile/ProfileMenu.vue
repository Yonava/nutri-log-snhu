<template>
  <ion-menu 
    type="push"
    content-id="home-tab-content" 
    menu-id="profile-menu"
  >
    <ion-content>
      <div ref="menu" class="main-container">
        <div class="headline-content center">
          <h1 class="header-text">
            Hi, {{ firstName }}
          </h1>
          <div class="pfp"></div>
        </div>
        <div class="action-content">
          <div>
            <div 
              v-for="button in buttons"
              :key="button"
              class="center"
            >
              <ion-button 
                @click="button.action"
                class="nav-button"
              >
                {{ button.text() }}
              </ion-button>
            </div>
          </div>
          <div class="center">
            <ion-button
              @click="logout"
              color="danger" 
              style="width: 90%"
            >Logout</ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import {
  IonContent,
  IonButton,
  IonMenu,
  menuController
} from "@ionic/vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Auth } from 'aws-amplify';

export default defineComponent({
  components: {
    IonContent,
    IonButton,
    IonMenu
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    async function logout() {
      try {
        await Auth.signOut();
        router.push({ path: '/signin' });
        localStorage.setItem('email', '');
      }
      catch (err) {
        console.log(err);
      }
    }

    const firstName = computed(() => {
      return store.getters.isLoggedIn ? store.getters.user.firstName : "";
    });

    const buttons = [
      {  
        text: () => "Adjust Daily Targets",
        action: async () => {
          router.push({ name: "AdjustTargets" });
          await menuController.close("profile-menu");
        }
      },
      { 
        text: () => `${store.getters.caloriesHidden ? "Show" : "Hide"} Calories`,
        action: () => {
          store.dispatch("toggleCaloriesHidden");
        }
      },
      { 
        text: () => "Terms of Service",
        action: async () => {
          router.push({ name: "ToS" });
          await menuController.close("profile-menu");
        }
      }
    ];

    return {
      firstName,
      store,
      buttons,
      logout
    };
  }
});
</script>

<style scoped>
.pfp {
  background: orange; 
  width: 120px; 
  height: 120px; 
  border-radius: 50%;
}

.nav-button {
  width: 90%;
  margin: 5px 0px 5px 0px;
}
.main-container {
  display: flex; 
  flex-direction: column;
  height: 100%;
  padding: 15px 0px 15px 0px;
}

.headline-content {
  height: 30%;
}

.action-content {
  height: 70%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.header-text {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 10px;
}

ion-content {
  --overflow: hidden;
}
</style>