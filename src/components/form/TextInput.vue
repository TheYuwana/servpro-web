<template>
  <div class="form-text-input">

        <label
            v-show="inputLabel != ''"
            :for="getInputId()">{{ inputLabel }}</label>

        <input 
            ref="textInput"
            :id="getInputId()" 
            :type="inputType"
            :value="inputValue"
            v-model="localValue"
            v-on:input="updateValue($event)" />

        <span 
            v-on:click="focusInput()"
            v-show="inputLabel == ''"
            :class="innerLabelClasses()">{{ placeholder }}</span>

  </div>
</template>

<script>

export default {
    name: 'TextInput',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        inputLabel: {
            type: String,
            default: ''
        },
        inputName: {
            type: String,
            required: true
        },
        inputType: {
            type: String,
            required: true,
            default: 'text'
        },
        inputValue: {
            type: [String, Number],
            default: ''
        }
    },
    data(){
      return {
          localValue: ''
      };
    },
    methods: {
        focusInput(){
            this.$refs.textInput.focus();
        },
        getInputId(){
            return `text-input-${this.$props.inputName}`
        },
        innerLabelClasses(){
            return {
                'inner-label': true,
                'inner-label-filled': (this.localValue !== '')
            };
        },
        updateValue(event){
            this.localValue = event.target.value;
            this.$emit('input', event.target.value)
        },
        setValue(val){
            this.localValue = val;
        },
        resetValue(){
            this.localValue = '';
        }
    }
}
</script>

<style lang="scss">

.form-text-input{
    width: 100%;
    margin-top: 10px;
    position: relative;

    label{
        font-weight: 450;
        font-size: 0.875rem;
    }

    input{
        width: 100%;
        height: 50px;
        margin-top: 5px;
        background-color: #F3F3F3;
        border-radius: 10px;
        font-size: 0.875rem;
        padding-left: 15px;
        

        &:focus ~ span{
            transform: translate(-12px, -12px);
            font-size: 0.5rem;
        }
    }

    .inner-label{
        position: absolute;
        left: 20px;
        top: 22px;
        font-size: 0.875rem;
        color: #979797;
        transition: transform 0.2s, font-size 0.2s linear;

        &-filled{
            transform: translate(-12px, -12px);
            font-size: 0.5rem;
        } 
    }
}

</style>
