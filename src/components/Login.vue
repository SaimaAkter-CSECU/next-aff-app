<template>
    <v-app id="loginPage">
        <v-main full-height class="d-flex align-center">
            <v-container>
                <v-card 
                    class="card pa-5 mx-auto" 
                    max-width= "80%"
                    width= "30rem" 
                >
                    <v-card-title class="card-title font-weight-bold d-flex justify-center">
                        AFFILIATE DASHBOARD
                    </v-card-title>
                    <v-card-subtitle class="card-subtitle text-center mb-4">Nextive Solution</v-card-subtitle>

                    <v-form
                        ref="loginForm"
                        v-model="valid"
                        lazy-validation
                        class="my-5"
                        @submit.prevent="logIn"
                    >
                        <v-text-field
                            v-model="email"
                            prepend-inner-icon="mdi-email"
                            placeholder="user@email.com"
                            rounded
                            :rules="emailRules"
                            autocomplete="off"
                            required                        
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            prepend-inner-icon="mdi-key"
                            placeholder="****"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                            rounded
                            :rules="passwordRules"
                            required
                        ></v-text-field>
                        <v-btn
                            block
                            rounded
                            dark
                            class="btn mt-3 py-6"
                            type="submit"
                        >
                            Login
                        </v-btn>
                    </v-form>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import '../assets/css/style.css' 
    import axios from 'axios'; 
    export default {
        name: 'Login', 
        data: () => ({
            valid: false,
            email: '',
            password: '', 
            emailRules: [
                v => !!v || 'This field cannot be empty!',
                v => /.+@.+/.test(v) || 'Invalid email format!',
            ],
            passwordRules: [
                v => !!v || 'This field cannot be empty!'
            ],
            showPass: false, 
            credentialError: false, 
            credErrorText: 'Credential mismatches!',
            timeout: 2000,
        }),
        methods: { 
            async logIn(){
                if(this.$refs.loginForm.validate()){
                    let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`); 
                    console.log(result); 
                    if(result.status == 200 && result.data.length > 0){
                        localStorage.setItem("user-info", JSON.stringify(result.data[0]) );  
                        this.$router.push({name: "DashboardVendors"}); 
                    }
                    else{
                        this.credentialError = !this.credentialError;
                    }
                }
            }
        },
    }
</script>