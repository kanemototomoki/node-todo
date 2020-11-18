<template>
  <li
    :class="['list-item',
              todo.isCompleted ? 'is-completed' : '',
              isEditing ? 'is-editing' : ''
            ]"
  >
    <div class="list-item-inner">
      <div class="list-item-completed">
        <button
          type="button"
          class="button button-completed"
          @click="updateCompleted"
        >
          {{ todo.isCompleted ? '完了' : '未完了' }}
        </button>
      </div>
      <div class="list-item-desc">
        <input
          type="text"
          class="list-item-desc-title"
          v-model="todo.title"
          :readonly="!isEditing"
        >
        <input
          type="text"
          class="list-item-desc-content"
          v-model="todo.content"
          :readonly="!isEditing"
        >
      </div>
      <div class="list-item-actions">
        <button
          type="button"
          class="button button-edit"
          @click="handleClick"
        >
          {{ isEditing ? '更新' : '編集' }}
        </button>
        <button
          type="button"
          class="button button-delete"
          @click="$emit('delete-todo', todo)"
        >
          削除
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
    },
  },
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    handleClick() {
      if (this.isEditing) {
        this.toggleEdit();
        return this.$emit('update-todo', this.todo);
      }
      return this.toggleEdit();
    },
    updateCompleted(todo) {
      this.todo.isCompleted = !this.todo.isCompleted;
      this.$emit('update-completed', todo);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  &-item {
    border: dashed 2px #c0c0c0;
    padding: 10px;
    min-width: 30vw;
    justify-self: center;
    transition: all .3s;

    & + & {
      margin-top: 10px;
    }

    &.is-completed {
      color: #ccc;
      background-color: #f3f3f3;
    }

    input {
      display: block;
      border-color: transparent;
      pointer-events: none;
      outline: none;
    }

    &.is-editing {
      input {
        pointer-events: auto;
        animation: borderFlashing 1s ease infinite alternate;

        @keyframes borderFlashing {
          0% {
            border-bottom-color: transparent;
          }

          100% {
            border-bottom-color: gray;
          }
        }
      }
    }

    &.is-completed {
      .button-completed {
        text-decoration: line-through;
        color: #ccc;
        border: 2px solid #eaeaea;
        background-color: #eaeaea;
      }

      input {
        background-color: #f3f3f3;
        cursor: default;
      }
    }

    &-inner {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .list-item {
        &-completed {
          width: 10%;
          margin: auto 0;
        }

        &-desc {
          width: 70%;
          text-align-last: left;
          margin: auto;
        }

        &-actions {
          width: 10%;
        }
      }

      .button {
        padding: 5px 10px;
        border: 2px solid transparent;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;

        &:focus {
          outline: none;
        }

        &-completed {
          color: #ff3300;
          border-color: #ff1919;
          background-color: #fff;
          transition: all .3s;
        }

        &-edit {
          color: #fff;
          background-color: #00ff80;
        }

        &-delete {
          color: #fff;
          margin-top: 5px;
          background-color: #ff3300;
        }
      }
    }

    &-desc {
      &-title {
        color: #000;
        font-weight: bold;
        font-size: 16px;
        line-height: 1.2;
        transition: all .3s;
      }

      &-content {
        margin-top: 5px;
        color: #777;
        font-size: 14px;
        line-height: 1.2;
        white-space: pre-line;
        transition: all .3s;
      }
    }
  }
}
</style>
