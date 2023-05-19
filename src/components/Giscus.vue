<script lang="ts">
import "giscus";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { GiscusModel } from "@/models/giscus";

export default class Giscus extends Vue {
  @Prop({ required: true })
  giscus!: GiscusModel;
}
</script>

<template>
  <giscus-widget
    id="comments"
    :repo="giscus.repo"
    :repoid="giscus.repoId"
    :category="giscus.category"
    :categoryid="giscus.categoryid"
    mapping="specific"
    :term="giscus.term"
    reactionsenabled="1"
    emitmetadata="0"
    inputposition="top"
    theme="light"
    lang="en"
    loading="lazy"
  ></giscus-widget>
</template>

<style scoped></style>
