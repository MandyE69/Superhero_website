// Character Data
const superheroes = [
    {
        name: "Spider-Man",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820",
        description: "Your friendly neighborhood Spider-Man, with the proportional strength and agility of a spider.",
        abilities: ["Web-Slinging", "Spider-Sense", "Wall-Crawling", "Superhuman Strength"],
        movies: [
            { title: "Spider-Man: Homecoming", year: 2017 },
            { title: "Avengers: Infinity War", year: 2018 },
            { title: "Spider-Man: Far From Home", year: 2019 }
        ]
    },
    {
        name: "Iron Man",
        image: "/images/iron-man.jpg",
        description: "Genius billionaire Tony Stark in a high-tech suit of armor, protecting the world with advanced technology.",
        abilities: ["Powered Armor", "Genius Intellect", "Flight", "Energy Blasts"],
        movies: [
            { title: "Iron Man", year: 2008 },
            { title: "The Avengers", year: 2012 },
            { title: "Avengers: Endgame", year: 2019 }
        ]
    },
    {
        name: "Black Widow",
        image: "/images/black.jpg",
        description: "Master spy and expert combatant, Natasha Romanoff is one of S.H.I.E.L.D.'s most valuable agents.",
        abilities: ["Master Spy", "Expert Combatant", "Tactical Genius", "Weapons Expert"],
        movies: [
            { title: "Iron Man 2", year: 2010 },
            { title: "Black Widow", year: 2021 }
        ]
    }
];

const animeCharacters = [
    {
        name: "Naruto Uzumaki",
        image: "/images/naruto.jpg",
        description: "A determined ninja with dreams of becoming the Hokage of his village.",
        abilities: ["Rasengan", "Shadow Clone Jutsu", "Sage Mode", "Nine-Tails Chakra"]
    },
    {
        name: "Monkey D. Luffy",
        image: "/images/dluffy.jpg",
        description: "Captain of the Straw Hat Pirates, with the power of the Gum-Gum Devil Fruit.",
        abilities: ["Gum-Gum Powers", "Haki", "Gear Transformations", "Incredible Strength"]
    },
    {
        name: "Eren Yeager",
        image: "/images/eren.jpg",
        description: "A determined soldier fighting for humanity's freedom against the Titans.",
        abilities: ["Titan Shifting", "ODM Gear Expert", "Hand-to-Hand Combat", "Strategic Mind"]
    }
];

// Theme toggle functionality with enhanced animation
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    htmlElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme === 'dark');
    
    themeToggle.addEventListener('click', () => {
        const isDark = htmlElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        themeToggle.classList.add('clicked');
        setTimeout(() => themeToggle.classList.remove('clicked'), 300);
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(!isDark);
    });
    
    function updateThemeIcon(isDark) {
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Enhanced character card creation with animations
function createCharacterCard(character) {
    const template = document.querySelector('#character-card-template');
    if (!template) {
        console.error('Character card template not found');
        return null;
    }

    const card = template.content.cloneNode(true);
    const cardElement = card.querySelector('.character-card');

    // Front side
    const frontImage = cardElement.querySelector('.card-front img');
    frontImage.src = character.image;
    frontImage.alt = character.name;
    cardElement.querySelector('.card-front .character-name').textContent = character.name;

    // Back side
    cardElement.querySelector('.card-back .character-name').textContent = character.name;
    cardElement.querySelector('.card-back .character-description').textContent = character.description;

    // Add abilities with animation
    const abilitiesContainer = cardElement.querySelector('.abilities');
    if (abilitiesContainer) {
        character.abilities.forEach((ability, index) => {
            const abilityTag = document.createElement('span');
            abilityTag.className = 'ability-tag';
            abilityTag.textContent = ability;
            abilityTag.style.animationDelay = `${index * 0.1}s`;
            abilitiesContainer.appendChild(abilityTag);
        });
    }

    // Add click handler for detailed view
    cardElement.addEventListener('click', () => {
        showCharacterDetail(character);
    });

    return cardElement;
}

// Show character detailed view
function showCharacterDetail(character) {
    const modal = document.createElement('div');
    modal.className = 'character-modal';
    
    const content = `
        <div class="character-modal-content">
            <button class="close-modal" aria-label="Close modal">&times;</button>
            <div class="character-detail">
                <img src="${character.image}" alt="${character.name}" class="character-detail-image">
                <div class="character-detail-info">
                    <h2 class="character-detail-name">${character.name}</h2>
                    <p class="character-detail-description">${character.description}</p>
                    <div class="character-detail-abilities">
                        ${character.abilities.map((ability, index) => 
                            `<span class="ability-tag" style="--index: ${index}">${ability}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            ${character.movies ? `
                <div class="character-timeline">
                    <h3 class="character-timeline-title">Movie Timeline</h3>
                    <div class="timeline">
                        ${character.movies.map((movie, index) => `
                            <div class="timeline-item" style="animation-delay: ${index * 0.2}s">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <div class="timeline-date">${movie.year}</div>
                                    <h3 class="timeline-title">${movie.title}</h3>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.innerHTML = content;
    document.body.appendChild(modal);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Show modal with animation
    requestAnimationFrame(() => {
        modal.style.display = 'block';
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    });
    
    // Close modal functionality
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    };
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = closeModal;
    
    // Close on escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    // Close on overlay click
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Function to populate the grids with animation
function populateGrids() {
    const superheroGrid = document.querySelector('#superhero-grid');
    const animeGrid = document.querySelector('#anime-grid');

    if (superheroGrid && superheroes) {
        superheroGrid.innerHTML = ''; // Clear existing content
        superheroes.forEach((hero, index) => {
            const card = createCharacterCard(hero);
            if (card) {
                card.style.animationDelay = `${index * 0.2}s`;
                superheroGrid.appendChild(card);
            }
        });
    }

    if (animeGrid && animeCharacters) {
        animeGrid.innerHTML = ''; // Clear existing content
        animeCharacters.forEach((character, index) => {
            const card = createCharacterCard(character);
            if (card) {
                card.style.animationDelay = `${index * 0.2}s`;
                animeGrid.appendChild(card);
            }
        });
    }
}

// Enhanced floating elements initialization
function initializeFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-elements i');
    
    floatingIcons.forEach((icon, index) => {
        icon.style.fontSize = `${30 + (index * 5)}px`;
        icon.style.top = `${Math.random() * 80}%`;
        icon.style.left = `${Math.random() * 80}%`;
        icon.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.animation = 'fadeIn 1s ease';
    initializeTheme();
    populateGrids();
    initializeFloatingElements();
}); 