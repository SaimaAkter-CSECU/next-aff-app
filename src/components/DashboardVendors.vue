<template>
    <v-app id="dashboard-vendors">
        <v-app-bar
        app
        color="white"
        light
        >
            <v-container class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    :src="logo"
                    transition="scale-transition"
                    width="40"
                />
                <v-app-bar-title>Dashboard</v-app-bar-title>

                <v-spacer></v-spacer>

                <Logout />
            </v-container>
        </v-app-bar>
        <v-main>
            <v-container class="mt-5">
                <v-row class="d-flex justify-content-center">
                    <v-col
                        v-for="vendor in vendors"
                        :key="vendor.id"
                        class="col-sm-4 col-xs-12 justify-contents-center"
                    >
                        <v-card class="card my-5 p-3" v-on:click="selectedVendor(vendor.id, vendor.name)">
                            <v-img
                                :src="vendor.url"
                                class="img-fluid mx-auto"
                                width="250px"
                            >
                            </v-img>
                            <v-card-title v-text="vendor.name" class="card-title px-0 d-flex justify-center"></v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import Logout from './Logout.vue'
    import Logo from '../assets/nextiveLogo.png'
    export default {
        name: 'DashboardVendors',
        components: {
            Logout
        },
        data: () => ({
            vendors: [
                {
                    id: 1, 
                    name: 'Admission Assistant',
                    url: 'https://www.admissionassistant.com.bd/wp-content/uploads/2021/05/AA-Logo-Rec-blue-296x100.png', 
                }, 
                {
                    id: 2, 
                    name: 'Job Assistant',
                    url: 'https://www.admissionassistant.com.bd/wp-content/uploads/2021/05/AA-Logo-Rec-blue-296x100.png', 
                }, 
                {
                    id: 3, 
                    name: 'Biggyan Obhidhan',
                    url: 'https://www.admissionassistant.com.bd/wp-content/uploads/2021/05/AA-Logo-Rec-blue-296x100.png', 
                }, 
                {
                    id: 4, 
                    name: 'Biggyan Obhidhan 2',
                    url: 'https://www.admissionassistant.com.bd/wp-content/uploads/2021/05/AA-Logo-Rec-blue-296x100.png', 
                },
                {
                    id: 5, 
                    name: 'Biggyan Obhidhan 3',
                    url: 'https://www.admissionassistant.com.bd/wp-content/uploads/2021/05/AA-Logo-Rec-blue-296x100.png', 
                },
            ], 
            userName: '', 
            logo: Logo, 
        }),
        methods: {
            logOut(){
                localStorage.removeItem("user-info");
                this.$router.push({ name: "Login"}); 
            },
            selectedVendor(i, vendorName){
                localStorage.setItem("vendorId", i );
                localStorage.setItem("vendorName", vendorName );
                this.$router.push({
                    name: "Dashboard",
                    params: {vendorName: vendorName}
                }); 
            }
        }, 
        mounted(){
            let user = localStorage.getItem('user-info');
            this.userName = JSON.parse(user).name;
            if(!user){
                this.$router.push({name: "Login"}); 
            }
        }
    }
</script>