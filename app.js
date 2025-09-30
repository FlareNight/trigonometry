// Quiz data
const quizData = [
    {
        question: "What does SOH in SOHCAHTOA stand for?",
        options: ["Sine = Opposite/Hypotenuse", "Side = Opposite/Height", "Sum = Opposite/Horizontal", "Square = Opposite/Hypotenuse"],
        correct: 0
    },
    {
        question: "In a right triangle, what is sin(30°)?",
        options: ["1/2", "√3/2", "√2/2", "1"],
        correct: 0
    },
    {
        question: "What does CAH in SOHCAHTOA represent?",
        options: ["Cosine = Angle/Height", "Cosine = Adjacent/Hypotenuse", "Calculate = Angle/Height", "Cosine = Area/Height"],
        correct: 1
    },
    {
        question: "What is cos(60°)?",
        options: ["√3/2", "1/2", "√2/2", "1"],
        correct: 1
    },
    {
        question: "What does TOA in SOHCAHTOA mean?",
        options: ["Total = Opposite/Adjacent", "Tangent = Opposite/Adjacent", "Triangle = Opposite/Angle", "Tangent = Opposite/Angle"],
        correct: 1
    },
    {
        question: "What is tan(45°)?",
        options: ["1/2", "√2/2", "1", "√3"],
        correct: 2
    },
    {
        question: "Which trigonometric identity is correct?",
        options: ["sin²θ + cos²θ = 2", "sin²θ + cos²θ = 1", "sin²θ - cos²θ = 1", "sin²θ × cos²θ = 1"],
        correct: 1
    },
    {
        question: "What is the reciprocal of sine?",
        options: ["Cosine", "Tangent", "Cosecant", "Secant"],
        correct: 2
    },
    {
        question: "In a right triangle, if the opposite side is 3 and hypotenuse is 5, what is sin θ?",
        options: ["3/5", "4/5", "3/4", "5/3"],
        correct: 0
    },
    {
        question: "What is the reciprocal of cosine?",
        options: ["Sine", "Secant", "Cosecant", "Tangent"],
        correct: 1
    },
    {
        question: "If cos θ = 4/5, what is sin θ (assuming θ is acute)?",
        options: ["3/5", "4/3", "5/4", "5/3"],
        correct: 0
    },
    {
        question: "What is the period of the sine function?",
        options: ["π", "2π", "π/2", "4π"],
        correct: 1
    },
    {
        question: "In which quadrant are both sine and cosine positive?",
        options: ["First", "Second", "Third", "Fourth"],
        correct: 0
    },
    {
        question: "What is tan θ equal to?",
        options: ["sin θ/cos θ", "cos θ/sin θ", "sin θ × cos θ", "1/(sin θ × cos θ)"],
        correct: 0
    },
    {
        question: "If a ladder makes a 60° angle with the ground and reaches 10m high, what is the length of the ladder?",
        options: ["10√3 m", "20/√3 m", "10/√3 m", "20 m"],
        correct: 1
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let quizStarted = false;
let selectedAnswer = null;

// DOM elements
const navbar = document.getElementById('navbar');
const scrollDownBtn = document.getElementById('scrollDown');
const startQuizBtn = document.getElementById('startQuizBtn');
const quizStart = document.getElementById('quizStart');
const quizContainer = document.getElementById('quizContainer');
const quizResults = document.getElementById('quizResults');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedbackText');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const questionCounter = document.getElementById('questionCounter');
const finalScore = document.getElementById('finalScore');
const scoreMessage = document.getElementById('scoreMessage');
const restartBtn = document.getElementById('restartBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeQuiz();
    addHoverEffects();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Add hover animation to nav links
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });

    // Scroll down arrow functionality
    scrollDownBtn.addEventListener('click', function() {
        const introSection = document.getElementById('intro');
        const navHeight = navbar.offsetHeight;
        const targetPosition = introSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset > 50;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.content-card, .ratio-card, .function-card, .formula-card, .application-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize opacity and transform for scroll animations
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.content-card, .ratio-card, .function-card, .formula-card, .application-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Add hover effects to various elements
function addHoverEffects() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.content-card, .ratio-card, .function-card, .formula-card, .application-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    });
    
    // Add hover effects to scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        scrollArrow.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Quiz functionality
function initializeQuiz() {
    startQuizBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
}

function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    quizStart.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    quizResults.classList.add('hidden');
    
    displayQuestion();
}

