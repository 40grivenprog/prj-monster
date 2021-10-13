function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data: function(){
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      specailAttackAttemps: 3,
      winner: null,
      logMessages: []
    }
  },
  computed: {
    playerHealthBarStyles: function(){
      if(this.playerHealth < 0){
        return { width: '0%' };
      }
      return {width: `${this.playerHealth}%`};
    },
    monsterHealthBarStyles: function(){
      if(this.monsterHealth < 0){
        return { width: '0%' };
      }
      return {width: `${this.monsterHealth}%`};
    },
    specailAttackRound: function(){
      return this.currentRound % 3 != 0 
    } 
  },
  watch: {
    playerHealth: function(value){
      if(value <=0 && this.monsterHealth <=0){
        this.winner = 'draw';
      }else if(value <= 0){
        this.winner = 'monster';
      }
    },
    monsterHealth: function(value){
      if(value <=0 && this.playerHealth <=0){
        this.winner = 'draw';
      }else if(value <= 0){
        this.winner = 'player';
      }
    }
  },
  methods: {
    startGame: function(){
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    surrender(){
      this.winner = 'monster';
    },
    attackMonster: function(){
      this.currentRound++;
      const enemyHealth = getRandomValue(5, 12);
      this.monsterHealth -=  enemyHealth;
      this.addLogMessage('player', 'attack', enemyHealth)
      this.attackPlayer();
    },
    attackPlayer: function(){
      const enemyHealth = getRandomValue(8, 15);
      this.addLogMessage('monster', 'attack', enemyHealth)
      this.playerHealth -= enemyHealth;
    },
    specialAttackMonster(){
      this.currentRound++;
      const enemyHealth = getRandomValue(10, 25);
      this.monsterHealth -= enemyHealth;
      this.addLogMessage('player', 'special attack', enemyHealth)
      this.attackPlayer();
    },
    healPlayer: function(){
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if(this.playerHealth + healValue > 100){
        this.playerHealth = 100;
      }else{
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue)
      this.attackPlayer();
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  }
})

app.mount("#game")
