<template>
    <div class="time-picker">
        <input v-model="time"
               ref="input"
               @focus="pickerOpen=true"
               @keyup.esc="pickerOpen=false"
               @focusout="blurit($event)"
               @input="handleInput($event)"
               :class="input_classes"
        />
        <div v-if="pickerOpen" class="picker">
            <div class="hours">
                <div class="hours-header">hh</div>
                <div v-for="h in 24"
                     v-scroll-to="hours==h-1"
                     :class="{selected: hours==h-1}"
                     @click="setTime(h-1, minutes)"
                     class="hour"
                >{{ ('0'+(h-1)).slice(-2) }}</div>
            </div>
            <div class="minutes">
                <div class="minutes-header">mm</div>
                <div v-for="m in 60"
                     v-scroll-to="minutes==m-1"
                     :class="{selected: minutes==m-1}"
                     @click="setTime(hours, m-1)"
                     class="minute"
                >{{ ('0'+(m-1)).slice(-2) }}</div>
            </div>
        </div>
    </div>
</template>

<script>

    const INPUT_CLASSES = 'form-control text-center'

    // IE11 does focusout events a bit differently to Chrome
    const IE11 = /Trident\/7\./.test(navigator.userAgent)

    const validTimeRE = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

    // Scroll the hour and minute into view when the list opens
    const ScrollTo = {
        inserted(el, {value, oldValue}) {
            if (!(value && value !== oldValue)) return
            el.parentElement.scrollTop = el.offsetTop
        }
    }

    export default {
        name: 'timePicker',
        props: [
            // facilitate v-model binding
            'value',
            // allow the user to specify their own classes for the input textbox
            'inputClasses'
        ],

        data() { return {
            hours: '',
            minutes: '',
            pickerOpen: false,
            blurred: false,
            time: this.value,
            input_classes: this.inputClasses || INPUT_CLASSES
        }},

        directives: {
            ScrollTo
        },

        created() {
            this.setTime(this.value.getHours(), this.value.getMinutes(), false)
        },

        watch: {
            // handle external changes to the value expression
            value(nv, ov) {
                if (nv && nv !== ov) {
                    this.setTime(nv.getHours(), nv.getMinutes(), false)
                }
            }
        },

        methods: {
            // Keep hours and minutes separate for easier manipulation
            splitTime(time) {
                ;[this.hours, this.minutes] = (time || ':').split(':')
            },

            // Determine if the time picker should be closed on "focusout"
            blurit(ev) {
                let hovered = document.querySelector(".time-picker .picker:hover")
//                console.log('IE11: ', IE11, !!hovered, ev.relatedTarget, ev)
                if (!IE11 && hovered && !ev.relatedTarget) return
                if (IE11 && (hovered || !ev.relatedTarget)) return
//                console.log('picker must close!')
                this.pickerOpen = false
            },

            // Handle direct user input in the text box
            handleInput(ev) {
                if (!(validTimeRE.test(ev.target.value))) return

                this.splitTime(ev.target.value)
                let date = this.value
                date.setHours(this.hours, this.minutes)

                this.$emit('input', date)
            },

            /**
             * Handle user clicking an hour or time in the drop-down selector
             *
             * This function works in two ways:
             *
             * When emit=false, which is called in the created hook, we just
             * want to set the internal time, hours and minutes, but don't
             * want to emit the change to the parent or to update the v-model
             * binding.
             *
             * When emit=true, the default case, we want to do the above plus
             * emit the new value to the parent, so that the v-model updates
             * and then set the focus to the input field. This focus trick
             * has to do with showing and hiding the drop-down list.
             *
             * @param h
             * @param m
             * @param emit
             */
            setTime(h, m, emit=true) {
                this.hours = ('0'+h).slice(-2)
                this.minutes = ('0'+m).slice(-2)

                this.time = this.hours + ':' + this.minutes

                let date = new Date(this.value.getTime())
                date.setHours(h, m)

                // ^^^^^^ everything above is only for initialisation in the created() hook ^^^^
                if (!emit) return

                // The statements below are called when the user clicks int eh drop-down list
                this.$emit('input', date)
                this.$refs.input.focus()
            }
        }
    }
</script>

<style scoped lang="scss">
    .time-picker {
        box-sizing: border-box;

        .picker {
            z-index: 10;
            position: absolute;
            //margin-top: 1px;
            height: 11em;
            border: 1px solid silver;
            background: white;
            width: 120px;
            .selected {
                background: #44bbdd;
            }
            .hours-header, .minutes-header {
                background: black;
                color: white;
                font-weight: bold;
            }
            .hours, .minutes {
                border: none;
                height: 100%;
                overflow-y: scroll;
                overflow-x: hidden;
                -ms-overflow-style: -ms-autohiding-scrollbar;
                vertical-align: top;
                display: inline-block;
                width: 59px;
                text-align: center;
                cursor: pointer;
                .minute:hover, .hour:hover {
                    border: none;
                    background: #d9d9d9;
                }
            }
            .minutes {
                width: 58px;
                margin-left: -4px;
                border-left: 1px solid #d9d9d9;
            }
        }
    }
</style>

