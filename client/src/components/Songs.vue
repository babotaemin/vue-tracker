<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
        <v-btn
          slot="action"
          class="cyan accent-2"
          @click="navigateTo({name: 'songs-create'})"
          light
          medium
          absolute
          right
          small
          fab>
          <v-icon>add</v-icon>
        </v-btn>

        <div v-for="song in songs"
          class="song"
          :key="song.id">

          <v-layout>
            <v-flex xs6>
              <div class="song-title">
                {{song.title}}
              </div>
              <div class="song-artist">
                {{song.artist}}
              </div>
              <div class="song-genre">
                {{song.genre}}
              </div>

              <v-btn
                dark
                class="cyan"
                @click="navigateTo({
                  name: 'song', 
                  params: { 
                    songId: song.id
                  }
                })">
                View
              </v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="album-image" :src="song.albumImageUrl"/>
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.album-image {
  width: 100%;
  margin: 0 auto;
}
</style>
