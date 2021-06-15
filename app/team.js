// team.js

var team = new Tulipan({

    template: {
      url: "views/team.html",
      async: false
    },
    
    route: "/teams/:id",
  
    data: {
      progress: true,
      name: "team",
      team: {},
      games: [],
    },
  
    methods: {
  
      after: function(params, query){
        this.resetTeam();
        this.resetGames();
        var teamId = params.id;
        var leagueId = this.$store.get('leagueId');
        this.progress = true;
        this.$http.get('http://elite-schedule.net/api/leaguedata/' + leagueId)
        .then(function (res){
          var teams = res.data.teams;

          for (var i=0; i<teams.length; i++){
              
            var divisionTeams = teams[i].divisionTeams;

            for (var j=0; j<divisionTeams.length; j++){
                  
              var team = divisionTeams[j];
                  
              if (team.id == teamId){
                console.log(team);
                this.$set("team", team);
              }
            }
          }

          var result = [];
            
          var games = res.data.games;

          for (var i=0; i<games.length; i++){
            var game = games[i];

            if ((game.team1Id == teamId) || (game.team2Id == teamId)){

              var isTeam1 = (game.team1Id == teamId ? true : false)
              var opponent = isTeam1 ? game.team2 : game.team1;
              var scoreDisplay = this.getScoreDisplay(isTeam1, game.team1Score, game.team2Score);
              var record = {
                gameId: game.id,
                opponent: opponent,
                time: game.time,
                location: game.location,
                locationUrl: game.locationUrl,
                scoreDisplay: scoreDisplay,
                homeAway: (isTeam1 ? "vs." : "at")
              }

              result.push(record);
            }
          }
          
          this.$set("games", result);

          this.progress = false;

        }, function(err){
          console.log(err);
        }) 
      },
  
      resetTeam: function(){
        this.$set("team", {});
      },

      resetGames: function(){
        this.$set("games", []);
      },
  
      selectGame: function(gameId){
        console.log(teamId);
        this.$router.navigate("#!/games/" + gameId);
      },

      getScoreDisplay: function(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
          var teamScore = (isTeam1 ? team1Score : team2Score);
          var opponentScore = (isTeam1 ? team2Score : team1Score);
          var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
          return winIndicator + teamScore + "-" + opponentScore;
        }
        else {
          return "";
        }
      }
    },
    filters: {
      lastsub: function(str, size){
        return str.substr(-size);
      },

      firstsub: function(str, size){
        return str.substring(0, size);
      }
    }
  });