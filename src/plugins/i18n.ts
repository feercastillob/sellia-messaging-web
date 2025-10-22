import { createI18n } from 'vue-i18n';

const messages = {
  es: {
    login: {
      title: 'Bienvenido',
      subtitle: 'Plataforma de Mensajería Omnicanal',
      username: 'Correo electrónico',
      password: 'Contraseña',
      placeholderUser: 'Correo electrónico',
      placeholderPass: 'Contraseña',
      button: 'Iniciar sesión',
      required: 'Por favor, ingrese correo electrónico y contraseña.',
      testCreds: 'Credenciales de prueba: admin / admin123',
      invalidEmail: 'Por favor ingresa un correo válido.',
      invalidCredentials: 'Credenciales incorrectas. Intenta nuevamente.'
    },
  },
  en: {
    login: {
      title: 'Welcome',
      subtitle: 'Omnichannel Messaging Platform',
      username: 'Email',
      password: 'Password',
      placeholderUser: 'Email',
      placeholderPass: 'Password',
      button: 'Sign in',
      required: 'Please enter email and password.',
      invalid: 'Incorrect credentials. (admin/admin123)',
      testCreds: 'Test credentials: admin / admin123',
      invalidEmail: 'Please enter a valid email.',
      invalidCredentials: 'Invalid credentials. Try again.'
    },
  },
};

const storedLang = localStorage.getItem('lang') || 'es';

export const i18n = createI18n({
  legacy: false,
  locale: storedLang,
  fallbackLocale: 'en',
  messages,
});
