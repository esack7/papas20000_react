interface Action {
    type: string
}

interface PageVisibility {
    startGame: boolean;
    addUsers: boolean;
}

interface ReducerValue {
    state: PageVisibility;
    dispatch: React.Dispatch<Action>
}

class Player {
    readonly id: string;
    readonly name: string;
    readonly scores: number[];
    private totalScore: number;

    constructor(name: string, id: string = 'player' + randomId(), scores: number[] = [], totalScore = 0) {
        this.id = id;
        this.name = name;
        this.scores = scores;
        this.totalScore = totalScore;
    }

    addRoundPoints(points: number): void {
        if (this.totalScore === 0 && points < 1000 && points !== 0) {
            this.scores.push(0);
            return;
        }

        if (this.totalScore + points > Game.winningScore) {
            this.scores.push(0);
            throw new Error('Over20000');
        }

        if (points % 50 !== 0) {
            throw new Error('Not multiple of 50');
        }

        this.scores.push(points);
        this.totalScore = this.scores.reduce((acc, curr) => acc + curr);

        if (this.totalScore === Game.winningScore) {
            playLastRound(this);
        }
    }

    getScoresArray(): string[] {
        return this.scores.map(score => score.toString());
    }

    getTotalScore(): number {
        return this.totalScore;
    }
}

interface GameInterface {
    id: string;
    players: Player[];
    winnersBracket: string[];
    currentPlayIndex: number;
    activeGame: boolean;
    lastRound: boolean;
    gameWarningText: string;
    errorState: boolean;
    previousState: string;
}

class Game implements GameInterface {
    readonly id: string;
    readonly players: Player[];
    readonly winnersBracket: string[];
    currentPlayIndex: number;
    activeGame: boolean;
    lastRound: boolean;
    gameWarningText: string;
    errorState: boolean;
    previousState: string;
    static winningScore: number = 20000;

    constructor(id = `game${randomId()}`, players: Player[] = [], winnersBracket: string[] = [], currentPlayIndex = 0, activeGame = true, lastRound = false, gameWarningText = '', errorState = false, previousState = '') {
        this.id = id
        this.winnersBracket = winnersBracket;
        this.currentPlayIndex = currentPlayIndex;
        this.activeGame = activeGame;
        this.lastRound = lastRound;
        this.gameWarningText = gameWarningText;
        this.errorState = errorState;
        this.previousState = previousState;
        if (players.length === 0) {
            this.players = players;
        } else {
            this.players = players.map(player => {
                if (player.scores.length === 0) {
                    return new Player(player.name, player.id, player.scores, 0)
                } else {
                    return new Player(player.name, player.id, player.scores, player.scores.reduce((acc, curr) => acc + curr))
                }
            })
        }
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayIndex];
    }

    nextTurn() {
        const totalPlayers = this.players.length;
        this.currentPlayIndex += 1;
        if (this.currentPlayIndex >= totalPlayers) {
            this.currentPlayIndex = 0;
        }
    }
    addToWinnersBracket(player: Player) {
        this.winnersBracket.push(player.name);
    }
}