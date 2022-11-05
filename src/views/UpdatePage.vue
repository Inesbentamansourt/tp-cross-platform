<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title class="ion-text-center"> Ajouter un étudiant</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label>Civilité</ion-label>
        <ion-select v-model="civilite">
          <ion-select-option
            v-for="(cil, ind) in civilites"
            :key="ind"
            :value="cil"
            >{{ cil }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Nom</ion-label>
        <ion-input v-model="nom"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Prenom</ion-label>
        <ion-input v-model="prenom"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Matieres :</ion-label>
        <ion-item v-for="(matiere, index) in matieres" :key="index">
          <ion-checkbox :value="matiere.nom" v-model="matiere.checked">
          </ion-checkbox>
          <ion-label>{{ matiere.nom }}</ion-label>
        </ion-item>
      </ion-item>
      <ion-list>
        <ion-radio-group value="specialité" v-model="specialite">
          <ion-item><ion-label>Specialité :</ion-label></ion-item>
          <ion-item v-for="(speci, index) in specialites" :key="index">
            <ion-label>{{ speci }}</ion-label>
            <ion-radio :value="speci" name="sep"></ion-radio>
          </ion-item>
          <ion-text class="ion-text-center">
            <div>
              <ion-button
                router-link="/home"
                @click="addTodo"
                style="margin: 20px"
                >update</ion-button
              >
              <ion-button router-link="/home" style="margin: 20px"
                >cancel
              </ion-button>
            </div>
          </ion-text>
        </ion-radio-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';

const baseURL = 'http://localhost:3000/todos';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  IonRadioGroup,
  IonList,
  IonRadio,
  IonLabel,
  IonInput,
  IonSelectOption,
  IonSelect,
  IonItem,
  IonText,
  IonButton,
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    IonText,
    IonButton,
    IonContent,
    IonItem,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCheckbox,
    IonRadioGroup,
    IonList,
    IonRadio,
    IonLabel,
    IonInput,
    IonSelectOption,
    IonSelect,
  },
  data() {
    return {
      mat: '',
      civilite: '',
      civilites: [],
      matieres: [
        {
          nom: 'POO',
          checked: false,
        },
        {
          nom: 'Java',
          checked: false,
        },
        {
          nom: 'ionic',
          checked: false,
        },
      ],
      nom: '',
      prenom: '',
      specialite: '',
      specialites: [],
      todos: [],
      Tmatiere: [],
      ma: '',
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);

      this.todos = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async deleteUser(id) {
      let x = window.confirm('You want to delete the person?');
      if (x) {
        const user = await axios.delete(`${baseURL}/${id}`);
        console.log(user);
        alert('person deleted!');
      }
    },

    async doneTodo(id) {
      try {
        await axios.patch(`${baseURL}/${id}`, {
          civilite: this.civilite,
          nom: this.nom,
          prenom: this.prenom,
          matieres: this.matieres
            .filter((obj) => obj.checked)
            .map((obj) => obj.nom),
          specialite: this.specialite,
        });

        this.todos = this.todos.map((todo) => {
          if (todo.id === id) {
            todo.civilite = this.civilite;
            todo.nom = this.nom;
            todo.prenom = this.prenom;
            todo.matieres = this.matieres
              .filter((obj) => obj.checked)
              .map((obj) => obj.nom);
            todo.specialite = this.specialite;
          }

          return todo;
        });
      } catch (e) {
        console.error(e);
      }
    },
    async addTodo() {
      try {
        console.log("civilite='" + this.civilite + "'");
        console.log("nom='" + this.nom + "'");
        console.log("prenom='" + this.prenom + "'");

        const mat = this.matieres
          .filter((obj) => obj.checked)
          .map((obj) => obj.nom);

        console.log("specialite='" + this.specialite + "'");
        const res = await axios.post(baseURL, {
          civilite: this.civilite,
          nom: this.nom,
          prenom: this.prenom,
          matieres: mat,
          specialite: this.specialite,
        });

        this.todos = [...this.todos, res.data];

        this.civilite = '';
        this.nom = '';
        this.prenom = '';
        this.matiere = [];
        this.specialite = '';
      } catch (e) {
        console.error(e);
      }
    },
    RefreshAPI() {
      axios.get('http://localhost:3000/civilites').then((response) => {
        this.civilites = response.data;
      });
      axios.get('http://localhost:3000/specialites').then((response) => {
        this.specialites = response.data;
      });
      axios.get('http://localhost:3000/matieres').then((response) => {
        this.matieres = response.data;
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

ion-button {
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
