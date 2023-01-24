<template>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<slot name="left"></slot>
			</ion-buttons>
			<ion-title>
				{{ title }}
			</ion-title>
			<ion-buttons slot="end">
				<slot name="right"></slot>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
	IonHeader, 
	IonToolbar, 
	IonTitle, 
	IonButtons,
} from '@ionic/vue';

export default defineComponent({
	name: 'DefaultHeader',
	components: { 
		IonHeader, 
		IonToolbar, 
		IonTitle, 
		IonButtons,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
	}
})
</script>