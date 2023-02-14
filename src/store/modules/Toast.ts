import { Module } from 'vuex'
import { ToastState } from '@/types/Vuex'
import { ToastOptions } from '@ionic/core';
import { toastController } from '@ionic/vue';

interface Object1 {
  message: string,
  duration: number,
  color: string,
  position: string
}

const Toast: Module<ToastState, any> = {
  mutations: {
    presentToast(state, options: ToastOptions = { 
      message: 'Toast options left undefined',
      duration: 3000,
      color: 'danger',
    }) {
      toastController.create(options)
        .then(toast => {
          toast.present()
        })
    }
  }
}

export default Toast