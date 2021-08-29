<template>
    <div id="payments" class="mt-7 d-flex justify-center">
        <v-container>
            <v-card
                elevation="2"
                outlined
                class="card pa-4" 
            >
                <v-form 
                    ref="paymentInfoForm" 
                    lazy-validation
                    @submit.prevent="paymentInfoUpdate"
                >
                    <v-card-title class="card-title mb-5 d-flex align-center">
                        <h3 class="font-weight-bold">Affiliate Information</h3>
                        <v-spacer></v-spacer>
                        <div v-if="affiliateInfo">
                            <v-btn
                                color="primary"
                                elevation="2"
                                @click="affiliateInfo = false"
                            >
                                Edit
                            </v-btn>
                        </div>
                        <div v-else>
                            <v-btn
                                elevation="2"
                                class="me-3"
                                @click="affiliateInfo= true"
                            >
                                Close
                            </v-btn>
                            <v-btn
                                color="success"
                                elevation="2"
                                small
                                type="submit"
                            >
                                Save
                            </v-btn>
                        </div>
                    </v-card-title>
                    <v-card-text class="text-dark" v-if="affiliateInfo">
                        <div class="row">
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Name</v-card-title>
                                <v-card-text>{{name}}</v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Contact Persor</v-card-title>
                                <v-card-text>{{contact_person}}</v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Code</v-card-title>
                                <v-card-text>{{code}}</v-card-text>
                            </div>
                        </div>
                        <v-divider class="my-4"></v-divider>
                        <div class="row">
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Platform Type</v-card-title>
                                <v-card-text>{{platform_type}}</v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Platform Name</v-card-title>
                                <v-card-text>{{platform_name}}</v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Platform Link</v-card-title>
                                <v-card-text>{{platform_link}}</v-card-text>
                            </div>
                        </div>
                        <v-divider class="my-4"></v-divider>
                        <div class="row">
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Bkash</v-card-title>
                                <v-card-text>{{bkash}}</v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Bank Details</v-card-title>
                                <v-card-text>{{bank_details}}</v-card-text>
                            </div>

                        </div>
                    </v-card-text>
                    <v-card-text class="text-dark" v-else>
                        <div class="row">
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Name</v-card-title>
                                <v-card-text class="ps-1">
                                    <v-text-field 
                                        v-model="name_update"
                                        :value="name"
                                        :rules="inputRules"
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Contact Persor</v-card-title>
                                <v-card-text class="ps-1">
                                    <v-text-field 
                                        v-model="contact_person_update"
                                        :value="contact_person"
                                        :rules="inputRules"
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Code</v-card-title>
                                <v-card-text class="ps-1">{{code}}</v-card-text>
                            </div>
                        </div>
                        <v-divider class="my-4"></v-divider>
                        <div class="row">
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Platform Type</v-card-title>
                                <v-card-text class="ps-1">
                                    <v-select
                                        v-model="platform_type_update" 
                                        :items="platform_types"
                                        :rules="inputRules"
                                        dense
                                        outlined
                                    ></v-select>
                                </v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Platform Name</v-card-title>
                                <v-card-text class="ps-1">
                                    <v-text-field 
                                        v-model="platform_name_update"
                                        :value="platform_name"
                                        :rules="inputRules"
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Platform Link</v-card-title>
                                <v-card-text class="ps-1">
                                    <v-text-field 
                                        v-model="platform_link_update"
                                        :value="platform_link"
                                        :rules="inputRules"
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-card-text>
                            </div>
                        </div>
                        <v-divider class="my-4"></v-divider>
                        <div class="row">
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Bkash</v-card-title>
                                <v-card-text class="ps-1">
                                    <v-text-field 
                                        v-model="bkash_update"
                                        :value="bkash"
                                        :rules="inputRules"
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-card-text>
                            </div>
                            <div class="col-md-4 col-sm-12 py-0">
                                <v-card-title class="p-1 pb-1 fs-6">Bank Details</v-card-title>
                                <v-card-text class="ps-1">
                                    <v-textarea
                                        v-model="bank_details_update"
                                        :value="bank_details"
                                        :rules="inputRules"
                                        auto-grow
                                        outlined
                                        rows="3"
                                        row-height="25"
                                        dense
                                    ></v-textarea>
                                </v-card-text>
                            </div>
                        </div>
                    </v-card-text>
                </v-form> 
            </v-card>

            <v-row class="m-0 mt-6">
                <v-col
                    cols="12"
                    md="4"
                    sm="12"
                >
                    <v-card class="card px-3 py-2">
                        <v-container class="d-flex align-items-center">
                            <v-avatar
                                color="cyan lighten-5"
                                large
                                size="60"
                            >
                                <v-icon size="40" class="text-primary">mdi-currency-bdt</v-icon>
                            </v-avatar>
                            <div class="ps-4">
                                <div class="fw-bolder text-dark">
                                    <h1>{{total_earning}}/- </h1> 
                                </div>
                                <div class="fw-thin">
                                    <p>Total Earning</p>
                                </div>
                            </div>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="12"
                >
                    <v-card class="card px-3 py-2">
                        <v-container class="d-flex align-items-center">
                            <v-avatar
                                color="yellow lighten-5"
                                large
                                size="60"
                            >
                                <v-icon size="40" class="text-warning">mdi-currency-bdt</v-icon>
                            </v-avatar>
                            <div class="ps-4">
                                <div class="fw-bolder text-dark">
                                    <h1>{{total_due}}/- </h1>
                                </div>
                                <div class="fw-thin">
                                    <p>Total Due</p>
                                </div>
                            </div>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="12"
                >
                    <v-card class="card px-3 py-2">
                        <v-container class="d-flex align-items-center">
                            <v-avatar
                                color="green lighten-5"
                                large
                                size="60"
                            >
                                <v-icon size="40" class="text-sucess">mdi-currency-bdt</v-icon>
                            </v-avatar>
                            <div class="ps-4">
                                <div class="fs-2 fw-bolder text-dark">
                                    <h1>{{total_received}}/- </h1>
                                </div>
                                <div class="fw-thin">
                                    <p>Total Received</p>
                                </div>
                            </div>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="m-0 mt-6">
                <v-col
                    cols="12"
                    md="12"
                    sm="12"
                >
                    <v-card class="card px-3 py-2">
                        <v-container width="100%">
                            <v-simple-table rounded-pill width="100%">
                                <template v-slot:default>
                                    <thead
                                        color="grey lighten-4"
                                        rounded-pill
                                        class="rounded-pill bg-light"
                                    >
                                        <tr rounded-pill>
                                            <th class="text-center fs-6">
                                                Date
                                            </th>
                                            <th class="text-center fs-6">
                                                Medium
                                            </th>
                                            <th class="text-center fs-6">
                                                Amount Received
                                            </th>
                                            <th class="text-center fs-6">
                                                Receipt 
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="payment_record.length">
                                        <tr
                                            v-for="item in payment_record"
                                            :key="item.id"
                                            class="text-center"
                                            rounded-pill
                                        >
                                            <td>{{ item.date }}</td>
                                            <td>{{ item.medium }}</td>
                                            <td>{{ item.amount }}</td>
                                            <td>{{ item.receipt }}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr rounded-pill>
                                            <td colspan="4" class="text-center">
                                                No payment history!
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>

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
                        Are you sure you want to update your payment info?
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
                            @click="changePaymentInfoConfirmation()"
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
                v-model="paymentInfoUpdateSuccess"
                :timeout="timeout"
                absolute
                top
                center
                color="blue-gray"
            >
                Your Payment Information are Updated Successfully!

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="orange"
                        text
                        v-bind="attrs"
                        @click="paymentInfoUpdateSuccess = false"
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
        name: 'Payments',
        data: () => ({
            valid: false,
            affiliateInfo: true, 
            dialog: false, 
            paymentInfoUpdateSuccess: false,
            credentialError: false,
            timeout: 5000,
            credErrorText: 'Credential mismatches!',
            name: '',
            contact_person: '',
            code: '',
            platform_type: '',
            platform_name: '',
            platform_link: '',
            bkash: '',
            bank_details: '',
            total_earning: '',
            total_due: '',
            total_received: '',
            platform_types: ['Facebook', 'Youtube'],

            name_update: '',
            contact_person_update: '',
            platform_name_update: '',
            platform_link_update: '',
            bkash_update: '',
            bank_details_update: '',
            platform_type_update: '', 

            inputRules: [
                v => !!v || "This field can't be empty!"
            ],

            payment_record: [], 

        }),
        methods: {
            async paymentInfoUpdate(){
                if(this.$refs.paymentInfoForm.validate()){
                    this.dialog = true; 
                }
            },
            async changePaymentInfoConfirmation(){
                let result = await axios.get(`http://localhost:3000/users?code=${this.code}`); 
                console.log(result); 
                if(result.status == 200 && result.data.length > 0){
                    this.dialog =false; 
                    this.paymentInfoUpdateSuccess = true; 
                    this.affiliateInfo = true; 
                }
                else{
                    this.dialog =false; 
                    this.credentialError = !this.credentialError;
                }
            },
        },
        mounted(){
            let user = localStorage.getItem('user-info');
            this.name = JSON.parse(user).name;
            this.contact_person = JSON.parse(user).contact_person;
            this.code= JSON.parse(user).code;
            this.platform_type = JSON.parse(user).platform_type;
            this.platform_name= JSON.parse(user).platform_name;
            this.platform_link= JSON.parse(user).platform_link;
            this.bkash= JSON.parse(user).bkash_no;
            this.bank_details= JSON.parse(user).bank_details;
            this.total_earning= JSON.parse(user).total_earning,
            this.total_due= JSON.parse(user).total_due,
            this.total_received= JSON.parse(user).total_received,
            this.platform_type_update = JSON.parse(user).platform_type;

            this.name_update = JSON.parse(user).name;
            this.contact_person_update = JSON.parse(user).contact_person;
            this.platform_name_update = JSON.parse(user).platform_name;
            this.platform_link_update = JSON.parse(user).platform_link;
            this.bkash_update = JSON.parse(user).bkash_no;
            this.bank_details_update = JSON.parse(user).bank_details;
            this.platform_type_update = JSON.parse(user).platform_type;

            if(JSON.parse(user).payment_details.length){
                this.payment_record = JSON.parse(user).payment_details; 
            }

            // console.log(this.payment_record); 

            if(!this.bank_details ||this.bank_details == ''){
                this.bank_details = 'N/A'; 
                this.bank_details_update = 'N/A'; 
            }

            if(!user){
                this.$router.push({name: "Login"}); 
            }
        }
    }
</script>