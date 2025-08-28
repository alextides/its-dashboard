<template>
  <div>
    <grade-option />
    <prep-option />
    <needs-option />
  </div>
</template>

<script>
import GradeOptions from './GradeOptions.vue'
import NeedOptions from './NeedOptions.vue'
import PrepOptions from './PrepOptions.vue'

export default {
  components: {
    'grade-option': GradeOptions,
    'needs-option': NeedOptions,
    'prep-option': PrepOptions,
  },
}
</script>
