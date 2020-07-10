<template>
  <div class="account">
    <div class="account_title" style="font-size: 20px; padding-left: 26px;">账户余额</div>
    <div class="account_main">
      <div class="main_top">
        <div class="top_center">
          <div class="account_money">
            <img src="@/assets/images/personal/money.png">
          </div>
          <div class="account_usable">可用余额</div>
          <div class="account_cash">{{balance}}</div>
          <div class="account_recharge" @click="recharge">立即充值</div>
        </div>
      </div>
      <div class="main_bot">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="交易记录" name="topup">
            <el-table :data="tradingData" style="width: 100%">
              <el-table-column prop="createTime" align="center" label="交易时间" width="280"></el-table-column>
              <el-table-column
                prop="payment"
                align="center"
                label="交易金额（元）"
                width="180"
                :formatter="formatPay"
              ></el-table-column>
              <el-table-column prop="orderTypeZh" align="center" label="交易类型" width="280"></el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  <span class="paySuccess" v-if="scope.row.status == '1'||scope.row.status == '6'">成功</span>
                  <span class="unpay" v-else-if="scope.row.status == '0'">未支付</span>
                  <span class="payFail" v-else>失败</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination_box" v-if="tradingData.length>0">
              <pagination @change="handleCurrentChangeTrad" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
              <!-- <el-pagination
                @current-change="handleCurrentChangeTrad"
                :current-page="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                layout="prev, pager, next, total, jumper"
                :total="total"
              ></el-pagination> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="充值记录" name="record" class="my_tab_line">
            <el-table :data="topupData" style="width: 100%">
              <el-table-column prop="createTime" align="center" label="时间" width="180"> </el-table-column>
              <el-table-column prop="code" align="center" label="充值单号" width="260"></el-table-column>
              <el-table-column prop="payment" align="center" label="交易金额（元）" :formatter="formatPay"></el-table-column>
              <el-table-column prop="payTypeZh" align="center" label="充值方式"></el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  <span class="paySuccess" v-if="scope.row.status == '1'||scope.row.status == '6'">成功</span>
                  <span class="unpay" v-else-if="scope.row.status == '0'">未支付</span>
                  <span class="payFail" v-else>失败</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination_box" v-if="topupData.length>0">
              <pagination @change="handleCurrentChangeTopup" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
              <!-- <el-pagination
                @current-change="handleCurrentChangeTopup"
                :current-page="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                layout="prev, pager, next, total, jumper"
                :total="total"
              ></el-pagination> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import "@static/css/personal/account.less";
  import {topupGetAPI, tradingGetAPI,getBalanceAPI} from "@/api/personal/myAccount";

  export default {
    name: "account",
    data() {
      return {
        activeName: "topup",
        topupData: [], //充值
        tradingData: [], //交易
        total: null,
        listQuery: {
          //分页
          pageNum: 1,
          pageSize: 20,
          name: "我的账户"
        },
        balance:0,
        lastPage:0,
      };
    },
    filters:{
      fiexdFn(num){
          return num.toFixed(2)
      }
    },
    mounted() {
      this.getBalance();
      this.gettradingData();
      /*this.getTopupData(this.listQuery);*/
    },
    methods: {
      /*获取账户余额*/
      getBalance(){
        getBalanceAPI().then(res=>{
          this.balance=res.data.data;
          console.log("账户余额",res.data)
        })
      },
      gettradingData(data) {
        //获取交易记录
        tradingGetAPI(this.listQuery).then(res => {
          console.log("hhhhhhhhhhhhh",res.data.data.total)
          if (res.data.code == 0) {
            this.tradingData = res.data.data.list;
            this.total = res.data.data.total;
            this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
          } else if (res.data.code < 0) {
            this.$message("请求失败");
          }
        });
      },
      getTopupData() {
        //获取充值记录
        topupGetAPI(this.listQuery).then(res => {
          console.log(res.data, "hhhhhhhhhhhhh")
          if (res.data.code == 0) {
            this.topupData = res.data.data.list;
            this.total = res.data.data.total;
            this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
          } else if (res.data.code < 0) {
            this.$message("请求失败");
          }
        });
      },
      formatPay(objD) {
        //console.log(payment,"payment")
        return "￥" + objD.payment.toFixed(2);
      },
      handleClick(tab, event) {
        this.listQuery = {
          pageNum: 1,
          pageSize: 15,
        };
        if (tab.index == "1") {
          this.getTopupData();
        } else {
          this.gettradingData();
        }
        console.log(tab.index, event);

      },
      // 跳转到充值页面
      recharge() {
        this.$router.push({path: "recharge"});
      },
      handleCurrentChangeTrad(val) {
        console.log(val)
        this.listQuery.pageNum = val;

        this.getTopupData(this.listQuery);
        window.scrollTo(0, 0);
      },
      handleCurrentChangeTopup(val) {
        this.listQuery.pageNum = val;
        this.getTopupData(this.listQuery);
        window.scrollTo(0, 0);
      }
    }
  };
</script>

<style>
  span.unpay {
    color: #fc952a
  }

  span.paySuccess {
    color: #277cf2
  }

  span.payFail {
    color: #f4504f
  }
  .account .el-table::before{
    height: 0 !important;
  }
</style>
