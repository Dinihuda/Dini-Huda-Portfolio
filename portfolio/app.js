// Initialize Lucide Icons
lucide.createIcons();

// Restore active theme if active
const activeTheme = localStorage.getItem('activeTheme');
if (activeTheme === 'cyberpunk') {
  document.body.classList.add('cyberpunk-theme');
} else if (activeTheme === 'synthwave') {
  document.body.classList.add('synthwave-theme');
} else if (activeTheme === 'hacker' || localStorage.getItem('hackerTheme') === 'active') {
  document.body.classList.add('hacker-theme');
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Synthesized Sound FX Engine (Web Audio API) ---
  let audioCtx = null;
  let audioEnabled = false;

  const initAudio = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const playSynthSound = (type) => {
    if (!audioEnabled) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;

      if (type === 'keypress') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'enter') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.0, now + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.25);
        });
      } else if (type === 'error') {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);

        osc1.type = 'sawtooth';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(130, now);
        osc2.frequency.setValueAtTime(135, now);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
      } else if (type === 'scan') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(200, now + 0.45);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (err) {
      console.warn("Web Audio API not supported on this device/browser context", err);
    }
  };

  // --- Audio Toggle Event Handler ---
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        initAudio();
        audioBtn.innerHTML = '<i data-lucide="volume-2"></i>';
        audioBtn.title = "Mute Audio Synthesizer";
        playSynthSound('success');
      } else {
        audioBtn.innerHTML = '<i data-lucide="volume-x"></i>';
        audioBtn.title = "Toggle Audio Synthesizer";
      }
      lucide.createIcons();
    });
  }

  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Burger Menu ---
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav');
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    const menuIcon = burger.querySelector('i');
    if (nav.classList.contains('active')) {
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  // --- Scroll-Triggered Reveal Animations ---
  const scrollAnimates = document.querySelectorAll('.scroll-animate');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  scrollAnimates.forEach(el => scrollObserver.observe(el));

  // --- Skills Section Progression Reveal ---
  const skillItems = document.querySelectorAll('.skill-item');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const bar = item.querySelector('.skill-progress');
        const percentage = item.querySelector('.skill-percentage');

        if (bar && !bar.classList.contains('animated')) {
          bar.classList.add('animated');
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;

          if (percentage) {
            const targetVal = parseInt(percentage.getAttribute('data-percent'), 10);
            let currentVal = 0;
            const duration = 1200; // Animation duration in ms
            const stepTime = Math.max(Math.floor(duration / targetVal), 15);
            
            const timer = setInterval(() => {
              currentVal++;
              percentage.textContent = `${currentVal}%`;
              if (currentVal >= targetVal) {
                clearInterval(timer);
              }
            }, stepTime);
          }
        }
      }
    });
  }, { threshold: 0.1 });

  skillItems.forEach(item => skillObserver.observe(item));


  // --- Project Modals and Details ---
  const projectDetails = {
    'book-system': {
      title: 'Library Catalogue System',
      tag: 'C++ / Flat-File',
      status: 'Stable Build',
      description: `
        <h4>Project Briefing</h4>
        <p>A C++ console application built using OOP principles to handle library operations. The system secures access using named accounts and handles book cataloging, loans, and fines without third-party databases.</p>
        
        <h4>Core Implementations</h4>
        <ul>
          <li><strong>Librarian Verification:</strong> Restricts system administrative privileges behind user verification protocols.</li>
          <li><strong>Flat-File Database CRUD:</strong> Persistently saves, searches, updates, and deletes book catalog profiles inside local text sheets.</li>
          <li><strong>Loan Limit Enforcer:</strong> Regulates account activity and enforces strict borrowing caps (limit: 5 books per user).</li>
          <li><strong>Automated Fine Calculator:</strong> Tracks borrowing deadlines and applies automated tiered fees for late returns.</li>
        </ul>

        <h4>About Project</h4>
        <p>A C++ console-based Library Catalogue System designed to manage book inventories, borrowing records, returns, and overdue payments. The project demonstrates file handling, data management, and problem-solving skills through a practical library management solution.</p>

        <h4>Project Overview</h4>
        <p>The Library Catalogue System is a console-based application developed in C++ to help librarians manage library operations efficiently. The system provides features for book catalogue management, book loan processing, book return handling, and overdue payment management. It uses file handling to store book records and allows librarians to perform daily library tasks through a menu-driven interface.</p>
        <p>The project was designed to demonstrate the application of fundamental programming concepts such as functions, arrays, vectors, file handling, conditional statements, loops, and data management in C++. It also incorporates date validation for overdue book tracking and fine calculation.</p>

        <h4>What I Did</h4>
        <ul>
          <li>Implemented overdue checking functionality using the system's current date and due date comparison.</li>
          <li>Developed the Overdue Payment Management module to calculate fines based on the number of overdue days.</li>
          <li>Applied C++ concepts including functions, vectors, arrays, file streams, loops, conditional statements, and date handling.</li>
        </ul>

        <h4>Technologies Used</h4>
        <ul>
          <li><strong>Language:</strong> C++</li>
          <li><strong>Concepts:</strong> File Handling, Functions, Arrays, Vectors, Date Processing</li>
          <li><strong>Storage:</strong> Text File Database (books.txt)</li>
          <li><strong>Development Type:</strong> Console-Based Application</li>
        </ul>

        <h4>Skills Demonstrated</h4>
        <ul>
          <li>Object-Oriented & Procedural Programming</li>
          <li>Data Management</li>
          <li>File Processing</li>
          <li>Problem Solving</li>
          <li>Software Design</li>
          <li>Input Validation</li>
          <li>Menu-Driven System Development</li>
        </ul>
      `
    },
    'multimedia-system': {
      title: 'The Mystery of Robo-x in Fruitlandia',
      tag: 'Java / AR Features',
      status: 'Stable Build',
      description: `
        <h4>Project Briefing</h4>
        <p>An interactive digital children's storybook tracking the narrative of "The Fruit Vanguard" as they resolve conflicts in a magical village. The system bridges literature and technology to teach ethical values.</p>
        
        <h4>Core Implementations</h4>
        <ul>
          <li><strong>Interactive Storytelling:</strong> Provides decision paths and branches that change story developments and moral outcomes.</li>
          <li><strong>Augmented Reality Checkpoints:</strong> Integrates custom scan-to-unlock QR markers that load AR overlay visual scenes and music videos.</li>
          <li><strong>Ethical Moral Scenarios:</strong> Teaches cybersecurity best practices (such as verification, teamwork, and avoiding blind trust) through engaging narrative challenges.</li>
        </ul>

        <h4>Multimedia Project Integration: "The Mystery of Robo-X in Fruitlandia"</h4>
        <p>Instead of acting merely as a traditional storybook, this project is a hybrid Interactive Multimedia Convergence Asset. It blends physical print media with digital assets by strategically executing the core pillars of multimedia development:</p>
        
        <h5>1. Augmented Reality (AR) & Interactivity</h5>
        <ul>
          <li><strong>Media Convergence:</strong> The project establishes physical-to-digital interactivity by embedding interactive QR code layouts directly into the structural asset pages.</li>
          <li><strong>Immersive Experience Engine:</strong> Scanning the integrated QR triggers an external AR Video Clip and Music Video ecosystem. This integration transitions flat, static reading into a dynamic sensory experience that elevates audience engagement.</li>
        </ul>

        <h5>2. Visual Production & Computer Graphics (Graphics & Animation)</h5>
        <ul>
          <li><strong>Visual Communication Design:</strong> Every chapter leverages high-resolution digital illustrations designed using multimedia production suites (such as Canva) to move the plot forward fluidly.</li>
          <li><strong>Emotional Color Theory & Atmospheric Staging:</strong> The project balances visual aesthetics to alter narrative mood. Bright, high-saturation 3D fruit designs emphasize the safety of Fruitlandia, while dark, low-exposure mechanical backdrops, synthetic green chemical barrels, and smoke effects evoke mystery, tension, and systemic danger.</li>
        </ul>

        <h5>3. Sound Design & Audio Integration</h5>
        <ul>
          <li><strong>Multi-Sensory Auditory Layers:</strong> The integration of an AR music video introduces customized rhythmic audio and backing tracks, ensuring young learners retain information through both visual and auditory processing.</li>
          <li><strong>Textual Onomatopoeia:</strong> Key plot triggers mimic sound design directly within the layout (e.g., using stylized textual indicators like "BOOM!... hisss..." to alert readers to the machine's disruptive arrival).</li>
        </ul>

        <h5>4. Typography, Re-imagined Layout, & Asset Curation</h5>
        <ul>
          <li><strong>User-Centric Typography:</strong> The digital storybook applies large, clean, sans-serif font choices meticulously arranged across a grid layout optimized specifically for children's UI readability metrics.</li>
          <li><strong>Focal Emphasis Assets:</strong> High-contrast warning icons (such as digital hazard signs) are deliberately placed next to critical text fragments to direct the viewer’s eye path directly to core safety concepts.</li>
        </ul>
      `
    },
    'record-manager': {
      title: 'Students Record Manager',
      tag: 'C++ / Linked List',
      status: 'Stable Build',
      description: `
        <h4>Project Overview</h4>
        <p>The Student Record Manager System is a console-based application developed using C++ to manage student information efficiently. The system uses a singly linked list data structure to store and organize student records dynamically. It allows users to perform essential record management operations such as adding, deleting, searching, and displaying student information.</p>
        <p>The project was developed to strengthen understanding of data structures, dynamic memory allocation, and linked list implementation in C++. It also demonstrates how data can be managed without relying on arrays or external databases.</p>
 
        <h4>Features</h4>
        <ul>
          <li>Add new student records</li>
          <li>Delete existing student records</li>
          <li>Search for students by Student ID</li>
          <li>Display all student records in a formatted table</li>
          <li>Validate duplicate Student IDs</li>
          <li>Validate GPA input within the range of 0.0 to 4.0</li>
          <li>Dynamic memory management using linked lists</li>
        </ul>
 
        <h4>Technologies Used</h4>
        <ul>
          <li>C++</li>
          <li>Object-Oriented Programming Concepts</li>
          <li>Singly Linked List Data Structure</li>
          <li>Dynamic Memory Allocation</li>
        </ul>
 
        <h4>My Contributions</h4>
        <ul>
          <li>Assisting in the implementation of student management features.</li>
          <li>Helping develop and test linked list operations.</li>
          <li>Supporting input validation and debugging processes.</li>
          <li>Collaborating with team members during development and presentation preparation.</li>
          <li>Explaining the system design and linked list structure during the project presentation.</li>
        </ul>
 
        <h4>Learning Outcomes</h4>
        <ul>
          <li>Linked list implementation</li>
          <li>Dynamic memory management in C++</li>
          <li>Data validation techniques</li>
          <li>Problem-solving and debugging</li>
          <li>Developing menu-driven console applications</li>
          <li>Managing structured data efficiently</li>
        </ul>
      `
    },
    'travel-mate': {
      title: 'Travel Mate: Hand-Crafting the UI/UX for an All-in-One Mobility App',
      tag: 'UI/UX / Wireframe',
      status: 'Conceptual Design',
      description: `
        <h4>Project Briefing</h4>
        <p>Travel Mate is a mobile application concept born out of a human-computer interaction design initiative aimed at modernizing how users interact with digital transit ecosystems. The core goal of the project was to research, conceptualize, and design a highly intuitive, user-centered interface that addresses the fragmentation within the modern travel and transportation industries. Developed through a collaborative group dynamic, this project serves as a comprehensive case study in balancing complex database structures with a clean, low-friction user experience.</p>
        
        <h4>Project Overview</h4>
        <p>TravelMate was built around a real travel pain point: switching between separate apps to book a ride, a train, a bus, or an attraction ticket. The wireframes map out a single connected experience instead, including:</p>
        <ul>
          <li><strong>Onboarding & authentication:</strong> Login, guest access, and account creation via Google, Facebook, and Apple.</li>
          <li><strong>Home & discovery:</strong> A search-first home screen with popular routes and recent bookings.</li>
          <li><strong>Four booking flows:</strong> Ride-hailing, train, bus, and attraction tickets, each with its own selection, passenger details, and payment steps.</li>
          <li><strong>Compare options:</strong> A side-by-side feature for evaluating transport choices by price, duration, and departure time before booking.</li>
          <li><strong>Booking lifecycle management:</strong> Upcoming, completed, and cancelled bookings, plus a full cancellation and refund flow.</li>
          <li><strong>Profile & wallet:</strong> Account settings, saved payment methods, travel points, and an in-app travel wallet.</li>
        </ul>
        <p>Working in a team of three, the project moved from user flow mapping to hand-drawn wireframes to a structured presentation of the end-to-end experience.</p>
 
        <h4>What I Did</h4>
        <p>I was responsible for the wireframing — sketching every screen in the prototype by hand, from the home page through all four booking flows to the profile and booking management screens. That meant:</p>
        <ul>
          <li>Sketching each screen layout and translating user flows into concrete UI structure.</li>
          <li>Designing and annotating interactive elements (buttons, dropdowns, navigation states) so the logic of each flow was clear.</li>
          <li>Mapping multi-step processes like ride booking and ticket comparison into a coherent screen-to-screen journey, including back navigation and confirmation states.</li>
          <li>Keeping visual consistency across four very different booking types (ride, train, bus, attraction) so the app still felt like one product.</li>
        </ul>
        <p>This was my first time hand-sketching a full low-fidelity prototype at this scale, and it sharpened how I think about translating a user flow into an actual screen sequence before any visual design happens.</p>
      `
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalStatus = document.getElementById('modal-status');
  const modalText = document.getElementById('modal-text');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];
      if (data) {
        modalTitle.textContent = data.title;
        modalTag.textContent = data.tag;
        modalStatus.textContent = data.status;
        modalText.innerHTML = data.description;
        modal.classList.add('active');
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // --- Project Tag Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'flex';
          // Force reflow and re-fade
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });

  // --- Interactive Terminal Simulation ---
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.getElementById('terminal-body');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getBanner = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    
    return `
  _  _ 
 ( \\/ )  ACCESS: DINI_PORTFOLIO
  \\  /   TIME: ${timeString} ${dateString}
   \\/    STATUS: ONLINE
`;
  };

  // --- CTF Challenge Progress Tracker ---
  const trackerEl = document.getElementById('ctf-tracker');
  const totalFlags = 4;
  
  function getSolvedFlags() {
    try {
      const solved = localStorage.getItem('ctfSolvedFlags');
      return solved ? JSON.parse(solved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSolvedFlag(flag) {
    const solved = getSolvedFlags();
    if (!solved.includes(flag)) {
      solved.push(flag);
      localStorage.setItem('ctfSolvedFlags', JSON.stringify(solved));
      updateTrackerDisplay();
      triggerTrackerSuccessGlow();
      
      // Update theme menu dropdown states (if newly unlocked)
      if (typeof renderThemeMenu === 'function') renderThemeMenu();
      
      // Show success Toast notification
      let challengeTitle = 'Operational Mission';
      if (flag === 'FLAG{D1NI_HUDA_SEC_OPS_2026}') challengeTitle = 'Firewall Bypass';
      if (flag === 'FLAG{SPRING_EXPLOIT_ROOT_2026}') challengeTitle = 'Spring4Shell RCE';
      if (flag === 'FLAG{SSH_DICTIONARY_BREACH}') challengeTitle = 'SSH Dictionary Attack';
      if (flag === 'FLAG{LOG_ANALYSIS_SECURE_2026}') challengeTitle = 'Log Intrusion Analysis';
      
      if (typeof showToast === 'function') {
        showToast('Mission Cleared', `Successfully decrypted and solved flag for: ${challengeTitle}`, 'success');
      }
    }
  }

  function updateTrackerDisplay() {
    if (trackerEl) {
      const solvedCount = getSolvedFlags().length;
      trackerEl.textContent = `(${solvedCount}/${totalFlags} Solved)`;
      if (solvedCount === totalFlags) {
        trackerEl.style.color = 'var(--success)';
      } else {
        trackerEl.style.color = 'var(--accent-primary)';
      }
    }
  }

  function triggerTrackerSuccessGlow() {
    if (trackerEl) {
      trackerEl.style.textShadow = '0 0 15px var(--accent-primary)';
      trackerEl.style.transform = 'scale(1.2)';
      trackerEl.style.transition = 'transform 0.3s ease, text-shadow 0.3s ease';
      setTimeout(() => {
        trackerEl.style.transform = 'scale(1)';
        trackerEl.style.textShadow = 'none';
      }, 1000);
    }
  }

  // Initialize tracker on page load
  updateTrackerDisplay();

  const commands = {
    banner: () => getBanner(),
    help: () => `AVAILABLE OPERATIONAL COMMANDS:

  [SYSTEM]
    banner    - Displays ASCII firewall seal
    about     - Explains active student credentials
    skills    - Lists catalog of current security skills
    projects  - Summarizes current deployments
    contact   - Displays secure mail and social links
    github    - Opens github profile in new tab
    reset     - Resets active visual themes and CTF logs
    clear     - Wipes shell screen buffer
    whoami    - Displays active terminal identity shell
    history   - Lists history log of current shell session
    neofetch  - Displays system parameters and ASCII art
    theme     - Switches terminal themes: theme <default|hacker|synthwave|cyberpunk>
    matrix    - Customizes matrix drops: matrix color <color> | matrix char <set>

  [SIMULATION & CTF]
    ctf       - Starts the interactive flag solver
    submit    - Solves CTF flag: submit <flag_value>
    scan      - Simulates Nmap vulnerability scanner: scan <ip>
    crack     - Runs brute force simulation: crack <tomcat | ssh>
    logs      - Dumps security log files containing hidden hashes
    decode    - Base64 decryption utility: decode <encoded_hash>
    ls        - Lists virtual directory files
    cat       - Prints file contents: cat <filename>
    inbox     - Decrypts secure transmission messages (unlocked with 4/4 solved CTF)`,
    about: () => `OPERATION DETAILS:
Pursuing specialization in Information Security. 
Focusing on threat vectors modeling, network forensic analysis, and software defenses implementation. 
Currently seeking cyber analyst roles starting Summer 2026.`,
    skills: () => `CURRENT DEFENSIVE INVENTORY:
  - Penetration Testing  [|||||||||| ] (85%)
  - Web Exploitation     [||||||||   ] (80%)
  - Network Forensics    [|||||||    ] (75%)
  - Automation Python    [||||||||   ] (80%)
  - OS Hardening (Linux) [|||||||||| ] (85%)`,
    projects: () => `DEPLOYS LOGGED:
  - Auto-Nmap Scanner [Status: Active]
  - PyShield Encrypted TCP Client [Status: Stable]
  - HTB CTF Writeups [Status: Archival]`,
    contact: () => `ESTABLISHING CALLBACK ENDPOINTS:
  - Phone: 011-37404350
  - Email: diniehud@gmail.com
  - LinkedIn: https://www.linkedin.com/in/dini-huda-a03278415/`,
    github: () => {
      window.open('https://github.com/Dinihuda', '_blank');
      return "Attempting routing hook to github.com/Dinihuda...";
    },
    whoami: () => `guest@sec-ops-terminal (Simulation Shell Context)`,
    history: () => {
      if (cmdHistory.length === 0) return `No commands in history.`;
      return cmdHistory.map((cmd, idx) => `  ${idx + 1}  ${cmd}`).join('\n');
    },
    neofetch: () => {
      let themeName = 'Default (Champagne Sand)';
      if (document.body.classList.contains('hacker-theme')) themeName = 'Hacker (Matrix Green)';
      if (document.body.classList.contains('cyberpunk-theme')) themeName = 'Cyberpunk (Neon Magenta)';
      if (document.body.classList.contains('synthwave-theme')) themeName = 'Synthwave (Sunset Neon)';
      
      return `      /\\          guest@sec-ops-srv
     /  \\         -----------------
    /    \\        OS: Ubuntu 22.04 LTS x86_64
   /|    |\\       Host: SecOps-Portfolio-Sim V2.0
  /_|____|_\\      Kernel: Linux 5.15.0-generic
    |    |        Uptime: 2 hours, 14 mins
    |  * |        Shell: bash 5.1.16
    |____|        Theme: ${themeName}
                  Terminal: Simulated SecOps Console
                  CPU: Intel Core i7-12700H (14) @ 4.700GHz
                  Memory: 4096MiB / 16384MiB`;
    },
    theme: (themeName) => {
      if (!themeName) {
        let current = 'default';
        if (document.body.classList.contains('hacker-theme')) current = 'hacker';
        if (document.body.classList.contains('cyberpunk-theme')) current = 'cyberpunk';
        if (document.body.classList.contains('synthwave-theme')) current = 'synthwave';
        return `Usage: theme <default | hacker | synthwave | cyberpunk>
Current theme: ${current}`;
      }
      const t = themeName.trim().toLowerCase();
      if (t === 'default') {
        localStorage.setItem('activeTheme', 'default');
        localStorage.removeItem('hackerTheme');
        document.body.classList.remove('hacker-theme', 'cyberpunk-theme', 'synthwave-theme');
        if (typeof checkMatrixState === 'function') checkMatrixState();
        playSynthSound('success');
        if (typeof renderThemeMenu === 'function') renderThemeMenu();
        return `[+] Visual theme set to: DEFAULT`;
      } else if (t === 'hacker') {
        const solved = getSolvedFlags();
        if (!solved.includes('FLAG{D1NI_HUDA_SEC_OPS_2026}')) {
          playSynthSound('error');
          return `[-] Access Denied: Hacker theme is classified.
[-] Unlock by solving the Firewall Bypass CTF challenge (FLAG{D1NI_HUDA_SEC_OPS_2026}).`;
        }
        localStorage.setItem('activeTheme', 'hacker');
        localStorage.setItem('hackerTheme', 'active');
        document.body.classList.remove('cyberpunk-theme', 'synthwave-theme');
        document.body.classList.add('hacker-theme');
        if (typeof checkMatrixState === 'function') checkMatrixState();
        playSynthSound('success');
        if (typeof renderThemeMenu === 'function') renderThemeMenu();
        return `[+] Visual theme set to: HACKER (Matrix Green)`;
      } else if (t === 'synthwave') {
        const solved = getSolvedFlags();
        if (solved.length < 2) {
          playSynthSound('error');
          return `[-] Access Denied: Synthwave theme is classified.
[-] Unlock by completing at least 2 CTF missions (2/4 Solved).`;
        }
        localStorage.setItem('activeTheme', 'synthwave');
        document.body.classList.remove('hacker-theme', 'cyberpunk-theme');
        document.body.classList.add('synthwave-theme');
        if (typeof checkMatrixState === 'function') checkMatrixState();
        playSynthSound('success');
        if (typeof renderThemeMenu === 'function') renderThemeMenu();
        return `[+] Visual theme set to: SYNTHWAVE (Sunset Neon Pink & Orange)`;
      } else if (t === 'cyberpunk') {
        const solved = getSolvedFlags();
        if (solved.length < totalFlags) {
          playSynthSound('error');
          return `[-] Access Denied: Cyberpunk theme is highly classified.
[-] Complete all CTF operations (4/4 Solved) to authorize Cyberpunk theme integration.`;
        }
        localStorage.setItem('activeTheme', 'cyberpunk');
        document.body.classList.remove('hacker-theme', 'synthwave-theme');
        document.body.classList.add('cyberpunk-theme');
        if (typeof checkMatrixState === 'function') checkMatrixState();
        playSynthSound('success');
        if (typeof renderThemeMenu === 'function') renderThemeMenu();
        return `[+] Visual theme set to: CYBERPUNK (Neon Magenta & Cyan)`;
      }
      playSynthSound('error');
      return `[-] theme: '${themeName}' not recognized. Use 'theme <default | hacker | synthwave | cyberpunk>'.`;
    },
    matrix: (arg) => {
      if (!arg) {
        return `Usage: matrix color <green | pink | blue | orange | gold | reset>
       matrix char <default | binary | hex | runes>`;
      }
      const parts = arg.trim().toLowerCase().split(/\s+/);
      const subcmd = parts[0];
      const val = parts[1];

      if (subcmd === 'color') {
        if (!val) return `Usage: matrix color <green | pink | blue | orange | gold | reset>`;
        playSynthSound('success');
        if (val === 'reset') {
          customMatrixColor = null;
          return `[+] Matrix rain color reset to theme default.`;
        } else if (val === 'green') {
          customMatrixColor = '#39ff14';
        } else if (val === 'pink') {
          customMatrixColor = '#ff007f';
        } else if (val === 'blue') {
          customMatrixColor = '#00f0ff';
        } else if (val === 'orange') {
          customMatrixColor = '#ff9e00';
        } else if (val === 'gold') {
          customMatrixColor = '#ffd700';
        } else {
          playSynthSound('error');
          return `[-] matrix: color '${val}' not recognized.`;
        }
        return `[+] Matrix rain color override set to: ${val.toUpperCase()}`;
      } else if (subcmd === 'char' || subcmd === 'chars') {
        if (!val) return `Usage: matrix char <default | binary | hex | runes>`;
        if (['default', 'binary', 'hex', 'runes'].includes(val)) {
          customMatrixChars = val;
          playSynthSound('success');
          return `[+] Matrix rain character set changed to: ${val.toUpperCase()}`;
        }
        playSynthSound('error');
        return `[-] matrix: character set '${val}' not recognized.`;
      }
      playSynthSound('error');
      return `[-] matrix: sub-command '${subcmd}' not recognized.`;
    },
    ls: () => `Directory of guest@sec-ops-srv:/home/guest
   
  drwxr-xr-x   2 guest  staff   64B Jun 17 10:00 projects
  -rw-r--r--   1 guest  staff  258B Jun 17 10:00 about.txt
  -rw-r--r--   1 guest  staff  420B Jun 17 10:00 skills.md
  -rwx------   1 guest  staff  2.1K Jun 17 10:00 transmissions.bin`,
    dir: () => commands.ls(),
    cat: (filename) => {
      if (!filename) return `Usage: cat <filename>`;
      const file = filename.trim().toLowerCase();
      if (file === 'about.txt') {
        return commands.about();
      } else if (file === 'skills.md') {
        return commands.skills();
      } else if (file === 'projects' || file === 'projects/') {
        return `cat: projects/: Is a directory`;
      } else if (file === 'transmissions.bin') {
        return commands.inbox();
      }
      return `cat: ${filename}: No such file or directory`;
    },
    type: (filename) => commands.cat(filename),
    inbox: () => {
      const solved = getSolvedFlags();
      if (solved.length < totalFlags) {
        return `[-] ACCESS DENIED: Encryption logs are locked.
[-] Complete all CTF missions (4/4) or submit authorization keys to retrieve data packets.`;
      }
      
      const msgsJSON = localStorage.getItem('transmittedMessages');
      if (!msgsJSON) {
        return `=== SECURE TRANSMISSION PACKET RETRIEVAL ===
[i] Mailbox empty. No packets registered.`;
      }
      
      try {
        const msgs = JSON.parse(msgsJSON);
        if (msgs.length === 0) {
          return `=== SECURE TRANSMISSION PACKET RETRIEVAL ===
[i] Mailbox empty. No packets registered.`;
        }
        
        let output = `=== SECURE TRANSMISSION PACKET RETRIEVAL ===
[+] ${msgs.length} Decrypted packets resolved from local heap:\n\n`;
        
        msgs.forEach((m, idx) => {
          const date = new Date(m.timestamp).toLocaleString();
          output += `[PACKET #${idx + 1}] Sent on ${date}
  From:    ${m.name} <${m.email}>
  Payload: "${m.message}"
------------------------------------------------------\n`;
        });
        
        return output;
      } catch (e) {
        return `[-] Decryption Error: Payload packets corrupted in session heap.`;
      }
    },
    ctf: () => `=== CLASSIFIED OPERATIONS SYSTEM ===
Vulnerability research indicates a hidden flag (FLAG{...}) resides within this site's deployment.
Search the transmission stream (source code) or logs to locate it.
Submit your findings using:
  submit <flag_value>`,
    submit: (flagVal) => {
      if (!flagVal) {
        return `Usage: submit <flag_value>`;
      }
      const val = flagVal.trim().toUpperCase();
      if (val === 'FLAG{D1NI_HUDA_SEC_OPS_2026}') {
        localStorage.setItem('hackerTheme', 'active');
        localStorage.setItem('activeTheme', 'hacker');
        document.body.classList.add('hacker-theme');
        saveSolvedFlag('FLAG{D1NI_HUDA_SEC_OPS_2026}');
        if (typeof checkMatrixState === 'function') checkMatrixState();
        playSynthSound('success');
        return `[+] flag validation: SUCCESS!
[+] decryption key match: VERIFIED.
[+] unlocking matrix overlay theme...
Welcome to the classified terminal. Matrix hacker theme is now ACTIVE.`;
      } else if (val === 'FLAG{SPRING_EXPLOIT_ROOT_2026}') {
        saveSolvedFlag('FLAG{SPRING_EXPLOIT_ROOT_2026}');
        playSynthSound('success');
        return `[+] flag validation: SUCCESS!
[+] Vulnerability exploitation: VERIFIED.
[+] Reward: Access Granted. You have completed the Tomcat exploit path.`;
      } else if (val === 'FLAG{SSH_DICTIONARY_BREACH}') {
        saveSolvedFlag('FLAG{SSH_DICTIONARY_BREACH}');
        playSynthSound('success');
        return `[+] flag validation: SUCCESS!
[+] Credential Brute-force: VERIFIED.
[+] Reward: Access Granted. You have completed the SSH brute force path.`;
      } else if (val === 'FLAG{LOG_ANALYSIS_SECURE_2026}') {
        saveSolvedFlag('FLAG{LOG_ANALYSIS_SECURE_2026}');
        playSynthSound('success');
        return `[+] flag validation: SUCCESS!
[+] Log Intrusion Analysis: VERIFIED.
[+] Reward: Access Granted. You have completed the log parsing path.`;
      }
      playSynthSound('error');
      return `[-] flag validation: FAILED.
[-] key mismatch. Try scanning the source code payload or completing terminal tasks.`;
    },
    solve: (flagVal) => commands.submit(flagVal),
    scan: async (ip) => {
      const targetIp = ip || '192.168.37.104';
      playSynthSound('scan');
      terminalOutput.textContent += `[i] Initializing remote sweep scanning engine...\n`;
      terminalBody.scrollTop = terminalBody.scrollHeight;
      await sleep(600);
      terminalOutput.textContent += `[i] Target node recognized: ${targetIp}\n`;
      terminalOutput.textContent += `[i] Pinging host and resolving routes...\n`;
      terminalBody.scrollTop = terminalBody.scrollHeight;
      await sleep(800);
      terminalOutput.textContent += `[+] Node active (latency: 14ms). Beginning SYN stealth port mapping...\n`;
      terminalBody.scrollTop = terminalBody.scrollHeight;
      
      const stages = [
        { progress: 15, bar: '===>                  ', status: 'SYN scan active' },
        { progress: 50, bar: '==========>           ', status: 'Enumerating open ports' },
        { progress: 85, bar: '=================>    ', status: 'Banner grabbing services' },
        { progress: 100, bar: '======================', status: 'Scan complete' }
      ];

      for (const stage of stages) {
        await sleep(700);
        playSynthSound('keypress');
        terminalOutput.textContent += `[Progress: ${stage.progress}%] [${stage.bar}] - ${stage.status}\n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
      
      await sleep(500);
      playSynthSound('success');
      return `\nSCAN METADATA SUMMARY:
PORT      STATE   SERVICE       SERVICE VERSION
22/tcp    OPEN    ssh           OpenSSH 8.9p1 (Ubuntu)
80/tcp    OPEN    http          Apache httpd 2.4.52
8080/tcp  OPEN    http-alt      Tomcat 9.0.58 (Spring4Shell Vulnerable)

[!] CRITICAL: Tomcat service on port 8080 is vulnerable to Spring4Shell (CVE-2022-22965).
[i] Operational Suggestion: Execute 'crack tomcat' or 'crack ssh' to commence breach payload execution.`;
    },
    crack: async (target) => {
      const type = (target || 'tomcat').toLowerCase();
      if (type !== 'tomcat' && type !== 'ssh') {
        playSynthSound('error');
        return `[-] crack target: '${target}' not resolved. Use 'crack tomcat' or 'crack ssh'.`;
      }
      
      if (type === 'tomcat') {
        playSynthSound('scan');
        terminalOutput.textContent += `[i] Target exploit pipeline: Spring4Shell (CVE-2022-22965)\n`;
        terminalOutput.textContent += `[i] Setting up local payload handlers and socket routes...\n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        await sleep(800);
        terminalOutput.textContent += `[+] Payload staging: SUCCESS (Type: Reverse TCP shell)\n`;
        terminalOutput.textContent += `[i] Executing remote code exploit request...\n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        
        for (let i = 1; i <= 3; i++) {
          await sleep(600);
          playSynthSound('keypress');
          terminalOutput.textContent += `[+] Sending exploit payload chunk ${i}/3...\n`;
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
        
        await sleep(800);
        playSynthSound('success');
        terminalOutput.textContent += `[+] Exploit request verified. Opening shell connection on port 4444...\n`;
        terminalOutput.textContent += `[+] Shell session #1 opened! System Access: tomcat@sec-ops-srv:/$\n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        await sleep(1000);
        
        terminalOutput.textContent += `\ntomcat@sec-ops-srv:/$ whoami\n`;
        await sleep(400);
        playSynthSound('keypress');
        terminalOutput.textContent += `tomcat\n`;
        terminalOutput.textContent += `tomcat@sec-ops-srv:/$ cat /var/secret/flag.txt\n`;
        await sleep(500);
        playSynthSound('success');
        
        return `FLAG{SPRING_EXPLOIT_ROOT_2026}
[+] Decryption Flag Retrieved! Submit this flag to the terminal:
    submit FLAG{SPRING_EXPLOIT_ROOT_2026}`;
      } else {
        playSynthSound('scan');
        terminalOutput.textContent += `[i] Target exploit pipeline: SSH Brute-Force Dictionary Attack\n`;
        terminalOutput.textContent += `[i] Loading wordlists (rockyou.txt - 14.3M candidates)...\n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        await sleep(800);
        terminalOutput.textContent += `[i] Starting concurrent thread dictionary mapping on port 22...\n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        
        const credentials = [
          { user: 'admin', pass: 'password' },
          { user: 'root', pass: '123456' },
          { user: 'security', pass: 'secops' },
          { user: 'dini', pass: 'sec-ops-2026' }
        ];

        for (const cred of credentials) {
          await sleep(600);
          const success = cred.user === 'dini';
          playSynthSound(success ? 'success' : 'error');
          terminalOutput.textContent += `[Testing] User: ${cred.user.padEnd(8)} Pass: ${cred.pass.padEnd(14)} -> ${success ? 'SUCCESS' : 'FAILED'}\n`;
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
        
        await sleep(500);
        terminalOutput.textContent += `[+] SSH Credential MATCHED!\n`;
        terminalOutput.textContent += `[i] Logging in as dini@sec-ops-srv...\n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        await sleep(800);
        playSynthSound('success');
        return `Welcome to Ubuntu 22.04 LTS (GNU/Linux 5.15.0-41-generic)
dini@sec-ops-srv:~$ cat user.txt
FLAG{SSH_DICTIONARY_BREACH}
Submit this flag using: submit FLAG{SSH_DICTIONARY_BREACH}`;
      }
    },
    logs: () => {
      return `=== INTRUSION DETECTION SYSTEM ACTIVE ALERTS ===
TIMESTAMP             ALERT NAME                  THREAT LEVEL   METADATA
09-Jun-2026 21:04:12  SSH Brute force detected    MEDIUM         Src: 182.21.32.4
09-Jun-2026 21:12:45  Unauthorized binary upload   HIGH           Payload hash: c2VjLXNjcmlwdHM=
09-Jun-2026 22:01:05  Classified message payload  INFO           Hash payload: RkxBR3tMT0dfQU5BTFlTSVNfU0VDVVJFXzIwMjZ9

[i] Found encrypted base64 signature in logs payload. 
[i] Hint: Use "decode <payload_hash>" to extract information.`;
    },
    decode: (hashVal) => {
      if (!hashVal) {
        return `Usage: decode <base64_string>`;
      }
      try {
        const decoded = atob(hashVal.trim());
        return `[+] Decoding Base64 Stream: SUCCESS
[+] Output Plaintext: ${decoded}`;
      } catch (e) {
        return `[-] Decoding failed: Invalid base64 sequence.`;
      }
    },
    reset: () => {
      localStorage.removeItem('hackerTheme');
      localStorage.removeItem('activeTheme');
      localStorage.removeItem('ctfSolvedFlags');
      localStorage.removeItem('transmittedMessages');
      document.body.classList.remove('hacker-theme', 'cyberpunk-theme', 'synthwave-theme');
      updateTrackerDisplay();
      if (typeof checkMatrixState === 'function') checkMatrixState();
      if (typeof renderThemeMenu === 'function') renderThemeMenu();
      return `[+] Resetting terminal visual theme, message inbox, and CTF progress to default...`;
    },
    clear: () => {
      terminalOutput.textContent = '';
      return '';
    }
  };

  // Typing animation function
  const typeText = async (text, speed = 25) => {
    for (let i = 0; i < text.length; i++) {
      terminalOutput.textContent += text[i];
      terminalBody.scrollTop = terminalBody.scrollHeight;
      await sleep(speed);
    }
  };

  // Run banner and boot typing animation
  const initTerminal = async () => {
    terminalInput.disabled = true;
    terminalOutput.textContent = getBanner() + "\n";
    await typeText("Initializing SecOps kernel loaded successfully...\n", 15);
    await typeText("Type 'help' to check available operational commands.\n\n", 15);
    terminalInput.disabled = false;
    terminalInput.focus();
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };
  initTerminal();

  // Command history states
  const cmdHistory = [];
  let historyIndex = -1;
  let isExecuting = false;

  terminalInput.addEventListener('keydown', async (e) => {
    // Play click sound on typing normal characters
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      playSynthSound('keypress');
    }

    if (isExecuting) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
      return;
    }
    
    if (e.key === 'Enter') {
      playSynthSound('enter');
      const rawInput = terminalInput.value;
      const parts = rawInput.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');
      
      terminalInput.value = '';
      
      if (cmd.length > 0) {
        if (cmd !== 'clear') {
          terminalOutput.textContent += `dini-huda:~$ ${rawInput}\n`;
        }

        // Add to history
        if (rawInput.trim() !== '') {
          if (cmdHistory.length === 0 || cmdHistory[cmdHistory.length - 1] !== rawInput) {
            cmdHistory.push(rawInput);
          }
        }
        historyIndex = -1;

        if (commands[cmd]) {
          isExecuting = true;
          terminalInput.disabled = true;
          try {
            const reply = await commands[cmd](arg);
            if (cmd !== 'clear') {
              if (reply && reply.length > 0) {
                terminalOutput.textContent += `${reply}\n\n`;
              } else {
                terminalOutput.textContent += `\n`;
              }
            }
          } catch (err) {
            terminalOutput.textContent += `Error executing command: ${err.message}\n\n`;
          } finally {
            isExecuting = false;
            terminalInput.disabled = false;
            terminalInput.focus();
            terminalBody.scrollTop = terminalBody.scrollHeight;
          }
        } else {
          terminalOutput.textContent += `dini-huda: command not found: '${rawInput}'. Type 'help' for directory of queries.\n\n`;
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
      } else {
        terminalOutput.textContent += `dini-huda:~$ \n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      if (historyIndex === -1) {
        historyIndex = cmdHistory.length - 1;
      } else if (historyIndex > 0) {
        historyIndex--;
      }
      terminalInput.value = cmdHistory[historyIndex];
      setTimeout(() => {
        terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
      }, 0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < cmdHistory.length - 1) {
        historyIndex++;
        terminalInput.value = cmdHistory[historyIndex];
      } else {
        historyIndex = -1;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentVal = terminalInput.value.trim().toLowerCase();
      if (currentVal.length === 0) return;
      
      const matchCandidates = Object.keys(commands).filter(cmd => cmd.startsWith(currentVal));
      if (matchCandidates.length === 1) {
        terminalInput.value = matchCandidates[0];
      } else if (matchCandidates.length > 1) {
        terminalOutput.textContent += `dini-huda:~$ ${terminalInput.value}\n`;
        terminalOutput.textContent += `${matchCandidates.join('   ')}\n\n`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }
  });

  // Keep focus on terminal input when clicking terminal body
  terminalBody.addEventListener('click', () => {
    if (!isExecuting) {
      terminalInput.focus();
    }
  });

  // --- Secure Form Simulation & Interactive Console Overlay ---
  const secureForm = document.getElementById('secure-form');
  const transmissionConsole = document.getElementById('transmission-console');
  const transmissionLogs = document.getElementById('transmission-logs');

  if (secureForm && transmissionConsole && transmissionLogs) {
    secureForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById('form-name').value;
      const emailVal = document.getElementById('form-email').value;
      const msgVal = document.getElementById('form-message').value;

      // Disable inputs
      const controls = secureForm.querySelectorAll('.form-control');
      controls.forEach(ctrl => ctrl.disabled = true);

      // Open console overlay
      transmissionConsole.classList.add('active');
      transmissionLogs.innerHTML = '';

      const log = (text, type = 'default') => {
        const line = document.createElement('p');
        line.className = `console-log-line ${type}`;
        line.textContent = text;
        transmissionLogs.appendChild(line);
        transmissionLogs.scrollTop = transmissionLogs.scrollHeight;
      };

      const makeRandomHex = (len) => {
        let hex = '';
        const chars = '0123456789ABCDEF';
        for (let i = 0; i < len; i++) {
          hex += chars[Math.floor(Math.random() * 16)];
        }
        return hex;
      };

      try {
        playSynthSound('scan');
        log(`[i] INITIALIZING CRYPTOGRAPHIC HANDSHAKE ENGINE...`, 'info');
        await sleep(600);
        log(`[i] Generating ephemeral RSA key pair (4096-bit)...`, 'info');
        await sleep(800);
        log(`[+] Keypair successfully registered. Fingerprint: SHA256:${makeRandomHex(16)}...`, 'success');
        playSynthSound('keypress');
        await sleep(500);
        log(`[i] Establishing socket route with destination: ${emailVal}`, 'info');
        await sleep(600);
        log(`[i] Swapping ECDH keys (Curve25519) to establish session key...`, 'info');
        await sleep(700);
        log(`[+] Symmetric session key agreed: AES-GCM-256`, 'success');
        playSynthSound('keypress');
        await sleep(400);
        log(`[i] Padding plaintext message buffer from caller: "${nameVal}"...`, 'info');
        await sleep(500);
        log(`[i] Encrypting transmission payload...`, 'info');
        await sleep(600);
        
        // Output PGP style block
        log(`-----BEGIN SECURE TRANSMISSION BLOCK-----`, 'cipher');
        log(`Version: SecOps V2.0-Alpha`, 'cipher');
        log(`Key-ID: ${makeRandomHex(8)}`, 'cipher');
        log(``, 'cipher');
        log(btoa(`SecOpsPayload:Name=${nameVal}&Email=${emailVal}&Msg=${msgVal}`).substring(0, 60) + '...', 'cipher');
        log(makeRandomHex(50), 'cipher');
        log(makeRandomHex(50), 'cipher');
        log(`=${makeRandomHex(4)}`, 'cipher');
        log(`-----END SECURE TRANSMISSION BLOCK-----`, 'cipher');
        playSynthSound('keypress');
        await sleep(700);
        
        log(`[+] Payload cipher generated successfully. Buffer locked.`, 'success');
        await sleep(500);
        log(`[i] Transmitting packet blocks over SSL socket...`, 'info');
        await sleep(400);

        for (let pct = 20; pct <= 100; pct += 20) {
          log(`[Progress: ${pct}%] Sending block chunk ${pct/20}/5...`, 'default');
          playSynthSound('keypress');
          await sleep(400);
        }

        playSynthSound('success');
        log(`[+] Transmission verified. Acknowledgment received from endpoint!`, 'success');
        await sleep(600);
        log(`[i] Purging local memory cache segments for forward secrecy...`, 'warn');
        await sleep(500);
        log(`[+] Heap addresses flushed. Channel closed.`, 'success');
        await sleep(1200);

        // Save message in local storage
        try {
          const msgs = JSON.parse(localStorage.getItem('transmittedMessages') || '[]');
          msgs.push({
            timestamp: new Date().toISOString(),
            name: nameVal,
            email: emailVal,
            message: msgVal
          });
          localStorage.setItem('transmittedMessages', JSON.stringify(msgs));
          if (typeof showToast === 'function') {
            showToast('Transmission Received', `Secure message packet from "${nameVal}" has been saved.`, 'success');
          }
        } catch (err) {
          console.error("Failed to write to local storage", err);
        }

        // Reset and close
        secureForm.reset();
        transmissionConsole.classList.remove('active');
      } catch (err) {
        playSynthSound('error');
        log(`[-] CRITICAL FAULT: Socket interrupted: ${err.message}`, 'alert');
        await sleep(3000);
        transmissionConsole.classList.remove('active');
      } finally {
        controls.forEach(ctrl => ctrl.disabled = false);
      }
    });
  }
  
  // --- Skills Card 3D Tilt & Cursor Glow Effect ---
  const skillsCards = document.querySelectorAll('.skills-card');
  skillsCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const width = rect.width;
      const height = rect.height;
      const rotateX = -((y - height / 2) / height) * 12; 
      const rotateY = ((x - width / 2) / width) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  // --- Gallery Lightbox Modal Logic ---
  const galleries = {
    'smk-gallery': [
      { src: 'smk_dato_ismail.jpg', caption: "Sekolah Menengah Kebangsaan (Agama) Dato' Ismail Campus Gate" },
      { src: 'highschool_memory_1.jpg', caption: "High School Memories - Chemistry Lab Group (2019-2023)" },
      { src: 'highschool_memory_2.jpg', caption: "High School Memories - Class Graduation Group Photo" },
      { src: 'highschool_memory_3.jpg', caption: "High School Memories - Graduation Portrait" },
      { src: 'highschool_memory_4.jpg', caption: "High School Memories - Beach Busters Cleanup Campaign 2023" },
      { src: 'highschool_memory_5.jpg', caption: "High School Memories - Kem Kembara Food Stall Event" },
      { src: 'smk_student_leader_1.jpg', caption: "High School Leadership - Student Prefect Board Representative" },
      { src: 'smk_student_leader_group.jpg', caption: "High School Leadership - Prefects Executive Committee" },
      { src: 'smk_spm_result.jpg', caption: "High School Academic Standing - Sijil Pelajaran Malaysia (SPM) Official Certificate" },
      { src: 'smk_class_activities.jpg', caption: "High School Memories - Class Activity and Peer Interaction in Hall" },
      { src: 'smk_trip_memory.jpg', caption: "High School Memories - Trip Event at Islamic Centre An-Naim" },
      { src: 'smk_chemistry_quiz_2023.png', caption: "High School Achievement - Sijil Penyertaan: Participant in Kuiz Kimia Kebangsaan Malaysia (K3M) 2023" }
    ],

    'kmk-gallery': [
      { src: 'kmk_gate.png', caption: "Kolej Matrikulasi Kelantan Main Entrance Gate" },
      { src: 'kmk_transcript.png', caption: "Official Academic Transcript - Cumulative CGPA: 3.46" },
      { src: 'kmk_group_we_love.jpg', caption: "Pre-University Memories - Matriculation Class Group Photo at KMK Campus" },
      { src: 'kmk_group_lab.png', caption: "Pre-University Memories - Chemistry Lab Practical Team" },
      { src: 'kmk_group_uniforms.jpg', caption: "Pre-University Memories - Class Committee and Peers" },
      { src: 'kmk_group_outdoor.jpg', caption: "Pre-University Memories - Matriculation Class Peers Outdoors" },
      { src: 'kmk_group_night.png', caption: "Pre-University Memories - Evening Outing and Gift Celebration with Classmates" },
      { src: 'kmk_group_results.jpg', caption: "Pre-University Memories - Celebrating Matriculation Academic Results with Peers" },
      { src: 'kmk_group_studio.png', caption: "Pre-University Memories - Fun Studio Group Portrait with Friends" },
      { src: 'kmk_certificate_volunteer.png', caption: "Pre-University Achievement - Sijil Penghargaan: Volunteer at Karnival KMKt 2024" },
      { src: 'kmk_certificate_photography.png', caption: "Pre-University Achievement - Sijil Penghargaan: Active Member of Kelab Fotografi KMKt (2024/2025)" }
    ],
    'utem-gallery': [
      { src: 'utem_landmark.png', caption: "UTeM Campus Landmark - I Love UTeM Sign" },
      { src: 'utem_result_slip.png', caption: "Official Academic Result Slip - Semester 1 CGPA: 3.89 (Dean's List)" },
      { src: 'utem_flag_event.jpg', caption: "University Event Memories - Student Assembly with UTeM Flags" },
      { src: 'utem_aixa_booth.jpg', caption: "Co-Curriculum & Club Activities - AIXA Cybersecurity Student Association Exhibition Booth" },
      { src: 'utem_deans_list.jpg', caption: "Academic Excellence - Receiving the Official Dean's List Certificate (Anugerah Dekan)" },
      { src: 'utem_deans_list_certificate.png', caption: "Academic Excellence - Official Dean's List Certificate Scan (Anugerah Dekan)" },
      { src: 'utem_sports_winners.jpg', caption: "University Activities - Sports Competition Winners holding RM100 Prizes" },
      { src: 'utem_green_screen_class.jpg', caption: "Academic Activities - Multimedia & Graphics Class Green Screen Group Photo" },
      { src: 'utem_cybersecurity_center.jpg', caption: "Cybersecurity Studies - Class Group Photo at UTeM Cybersecurity Competence Center" },
      { src: 'utem_deans_list_group.jpg', caption: "Academic Excellence - Celebrating the Dean's List Award with Peers" },
      { src: 'utem_meow_charity_run.png', caption: "UTeM Co-Curricular Activity - Sijil Penghargaan: Participant in Meow Charity Run 2025 ('Run to Rescue Cat')" }
    ],
    'achievements-gallery': [
      { src: 'achievement_cisco.png', caption: "Professional Achievement - Cisco Networking Academy: Introduction to Cybersecurity Course Completion Certificate" },
      { src: 'achievement_gen_ai.png', caption: "Professional Achievement - Intel Digital Readiness: Introduction to Generative AI Certificate of Completion" },
      { src: 'achievement_deans_list.png', caption: "Academic Achievement - Universiti Teknikal Malaysia Melaka (UTeM) Dean's List Certificate (Anugerah Dekan)" }
    ]
  };

  let currentGalleryId = null;
  let currentImageIndex = 0;

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');

  function updateLightboxImage() {
    if (!currentGalleryId || !galleries[currentGalleryId]) return;
    const gallery = galleries[currentGalleryId];
    const item = gallery[currentImageIndex];
    if (item) {
      lightboxImg.src = item.src;
      lightboxCaption.textContent = item.caption;
      
      // Update counter
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${gallery.length}`;
      }

      // Toggle prev/next arrow display
      if (gallery.length > 1) {
        if (lightboxPrev) lightboxPrev.style.display = 'flex';
        if (lightboxNext) lightboxNext.style.display = 'flex';
      } else {
        if (lightboxPrev) lightboxPrev.style.display = 'none';
        if (lightboxNext) lightboxNext.style.display = 'none';
      }
    }
  }

  document.querySelectorAll('.view-gallery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const galleryId = btn.getAttribute('data-gallery');
      if (galleryId && galleries[galleryId]) {
        currentGalleryId = galleryId;
        currentImageIndex = 0;
        updateLightboxImage();
        lightboxModal.classList.add('active');
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('active');
    currentGalleryId = null;
  }

  function navigateGallery(direction) {
    if (!currentGalleryId || !galleries[currentGalleryId]) return;
    const gallery = galleries[currentGalleryId];
    currentImageIndex = (currentImageIndex + direction + gallery.length) % gallery.length;
    updateLightboxImage();
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateGallery(-1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateGallery(1);
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Handle escape key and arrow navigation
  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateGallery(-1);
      } else if (e.key === 'ArrowRight') {
        navigateGallery(1);
      }
    }
  });

  // --- Matrix Code Rain Animation ---
  const canvas = document.getElementById('matrix-canvas');
  let animationFrameId = null;
  let matrixActive = false;
  let resizeTimeout = null;
  let customMatrixColor = null;
  let customMatrixChars = 'default';

  function runMatrixRain() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resizeCanvas();

    const getCharArray = () => {
      if (customMatrixChars === 'binary') {
        return ['0', '1'];
      } else if (customMatrixChars === 'hex') {
        return '0123456789ABCDEF'.split('');
      } else if (customMatrixChars === 'runes') {
        return '᚛᚜ᚁᚂᚃᚄᚅᚆᚇᚈᚉᚊᚋᚌᚍᚎᚏᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚ'.split('');
      }
      return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&+*<>[]{}'.split('');
    };
    
    const fontSize = 14;
    
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill().map(() => Math.floor(Math.random() * -100)); // Stagger starting positions

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill().map(() => Math.floor(Math.random() * -100));
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 15, 30, 0.08)'; // Matches deep blue background with fade trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `600 ${fontSize}px var(--font-mono)`;

      const charArray = getCharArray();

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient fading colors
        if (drops[i] <= 0) {
          continue;
        }

        // The lead character in each drop stream is brighter white/color
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
        } else if (customMatrixColor) {
          ctx.fillStyle = customMatrixColor;
        } else {
          const isCyber = document.body.classList.contains('cyberpunk-theme');
          const isSynth = document.body.classList.contains('synthwave-theme');
          ctx.fillStyle = isCyber ? '#ff007f' : (isSynth ? '#ff5e97' : '#39ff14'); // Cyberpunk Pink, Synthwave Pink, or Matrix Green
        }
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      if (matrixActive) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    matrixActive = true;
    draw();
  }

  function stopMatrixRain() {
    matrixActive = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // --- CTF Classified Operations Dashboard Modal ---
  const ctfDashboardModal = document.getElementById('ctf-dashboard-modal');
  const ctfDashboardClose = document.getElementById('ctf-dashboard-close');
  const ctfChallengesContainer = document.getElementById('ctf-challenges-container');
  const ctfProgressText = document.getElementById('ctf-dashboard-progress-text');
  const ctfProgressBar = document.getElementById('ctf-dashboard-progress-bar');
  const ctfTrackerBtns = document.querySelectorAll('.ctf-tracker-btn');

  const challengesData = [
    {
      id: 'bypass',
      flag: 'FLAG{D1NI_HUDA_SEC_OPS_2026}',
      title: 'Firewall Bypass',
      desc: 'Locate the secret security payload (flag) hidden within the website metadata files.',
      hint: 'Inspect index.html using source code browser tools. Check the top of the file.',
      reward: 'Matrix Green Theme Unlocked'
    },
    {
      id: 'spring',
      flag: 'FLAG{SPRING_EXPLOIT_ROOT_2026}',
      title: 'Spring4Shell RCE',
      desc: 'Perform a network service sweep to discover active endpoints and exploit Tomcat vulnerabilities.',
      hint: 'Type "scan" in the terminal console to locate target ports, then execute "crack tomcat".',
      reward: 'Tomcat System Root Status'
    },
    {
      id: 'ssh',
      flag: 'FLAG{SSH_DICTIONARY_BREACH}',
      title: 'SSH Dictionary Attack',
      desc: 'Perform dynamic dictionary mapping sweeps on port 22 to breach SSH administrative privileges.',
      hint: 'Scan host targets using "scan", then execute "crack ssh" in the terminal console.',
      reward: 'Dini SSH Credential Key'
    },
    {
      id: 'logs',
      flag: 'FLAG{LOG_ANALYSIS_SECURE_2026}',
      title: 'Log Intrusion Analysis',
      desc: 'Analyze intrusion alerts logs payload history, extract base64 hashes, and decrypt plaintext signatures.',
      hint: 'Type "logs" in the terminal, identify the INFO alert base64 hash, then type "decode <hash_string>".',
      reward: 'Classified Decrypted Message'
    }
  ];

  function renderCtfChallenges() {
    if (!ctfChallengesContainer) return;
    ctfChallengesContainer.innerHTML = '';
    const solved = getSolvedFlags();

    challengesData.forEach((ch, idx) => {
      const isSolved = solved.includes(ch.flag);
      const card = document.createElement('div');
      card.className = `ctf-challenge-card ${isSolved ? 'solved' : 'locked'}`;
      
      const badgeIcon = isSolved ? 'shield-check' : 'lock';
      const statusText = isSolved ? 'ACTIVE / SOLVED' : 'INACTIVE / LOCKED';
      const statusColorClass = isSolved ? 'text-success' : 'text-muted';

      card.innerHTML = `
        <div class="ctf-challenge-header">
          <span>MISSION [0${idx + 1}]</span>
          <span class="ctf-badge-status ${statusColorClass}">
            <i data-lucide="${badgeIcon}" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 2px;"></i> ${statusText}
          </span>
        </div>
        <h4 class="ctf-challenge-title">${ch.title}</h4>
        <p class="ctf-challenge-desc">${ch.desc}</p>
        ${!isSolved ? `
          <div class="ctf-challenge-hint-box">
            <strong>Hint:</strong> ${ch.hint}
          </div>
        ` : ''}
        <div style="font-size: 0.75rem; font-family: var(--font-mono); color: ${isSolved ? 'var(--accent-primary)' : 'var(--text-muted)'}; margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 0.5rem;">
          REWARD: ${ch.reward}
        </div>
      `;
      ctfChallengesContainer.appendChild(card);
    });

    if (ctfProgressText && ctfProgressBar) {
      const solvedCount = solved.length;
      ctfProgressText.textContent = `${solvedCount} / ${challengesData.length} SOLVED`;
      const pct = (solvedCount / challengesData.length) * 100;
      ctfProgressBar.style.width = `${pct}%`;
    }

    lucide.createIcons();
  }

  function openCtfDashboard() {
    if (ctfDashboardModal) {
      renderCtfChallenges();
      ctfDashboardModal.classList.add('active');
    }
  }

  function closeCtfDashboard() {
    if (ctfDashboardModal) {
      ctfDashboardModal.classList.remove('active');
    }
  }

  ctfTrackerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCtfDashboard();
    });
  });

  if (ctfDashboardClose) {
    ctfDashboardClose.addEventListener('click', closeCtfDashboard);
  }

  if (ctfDashboardModal) {
    ctfDashboardModal.addEventListener('click', (e) => {
      if (e.target === ctfDashboardModal) closeCtfDashboard();
    });
  }

  // Hook into keydown escape event to close CTF modal as well
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCtfDashboard();
    }
  });

  // --- Toast Notification Engine ---
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);

  const showToast = (title, message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'alert') iconName = 'shield-alert';
    if (type === 'success') iconName = 'shield-check';

    toast.innerHTML = `
      <div class="toast-header">
        <span>
          <i data-lucide="${iconName}"></i>
          ${title.toUpperCase()}
        </span>
      </div>
      <div class="toast-body">${message}</div>
    `;

    toastContainer.appendChild(toast);
    lucide.createIcons();

    // Trigger reflow to animate
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 5000);
  };
  
  // Make showToast globally available
  window.showToast = showToast;


  // --- Theme Selector Dropdown ---
  const themeMenuBtn = document.getElementById('theme-menu-btn');
  const themeMenuDropdown = document.getElementById('theme-menu-dropdown');

  const themesList = [
    { id: 'default', name: 'Default Sand', class: '', challenge: null, colorClass: 'default' },
    { id: 'hacker', name: 'Matrix Green', class: 'hacker-theme', challenge: 'FLAG{D1NI_HUDA_SEC_OPS_2026}', colorClass: 'hacker' },
    { id: 'synthwave', name: 'Sunset Synthwave', class: 'synthwave-theme', challenge: '2_challenges', colorClass: 'synthwave' },
    { id: 'cyberpunk', name: 'Neon Cyberpunk', class: 'cyberpunk-theme', challenge: '4_challenges', colorClass: 'cyberpunk' }
  ];

  function renderThemeMenu() {
    if (!themeMenuDropdown) return;
    themeMenuDropdown.innerHTML = '';
    const solved = getSolvedFlags();

    themesList.forEach(theme => {
      let isLocked = false;
      let lockReason = '';

      if (theme.id === 'hacker') {
        isLocked = !solved.includes('FLAG{D1NI_HUDA_SEC_OPS_2026}');
        lockReason = 'Classified: Clear the Firewall Bypass challenge in the Terminal to unlock Matrix Green.';
      } else if (theme.id === 'synthwave') {
        isLocked = solved.length < 2;
        lockReason = 'Classified: Complete at least 2 CTF challenges (2/4) to unlock Sunset Synthwave.';
      } else if (theme.id === 'cyberpunk') {
        isLocked = solved.length < 4;
        lockReason = 'Classified: Complete all 4 CTF challenges to unlock Neon Cyberpunk.';
      }

      const isActive = theme.id === 'default' 
        ? (!document.body.classList.contains('hacker-theme') && !document.body.classList.contains('synthwave-theme') && !document.body.classList.contains('cyberpunk-theme'))
        : document.body.classList.contains(theme.class);

      const btnItem = document.createElement('button');
      btnItem.className = `theme-dropdown-item ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
      
      btnItem.innerHTML = `
        <span class="theme-item-left">
          <span class="theme-dot ${theme.colorClass}"></span>
          ${theme.name}
        </span>
        <span class="theme-item-right">
          <i data-lucide="${isLocked ? 'lock' : (isActive ? 'check' : '')}"></i>
        </span>
      `;

      btnItem.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isLocked) {
          playSynthSound('error');
          showToast('Access Denied', lockReason, 'alert');
          
          // Open the dashboard and highlight the challenge
          themeMenuDropdown.classList.remove('active');
          openCtfDashboard();
          
          // Highlight target card
          setTimeout(() => {
            const cards = document.querySelectorAll('.ctf-challenge-card');
            let targetCardIdx = 0; // Default to first card for hacker
            if (theme.id === 'synthwave') {
              targetCardIdx = Array.from(cards).findIndex(c => c.classList.contains('locked'));
              if (targetCardIdx === -1) targetCardIdx = 1;
            } else if (theme.id === 'cyberpunk') {
              targetCardIdx = Array.from(cards).findIndex(c => c.classList.contains('locked'));
              if (targetCardIdx === -1) targetCardIdx = 3;
            }
            
            const targetCard = cards[targetCardIdx];
            if (targetCard) {
              targetCard.classList.add('highlight');
              targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => {
                targetCard.classList.remove('highlight');
              }, 4500);
            }
          }, 400);
        } else {
          // Switch theme
          const result = commands.theme(theme.id);
          showToast('System Configuration', `Visual theme set to ${theme.name.toUpperCase()}`, 'success');
          themeMenuDropdown.classList.remove('active');
          renderThemeMenu();
        }
      });

      themeMenuDropdown.appendChild(btnItem);
    });

    // Add helper footer explanation if themes are locked
    const hasLocked = themesList.some(theme => {
      if (theme.id === 'hacker') return !solved.includes('FLAG{D1NI_HUDA_SEC_OPS_2026}');
      if (theme.id === 'synthwave') return solved.length < 2;
      if (theme.id === 'cyberpunk') return solved.length < 4;
      return false;
    });

    if (hasLocked) {
      const divider = document.createElement('div');
      divider.style.borderTop = '1px solid var(--border-color)';
      divider.style.margin = '0.5rem 0';
      themeMenuDropdown.appendChild(divider);

      const footer = document.createElement('div');
      footer.style.padding = '0.5rem 1.25rem';
      footer.style.fontSize = '0.75rem';
      footer.style.color = 'var(--text-muted)';
      footer.style.fontFamily = 'var(--font-mono)';
      footer.style.textAlign = 'center';
      footer.style.lineHeight = '1.35';
      footer.textContent = 'Solve terminal CTF challenges to unlock classified visual themes.';
      themeMenuDropdown.appendChild(footer);
    }

    lucide.createIcons();
  }

  // Bind toggle behavior for theme menu button
  if (themeMenuBtn && themeMenuDropdown) {
    themeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenuDropdown.classList.toggle('active');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!themeMenuDropdown.contains(e.target) && e.target !== themeMenuBtn) {
        themeMenuDropdown.classList.remove('active');
      }
    });
  }

  // Make theme menu globally updateable
  window.renderThemeMenu = renderThemeMenu;
  renderThemeMenu();

  function checkMatrixState() {
    const isHacker = document.body.classList.contains('hacker-theme');
    const isCyber = document.body.classList.contains('cyberpunk-theme');
    if (isHacker || isCyber) {
      if (!matrixActive) {
        runMatrixRain();
      }
    } else {
      stopMatrixRain();
    }
  }

  // Bind to window to allow global triggers from submit/reset commands
  window.checkMatrixState = checkMatrixState;

  // Initialize Matrix code rain on start
  checkMatrixState();
});
