<template>
    <div id="transactionReport">
        <v-container>
            <v-row class="d-flex justify-end mt-9">
                <v-col
                    col="12"
                    sm="12"
                    md="3"
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
                                @click="$refs.menu.save(dates), changeDateRange(), getTransactionDetails()"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col
                    col="12"
                    sm="12"
                    md="3"
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
                                @click="$refs.menuCompare.save(compareDates), changeCompareDateRange(), getTransactionDetails()"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>

            <v-row class="m-0 mt-6">
                <v-col
                    cols="12"
                    md="4"
                    sm="12"
                >
                    <v-card class="card px-5 py-3">
                        <div class="d-flex align-center">
                            <v-avatar
                                color="green lighten-5"
                                large
                                size="60"
                            >
                                <v-icon size="40" class="text-sucess" color="blue lighten-2">mdi-receipt</v-icon>
                            </v-avatar>
                            <div class="ps-4">
                                <h1>{{total_transactions}}</h1>
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
                                <h1>{{total_sales}}/-</h1> 
                                <p>Total Sales</p>
                                <!-- <div class="fs-2 fw-bolder text-dark">0/- </div>
                                <div class="fw-thin">Total Sales</div> --> 
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
                                <h1>{{total_earning}}/-</h1> 
                                <p>Total Earning</p>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <v-card v-show="transactionData" class="card mt-6 pa-3">
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
                    <div id="chart" min-width="80%">
                        <apexchart v-show="chart" type="bar" width="100%" height="350" :options="chartOptions" :series="series"></apexchart>
                        <apexchart v-show="compareChart" type="bar" width="100%" height="350" :options="chartOptionsCompare" :series="seriesCompare"></apexchart>
                    </div>
                </div>
            </v-card>

            <v-row class="m-0 mt-6" v-if="transactionData">
                <v-col
                    cols="12"
                    md="12"
                    sm="12"
                >
                    <v-card class="card px-5 py-3">
                        <v-simple-table class="w-100">
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
            <v-row class="m-0 mt-6" v-else>
                <v-col
                    cols="12"
                    md="12"
                    sm="12"
                >
                    <v-card class="card px-5 py-3">
                        <div class="d-flex align-items-center">
                            <div class="mx-auto">
                                <div class="fw-thin my-9">No transactions occured!</div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>            
        </v-container>
    </div>
</template>

<script>
    import axios from "axios"; 
    import VueApexCharts from 'vue-apexcharts'
    
    export default {
        name: "TransactionReport", 
        components: {
            'apexchart': VueApexCharts
        }, 
        data: () => ({
            menu: false,
            menuCompare: false,
            dates: [],
            compareDates:[], 
            total_transactions: 0, 
            total_earning: 0, 
            total_sales: 0, 
            chart: false, 
            compareChart: false, 
            transactionData: false, 
            transactions: [],
            chartItems: ['Total amount', 'Total Earning', 'Total Transactions'],
            chartDefaultSelected: 'Total amount',

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
        computed: {
            dateRangeText(){ 
                return this.dates.join(' ~ ')
            },
            compareDateRangeText(){
                return this.compareDates.join(' ~ ')
            },
        },

        methods: {
            async changeDateRange(){
                console.log(this.dates); 
                this.total_transactions= 2;
                this.total_earning= 156;
                this.total_sales= 156; 
                this.chart = true; 
                this.compareChart = false; 
                this.transactionData = true;
            },
            async changeCompareDateRange(){
                console.log(this.compareDates); 
                this.chart = false;
                this.compareChart = true; 
                this.transactionData = true;
            },   
            
            async getTransactionDetails(){
                let productlist = await axios.get(`http://localhost:3000/productTransactions?id=2`); 
                let products = productlist.data[0].products; 
                console.log(products)
                let productDetails = products.find( x => x.id == 1);
                this.transactions = productDetails.transactions; 
            }
        },
    }
</script>