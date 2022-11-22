<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title class="ion-text-center">Liste des étudiants</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div v-for="todo of todos" :key="todo.id" style="margin: 20px">
        <div>civilite :{{ todo.civilite }}</div>
        <div>nom : {{ todo.nom }}</div>
        <div>
          <span>prenom: {{ todo.prenom }}</span
          ><span
            ><a style="float: right" :href="/UpdatePage/ + todo.id">modifier</a>
            <ion-button style="float: right" @click="deleteUser(todo.id)">
              Delete
            </ion-button></span
          >
        </div>
        <div>matieres : {{ todo.matieres }}</div>
        <div>specialite : {{ todo.specialite }}</div>

        <br />
      </div>
      <ion-button router-link="/DetailPage" style="float: right" id="boutton"
        >+</ion-button
      >
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
  IonButton,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
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
    async deleteUser(id) {
      let x = window.confirm('You want to delete the person?');
      if (x) {
        const user = await axios.delete(`${baseURL}/${id}`);
        alert('person deleted!');
      }
    },
    Modifier(id, tache) {
      this.nom = tache.nom;
      this.id = id;
    },
    async addTodo() {
      try {
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
