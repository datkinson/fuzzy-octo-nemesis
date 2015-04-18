Polymer('post-service', {
    created: function() {
      this.posts = [];
    },
    postsLoaded: function() {
      // Make a copy of the loaded data
      this.posts = this.$.ajax.response.slice(0);
    },
    /**
     * Update the service with the current favorite value.
     * (Two-way data binding updates the favorite value
     * stored locally.) If this was a real service, this
     * method would do something useful.
     *
     * @method setFavorite
     * @param uid {Number} Unique ID for post.
     * @param isFavorite {Boolean} True if the user marked this post as a favorite.
     */
    setFavorite: function(uid, isFavorite) {
      // no service backend, just log the change
      console.log('Favorite changed: ' + uid + ", now: " + isFavorite);
    }
  });
