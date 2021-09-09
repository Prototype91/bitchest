<template>
  <transition name="modal-animation">
    <div v-if="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <slot />
          <button @click="cancel" class="btn btn-danger">Annuler</button>
          <button @click="confirm" class="btn btn-primary">Confirmer</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    modalActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {
      // Confirmation
      confirm() {
        emit("confirm");
      },
      // Cancelling
      cancel() {
        emit("cancel");
      },
    };
  },
};
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}

.modal .btn-danger {
  margin-right: 20px;
}

.modal .modal-inner {
  position: relative;
  max-width: 640px;
  width: 80%;
  background-color: #fff;
  padding: 64px 16px;
}
</style>
