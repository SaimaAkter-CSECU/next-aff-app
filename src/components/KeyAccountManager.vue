<template>
    <div 
        id="key-manager" 
        class="d-flex justify-center align-center mt-6"
        height="100%"
    >
        <v-card
            elevation="2"
            outlined
            class="card"
            width="90%"
        >
            <v-card-title class="card-title">
                Key Account Manager Information
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td class="tbl-td tbl-first-td">Name : </td>
                            <td class="tbl-td">{{managerName}}</td>
                        </tr>
                        <tr>
                            <td class="tbl-td tbl-first-td">Email : </td>
                            <td class="tbl-td">{{managerEmail}}</td>
                        </tr>
                        <tr>
                            <td class="tbl-td tbl-first-td">Phone : </td>
                            <td class="tbl-td">{{managerPhone}}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'KeyAccountManager',
        data: () => ({
            managerName: '',
            managerEmail: '',
            managerPhone: '',
        }),
        mounted(){
            let user = localStorage.getItem('user-info');
            this.managerName = JSON.parse(user).contact_person; 
            this.managerPhone = JSON.parse(user).contact_person_phone; 
            this.managerEmail = JSON.parse(user).contact_person_email; 
            this.userName = JSON.parse(user).name;
            if(!user){
                this.$router.push({name: "Login"}); 
            }
        }
    }
</script>