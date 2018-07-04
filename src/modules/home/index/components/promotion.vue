<template>
    <div ref="content" class="content" style="height: 2.75rem;">
        <div class="promotion">
        <ul>
            <li :class="promotionIndex===index?'active':''" v-for="(item,index) in promotion" :key="index" @click="togglePromotion(index)">套餐{{index+1}}</li>
        </ul>
        <section class="promotion-right">
        <ul class="card" v-if="promotion[promotionIndex]!=null" :style="{width: promotion[promotionIndex].goods_list.length * 1.3 +'rem'}">
            <li v-for="(item,index) in promotion[promotionIndex].goods_list" :key="index">
                <a :href="'/product/promotiondetail?id='+selectPromotion.id+'&goback=1'">
                    <img v-lazy="item.imgage" :alt="item.general_name">
                    <p class="text-overflow pro-title text-overflow">{{item.general_name}}</p>
                    <p class="text-overflow gray">{{item.norms}}</p>
                    <p class="text-overflow name gray">{{item.produce_unit}}</p>
                    <p class="text-overflow price">{{item.price}}</p>
                </a>
            </li>
            </ul>
        </section>
        <section class="combo-footer">
            <div class="combo-footer-left">
                套餐价格：<span class="red">会员可见</span>
            </div>
            <div class="combo-footer-right">
                <p v-if="selectPromotion!=null">
                <tw-countdowntime :endTime="selectPromotion.end_date"></tw-countdowntime>
                </p>
                <p style="color: #fff;"> 立即抢购</p>
            </div>
            </section>
        </div>
    </div>
</template>

<script>

import twCountdowntime from '@tw/tw-countdowntime'
export default {
  name: '',
  components: {
    twCountdowntime
  },
  props: {
    promotion: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      promotionIndex: 0
    }
  },
  methods: {
    /** 切换套餐 */
    togglePromotion (index) {
      this.promotionIndex = index
    }
  },
  computed: {
    selectPromotion () {
      return this.promotion[this.promotionIndex]
    }
  },
  activated () {
    document.getElementsByClassName('tab-content')[0].style.height = this.$refs.content.clientHeight + 'px'
  }
}
</script>

<style lang="less">
</style>
