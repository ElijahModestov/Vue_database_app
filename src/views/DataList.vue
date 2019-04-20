    
<template>
  <div class="data-list">
    <div class="button-get-data">
      <md-button class="md-raised md-primary" @click="getDataList">Get Data</md-button>
      <md-card>
        <form @submit.prevent>
          <md-input-container class="form-control">
            <label>Enter ID</label>
            <md-input v-model="id" id="id" type="text" />
          </md-input-container>
          <md-input-container class="form-control">
            <label>Name</label>
            <md-input v-model="name" id="name" type="text" />
          </md-input-container>
          <md-input-container class="form-control">
            <label>E-mail</label>
            <md-input v-model="email" id="email" type="email" />
          </md-input-container>
          <md-input-container class="form-control">
            <label>Address</label>
            <md-input v-model="address" id="address" type="text" />
          </md-input-container>
          <md-button type="submit" class="md-raised md-primary" @click="getDataById">Get Data By ID</md-button>
          <md-button type="submit" class="md-raised md-primary" @click="removeById">Remove By ID</md-button>
          <md-button type="submit" class="md-raised md-primary" @click="editById">Submit Changes</md-button>
        </form>
      </md-card>
      <router-link to="/">
      	<md-button class="md-raised md-primary">Home</md-button>
      </router-link>
    </div>
    <div class="list-wrapper" v-if="!isError">
      <md-table>
      	<md-table-header>
      	  <md-table-row>
            <md-table-head md-numeric>ID</md-table-head>
      	    <md-table-head md-numeric>Name</md-table-head>
      	    <md-table-head md-numeric>Email</md-table-head>
      	    <md-table-head md-numeric>Address</md-table-head>
      	    <md-table-head md-numeric>Gender</md-table-head>
      	  </md-table-row>
      	</md-table-header>
      	<md-table-body>
      	  <md-table-row v-for="dataUser in dataList" :key="dataUser._id">
            <md-table-cell md-numeric>{{ dataUser._id}}</md-table-cell>
      	    <md-table-cell md-numeric>{{ dataUser.name}}</md-table-cell>
      	    <md-table-cell md-numeric>{{ dataUser.email}}</md-table-cell>
      	    <md-table-cell md-numeric>{{ dataUser.address}}</md-table-cell>
      	    <md-table-cell md-numeric>{{ dataUser.gender}}</md-table-cell>
      	  </md-table-row>
      	</md-table-body>
      </md-table>
    </div>
    <div class="error-block" v-else>
      <md-card class="md-warn">
        <md-card-content>
          <h1 class="error-view">DataBase Error</h1>
        </md-card-content>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: 'data',
    data: function () {
      return {
        dataList: [],
        isError: false
      };
    },
    methods: {
      async getDataList() {
        try {
          let response = await axios.get('http://localhost:4000/api/records');
          this.dataList = response.data;
        } catch (error) {
          this.isError = true;
        }
      },
      async getDataById() {
        try {
          let response = await axios.get('http://localhost:4000/api/records/' + this.id);
          this.dataList = response;
          this.name = response.data.name;
          this.email = response.data.email;
          this.address = response.data.address; 
        } catch (error) {
          this.isError = true;
        }
      },
      async removeById() {
        try {
          await axios.delete('http://localhost:4000/api/records/' + this.id);
          let response = await axios.get('http://localhost:4000/api/records');
          this.dataList = response.data;
        } catch (error) {
          this.isError = true;
        }
      },
      async editById() {
        try {
          await axios ({
            url: 'http://localhost:4000/api/records/' + this.id,
            method: 'put',
            data: {
              name: this.name,
              email: this.email,
              address: this.address,
              gender: this.gender
            }
          });
          let response = await axios.get('http://localhost:4000/api/records');
          this.dataList = response.data;      
        } catch (error) {
          this.isError = true;
        }
      }
    }
  }
</script>

<style>
  th.md-table-head.md-numeric.md-sorted {
    text-align: center;
  }
  .button-get-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .list-wrapper {
    width: 70%;
    max-height: 70vh;
    background-color: beige;
    overflow-y: scroll;
    margin: 10px auto;
  }
  .error-block {
    width: 50%;
  }
  .error-view {
    text-align: center;
  }
  div.md-card {
    margin: 10px auto;
  }
  form {
    background-color: beige;
  }

</style>