<template>
  <!-- hero ================================================== -->
  <SliderListCard :models="sliders"></SliderListCard>
  <!-- end s-hero -->

  <!-- content
  ================================================== -->
  <section class="s-content s-content--no-top-padding">
    <!-- masonry
    ================================================== -->
    <div class="s-bricks">
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

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PostListCard from "@/components/posts/PostListCard.vue";
import { PostModel } from "@/models/post";
import { API_URL } from "@/environment";
import axios from "axios";
import { SliderModel } from "@/models/slider";
import SliderListCard from "@/components/sliders/SliderListCard.vue";

@Options({
  components: {
    SliderListCard,
    PostListCard,
  },
})
export default class HomeView extends Vue {
  posts: PostModel[] = [];
  sliders: SliderModel[] = [];

  mounted() {
    this.getPosts();
    this.getSliders();
  }

  async getPosts() {
    try {
      const res = await axios.get("/app/posts", { baseURL: API_URL });
      this.posts = res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async getSliders() {
    try {
      const res = await axios.get("/app/sliders", { baseURL: API_URL });
      this.sliders = res.data;
      window.dispatchEvent(
        new CustomEvent("getSliderDone", {
          detail: {
            done: true,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
