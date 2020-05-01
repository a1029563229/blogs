<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: "App",

  mounted() {
    fetch("http://dev-api-mall.jt-gmall.com/vegetable/list?page=1&pageSize=20")
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }
};
</script>

<style>
</style>
