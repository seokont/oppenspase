export default {
    state: {
        insurance: [
            {
                id: '1',
                name: 'Bike',
                сoverage_min: 0,
                сoverage_max: 3000,
                value: '',
                risk: 30
            },
            {
                id: '2',
                name: 'Jewelry',
                сoverage_min: 500,
                сoverage_max: 10000,
                value: '',
                risk: 5
            },
            {
                id: '3',
                name: 'Electronics',
                сoverage_min: 500,
                сoverage_max: 6000,
                value: '',
                risk: 35
            },
            {
                id: '4',
                name: 'Sports Equipment',
                сoverage_min: 0,
                сoverage_max: 20000,
                value: '',
                risk: 30
            },
        ],
    },
    getters: {
        get_insurance(state) {
            return state.insurance
        },
    },
    mutations: {
        delete_item(state, payload) {
            state.insurance = state.insurance.filter(n => {
                return n.id !== payload
            })
        },
        click_add_value(state, payload) {
            state.insurance.push(payload)
        },
        click_udpate_value(state, payload) {
            let index = state.insurance.findIndex(item => item.id === payload.id)
            // if(state.insurance[index].сoverage_min<payload.value && state.insurance[index].сoverage_max>payload.value){
            //     this._vm.$set(state.insurance, index, payload)
            // }
            this._vm.$set(state.insurance, index, payload)
        },
    },
    actions: {
        click_delete_item(context, payload) {
            context.commit('delete_item', payload)
        },
        click_udpate_value_item(context, payload) {
            context.commit('click_udpate_value', payload)
        },
        click_add_item(context, payload) {
            context.commit('click_add_value', payload)
        },
    }
};
