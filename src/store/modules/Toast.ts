import { Module } from 'vuex'
import { ToastState } from '@/types/Vuex'
import { ToastOptions } from '@ionic/core';
import { toastController } from '@ionic/vue';

const Toast: Module<ToastState, any> = {
  mutations: {
    async presentToast(options: ToastOptions) {
      const toast = await toastController.create(options)
      toast.present()
    }
  }
}

export default Toast