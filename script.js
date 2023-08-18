document.addEventListener('DOMContentLoaded', function () {
  class HangmanGame {
    constructor() {
      this.palavras = [
        'ABACATE',
        'ABACAXI',
        'ACEROLA',
        'AÇAÍ',
        'ARAÇA',
        'ABACATE',
        'BACABA',
        'BACURI',
        'BANANA',
        'CAJÁ',
        'CAJÚ',
        'CARAMBOLA',
        'CUPUAÇU',
        'GRAVIOLA',
        'GOIABA',
        'JABUTICABA',
        'JENIPAPO',
        'MAÇÃ',
        'MANGABA',
        'MANGA',
        'MARACUJÁ',
        'MURICI',
        'PEQUI',
        'PITANGA',
        'PITAYA',
        'SAPOTI',
        'TANGERINA',
        'UMBU',
        'UVA',
        'UVAIA',
      ];

      this.maxErrors = 5;
      this.palavraSecreta =
        this.palavras[Math.floor(Math.random() * this.palavras.length)];
      this.letrasEncontradas = Array(this.palavraSecreta.length).fill('_');
      this.acertou = false;
      this.enforcou = false;
      this.erros = 0;
      this.hangmanImage = document.getElementById('hangman-image');
      this.keyboardContainer = document.getElementById('keyboard-container');
      this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      this.initialize();
    }

    initialize() {
      this.bindUIElements();
      this.desenharForca();
      this.setupKeyboard();
    }

    bindUIElements() {
      this.chuteInput = document.getElementById('chute-input');
      this.chuteButton = document.getElementById('chute-button');
      this.letrasEncontradasContainer =
        document.getElementById('letras-encontradas');
      this.restartButton = document.getElementById('restart-button');
    }

    desenharForca() {
      const stage = Math.min(this.erros, this.maxErrors);
      this.hangmanImage.src = `assets/hangman_${stage}.png`;
    }

    checkWinCondition() {
      if (this.letrasEncontradas.join('') === this.palavraSecreta) {
        this.acertou = true;
        this.letrasEncontradasContainer.textContent = `Você acertou a palavra ${this.palavraSecreta}, parabéns!`;
      } else if (this.erros >= this.maxErrors) {
        this.enforcou = true;
        this.letrasEncontradasContainer.textContent =
          'Que azar! Tente novamente!';
      }
    }

    setupKeyboard() {
      for (const letter of this.letters) {
        const letterButton = document.createElement('button');
        letterButton.textContent = letter;
        this.keyboardContainer.appendChild(letterButton);

        letterButton.addEventListener('click', () => {
          if (!this.acertou && !this.enforcou) {
            const chute = letter.toUpperCase();
            let letraFoiEncontrada = false;

            for (let i = 0; i < this.palavraSecreta.length; i++) {
              if (chute === this.palavraSecreta[i]) {
                this.letrasEncontradas[i] = chute;
                letraFoiEncontrada = true;
              }
            }

            if (!letraFoiEncontrada) {
              this.erros++;
            }

            this.letrasEncontradasContainer.textContent =
              this.letrasEncontradas.join(' ');
            this.checkWinCondition();
            this.desenharForca();
          }
        });
      }
    }

    restartGame() {
      this.palavraSecreta =
        this.palavras[Math.floor(Math.random() * this.palavras.length)];
      this.letrasEncontradas = Array(this.palavraSecreta.length).fill('_');
      this.acertou = false;
      this.enforcou = false;
      this.erros = 0;
      this.letrasEncontradasContainer.textContent =
        this.letrasEncontradas.join(' ');
      this.desenharForca();
    }
  }

  const hangmanGame = new HangmanGame();

  hangmanGame.chuteButton.addEventListener('click', () => {
    if (!hangmanGame.acertou && !hangmanGame.enforcou) {
      const chute = hangmanGame.chuteInput.value.trim().toUpperCase();
      hangmanGame.chuteInput.value = '';

      let letraFoiEncontrada = false;

      for (let i = 0; i < hangmanGame.palavraSecreta.length; i++) {
        if (chute === hangmanGame.palavraSecreta[i]) {
          hangmanGame.letrasEncontradas[i] = chute;
          letraFoiEncontrada = true;
        }
      }

      if (!letraFoiEncontrada) {
        hangmanGame.erros++;
      }

      hangmanGame.letrasEncontradasContainer.textContent =
        hangmanGame.letrasEncontradas.join(' ');
      hangmanGame.checkWinCondition();
      hangmanGame.desenharForca();
    }
  });

  hangmanGame.restartButton.addEventListener('click', () => {
    hangmanGame.restartGame();
  });
});
