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
      header: 'Error',
      message: 'Toast options left undefined',
      duration: 3000,
      color: 'danger',
    }) {

      const defaults: ToastOptions = {
        message: 'Toast options left undefined',
        duration: 2000,
        color: 'primary',
        position: 'top',
      }

      const toastOptions = Object.assign(defaults, options)

      toastController.create(toastOptions)
        .then(toast => {
          toast.present()
        })
    }
  }
}

export default Toast