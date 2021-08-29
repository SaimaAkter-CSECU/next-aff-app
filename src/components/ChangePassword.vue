<template>
    <div id="change-password" class="my-5 py-5">
        <v-container>
            <v-form
                ref="changePasswordForm"
                v-model="valid"
                lazy-validation
                class="my-5"
                @submit.prevent="changePassword"
            >
                <v-card
                    elevation="2"
                    outlined
                    class="card w-80 mx-6 mt-5 px-3 pt-5"
                >
                    <v-row
                        no-gutters
                        mb-4
                    >
                        <v-col
                            cols="12"
                            sm="6"
                            md="2"
                        >
                            <v-card-text class="font-weight-regular text-right pt-1 ps-0">Current Password</v-card-text>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="9"
                        >
                            <v-text-field
                                v-model="password"
                                placeholder="****"
                                outlined
                                dense
                                :rules="passwordRules"
                            ></v-text-field> 
                        </v-col>
                    </v-row>
                    <v-row
                        no-gutters
                    >
                        <v-col
                            cols="12"
                            sm="6"
                            md="2"
                        >
                            <v-card-text class="font-weight-regular text-right pt-1 ps-0">New Password</v-card-text>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="9"
                        >
                            <v-text-field
                                v-model="new_password"
                                placeholder="****"
                                outlined
                                dense
                                :rules="passwordRules"
                            ></v-text-field> 
                        </v-col>
                    </v-row>
                    <v-row
                        no-gutters
                        mb-4
                    >
                        <v-col
                            cols="12"
                            sm="6"
                            md="2"
                        >
                            <v-card-text class="font-weight-regular text-right pt-1 ps-0">Confirm Password</v-card-text>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="9"
                        >
                            <v-text-field
                                v-model="confirm_password"
                                placeholder="****"
                                outlined
                                dense
                                :rules="passwordRules.concat(passwordConfirmationRule)"
                            ></v-text-field> 
                        </v-col>
                    </v-row>
                </v-card>

                <div class="d-flex justify-center mt-9">
                    <v-btn
                        color="success"
                        elevation="2"
                        type="submit"
                    >
                        Save
                    </v-btn>
                </div>
            </v-form>
            
            <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        Confirm Action
                    </v-card-title>
                    <v-card-text>
                        Are you sure you want to change your password?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="gray darken-1"
                            text
                            @click="dialog = false"
                        >
                            No
                        </v-btn>
                        <v-btn
                            color="success"
                            @click="changePasswordConfirmation()"
                        >
                            Yes
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-snackbar
                v-model="credentialError"
                :timeout="timeout"
                absolute
                top
                center
            >
                {{ credErrorText }}
                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="orange"
                        text
                        v-bind="attrs"
                        @click="credentialError = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>

            <v-snackbar
                v-model="passwordChangeSuccess"
                :timeout="timeout"
                absolute
                top
                center
                color="blue-gray"
            >
                Your Password is Changed Successfully!

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="orange"
                        text
                        v-bind="attrs"
                        @click="passwordChangeSuccess = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'ChangePassword',
        data: ()=> ({
            valid: false,
            dialog: false, 
            passwordChangeSuccess: false,
            credentialError: false,
            timeout: 5000,
            credErrorText: 'Credential mismatches!',
            password: '', 
            new_password: "",
            confirm_password: "", 
            userId: '',
            validityPass: "", 
            passwordRules: [
                v => !!v || "This field can't be empty!"
            ]
        }), 
        methods: { 
            async changePassword(){
                if(this.$refs.changePasswordForm.validate()){
                    this.dialog = true; 
                }
            },
            async changePasswordConfirmation(){
                let user = localStorage.getItem('user-info');
                this.userId = JSON.parse(user).id;
                let result = await axios.get(`http://localhost:3000/users?id=${this.userId}&password=${this.password}`);
                if(result.status == 200 && result.data.length > 0){
                    this.dialog =false; 
                    this.passwordChangeSuccess = true; 
                }
                else{
                    this.dialog =false; 
                    this.credentialError = !this.credentialError;
                }
            }
        },
        mounted(){
            let user = localStorage.getItem('user-info');
            this.userName = JSON.parse(user).name;
            if(!user){
                this.$router.push({name: "Login"}); 
            }
        },
        computed:{
            passwordConfirmationRule(){
                return () => (this.new_password === this.confirm_password) || "Password doesn't match"
            } 
        }
    }
</script>