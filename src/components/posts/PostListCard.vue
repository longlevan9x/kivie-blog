<script lang="ts">
import { Prop } from "vue-property-decorator";
import { PostModel } from "@/models/post";
import { Options, Vue } from "vue-class-component";
import PostCard from "@/components/posts/PostCard.vue";

@Options({
  components: {
    PostCard,
  },
})
export default class PostListCard extends Vue {
  @Prop({ required: true })
  posts!: PostModel[];
}
</script>

<template>
  <div v-masonry transition-duration="0.3s" item-selector=".item">
    <article
      v-masonry-tile
      class="item masonry__brick entry format-standard brick entry"
      data-aos="fade-up"
      v-bind:key="post.id"
      v-for="post in posts"
    >
      <PostCard :post="post"></PostCard>
    </article>
    <!-- end article -->
  </div>
  <!-- end brick-wrapper -->
</template>

<style scoped></style>
