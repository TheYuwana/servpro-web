<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

body{
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.avatar{
  width: 75px;
  height: 75px;
  
  background-repeat: no-repeat;
  background-size: 100%;

  &-1{ background-image: url(assets/avatar_1.png); }
  &-2{ background-image: url(assets/avatar_2.png); }
  &-3{ background-image: url(assets/avatar_3.png); }
  &-4{ background-image: url(assets/avatar_4.png); }
  &-5{ background-image: url(assets/avatar_5.png); }
}

button{
  padding: 15px 25px;
  border-radius: 25px;
  background: rgb(255,30,30);
  font-size: 0.875rem;
  color: white;
  border: 0px;
  &:hover{
    opacity: 0.8;
  }
  cursor: pointer;
}

.error-box{
  width: 100%;
  background-color: #ffe9e9;
  padding: 15px;
  border-radius: 10px;
  margin-top: 25px;
}
</style>
