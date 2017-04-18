export default {
    template: `
        <div id="wrapper" class="p-2">

            <div class="row">
                <div class="col"> 
                    <div class="form-group" :class="[formClass]">
                         <input class="form-control" type="text" 
                            maxlength="3" 
                            placeholder="Enter outstation .." 
                            v-model="newOutstation" 
                            @input="uppercase()" 
                            @keyup.enter="addOutstation()"/>
                    </div>
                </div>
            </div>
        
            <div class="row col"> 
                <div class="ml-1 mt-1" style="float:left;" v-for="outstation in value">
                    <button class="btn btn-sm btn-secondary">{{ outstation }} <i @click="removeOutstation(outstation)"  class="fa fa-remove"></i></button>
                </div>
            </div>
        
        </div>
    `,
    props: ['value', 'options'],
    data() {
        return {
            newOutstation: '',
            formClass: ''
        }
    },
    methods: {
        removeOutstation(outstation) {
            this.value = this.value.filter(o => o !== outstation)
        },
        addOutstation(){
            if (this.newOutstation.length === 3) {
                this.value.push(this.newOutstation)
                this.newOutstation = ''
                this.formClass = ''
            } else {
                this.formClass = 'has-danger'
            }
        },
        uppercase(){
            this.newOutstation = this.newOutstation.toUpperCase()
        }
    }
}