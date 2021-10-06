<template>
  <div>
    <div  style="font-size: 20px; font-weight: bold; margin-bottom: 20px">
      <button style="background-color: #42b983; color:#fff; cursor:pointer; font-size: 20px; padding: 5px 10px; border:none"@click="modalOpen=true">Add</button>
    </div>
    <div v-if="modalOpen"
         style="position: fixed;z-index:1000; width: 100%;height:100vh;background-color:rgba(0, 0, 0, .9);top:0; left:0;">
      <div style="width:400px; height: auto; background-color: white; position: relative; margin: 20% auto;">
        <div style="cursor: pointer; padding-top: 20px; " @click="modalOpen=false">Close</div>
        <div style=" display: grid; margin-top: 10px; row-gap: 15px; padding:15px 15px;">
          <input type="text" v-model="name" placeholder="Name">
          <input type="number" @keypress="onlyNumber" v-model="сoveragemin" placeholder="Coverage min">
          <input type="number" @keypress="onlyNumber" v-model="сoveragemax" placeholder="Coverage max">
          <input type="number" @keypress="onlyNumber" v-model="risk" placeholder="Risk (%)">
          <button style="background-color: #42b983; padding: 5px; border:none" @click="addItem">Add</button>
        </div>
      </div>
    </div>
    <div class="InsuranceSelectGrid">
      <div v-for="(item,index) in get_insurance" :key="item.id" :class="'InsuranceSelectGrid__'+item.id">
        <div style="display: grid; width: 100%; row-gap: 30px">
          <span @click="deleteItems(item.id,index)" style="cursor: pointer">Delete</span>
          <h2>{{ item.name }}</h2>
          <div>Coverage ($): {{ item.сoverage_min }} - {{ item.сoverage_max }}</div>
          {{ item.id }}
          <div>Risk (%): {{ item.risk }}</div>
          <label style="cursor: pointer">Enter the insurance amount -
            <input :id="item.id" @keypress="onlyNumber" type="number" :min="item.сoverage_min" :max="item.сoverage_max"
                   @input="enterNumber($event,item)" style="outline: none"> </label>
          <div style="background-color: #42b983"> {{
              item.value > item.сoverage_min && item.value < item.сoverage_max ? 'Calculated based on the risk: ' + (item.value * item.risk) / 100 : 'Enter the amount in the range ' + item.сoverage_min + ' - ' + item.сoverage_max
            }}
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:50px;font-size:30px"> TotalSumm: {{isNaN(totalSum)? 0: totalSum.toFixed(2) }}</div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
export default {
  name: 'HelloWorld',
  data() {
    return {
      inputNumber: [],
      modalOpen: false,
      name: '',
      сoveragemin: '',
      сoveragemax: '',
      risk: '',
    }
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters([
      'get_insurance'
    ]),
    totalSum() {
      let u = 0
      this.get_insurance.map(p => {
        return u += ((p.value * p.risk) / 100)
      })
      return u
    },
  },
  methods: {
    ...mapActions(['click_delete_item', 'click_udpate_value_item', 'click_add_item']),
    addItem() {

      let iddate = Date.now()
  
  
      this.click_add_item({
        id: iddate,
        name: this.name,
        сoverage_min: this.сoveragemin,
        сoverage_max: this.сoveragemax,
        risk: this.risk
      })
      this.name = ''
      this.сoveragemin = ''
      this.сoveragemax = ''
      this.risk = ''
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    deleteItems(id, index) {
      this.inputNumber = this.inputNumber.filter(h => {
        return this.inputNumber[index] == h[index]
      })
      this.click_delete_item(id)
    },
    enterNumber(e, item) {
     
      if (Number(e.target.value) >= item.сoverage_min && Number(e.target.value) <= item.сoverage_max) {
        this.click_udpate_value_item({...item, value: Number(e.target.value)})
      }
  
      if (Number(e.target.value) < item.сoverage_min ) {
        this.click_udpate_value_item({...item, value: 0})
      }
      if (Number(e.target.value) ==0) {
        this.click_udpate_value_item({...item, value: 0})
      }
      
      
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
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
.InsuranceSelectGrid {
  display: grid;
  grid-template: 1fr/1fr 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 15px;
  height: auto;
}
.InsuranceSelectGrid > div {
  color: #fff;
  padding: 10px;
  font-size: 20px;
  background-color: #2c3e50;
}
input[type="checkbox"] {
  cursor: pointer;
}
</style>
