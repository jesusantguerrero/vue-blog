<template>
  <router-link  :to="`/post/${data.id}?ref=/my-posts`">{{ data.title }}</router-link>
</template>

<script>

  export default {
      props: ['data', 'index'],
  }
</script>