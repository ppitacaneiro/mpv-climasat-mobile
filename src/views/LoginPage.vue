<template>
  <ion-page>
    <ion-content class="ion-padding" :scroll-assist="false" :fullscreen="true" :keyboard-resize="'none'">
      <div class="login-container">
        <h1 class="title">CLIMA-SAT HVAC</h1>
        <p class="subtitle">Ingresa con tu cuenta de técnico</p>

        <form class="login-form">
          <ion-item>
            <ion-label position="floating">Correo electrónico</ion-label>
            <ion-input v-model="email" type="email" required :autofocus="false"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input v-model="password" type="password" required :autofocus="false"></ion-input>
          </ion-item>

          <ion-button expand="block" type="submit" class="ion-margin-top" @click="handleLogin">
            Iniciar Sesión
          </ion-button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonImg } from '@ionic/vue';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const auth = useAuthStore();
const router = useRouter();

async function handleLogin() {
  errorMessage.value = '';
  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor, completa todos los campos.';
    return;
  }

  await auth.login(email.value, password.value);

  router.replace('/jobs');
}
</script>

<style scoped>
.login-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 360px;
  margin: 0 auto;
  text-align: center;
}

.login-form {
  width: 100%;
}
.error-message {
  color: red;
  margin-top: 16px;
}

.title {
  font-size: 24px;
  margin-top: 16px;
}

.subtitle {
  font-size: 16px;
  margin-bottom: 24px;
}
</style>
