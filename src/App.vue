<template>
    <ion-app>
      <ProfileMenu></ProfileMenu>
      <ion-router-outlet id="main-content"/>
    </ion-app>
    <ion-menu-controller></ion-menu-controller>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import ProfileMenu from './components/ProfileMenu/ProfileMenu.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    ProfileMenu
  }
});
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>