<template>
    <v-container>
        <div 
            class="d-flex justify-center align-center justify-content-center my-5"
            height="100%"
            width="100%"
        >
            <iframe 
                :width="$vuetify.breakpoint.xs ? '95%' : ($vuetify.breakpoint.sm ? '80%' : '60%') "
                height="365" 
                src="https://www.youtube.com/embed/pjmbteKGSd4" 
                style="border-radius:1rem;" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: 'DashboardTutorial',
        mounted(){
            let user = localStorage.getItem('user-info');
            if(!user){
                this.$router.push({name: "Login"}); 
            }
        }
    }
</script>