<template>
  <div class="comments__content">
    <div @click="onHide" class="fixed"></div>
    <div class="comments">
      <div class="title">COMMENT</div>
      <div class="scroll">
        <div
          v-for="comment in comments"
          :key="comment.idComment"
          class="content"
        >
          <div class="user">
            <img class="avatar" :src="comment.authComment.avatar" alt="A" />
            <div class="detail">
              <span class="name"
                >{{ comment.authComment.fname }}
                {{ comment.authComment.lname }} </span
              ><span class="time">
                {{ comment.time }}<i v-if="idAuth === comment.authComment.id" @click="onDelete(comment)" class="trash fas fa-trash"></i
              ></span>
            </div>
          </div>
          <div class="comment">{{ comment.text }}</div>
        </div>
      </div>
      <div v-if="comments.length === 0" class="empty">
        No comments has found!
      </div>
      <form @submit.prevent="onSubmit" class="form">
        <div class="create">
          <input
            placeholder="Comment..."
            class="input"
            v-model="commentText"
            type="text"
          />
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
    const idAuth = computed(() => {
      return idUser().value;
    });
    const comments = computed(() => {
      return prop?.status?.comments.sort(function (a: any, b: any) {
        return Number(new Date(b.time)) - Number(new Date(a.time));
      });
    });
    const commentText = ref("");
    const onDelete = async (comment : any) => {
      const index = comments.value.indexOf(comment);
      console.log(index);
      comments.value.splice(index, 1);
      const updateValue = ref({
        comments: comments.value,
      });
      const data = await updateStatus(updateValue.value, prop?.status?.id);
    };
    const onSubmit = async () => {
      console.log(prop?.status);
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
      fetchStatus();
      commentText.value = "";
    };
    const onHide = () => {
      emit("hideComments");
    };
    console.log(prop?.status);
    return {
      onSubmit,
      commentText,
      comments,
      onHide,onDelete,idAuth
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/fixed.scss";
@import "../assets/css/variables.scss";
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
    .empty {
      text-align: center;
      margin-top: 30%;
    }
    .title {
      text-align: center;
      font-size: 1.2rem;
      padding: 5px 0;
      border-bottom: 1px solid rgb(0, 0, 0);
    }
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-top: 64px;
    background-color: $bg-color-second;
    width: 50vw;
    height: 80vh;
    position: relative;
    .scroll {
      overflow: scroll;
      height: 500px;
    }
    .scroll::-webkit-scrollbar {
      display: none;
    }
    .content {
      background-color: $bg-color;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border-top: 2px solid rgb(146, 146, 146);
      border-left: 1px solid rgb(190, 189, 189);
      margin: 2px;
      margin-bottom: 5px;
      box-shadow: 0 0.3px 10px 0 rgb(190, 190, 190);
      overflow: hidden;
      .user {
        padding: 3px;
        display: flex;
        align-items: center;
      }
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .detail {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name {
          margin-left: 3px;
          font-size: 0.8rem;
        }
        .time {
          font-size: 0.5rem;
          .trash {
            color: red;
            font-size: 1rem;
            cursor: pointer;
            opacity: 0.4;
            padding: 0 3px;
          }
          .trash:hover {
            opacity: 1;
          }
        }
      }

      .comment {
        font-size: 1rem;
        color: $text-color;
        margin-left: 2px;
        background-color: rgb(240, 239, 239);
        text-indent: 10px;
        letter-spacing: -0.7px;
      }
    }

    .form {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .create {
        border-top: 2px solid rgb(163, 163, 163);
        display: flex;
        margin: 1px;
        // border-radius: 5px;
        overflow: hidden;
      }
      .input {
        padding: 8px 0;
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
