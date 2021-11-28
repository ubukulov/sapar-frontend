<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mt-4 mb-4">
                <v-col class="login__form">
                    <h1 class="display-2 font-weight-bold mb-3">
                        Авторизация
                    </h1>

                    <form>
                        <v-text-field
                                v-model="email"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Логин"
                                type="email"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Пароль"
                                type="password"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                        ></v-text-field>

                        <v-btn
                                class="mr-4"
                                @click="submit"
                        >
                            Войти
                        </v-btn>
                    </form>

                    <router-link to="/register">
                        Регистрация
                    </router-link>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import {required, maxLength, email} from 'vuelidate/lib/validators'
    import axios from 'axios'

    export default {
        mixins: [validationMixin],

        validations: {
            name: { required, maxLength: maxLength(10) },
            email: { required, email },
        },

        data: () => ({
            email: '',
            password: '',
        }),

        computed: {
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
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
        },

        methods: {
            submit () {
                this.$v.$touch()
                let formData = new FormData()
                formData.append('email', this.email)
                formData.append('password', this.password)
                axios.post(`${this.$apiUrl}cashier/login`, formData)
                .then(res => {
                    this.$store.commit('logged')
                    this.$store.commit('setUser', res.data.user)
                    this.$router.push({name: 'Cabinet'})
                })
                .catch(err => {
                    console.log(err)
                })
            },
        },
        created() {
            console.log('apiUrl', this.$apiUrl)
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