<template lang="pug">
    #app
        busy-spinner
        img(src='./assets/logo.png')
        router-view
</template>

<script>
    import BusySpinner from './common/components/busy-spinner.vue'
    export default {
        name: 'app',
        components: { BusySpinner }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
