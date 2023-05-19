<script lang="ts">
import axios from "axios";
import { API_URL } from "@/environment";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import PostListCard from "@/components/posts/PostListCard.vue";
import { PostModel } from "@/models/post";

@Options({
  components: { PostListCard },
})
export default class PostListView extends Vue {
  @Prop({ required: true })
  posts!: PostModel[];

  mounted() {
    this.getPosts();
  }

  async getPosts() {
    const res = await axios.get("/app/posts", { baseURL: API_URL });
    this.posts = res.data;
  }
}
</script>

<template>
  <section class="s-content">
    <!-- page header
        ================================================== -->
    <div class="s-pageheader">
      <div class="row">
        <div class="column large-12">
          <h1 class="page-title">
            <span class="page-title__small-type is-hidden">Category</span>
            Blog
          </h1>
        </div>
      </div>
    </div>
    <!-- end s-pageheader-->

    <!-- masonry
        ================================================== -->
    <div class="s-bricks s-bricks--half-top-padding">
      <div class="masonry">
        <div class="bricks-wrapper h-group">
          <div class="grid-sizer"></div>

          <div class="lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <PostListCard :posts="posts"></PostListCard>
        </div>
        <!-- end brick-wrapper -->
      </div>
      <!-- end masonry -->

      <div class="row is-hidden">
        <div class="column large-12">
          <nav class="pgn">
            <ul>
              <li>
                <span class="pgn__prev" href="#0"> Prev </span>
              </li>
              <li><a class="pgn__num" href="#0">1</a></li>
              <li><span class="pgn__num current">2</span></li>
              <li><a class="pgn__num" href="#0">3</a></li>
              <li><a class="pgn__num" href="#0">4</a></li>
              <li><a class="pgn__num" href="#0">5</a></li>
              <li><span class="pgn__num dots">…</span></li>
              <li><a class="pgn__num" href="#0">8</a></li>
              <li>
                <span class="pgn__next" href="#0"> Next </span>
              </li>
            </ul>
          </nav>
          <!-- end pgn -->
        </div>
        <!-- end column -->
      </div>
      <!-- end row -->
    </div>
    <!-- end s-bricks -->
  </section>
  <!-- end s-content -->
</template>

<style scoped></style>
