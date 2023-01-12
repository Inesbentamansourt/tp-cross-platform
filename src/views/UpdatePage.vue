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

                <img
                  alt=""
                  src="../../public/assets/images/notification.jpg"
                  class="dropdown"
                  style="
                    height: 30px;
                    width: 30px;
                    font-size: 30px;
                    float: right;
                    margin-top: 10px;
                  "
                /> </ion-title
            ></span>
            <span> </span>
          </span>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content
      :fullscreen="true"
      style="background-color: #white; z-index: 0"
    >
      <ion-label
        style="
          color: #a9d381;
          background-color: #white;
          font-size: 30px;
          float: left;
          margin-top: -1px;
          margin-left: 650px;
          text-align: center;
        "
        >فضاء التلميذ</ion-label
      >
      <br />
      <br /><br />
      <ion-item>
        <img
          alt=""
          :src="`${publicPath}assets/images/${image}`"
          style="
            height: 150px;
            width: 150px;
            font-size: 30px;
            float: left;
            margin-top: 10px;
            margin-left: 630px;
          "
        /> </ion-item
      ><br />
      <div class="dropdown" style="float: right; margin-left: 10px">
        <span style="margin-right: 30px">les annonces</span>
        <div class="dropdown-content" style="margin-left: 2px">
          <ul style="margin-right: 30px">
            <ion-button
              style="color: white; background-color: #a9d381"
              v-model="titre1"
              >amina</ion-button
            ><br />
            <ion-button v-model="titre2">amina</ion-button>
          </ul>
        </div>
      </div>
      <div style="text-align: center">
        <ion-label
          style="
            color: white;
            background-color: #white;
            font-size: 30px;
            float: left;
            margin-top: -1px;
            margin-left: 710px;
            text-align: center;
          "
          >{{ id }}</ion-label
        ><br /><br />
        <ion-label
          style="
            color: white;
            background-color: #white;
            font-size: 30px;
            float: left;
            margin-top: -1px;
            margin-left: 700px;
            text-align: center;
          "
          v-model="prenom"
          >{{ prenom }}</ion-label
        ><br /><br />
        <ion-label
          style="
            color: white;
            background-color: #white;
            font-size: 30px;
            float: left;
            margin-top: -1px;
            margin-left: 685px;
            text-align: center;
          "
          v-model="nom"
          >{{ nom }}</ion-label
        ><br /><br />

        <ion-label
          style="
            color: white;
            background-color: #white;
            font-size: 30px;
            float: left;
            margin-top: -1px;
            margin-left: 660px;
            text-align: center;
          "
          v-model="classe"
          >{{ classe }}</ion-label
        ><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
      <div>
        <span>
          <a
            style="
              color: #a9d381;
              font-size: 30px;
              text-align: center;
              margin-left: 800px;
            "
            :href="/DetailPage/ + id"
            >الاطلاع على جدول الاوقات
          </a>
        </span>
        <span>
          <a
            style="
              color: #a9d381;
              font-size: 30px;
              text-align: center;
              margin-left: 40px;+
            "
            :href="/NotePage/ + id"
            >الاطلاع على الاعداد
          </a>
        </span>
        <ion-button @click="doneTodo(id)">afficher </ion-button>
      </div>
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
  IonButton,
  IonItem,
  IonLabel,
  IonToolbar,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    IonContent,
    IonLabel,
    IonButton,

    IonItem,
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
            this.nom = eleve.nom;
            this.prenom = eleve.prenom;
            this.classe = eleve.classe;
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
