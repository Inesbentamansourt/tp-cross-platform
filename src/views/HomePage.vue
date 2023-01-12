<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title class="ion-text-center">Liste des étudiants</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div v-for="eleve of eleves" :key="eleve.id" style="margin: 20px">
        <ion-button :href="/UpdatePage/ + eleve.id" style="margin: 20px"
          >se connecter
        </ion-button>
      </div>
      <br />
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';

const baseURL = 'http://localhost:3000/eleves';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButton,
  IonToolbar,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonButton,
    IonToolbar,
  },
  data() {
    return {
      id: '',
      eleves: [],
      nom: '',
      prenom: '',
      classe: '',
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);

      this.eleves = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    RefreshAPI() {
      axios.get('http://localhost:3000/eleves').then((response) => {
        this.eleves = response.data;
      });
    },
  },
  mounted() {
    this.RefreshAPI();
  },
});
</script>

<style scoped>
h1 {
  text-decoration: underline;
}

#boutton {
  border-radius: 100% !important;
  color: pink;
  margin-right: 46px;
  margin-top: 95px;
  height: 3.5em;
  width: 3.5em;
}
.button-native {
  border-radius: 50% !important;
}
li {
  color: white;
}

input {
  width: 50%;
  padding: 1rem;
  border-radius: 0.4rem;
  border: 1px solid #9dfd44;
  margin-bottom: 2rem;
  font-size: 1rem;
}
</style>
