<!-- 顶栏消息通知 -->
<template>
  <a-dropdown v-model:visible="visible" placement="bottom" :trigger="['click']" :overlay-style="{ padding: '0 10px' }">
    <a-badge :count="unreadNum" class="guns-notice-trigger" :offset="[6, 4]">
      <i class="iconfont icon-nav-tongzhi f-s-24"></i>
    </a-badge>
    <template #overlay>
      <div class="ant-dropdown-menu guns-notice-pop">
        <div @click.stop="">
          <a-tabs v-model:active-key="active" :centered="true">
            <a-tab-pane key="notice" :tab="noticeTitle">
              <a-list item-layout="horizontal" :data-source="notice">
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-list-item-meta :title="item.messageTitle" :description="item.messageSendTime" @click="noticeDetail(item)">
                      <template #avatar>
                        <a-avatar :style="{ background: '#60B2FC' }">
                          <template #icon>
                            <component is="NotificationFilled" />
                          </template>
                        </a-avatar>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
              <div class="guns-cell guns-notice-actions">
                <div class="guns-cell-content" @click="allRead">全部已读</div>
                <a-divider type="vertical" />
                <div @click="lookMore" class="guns-cell-content">查看更多</div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </template>
  </a-dropdown>

  <!-- 新增编辑弹框 -->
  <NoticeDetail v-model:visible="noticeDetailShow" v-if="noticeDetailShow" :data="noticeDetailObject" @done="closeDetail" />
</template>

<script setup>
import { computed, ref } from 'vue';
import { NoticeApi } from '../api/NoticeApi';
import { useNoticeStore } from '@/store/modules/notice';
import { useRouter } from 'vue-router';
import NoticeDetail from '@/views/index/form/notice-detail.vue';

let noticeStore = useNoticeStore();
let router = useRouter();

// 是否显示消息详情对话框
const noticeDetailShow = ref(false);

// 通知详情的内容
const noticeDetailObject = ref({});

// 是否显示
const visible = ref(false);
// 选项卡选中
const active = ref('notice');
// 通知数据
const notice = computed(() => noticeStore.$state.unReadNoticeList);

// 通知标题
const noticeTitle = computed(() => {
  return '通知' + (notice.value.length ? `(${notice.value.length})` : '');
});

// 未读数量
const unreadNum = computed(() => {
  return notice.value.length;
});

/* 查询数据 */
const query = async () => {
  // 获取用户所有的未读消息
  let res = await NoticeApi.findPage({ pageNo: 1, pageSize: 10, readFlag: 0 });
  noticeStore.setNotice(res.rows);
};

/* 全部已读 */
const allRead = () => {
  if (notice.value?.length) {
    // 调用接口，全部标记为已读
    NoticeApi.setTotalRead();
  }
  noticeStore.setNotice([]);
};

/* 查看详情 */
const noticeDetail = messageObject => {
  if (messageObject?.messageUrl) {
    if (messageObject.readFlag == 0) {
      NoticeApi.setRead({ messageId: messageObject.messageId }).then(res => {});
      noticeStore.removeMessage(messageObject.messageId);
    }
    router.push(messageObject.messageUrl);
  } else {
    noticeDetailObject.value = messageObject;
    noticeDetailShow.value = true;
  }
  visible.value = false;
};

/* 清空通知 */
const closeDetail = () => {
  noticeStore.removeMessage(noticeDetailObject.value.messageId);
  noticeDetailShow.value = false;
};

/* 查看更多通知 */
const lookMore = () => {
  noticeStore.setIsMore(true);
  router.push({
    path: '/index/personal'
  });
  visible.value = false;
};

// 查询未读消息
query();
</script>

<script>
import { BellOutlined, NotificationFilled } from '@ant-design/icons-vue';

export default {
  name: 'HeaderNotice',
  components: {
    BellOutlined,
    NotificationFilled
  }
};
</script>

<style lang="less">
.guns-notice-trigger.ant-badge {
  color: inherit;
}

.guns-notice-pop {
  &.ant-dropdown-menu {
    padding: 0;
    width: 336px;
    max-width: 100%;
    margin-top: 11px;
  }

  // 内容
  .ant-list-item {
    padding-left: 24px;
    padding-right: 24px;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
      background: hsla(0, 0%, 60%, 0.05);
    }
  }

  .ant-tag {
    margin: 0;
  }

  // 操作按钮
  .guns-notice-actions {
    border-top: 1px solid hsla(0, 0%, 60%, 0.15);

    & > .guns-cell-content {
      line-height: 46px;
      text-align: center;
      transition: background-color 0.3s;
      cursor: pointer;
      color: inherit;

      &:hover {
        background: hsla(0, 0%, 60%, 0.05);
      }
    }
  }

  .ant-tabs-nav {
    margin-bottom: 0;
  }
}
</style>
