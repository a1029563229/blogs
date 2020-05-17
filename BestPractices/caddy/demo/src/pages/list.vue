<template>
  <section>
    <a-card title="实时菜价">
      <a-table rowKey="_id" :dataSource="data" :pagination="false">
        <a-table-column title="菜名" data-index="name" />
        <a-table-column title="价格" data-index="price" :customRender="(text) => `￥ ${text}`" />
      </a-table>
    </a-card>
  </section>
</template>

<script>
export default {
  name: "List",

  data() {
    return {
      data: [],
    };
  },

  methods: {
    async fetchVegetable(page, pageSize) {
      const result = fetch(
        "http://proxy.dev-api-mall.jt-gmall.com/vegetable/list?page=1&pageSize=20"
      )
        .then(res => res.json())
        .then(result => {
          this.data = result;
        });
    }
  },

  created() {
    this.fetchVegetable(1, 10);
  }
};
</script>