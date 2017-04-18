<!--
    busy-spinner component
    ======================

    Usage
    =====

    Import the "BusySpinner" component
    ==================================

        import BusySpinner from '/wherever/busy-spinner.vue'

    Add it to the "components" section like this

        export default {
            components: { BusySpinner }
        }

    In your top level HTML/pug, maybe in app.pug/app.vue, do this:

        nav-bar
        busy-spinner
        router-view
        footer

    The above assumes that the spinner file is located in "/static/spinner.gif".
    If you want to pass in the spinner GIF file name then do it like this:

        busy-spinner(spinner-file="/static/spinner.gif")
    or
        busy-spinner(:spinner-file="spinnerFile")

    Show and hide the spinner
    =========================

    Import the BusySpinner component into your code and then call show and hide methods,
    as required.

        import BusySpinner from '/wherever/busy-spinner.vue'

        handleSubmit() {
            BusySpinner.show()
            axios.get()
                .then(data=> {
                    BusySpinner.hide()
                })
                .catch(data=> {
                    BusySpinner.hide()
                })
        }
-->

<template lang="pug">
    .busy-spinner-overlay
        img( :src="spinnerFile" )
</template>

<script>
   const SPINNER_FILE = '/static/spinner.gif'

    const BusySpinner = {
        name: 'busy-spinner',
        props: { spinnerFile: { default: SPINNER_FILE } },
        show() {
            visible(1)
        },
        hide() {
            visible(0);
        }
    }
    export default BusySpinner

    function visible(busy) {
        var el = document.querySelector('.busy-spinner-overlay');
        if (!el) return

        if (busy) {
            el.classList.add('spinner-show');
        }
        else {
            el.classList.remove('spinner-show');
        }
    }

</script>

<style scoped lang="scss">
    .busy-spinner-overlay {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        z-index: 999;
        display: none;
        background: rgba(100, 100, 100, 0.5);
        cursor: auto;

        img {
            position: fixed;
            top: 50%;
            width: 100px;
            height: auto;
            left: 0;
            right: 0;
            margin: 0 auto;
            transform: translateY(-50%);
            z-index: 200;
        }

    }

    .spinner-show {
        cursor: wait;
        display: block;
    }

</style>
