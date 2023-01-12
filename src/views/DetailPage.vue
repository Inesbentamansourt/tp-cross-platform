<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <div>
          <span>
            <span>
              <ion-title
                class="ion-text-center"
                style="
                  background-color: #a9d381;
                  font-size: 30px;
                  text-align: center;
                "
                >مدرستي
                <a
                  href="/home"
                  style="
                    color: white;
                    background-color: #white;
                    font-size: 30px;
                    float: left;
                    margin-top: -1px;
                    margin-left: 10px;
                  "
                  >خروج</a
                >
              </ion-title></span
            >
            <span> </span>
          </span>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content
      :fullscreen="true"
      style="background-color: #white; z-index: 0"
    >
      <img
        alt=""
        :src="`${publicPath}assets/images/${image}`"
        style="
          height: 500px;
          width: 1200px;
          align: center;
          margin-top: 10px;
          margin-left: 100px;
        "
      />
      <ion-button @click="doneTodo(id)">afficher </ion-button>
    </ion-content>
  </ion-page>
</template>
<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

const baseURL = 'http://localhost:3000/eleves';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
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
    IonToolbar,
  },
  setup() {
    const route = useRoute();
    const id = route.params.id;
    return {
      id,
    };
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      idd: '',
      eleves: [],
      nom: '',
      prenom: '',
      classe: '',
      image: '',
    };
  },
  methods: {
    async doneTodo(id) {
      try {
        await axios.patch(`${baseURL}/${id}`, {});

        this.eleves = this.eleves.map((eleve) => {
          if (eleve.id === id) {
            this.image = eleve.image;
            console.log(this.image);
          }

          return eleve;
        });
      } catch (e) {
        console.error(e);
      }
    },
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
  border: 1px solid #a9d381;
  margin-bottom: 2rem;
  font-size: 1rem;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  color: black;
  background-color: aliceblue;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 12px;
  z-index: 1;
}

li {
  color: black !important;
  padding-top: 10%;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
