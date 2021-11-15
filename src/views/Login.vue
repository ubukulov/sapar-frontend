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
                                v-model="username"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Логин"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Пароль"
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
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            name: { required, maxLength: maxLength(10) },
        },

        data: () => ({
            username: '',
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
        },

        methods: {
            submit () {
                //this.$v.$touch()
            },
        },
    }
</script>

<style scoped>
.login__form {
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
}
</style>