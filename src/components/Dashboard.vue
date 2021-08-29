<template>
    <v-app>
        <Header />
        <v-main id="mainContent">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    import Header from './Header'
    export default {
        name: 'Dashboard',
        components: {
            Header 
        }, 
        data: () => ({
            vendorName: '',
        }),
    }
</script>