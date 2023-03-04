<template>
	<ion-page>
		<default-header title="Notifications">
			<template #left>
				<ion-back-button default-href="/tabs/home"></ion-back-button>
			</template>
		</default-header>
		<ion-content>
			<TransitionGroup name="list">
			<div 
				v-for="notif in notifications" 
				:key="notif._id"
				class="center"
			>
					<div class="card-parent ion-padding">
						<div class="card-content center">
							<div style="font-weight: 700; font-size: 0.7rem; color: rgb(150, 150, 150)">
								{{ notif.date.toLocaleString() }}
							</div>
							<div style="margin-bottom: 15px; font-weight: 200; color: rgb(50, 50, 50)">
								{{ notif.content }}
							</div>
						</div>
						<div>
							dismiss
						</div>
					</div>
				</div>
			</TransitionGroup>
		</ion-content>
	</ion-page>
</template>
  
<script setup lang="ts">
import {
	ref,
	TransitionGroup
} from 'vue';
import {
	IonPage,
	IonIcon,
	IonBackButton,
	IonContent,
} from '@ionic/vue';
import { trash } from 'ionicons/icons';

type Notification = {
	content: string,
	date: Date,
	_id: string
}

function removeItem(notifId: string) {
	const index = notifications.value.findIndex((item: Notification) => item._id === notifId);
	notifications.value.splice(index, 1);
}

const notifications = ref<Notification[]>([
	{ content: 'New Menu Item', date: new Date(2023, 6, 28, 14, 39), _id: '1a' },
	{ content: 'Notif 2', date: new Date(2023, 6, 28, 14, 39), _id: '2a' },
	{ content: 'Notif 3', date: new Date(2023, 6, 28, 14, 39), _id: '3a' },
	{ content: 'Notif 4', date: new Date(2023, 6, 28, 14, 39), _id: '4a' },
	{ content: 'Notif 5', date: new Date(2023, 6, 28, 14, 39), _id: '5a' },
	{ content: 'Notif 6', date: new Date(2023, 6, 28, 14, 39), _id: '6a' },
	{ content: 'Notif 7', date: new Date(2023, 6, 28, 14, 39), _id: '4a' },
	{ content: 'Notif 8', date: new Date(2023, 6, 28, 14, 39), _id: '5a' },
	{ content: 'Notif 9', date: new Date(2023, 6, 28, 14, 39), _id: '6a' },
]);
</script>
  
<style scoped>
ion-icon {
	font-size: 64px;
	color: #3880ff;
	float: right;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(100vw);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.card-parent {
	width: 90%;
	height: 90px;
	background: rgb(230, 230, 230);
	margin: 5px 0;
	border-radius: 10px;
	justify-content: space-around;
	flex-direction: row;
}
</style>
  