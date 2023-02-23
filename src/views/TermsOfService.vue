<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/" />
        <ion-title>
          Terms of Service
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="ion-padding">
        <h1>Privacy Policy</h1>
        <p>By using the NutriLog™ SNHU app, you agree to the collection, use, and sharing of your information as described in this <a @click="$router.push('/')">Privacy Policy</a>. If you do not agree with our policies and practices, do not use the NutriLog™ SNHU app.</p>
        
        <h2>Information We Collect</h2>
        <p>We may collect the following information about you when you use the NutriLog™ SNHU app:</p>
        <ul>
          <li>Personal information: This may include your name, email address, and other contact information that you provide to us.</li>
          <li>User-generated content: This may include any content that you create or share through the NutriLog™ SNHU app, such as log entries, scan data obtained via the device camera whilst utilizing the apps ‘scan’ feature and macro-nutrient calibrations.</li>
          <li>Device information: This may include information about your device, such as the type of device, the operating system, and the device identifier.</li>
          <li>Location information: This may include information about your location, such as your IP address and GPS data.</li>
        </ul>
        
        <h2>How We Use Your Information</h2>
        <p>We may use the information we collect from you for the following purposes:</p>
        <ul>
          <li>To communicate with you: We may use your information to communicate with you about the app and your use of the app.</li>
          <li>For machine learning purposes: We may use your information, including user-generated content, for machine learning and data analysis purposes.</li>
          <li>For research and development: We may use your information for research and development purposes, in order to improve the app and develop new features and functionality.</li>
        </ul>
        
        <h2>Sharing Your Information</h2>
        <p>We may share your information with third parties in the following circumstances:</p>
        <ul>
          <li>With service providers: We may share your information with service providers who help us operate and improve the NutriLog™ SNHU app.</li>
          <li>With business partners: We may share your information with business partners and/or sponsors of the app.</li>
          <li>As required by law: We may disclose your information if we are required to do so by law or if we believe that such action is necessary to comply with legal processes, to protect the rights and safety of our users or the public, or to enforce our policies.</li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, 
  IonHeader, 
  IonToolbar,
  IonTitle,
  IonPage,
  IonBackButton
} from "@ionic/vue";
</script>