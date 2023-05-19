<script lang="ts">
import axios from "axios";
import {
  API_URL,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  GISCUS_REPO,
  GISCUS_REPO_ID,
} from "@/environment";
import Giscus from "@/components/Giscus.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { PostModel } from "@/models/post";
import { GiscusModel } from "@/models/giscus";

@Options({
  components: { Giscus },
})
export default class PostDetailView extends Vue {
  @Prop()
  post: PostModel = {};

  @Prop()
  postContent = "";

  @Prop()
  giscus: GiscusModel = {};

  mounted() {
    this.getPost(this.$route.params.id as string);
    this.getPostContent(this.$route.params.id as string);
  }

  async getPost(id: string) {
    try {
      const res = await axios.get("/app/posts/" + id, { baseURL: API_URL });
      this.post = res.data;
      this.giscus = {
        repo: GISCUS_REPO,
        repoId: GISCUS_REPO_ID,
        category: GISCUS_CATEGORY,
        categoryid: GISCUS_CATEGORY_ID,
      };

      this.giscus.term = this.post.title;
    } catch (e) {
      console.error("getPost", e);
    }
  }

  async getPostContent(id: string) {
    try {
      const res = await axios.get("/app/posts/" + id + "/content", {
        baseURL: API_URL,
      });
      this.postContent = res.data;
    } catch (e) {
      console.error("getPostContent", e);
    }
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    // Then specify how you want your dates to be formatted
    return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
      date
    );
  }
}
</script>

<template>
  <!-- content
  ================================================== -->
  <section class="s-content">
    <div class="row">
      <div class="column large-12">
        <article class="s-content__entry format-standard" v-if="post.id">
          <div class="s-content__media">
            <div class="s-content__post-thumb">
              <img
                :src="post.cover || '/images/eye.png'"
                sizes="(max-width: 2100px) 100vw, 2100px"
                alt=""
              />
              <!--                            srcset="images/thumbs/single/single-post-2100.jpg 2100w,-->
              <!--                            images/thumbs/single/single-post-1050.jpg 1050w,-->
              <!--                            images/thumbs/single/single-post-525.jpg 525w"-->
            </div>
          </div>
          <!-- end s-content__media -->

          <div class="s-content__entry-header">
            <h1 class="s-content__title s-content__title--post">
              {{ post.title }}
            </h1>
          </div>
          <!-- end s-content__entry-header -->

          <div class="s-content__primary">
            <div
              class="s-content__entry-content"
              v-if="postContent"
              v-html="postContent"
              style="width: 900px"
            ></div>
            <!-- end s-entry__entry-content -->

            <div class="s-content__entry-meta">
              <div
                class="entry-author meta-blk"
                v-bind:key="number1"
                v-for="(author, number1) in post.authors"
              >
                <div class="author-avatar">
                  <img class="avatar" src="/images/doremon.png" alt="" />
                </div>
                <div class="byline">
                  <span class="bytext">Posted By</span>
                  <RouterLink to="#0">{{ author.name }}</RouterLink>
                </div>
              </div>

              <div class="meta-bottom">
                <div class="entry-cat-links meta-blk">
                  <div class="cat-links">
                    <span style="margin-right: 5px">In</span>
                    <RouterLink
                      to="#0"
                      v-bind:key="number2"
                      v-for="(tag, number2) in post.tags"
                      >{{ tag }}
                    </RouterLink>
                  </div>

                  <span style="margin-right: 5px">On</span>
                  {{ formatDate(post.published.start) }}
                </div>

                <div class="entry-tags meta-blk is-hidden">
                  <span class="tagtext">Tags</span>
                  <a href="#">orci</a>
                  <a href="#">lectus</a>
                  <a href="#">varius</a>
                  <a href="#">turpis</a>
                </div>
              </div>
            </div>
            <!-- s-content__entry-meta -->

            <div class="s-content__pagenav">
              <div class="prev-nav">
                <a href="#" rel="prev">
                  <span>Previous</span>
                  Tips on Minimalist Design
                </a>
              </div>
              <div class="next-nav">
                <a href="#" rel="next">
                  <span>Next</span>
                  A Practical Guide to a Minimalist Lifestyle.
                </a>
              </div>
            </div>
            <!-- end s-content__pagenav -->
          </div>
          <!-- end s-content__primary -->
        </article>
        <!-- end entry -->
      </div>
      <!-- end column -->
    </div>
    <!-- end row -->

    <!-- comments
    ================================================== -->
    <div class="comments-wrap">
      <div id="comments" class="row">
        <div class="column large-12">
          <Giscus :giscus="giscus" v-if="giscus.repo"></Giscus>
        </div>
      </div>
    </div>
  </section>
  <!-- end s-content -->
</template>

<style scoped></style>
