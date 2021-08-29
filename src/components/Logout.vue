<template>
    <div>
        <v-menu
            open-on-hover
            offset-y
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    text
                    v-bind="attrs"
                    v-on="on"
                >
                    {{ userName }}
                </v-btn>
            </template>

            <v-list>
                <v-list-item>
                    <v-list-item-title v-on:click="logOut" class="btn">
                        <v-btn text color="grey darken-4">Log Out</v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: 'Logout',
        data: () => ({
            userName: '', 
        }),
        methods: {
            logOut(){
                localStorage.removeItem("user-info");
                this.$router.push({ name: "Login"}); 
            },
            selectedVendor(i){
                localStorage.setItem("vendorId", i );
                this.$router.push(
                    {
                        name: "dashboard-tutorial"
                    }
                ); 
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