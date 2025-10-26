import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import type { App } from 'vue'

export function setupToastify(app: App) {
  const options: ToastContainerOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
  }

  app.use(Vue3Toastify, options)
}
