<template>
    <div id="productReport">
        <v-container>
            <!-- Filters -->
            <v-row>
                <v-col
                    cols="12"
                    md="5"
                    sm="12"
                >
                    <v-row>
                        <v-col col="12" sm="12" md="6">
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
                        <v-col col="12" sm="12" md="6">
                            <v-select
                                v-model="product"
                                label="Product Category"
                                :items="products"
                                item-value="id"
                                item-text="name"
                                :disabled="!products.length"
                                @change="getProduct()"
                                outlined
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    cols="12"
                    md="7"
                    sm="12"
                >
                    <!-- Dates -->
                    <v-row class="d-flex justify-content-end">
                        <v-col
                            col="12"
                            sm="12"
                            md="6"
                        >
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="dates"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateRangeText"
                                        label="Showing For"
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="dates"
                                    range
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false" 
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(dates), changeDateRange()"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col
                            col="12"
                            sm="12"
                            md="6"
                        >
                            <v-menu
                                ref="menuCompare"
                                v-model="menuCompare"
                                :close-on-content-click="false"
                                :return-value.sync="compareDates"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="compareDateRangeText" 
                                        label="Compare To" 
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="compareDates"
                                    range
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menuCompare = false" 
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menuCompare.save(compareDates), changeCompareDateRange()"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-card v-show="chart || compareChart" class="card mt-6 pa-3">
                <v-row class="d-flex justify-end">
                    <v-col col="12" sm="4" md="3" xs="8">
                        <v-select
                            :items="chartItems"
                            v-model="chartDefaultSelected"
                            outlined
                        ></v-select>
                    </v-col>
                </v-row>
                <div class="d-flex justify-center align-center my-3" min-width="100%">
                    <div id="chart">
                        <apexchart v-show="chart" type="bar" width="100%" height="350" :options="chartOptions" :series="series"></apexchart>
                        <apexchart v-show="compareChart" type="bar" width="100%" height="350" :options="chartOptionsCompare" :series="seriesCompare"></apexchart>
                    </div>
                    <!-- <div id="chart" width="80%">
                        <apexchart v-show="compareChart" type="bar" width="100%" height="350" :options="chartOptionsCompare" :series="seriesCompare"></apexchart>
                    </div> -->
                </div>
            </v-card>

            <div v-if="!product" style="text-center fs-6" class="d-flex justify-content-center mt-5">
                select category > then product > then date-range
            </div>
            <div v-else>
                <!-- Amount -->
                <v-row class="m-0 mt-6">
                    <v-col
                        cols="12"
                        md="4"
                        sm="12"
                    >
                        <v-card class="card px-5 py-3">
                            <div class="d-flex align-items-center">
                                <v-avatar
                                    color="green lighten-5"
                                    large
                                    size="60"
                                >
                                    <v-icon size="40" class="text-sucess" color="blue lighten-2">mdi-receipt</v-icon>
                                </v-avatar>
                                <div class="ps-4">
                                    <h1>{{total_transaction}} </h1>
                                    <p>Transactions Occured</p>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                        sm="12"
                    >
                        <v-card class="card px-5 py-3">
                            <div class="d-flex align-items-center">
                                <v-avatar
                                    color="yellow lighten-5"
                                    large
                                    size="60"
                                >
                                    <v-icon size="40" class="text-warning" color="yellow lighten-2">mdi-filter-outline</v-icon>
                                </v-avatar>
                                <div class="ps-4">
                                    <h1>{{total_sale}}/- </h1>
                                    <p class="fw-thin">Total Sales</p>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                        sm="12"
                    >
                        <v-card class="card px-5 py-3">
                            <div class="d-flex align-items-center">
                                <v-avatar
                                    color="cyan lighten-5"
                                    large
                                    size="60"
                                >
                                    <v-icon size="40" class="text-primary" color="green lighten-3">mdi-currency-bdt</v-icon>
                                </v-avatar>
                                <div class="ps-4">
                                    <h1>{{total_earning}}/- </h1>
                                    <p>Total Earning</p>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                
                <!-- Table -->
                <v-row class="mt-6">
                    <v-col
                        cols="12"
                        md="12"
                        sm="12"
                    >
                        <v-card class="card px-5 py-3">
                            <div class="d-flex align-items-center" v-if="!transactions.length">
                                <div class="mx-auto">
                                    <div class="fw-thin my-9">No transactions occured!</div>
                                </div>
                            </div>
                            <v-simple-table class="w-100" v-else>
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
                                                Transaction Id
                                            </th>
                                            <th class="text-center fs-6">
                                                Discount Code
                                            </th>
                                            <th class="text-center fs-6">
                                                Amount
                                            </th>
                                            <th class="text-center fs-6">
                                                Commission 
                                            </th>
                                            <th class="text-center fs-6">
                                                Earning 
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="item in transactions"
                                            :key="item.id"
                                            class="text-center"
                                            rounded-pill
                                        >
                                            <td>{{ item.date }}</td>
                                            <td>{{ item.transaction_id }}</td>
                                            <td>{{ item.discount_code }}</td>
                                            <td>{{ item.amount }}/-</td>
                                            <td>{{ item.commission }}%</td>
                                            <td>{{ item.earning }}/-</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
    import axios from "axios";
    import VueApexCharts from 'vue-apexcharts'; 
    export default {
        name: "ProductReport", 
        components: {
            'apexchart': VueApexCharts
        }, 
        data: () => ({
            menu: false,
            menuCompare: false,
            dates: [],
            compareDates:[], 
            chart: false, 
            compareChart: false, 
            chartItems: ['Total amount', 'Total Earning', 'Total Transactions'],
            chartDefaultSelected: 'Total amount',

            productCat:'', 
            product: '',
            categories: [], 
            products: [],
            total_transaction: '', 
            total_sale: '0',
            total_earning: '0',
            productName: '',
            transactions: [],

            series: [{
                data: [150]
            }],
            seriesCompare: [{
                data: [150, 180]
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    width: '100%', 
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    colors: ['transparent'], 
                    show: true,
                    width: 2
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: [
                        ['08-08-2021 ~ 29-08-2021']
                    ],
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            },
            chartOptionsCompare: {
                chart: {
                    height: 350,
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    colors: ['transparent'], 
                    show: true,
                    width: 2
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: [
                        ['08-01-2021 ~ 29-07-2021', '06-07-2021 ~ 29-07-2021']
                    ],
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            },
        }), 
        methods: {
            async allProducts(){
                let result = await axios.get(`http://localhost:3000/productTransactions`); 
                this.categories = result.data; 
            }, 
            async getCategory(){
                let productlist = await axios.get(`http://localhost:3000/productTransactions?id=${this.productCat}`); 
                this.products = productlist.data[0].products;  
            }, 
            async getProduct(){
                let productDetails = this.products.find( x => x.id == this.product);
                this.productName = productDetails.name; 
                this.total_transaction = productDetails.transactions.length; 
                this.total_sale = productDetails.total_sale; 
                this.total_earning = productDetails.total_earning;
                this.transactions = productDetails.transactions; 
            }, 

            async changeDateRange(){
                console.log(this.dates); 
                this.chart = true; 
                this.compareChart = false; 
            },
            async changeCompareDateRange(){
                console.log(this.compareDates); 
                this.chart = false;
                this.compareChart = true; 
            },
        }, 
        mounted(){
            this.allProducts(); 
            let user = localStorage.getItem('user-info');
            this.userName = JSON.parse(user).name;
            if(!user){
                this.$router.push({name: "Login"}); 
            }
        },
        computed: {
            dateRangeText(){ 
                return this.dates.join(' ~ ')
            },
            compareDateRangeText(){
                return this.compareDates.join(' ~ ')
            },
        },

    }
</script>