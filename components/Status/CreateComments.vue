<template>
  <div class="comments__content">
    <div @click="onHide" class="fixed"></div>
    <div class="comments">
      <div v-for="comment in comments" :key="comment.idComment" class="content">
        <div class="user">
          <img class="avatar" :src="comment.authComment.avatar" alt="A" />
          <span class="name">{{ comment.authComment.fname }}{{ comment.authComment.lname }}</span>
          <span> - {{ comment.time }}</span>
        </div>
        <div class="comment">{{ comment.text }}</div>
      </div>
      <form @submit.prevent="onSubmit" class="form">
        <div class="create">
          <input class="input" v-model="commentText" type="text" />
          <button class="btn"><i class="far fa-paper-plane"></i></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    status: Object,
  },
  setup(prop, { emit }) {
    const comments = computed(() => {
      return prop?.status?.comments;
    });
    const commentText = ref("");
    const onSubmit = async () => {
      console.log(prop?.status)
      const comment = ref(prop?.status?.comments);
      comment.value.push({
        authComment: user().value,
        text: commentText.value,
        time:
          new Date().toLocaleDateString() +
          "," +
          new Date().toLocaleTimeString(),
        idComment: String(Math.random() * 10000000 + commentText.value),
      });
      const updateValue = ref({
        comments: comment.value,
      });
      const data = await updateStatus(updateValue.value, prop?.status?.id);
      fetchStatus()
    };
    const onHide = () => {
      emit("hideComments");
    };

    console.log(prop?.status);
    return {
      onSubmit,
      commentText,
      comments,
      onHide,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/fixed.scss";
.comments__content {
  @include Fixed;
  z-index: 999;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  .fixed {
    @include Fixed;
  }
  .comments {
    margin-top: 64px;
    border: 1px solid #333;
    background-color: white;
    width: 50vw;
    height: 80vh;
    position: relative;
    .content {
      .user {
        padding: 3px;
      }
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .name {
        margin-left: 3px;
      }
      .comment {
        font-size: 0.8rem;
      }
    }

    .form {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .create {
        border: 2px solid #333;
        display: flex;
        margin: 1px;
      }
      .input {
        font-size: 1.5rem;
        flex: 100%;
        border: none;
        outline: none;
        padding-left: 7px;
      }
      .btn {
        border: none;
        padding: 5px 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
