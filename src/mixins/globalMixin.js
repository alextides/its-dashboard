// eslint-disable-next-line import/extensions
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  methods: {
    notify(payload) {
      const { text, variant } = payload

      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'BellIcon',
          text,
          variant,
        },
      }, { position: 'top-right' })
    },
    confirmationAlert(text) {
      return new Promise(resolve => {
        this.$swal({
          text,
          icon: 'question',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-primary mr-1',
            cancelButton: 'btn btn-secondary',
          },
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          buttonsStyling: false,
        }).then(res => {
          resolve(res)
        })
      })
    },
  },
}
