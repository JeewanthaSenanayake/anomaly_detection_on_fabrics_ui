<template>

    <div>
        
        <ProductComponent :id="id" />
    </div>

</template>

<script>
  import ProductComponent from '@/components/ProductComponents.vue';
export default {
    name: 'ProductView',
    components: {
          ProductComponent
    },
    data() {
        return {
            id: this.$route.params.id,
        };
    },
};
</script>