<template>
    <v-app>
        <v-container>
            <v-row class="text-center">
                <v-col class="mt-4 mb-4">
                    <v-col class="login__form">
                        <h1 class="display-2 font-weight-bold mb-3">
                            Регистрация
                        </h1>

                        <form>
                            <v-text-field
                                    v-model="first_name"
                                    :error-messages="nameErrors"
                                    label="Имя"
                                    required
                                    @input="$v.first_name.$touch()"
                                    @blur="$v.first_name.$touch()"
                            ></v-text-field>

                            <v-select
                                    :error-messages="selectErrors"
                                    :items="registerTypes"
                                    label="Выберите тип"
                                    solo
                                    :hint="`${registerTypes.id}, ${registerTypes.text}`"
                                    item-value="id"
                                    item-text="text"
                                    v-model="register_type_id"
                                    @change="$v.select.$touch()"
                                    @blur="$v.select.$touch()"
                            ></v-select>

                            <v-select
                                    :items="cities"
                                    :error-messages="selectErrors"
                                    label="Выберите город"
                                    solo
                                    :hint="`${cities.id}, ${cities.name}`"
                                    item-value="id"
                                    item-text="name"
                                    v-model="city_id"
                                    @change="getStationsForCity(city_id)"
                                    @blur="$v.select.$touch()"
                            ></v-select>

                            <v-select
                                    :items="stations"
                                    :error-messages="selectErrors"
                                    label="Выберите станцию"
                                    solo
                                    :hint="`${stations.id}, ${stations.name}`"
                                    item-value="id"
                                    item-text="name"
                                    v-model="station_id"
                                    @change="$v.select.$touch()"
                                    @blur="$v.select.$touch()"
                            ></v-select>

                            <v-text-field
                                    v-model="company_name"
                                    :error-messages="nameErrors"
                                    label="Название компании"
                                    required
                                    @input="$v.name.$touch()"
                                    @blur="$v.name.$touch()"
                            ></v-text-field>

                            <VuePhoneNumberInput
                                    default-country-code="KZ"
                                    :only-countries="['KZ', 'RU', 'KG', 'UZ']"
                                    v-model="phone" />

                            <v-text-field
                                    v-model="email"
                                    :error-messages="emailErrors"
                                    label="Email"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                            ></v-text-field>

                            <v-text-field
                                    v-model="password"
                                    :error-messages="nameErrors"
                                    label="Пароль (придумайте)"
                                    required
                                    @input="$v.name.$touch()"
                                    @blur="$v.name.$touch()"
                            ></v-text-field>

                            <v-row>
                                <v-col>
                                    <v-btn
                                        class="mr-4 light-green"
                                        @click="registerCashier"
                                    >
                                        Зарегистрироваться
                                    </v-btn>
                                </v-col>

                                <v-col>
                                    <v-btn
                                        color="deep-purple lighten-2"
                                        to="/"
                                    >
                                        Войти
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <v-divier></v-divier>
                            <v-alert
                                outlined
                                type="success"
                                class="mt-6"
                                text
                                v-if="successRegistration"
                            >
                                Регистрация прошло успешно. В течение суток админ проверяет ваши данные. После одобрение получите сообщение. Затем можете войти.
                            </v-alert>
                        </form>
                    </v-col>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, email } from 'vuelidate/lib/validators'
    import axios from 'axios'
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';

    export default {
        components: {
            VuePhoneNumberInput
        },
        mixins: [validationMixin],

        validations: {
            first_name: { required },
            name: { required },
            email: { required, email },
            select: { required },
        },

        data: () => ({
            email: '',
            password: '',
            registerTypes: [
                {
                    id: 1,
                    text: 'Касса'
                },
                {
                    id: 2,
                    text: 'Отель'
                },
                {
                    id: 3,
                    text: 'Тур фирма'
                }
            ],
            register_type_id: 0,
            cities: [],
            city_id: 0,
            stations: [],
            station_id: 0,
            first_name: '',
            company_name: '',
            phone: '',
            successRegistration: false,

        }),

        computed: {
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.required && errors.push('Поле обязательно.')
                return errors
            },
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Введите пожалуйста правильный e-mail')
                !this.$v.email.required && errors.push('E-mail обязательно')
                return errors
            },
            selectErrors () {
                const errors = []
                if (!this.$v.select.$dirty) return errors
                !this.$v.select.required && errors.push('Поле обязательно')
                return errors
            },
        },

        methods: {
            registerCashier () {
                this.$v.$touch()
                let formData = new FormData()
                formData.append('first_name', this.first_name)
                formData.append('type_id', this.register_type_id)
                formData.append('city_id', this.city_id)
                formData.append('station_id', this.station_id)
                formData.append('company_name', this.company_name)
                formData.append('phone', this.phone)
                formData.append('email', this.email)
                formData.append('password', this.password)

                axios.post(`${this.$apiUrl}cashier/register`, formData)
                    .then(res => {
                        console.log(res)
                        this.successRegistration = true;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getCities(){
                axios.get(`${this.$apiUrl}cashier/cities/list`)
                    .then(res => {
                        this.cities = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getStationsForCity(city_id){
                axios.get(`${this.$apiUrl}cashier/cities/${city_id}/get-stations`)
                    .then(res => {
                        this.stations = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
        },
        created() {
            this.getCities();
        }
    }
</script>

<style scoped>
    .login__form {
        width: 600px;
        max-width: 100%;
        margin: 0 auto;
    }
</style>