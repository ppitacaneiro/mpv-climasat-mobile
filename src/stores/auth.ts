import { defineStore } from "pinia";
import { ref } from "vue";
import { Preferences } from "@capacitor/preferences";

const AUTH_KEY = "isAuthenticated";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const isReady = ref(false);

    async function login(email: string, password: string) {
        // simulación de una llamada a una API de autenticación
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                isAuthenticated.value = true;
                Preferences.set({ key: AUTH_KEY, value: "true" });
                resolve(true);
                }, 1000);
            });
    }

    async function logout() {
        isAuthenticated.value = false;
        await Preferences.remove({ key: AUTH_KEY });
    }

    async function restoreSession() {
        const { value } = await Preferences.get({ key: AUTH_KEY });
        isAuthenticated.value = value === 'true';
        isReady.value = true;
    }

    return { isAuthenticated, login, logout, restoreSession, isReady };
});