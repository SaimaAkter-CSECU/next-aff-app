<template>
    <div id="products">
        <v-container>
            <v-row class="mt-5 ">
                <v-col
                    col="12"
                    sm="12"
                    md="4"
                >
                    <v-select
                        v-model="productCat"
                        label="Product Category"
                        :items="categories"
                        item-value="id"
                        item-text="category"
                        @change="getCategory()"
                        outlined
                    ></v-select>
                </v-col>
            </v-row>

            <v-row class="mt-5" v-if="!productCat">
                <div class="fw-thin text-center">Select a category to proceed!</div>
            </v-row>

            <v-row class="m-0 mt-6" v-else>
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
                                                Product Name
                                            </th>
                                            <th class="text-center fs-6">
                                                Incentive
                                            </th>
                                            <th class="text-center fs-6">
                                                Captions,<br> Posters and <br> Videos
                                            </th>
                                            <th class="text-center fs-6">
                                                Distribution link 
                                            </th>
                                            <th class="text-center fs-6">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="products.length" :items-per-page="10">
                                        <tr
                                            v-for="item in products"
                                            :key="item.id"
                                            class="text-center"
                                            rounded-pill
                                        >
                                            <td class="py-3">{{ item.name }}</td>
                                            <td class="py-3">{{ item.incentive }}</td>
                                            <td class="py-3">
                                                <a href="item.caption_poster_video" target="_blank">
                                                    <v-icon color="success" >mdi-google-drive</v-icon>
                                                </a>
                                            </td>
                                            <td class="py-3">{{ item.distribution_link }}</td>
                                            <td>
                                                <v-btn color="success" @click="copyLink(item.distribution_link)">Copy Link</v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr rounded-pill>
                                            <td colspan="5" class="text-center">
                                                No Product Found!
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>

            <v-snackbar
                v-model="linkCopySuccess"
                :timeout="timeout"
                absolute
                top
                center
                color="blue-gray"
            >
                Link Copied to Clipboard!

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="orange"
                        text
                        v-bind="attrs"
                        @click="linkCopySuccess = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Products',
        data: () => ({
            productCat:'', 
            categories: [], 
            products: [],
            linkCopySuccess: false,
            timeout: 5000,
        }),
        methods: {
            async allProducts(){
                let result = await axios.get(`http://localhost:3000/productCategories`); 
                this.categories = result.data; 
                // console.log(this.categories)
            },
            async getCategory(){
                let productlist = await axios.get(`http://localhost:3000/productCategories?id=${this.productCat}`); 
                this.products = productlist.data[0].products; 
            },
            async copyLink(link){
                navigator.clipboard.writeText(link);
                this.linkCopySuccess = true;
            }
        }, 
        mounted(){
            this.allProducts(); 
            let user = localStorage.getItem('user-info');
            this.userName = JSON.parse(user).name;
            if(!user){
                this.$router.push({name: "Login"}); 
            }
        }
    }
</script>