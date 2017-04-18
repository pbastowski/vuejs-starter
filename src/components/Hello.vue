<template lang="pug">
    .hello
        h1 {{ msg }}
        p User roles {{ Object.keys(user.roles) }}
        h2 Essential Links
            i.fa.fa-spinner.fa-spin.ml-3
        ul
            li
                a(href='https://vuejs.org', target='_blank') Core Docs
            li
                a(href='https://forum.vuejs.org', target='_blank') Forum
            li
                a(href='https://gitter.im/vuejs/vue', target='_blank') Gitter Chat
            li
                a(href='https://twitter.com/vuejs', target='_blank') Twitter
            br
            li
                a(href='http://vuejs-templates.github.io/webpack/', target='_blank') Docs for This Template
        h2 Ecosystem {{ version }}
        ul
            li
                a(href='http://router.vuejs.org/', target='_blank') vue-router
            li
                a(href='http://vuex.vuejs.org/', target='_blank') vuex
            li
                a(href='http://vue-loader.vuejs.org/', target='_blank') vue-loader
            li
                a(href='https://github.com/vuejs/awesome-vue', target='_blank') awesome-vue
</template>

<script>
    import { getUserDetails } from '../services/user-service'

    export default {
        name: 'hello',
        injectstore: ['version'],
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                user: {}
            }
        },
        async created() {
            this.user = await getUserDetails()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
