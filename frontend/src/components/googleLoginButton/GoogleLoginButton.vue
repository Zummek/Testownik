<template>
  <div id="google-login-button"></div>
</template>

<script lang="ts">
import api from 'src/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GoogleLoginButton',
  mounted() {
    try {
      window.gapi.signin2.render('google-login-button', {
        scope: 'email profile',
        width: 200,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: (googleUser) => this.onSignIn(googleUser),
        onfailure: () => this.onSignInFaillure(),
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async onSignIn(googleUser: gapi.auth2.GoogleUser) {
      const profile = googleUser.getBasicProfile();
      const { access_token, id_token } = googleUser.getAuthResponse(true);

      await api.auth
        .signInWithGoogle({ access_token, id_token })
        .then((response) => {
          this.$store.commit('currentUser/setCurrentUser', {
            profile: {
              id: profile.getId(),
              email: profile.getEmail(),
              firstName: response.user.first_name,
              lastName: response.user.last_name,
              username: response.user.username,
              imageUrl: profile.getImageUrl(),
            },
            auth: {
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            },
          });
          console.log('success');
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
    onSignInFaillure() {
      console.log('Sign in failed');
    },
  },
});
</script>