function displayQuestion() {
    const question = quizData[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    questionCounter.textContent = `${currentQuestion + 1} / ${quizData.length}`;
    
    // Display question
    questionText.textContent = question.question;
    
    // Display options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionBtn);
    });
    
    // Hide feedback
    feedback.classList.add('hidden');
    selectedAnswer = null;
}

function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    selectedAnswer = answerIndex;
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    
    // Disable all options
    options.forEach((option, index) => {
        option.disabled = true;
        
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === answerIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
        
        if (index === answerIndex) {
            option.classList.add('selected');
        }
    });
    
    // Show feedback
    const isCorrect = answerIndex === question.correct;
    if (isCorrect) {
        score++;
        feedbackText.textContent = 'Correct! Well done!';
        feedback.className = 'feedback correct';
    } else {
        feedbackText.textContent = `Incorrect. The correct answer is: ${question.options[question.correct]}`;
        feedback.className = 'feedback incorrect';
    }
    
    feedback.classList.remove('hidden');
    
    // Update next button text
    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'View Results';
    } else {
        nextBtn.textContent = 'Next Question';
    }
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion >= quizData.length) {
        showResults();
    } else {
        displayQuestion();
    }
}

function showResults() {
    quizContainer.classList.add('hidden');
    quizResults.classList.remove('hidden');
    
    finalScore.textContent = score;
    
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    
    if (percentage >= 90) {
        message = 'Outstanding! You have mastered trigonometry concepts!';
    } else if (percentage >= 80) {
        message = 'Excellent work! You have a strong understanding of trigonometry.';
    } else if (percentage >= 70) {
        message = 'Good job! You have a solid grasp of the basics.';
    } else if (percentage >= 60) {
        message = 'Not bad! Consider reviewing the concepts and try again.';
    } else {
        message = 'Keep practicing! Review the material and take the quiz again.';
    }
    
    scoreMessage.textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    quizResults.classList.add('hidden');
    quizStart.classList.remove('hidden');
}

// Add animation to scroll indicator
function animateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setInterval(() => {
            scrollIndicator.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateY(0)';
            }, 500);
        }, 2000);
    }
}

// Initialize scroll indicator animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateScrollIndicator, 1000);
});

// Add floating animation to hero background
function addFloatingAnimation() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        let angle = 0;
        setInterval(() => {
            angle += 0.01;
            const x = Math.sin(angle) * 20;
            const y = Math.cos(angle) * 10;
            heroBackground.style.transform = `translate(${x}px, ${y}px) rotate(${angle * 2}deg)`;
        }, 50);
    }
}

// Initialize floating animation
document.addEventListener('DOMContentLoaded', function() {
    addFloatingAnimation();
});

// Add intersection observer for enhanced scroll animations
function addIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.content-card, .ratio-card, .function-card, .formula-card, .application-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize intersection observer
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        addIntersectionObserver();
    }
});

// Add click animation to buttons
function addButtonClickEffects() {
    const buttons = document.querySelectorAll('.btn, .option-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize button click effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addButtonClickEffects, 100);
});

// Add parallax scrolling effect
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', function() {
    addParallaxEffect();
});

// Add typewriter effect to hero title
function addTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let index = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addTypewriterEffect, 500);
});

// Add enhanced hover effects for formula cards
function addFormulaHoverEffects() {
    const formulaCards = document.querySelectorAll('.formula-card');
    
    formulaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const formulaDisplay = this.querySelector('.formula-display');
            if (formulaDisplay) {
                formulaDisplay.style.transform = 'scale(1.05)';
                formulaDisplay.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const formulaDisplay = this.querySelector('.formula-display');
            if (formulaDisplay) {
                formulaDisplay.style.transform = 'scale(1)';
                formulaDisplay.style.boxShadow = 'none';
            }
        });
    });
}

// Initialize formula hover effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addFormulaHoverEffects, 200);
});

// Add golden glow effect to the creator credit
function addCreatorCreditGlow() {
    const creditText = document.querySelector('.credit-text');
    if (creditText) {
        // Add periodic glow pulse
        setInterval(() => {
            creditText.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6)';
            creditText.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
            
            setTimeout(() => {
                creditText.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4)';
                creditText.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
            }, 1000);
        }, 3000);
    }
}

// Initialize creator credit glow effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addCreatorCreditGlow, 2000);
});