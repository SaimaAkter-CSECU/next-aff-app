<template>
    <div id="header">
        <v-app-bar
            color="white"
            app
            :loading="loading"
        >
            <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10px"
                    indeterminate
                ></v-progress-linear>
            </template>

            <v-container class="d-flex align-center">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none d-sm-flex"></v-app-bar-nav-icon>
                <v-app-bar-title>
                    <v-icon class="me-2">mdi-home-outline</v-icon> 
                    {{vendor}}
                    <v-icon>mdi-chevron-right</v-icon>
                    {{pageTitle}}
                    <v-icon>mdi-chevron-right</v-icon>
                </v-app-bar-title>

                <v-spacer></v-spacer>
                <Logout />
            </v-container>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            app 
            :permanent="$vuetify.breakpoint.mdAndUp"
            :temporary="$vuetify.breakpoint.smAndDown"
            color= "black"
            dark
            width="264px"
            min-width="264px"
        >
            <v-list
                nav
            >
                <v-list-item  
                    class="mt-5 d-flex justify-center"
                >
                    <v-list-item-avatar 
                        class="ma-0" 
                        width="40%" 
                        height="auto"
                    >
                        <v-img
                            :src="logo"
                            alt="Nextive Solution"
                            class="img-fluid aff-logo"
                        >
                        </v-img>
                    </v-list-item-avatar>
                </v-list-item>   
                <v-list-item  
                    class="text-center"
                >
                    <h3 class="font-weight-regular mx-auto">Nextive Solution</h3>
                </v-list-item>   
                <v-divider color="white" class="mb-7"></v-divider>

                <div v-for="item in items" :key="item.name" class="headerNav">
                    <v-list-item v-if="!item.subLinks" router :to="item.path" class="ps-5 mainNav">
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-else>
                        <v-list-group>
                            <v-list-item slot='activator'>
                                <v-list-item-icon class="me-1">
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-for='sub in item.subLinks' :key="sub.name" class="ms-5 mainNav" router :to="sub.path">
                                <v-list-item-title>{{ sub.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                    </v-list-item>
                </div>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import Logout from './Logout'
    import logo from '../assets/nextiveLogo.png'
    export default {
        name: "Header",
        data: () => ({
            loading: false,
            drawer: false, 
            logo: logo, 
            pageTitle: '',  
            vendor: '', 
            items: [
                {
                    icon: "mdi-file-chart",
                    name: "Reports",
                    subLinks: [
                        {path: '/dashboard/transaction-report', name: 'By Transactions'},
                        {path: '/dashboard/product-report', name: 'By Products'}, 
                    ], 
                },
                {path: '/dashboard/products', name: 'Products'},
                {path: '/dashboard/payments', name: 'My Payments'},
                {path: '/dashboard/key-manager', name: 'Key Manager account'},
                {path: '/dashboard/reset-password', name: 'Change Password'},
                {path: '/dashboard/dashboard-tutorial', name: 'How to use this dashboard'},
            ],
        }),
        components: {
            Logout
        }, 
        watch: {
            $route: {
                immediate: true,
                handler(to, from) {
                    this.pageTitle = to.meta.title || 'Dashboard';
                    console.log(from);

                    this.loading = true; 
                    setTimeout(() => (this.loading = false), 5000); 
                }
            },
        }, 
        mounted(){
            let vendorName = localStorage.getItem('vendorName');
            this.vendor = vendorName; 
        }
    }
</script>