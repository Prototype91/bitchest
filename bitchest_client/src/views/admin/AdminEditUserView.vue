<template>
  <EditUserForm :currentUserData="userData"/>
</template>

<script>
import EditUserForm from "../../components/shared/EditUserForm.vue";
export default {
  components: { EditUserForm },
  data() {
      return {
          userData: {}
      }
  }
};
</script>

<style>
</style>