document.addEventListener('DOMContentLoaded', function() {
    // Hero Section
    initHero();
    
    // Collection Gallery
    initGallery();
    
    // Catch Game
    initGame();
    
    // Birthday Message
    initMessage();
  });
  
  // Hero Section
  function initHero() {
    const heroBackground = document.querySelector('.hero-background');
    const smiskiGlow = document.querySelector('.smiski-glow');
    
    // Add stars/particles to hero background
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = `${Math.random() * 3 + 1}px`;
      star.style.backgroundColor = 'var(--primary)';
      star.style.borderRadius = '50%';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite`;
      
      heroBackground.appendChild(star);
    }
    
    // Toggle glow effect
    setInterval(() => {
      smiskiGlow.classList.toggle('active');
    }, 3000);
  }
  
  // Collection Gallery
  function initGallery() {
    const gallery = document.querySelector('.gallery');
    
    // Sample Smiski collection data
    const smiskiCollection = [
      { id: 1, name: "Sleepy Smiski", color: "#c1f0c1", description: "This little one is always taking a nap." },
      { id: 2, name: "Curious Smiski", color: "#d1f5e0", description: "Always looking around with big wondering eyes." },
      { id: 3, name: "Hungry Smiski", color: "#e0f5d1", description: "This Smiski is always thinking about food." },
      { id: 4, name: "Shy Smiski", color: "#c1e6c1", description: "Hides behind objects and peeks out occasionally." },
      { id: 5, name: "Playful Smiski", color: "#b8e0b8", description: "Loves to play games and have fun all day." },
      { id: 6, name: "Thoughtful Smiski", color: "#d8f3d8", description: "Deep in thought, contemplating Smiski philosophy." },
      { id: 7, name: "Adventurous Smiski", color: "#c9f2dc", description: "Always ready for the next big adventure." },
      { id: 8, name: "Friendly Smiski", color: "#d6f6dd", description: "Makes friends with everyone they meet." }
    ];
    
    // Create gallery items
    smiskiCollection.forEach(smiski => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.id = smiski.id;
      
      item.innerHTML = `
        <div class="gallery-card" style="background-color: ${smiski.color}">
          <div class="smiski small">
            <div class="smiski-body"></div>
            <div class="smiski-head">
              <div class="smiski-eye left"></div>
              <div class="smiski-eye right"></div>
              <div class="smiski-mouth"></div>
            </div>
          </div>
          <h3 class="gallery-title">${smiski.name}</h3>
        </div>
        <div class="gallery-description">${smiski.description}</div>
      `;
      
      gallery.appendChild(item);
      
      // Add click event
      item.addEventListener('click', function() {
        const description = this.querySelector('.gallery-description');
        const card = this.querySelector('.gallery-card');
        
        // Toggle description visibility
        if (description.classList.contains('visible')) {
          description.classList.remove('visible');
          card.classList.remove('selected');
        } else {
          // Hide all other descriptions
          document.querySelectorAll('.gallery-description').forEach(desc => {
            desc.classList.remove('visible');
          });
          document.querySelectorAll('.gallery-card').forEach(c => {
            c.classList.remove('selected');
          });
          
          // Show this description
          description.classList.add('visible');
          card.classList.add('selected');
          card.style.boxShadow = `0 0 20px ${smiski.color}`;
        }
      });
    });
  }
  
  // Catch Game
  function initGame() {
    const startButton = document.getElementById('start-game');
    const gameArea = document.getElementById('game-area');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');
    const gameMessage = document.getElementById('game-message');
    const gameHint = document.querySelector('.game-hint');
    
    let score = 0;
    let timeLeft = 30;
    let gameActive = false;
    let gameTimer;
    let smiski = null;
    
    // Start game
    startButton.addEventListener('click', function() {
      if (gameActive) return;
      
      // Reset game
      score = 0;
      timeLeft = 30;
      gameActive = true;
      
      // Update UI
      scoreElement.textContent = score;
      timeElement.textContent = timeLeft;
      gameMessage.textContent = '';
      gameHint.textContent = 'Click on the Smiski to catch it!';
      startButton.textContent = 'Game in progress';
      startButton.disabled = true;
      startButton.style.backgroundColor = 'var(--muted)';
      startButton.style.cursor = 'not-allowed';
      
      // Create Smiski
      createSmiski();
      
      // Start timer
      gameTimer = setInterval(function() {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    });
    
    // Create Smiski at random position
    function createSmiski() {
      if (!gameActive) return;
      
      // Remove existing Smiski
      if (smiski) {
        smiski.remove();
      }
      
      // Create new Smiski
      smiski = document.createElement('div');
      smiski.className = 'game-smiski';
      
      // Set random position
      const maxX = gameArea.clientWidth - 50;
      const maxY = gameArea.clientHeight - 50;
      const posX = Math.floor(Math.random() * maxX);
      const posY = Math.floor(Math.random() * maxY);
      
      smiski.style.left = `${posX}px`;
      smiski.style.top = `${posY}px`;
      
      // Create Smiski character
      smiski.innerHTML = `
        <div class="smiski small">
          <div class="smiski-body"></div>
          <div class="smiski-head">
            <div class="smiski-eye left"></div>
            <div class="smiski-eye right"></div>
            <div class="smiski-mouth"></div>
          </div>
        </div>
      `;
      
      // Add click event
      smiski.addEventListener('click', function() {
        if (!gameActive) return;
        
        // Increase score
        score++;
        scoreElement.textContent = score;
        
        // Create new Smiski
        createSmiski();
      });
      
      // Add to game area
      gameArea.appendChild(smiski);
    }
    
    // End game
    function endGame() {
      gameActive = false;
      clearInterval(gameTimer);
      
      if (smiski) {
        smiski.remove();
        smiski = null;
      }
      
      // Update UI
      gameMessage.textContent = `Game Over! You caught ${score} Smiskis!`;
      gameHint.textContent = 'Press Start Game to begin!';
      startButton.textContent = 'Start Game';
      startButton.disabled = false;
      startButton.style.backgroundColor = '';
      startButton.style.cursor = '';
    }
  }
  
  // Birthday Message
  function initMessage() {
    const messageForm = document.getElementById('message-form');
    const messageDisplay = document.getElementById('message-display');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message-text');
    const revealButton = document.getElementById('reveal-message');
    const editButton = document.getElementById('edit-message');
    const recipientName = document.getElementById('recipient-name');
    const messageContent = document.getElementById('message-content');
    const messageBackground = document.querySelector('.message-background');
    
    // Add particles to message background
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'message-particle';
      
      const size = Math.random() * 30 + 10;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Animate particles
      particle.animate(
        [
          { transform: `translate(0, 0)` },
          { transform: `translate(${Math.random() * 50 - 25}%, ${Math.random() * 50 - 25}%)` },
          { transform: `translate(${Math.random() * 50 - 25}%, ${Math.random() * 50 - 25}%)` }
        ],
        {
          duration: Math.random() * 10000 + 10000,
          iterations: Infinity,
          direction: 'alternate'
        }
      );
      
      messageBackground.appendChild(particle);
    }
    
    // Reveal message
    revealButton.addEventListener('click', function() {
      let name = nameInput.value.trim();
      let message = messageInput.value.trim();
      
      // Default values if empty
      if (!name) {
        name = 'Your Boyfriend';
      }
      
      if (!message) {
        message = "I hope this special Smiski world brings a smile to your face! I love you and wish you the happiest birthday ever. Thank you for being the light in my life, just like these glowing Smiskis!";
      }
      
      // Update message content
      recipientName.textContent = name;
      messageContent.textContent = message;
      
      // Show message display
      messageForm.classList.add('hidden');
      messageDisplay.classList.remove('hidden');
      
      // Animate in
      setTimeout(() => {
        messageDisplay.classList.add('visible');
      }, 10);
    });
    
    // Edit message
    editButton.addEventListener('click', function() {
      messageDisplay.classList.remove('visible');
      
      setTimeout(() => {
        messageDisplay.classList.add('hidden');
        messageForm.classList.remove('hidden');
      }, 300);
    });
  }