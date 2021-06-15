// leagues.js

var leagues = new Tulipan({

  template: {
    url: "views/home.html",
    async: false
  },
  
  route: "/",

  data: {
    name: "home",
    leagues: [],
    progress: true,
  },

  methods: {

    after: function(params, query){
      this.progress = true;
      this.$http.get('http://elite-schedule.net/api/leaguedata')
      .then(function (res){
        this.$store.set('leagues', res.data);
        this.$set("leagues", res.data);
        this.$set("progress", false);
      }, function(err){
        console.log(err);
      }) 
    },
    
    selectLeague: function(leagueId){
      this.$router.navigate("#!/leagues/" + leagueId);

    }
  }
});