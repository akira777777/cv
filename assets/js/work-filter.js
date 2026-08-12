// work-filter.js - Projects data and filtering logic
(function() {
  'use strict';

  // ============================================
  // PROJECTS DATA ARRAY
  // ============================================

  /**
   * Complete projects database with metadata.
   * Each project includes client, category, tech stack, timeline, description, deliverables, and links.
   */
  const PROJECTS = [
    {
      id: 'project-1',
      client: 'EcoTech Solutions',
      title: 'Smart Energy Dashboard',
      category: 'Web Application',
      subcategory: 'SaaS Platform',
      techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      timeline: {
        start: 'Q1 2024',
        duration: '6 months'
      },
      description: 'A comprehensive energy management platform helping commercial clients monitor and optimize their solar panel efficiency in real-time.',
      deliverables: [
        'Real-time data visualization dashboard with sub-50ms latency',
        'Mobile-responsive admin interface for facility managers',
        'Automated reporting system generating PDF/CSV exports',
        'RESTful API documentation and Postman collection'
      ],
      links: {
        live: 'https://ecotech-solutions.com/dashboard',
        repo: null,
        caseStudy: '/case-studies/ecotech-energy.html'
      },
      featured: true,
      popular: false
    },
    {
      id: 'project-2',
      client: 'GreenLeaf Agriculture',
      title: 'Crop Monitoring System',
      category: 'Web Application',
      subcategory: 'IoT Integration',
      techStack: ['Vue.js', 'Firebase', 'Python API'],
      timeline: {
        start: 'Q2 2024',
        duration: '4 months'
      },
      description: 'IoT-based crop health monitoring system with soil moisture sensors and automated irrigation recommendations.',
      deliverables: [
        'Mobile-first sensor data dashboard',
        'Predictive analytics for optimal watering schedules',
        'Alert system for critical sensor failures',
        'Multi-user access control (farm managers, technicians)'
      ],
      links: {
        live: null,
        repo: null,
        caseStudy: '/case-studies/greenleaf.html'
      },
      featured: false,
      popular: true
    },
    {
      id: 'project-3',
      client: 'Urban Mobility Co.',
      title: 'Ride-Sharing Platform MVP',
      category: 'Web Application',
      subcategory: 'Marketplace',
      techStack: ['Next.js', 'Supabase', 'Tailwind CSS'],
      timeline: {
        start: 'Q3 2024',
        duration: '8 months'
      },
      description: 'A complete ride-sharing platform for urban areas, connecting drivers with passengers in real-time.',
      deliverables: [
        'Driver and passenger mobile apps (React Native)',
        'Real-time geolocation tracking system',
        'Payment gateway integration (Stripe)',
        'Rating and review system'
      ],
      links: {
        live: 'https://urbanmobility.co/ride-share',
        repo: null,
        caseStudy: '/case-studies/urban-mobility.html'
      },
      featured: true,
      popular: false
    },
    {
      id: 'project-4',
      client: 'FitLife Studios',
      title: 'Fitness Studio Booking System',
      category: 'Web Application',
      subcategory: 'Booking Platform',
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      timeline: {
        start: 'Q1 2024',
        duration: '5 months'
      },
      description: 'An all-in-one booking and management system for fitness studios, including class scheduling, member management, and payment processing.',
      deliverables: [
        'Studio admin dashboard with calendar view',
        'Member self-service portal',
        'Recurring class subscriptions',
        'Email notifications and reminders'
      ],
      links: {
        live: null,
        repo: null,
        caseStudy: '/case-studies/fitlife.html'
      },
      featured: false,
      popular: true
    },
    {
      id: 'project-5',
      client: 'CloudStream Media',
      title: 'Video Streaming Platform',
      category: 'Web Application',
      subcategory: 'Media Platform',
      techStack: ['React', 'AWS S3', 'HLS.js'],
      timeline: {
        start: 'Q2 2024',
        duration: '7 months'
      },
      description: 'A video streaming platform supporting multiple quality levels, playlists, and user-generated content.',
      deliverables: [
        'Adaptive bitrate streaming implementation',
        'User authentication and account management',
        'Video player with custom controls',
        'Analytics dashboard for content performance'
      ],
      links: {
        live: null,
        repo: null,
        caseStudy: '/case-studies/cloudstream.html'
      },
      featured: true,
      popular: false
    },
    {
      id: 'project-6',
      client: 'EduPrime Learning',
      title: 'Online Course Platform',
      category: 'Web Application',
      subcategory: 'LMS Platform',
      techStack: ['Next.js', 'Prisma', 'Stripe'],
      timeline: {
        start: 'Q3 2024',
        duration: '6 months'
      },
      description: 'A complete LMS platform for delivering online courses with progress tracking, quizzes, and certificates.',
      deliverables: [
        'Instructor dashboard for course creation',
        'Student learning portal with progress tracking',
        'Quiz and assessment engine',
        'Certificate generation system'
      ],
      links: {
        live: null,
        repo: null,
        caseStudy: '/case-studies/eduprime.html'
      },
      featured: false,
      popular: true
    }
  ];

  // ============================================
  // CATEGORY DEFINITIONS
  // ============================================

  /**
   * Category filter options for UI.
   */
  const CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'Web Application', label: 'Web Applications' },
    { id: 'Mobile App', label: 'Mobile Apps' },
    { id: 'Design System', label: 'Design Systems' }
  ];

  // ============================================
  // FILTERING FUNCTIONS
  // ============================================

  /**
   * Helper function to parse timeline string into numeric timestamp.
   * Handles format like 'Q1 2024', '2024-01', or numeric years.
   */
  function parseTimelineDate(timelineStr) {
    if (!timelineStr) return 0;
    const qMatch = String(timelineStr).match(/Q([1-4])\s+(\d{4})/i);
    if (qMatch) {
      const q = parseInt(qMatch[1], 10);
      const year = parseInt(qMatch[2], 10);
      const month = (q - 1) * 3;
      return new Date(year, month, 1).getTime();
    }
    const d = new Date(timelineStr);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  }

  /**
   * Filter projects by category.
   */
  function filterByCategory(categoryId) {
    if (!categoryId || categoryId === 'all') {
      return [...PROJECTS];
    }

    const catLower = categoryId.toLowerCase();
    return PROJECTS.filter(project => {
      const categoryMatch = project.category && project.category.toLowerCase() === catLower;
      const subcategoryMatch = project.subcategory && project.subcategory.toLowerCase().includes(catLower);
      return categoryMatch || subcategoryMatch;
    });
  }

  /**
   * Filter projects by popularity flag.
   */
  function filterByPopularity(isPopular) {
    if (!isPopular) return [...PROJECTS];

    return PROJECTS.filter(project => project.popular);
  }

  /**
   * Sort projects by various criteria.
   */
  function sortProjects(projects, sortBy = 'newest') {
    const sorted = [...projects];

    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => 
          parseTimelineDate(b.timeline ? b.timeline.start : '') - parseTimelineDate(a.timeline ? a.timeline.start : '')
        );
      
      case 'oldest':
        return sorted.sort((a, b) => 
          parseTimelineDate(a.timeline ? a.timeline.start : '') - parseTimelineDate(b.timeline ? b.timeline.start : '')
        );
      
      case 'name-asc':
        return sorted.sort((a, b) => 
          (a.title || '').localeCompare(b.title || '')
        );
      
      case 'name-desc':
        return sorted.sort((a, b) => 
          (b.title || '').localeCompare(a.title || '')
        );
      
      default:
        return sorted;
    }
  }

  // ============================================
  // FEATURED PROJECTS (Above-the-fold display)
  // ============================================

  /**
   * Get featured projects for the hero section.
   */
  function getFeaturedProjects() {
    return PROJECTS.filter(project => project.featured);
  }

  // ============================================
  // PUBLIC API
  // ============================================

  /**
   * Main filtering/sorting controller.
   */
  const ProjectController = {
    projects: PROJECTS,
    categories: CATEGORIES,
    
    // Getters
    getAllProjects() {
      return [...this.projects];
    },
    
    getFeaturedProjects() {
      return getFeaturedProjects();
    },

    // Filters
    filterByCategory(categoryId) {
      const filtered = filterByCategory(categoryId);
      
      // Apply default sorting (newest first)
      return sortProjects(filtered, 'newest');
    },
    
    filterByPopularity(isPopular) {
      const filtered = filterByPopularity(isPopular);
      return sortProjects(filtered, 'newest');
    },

    // Sorting
    sortBy(sortByOption) {
      return sortProjects(this.getAllProjects(), sortByOption);
    },

    // Search (bonus feature)
    search(query) {
      if (!query || query.trim() === '') {
        return this.getAllProjects();
      }

      const lowerQuery = query.toLowerCase().trim();

      return this.getAllProjects().filter(project => 
        (project.title && project.title.toLowerCase().includes(lowerQuery)) ||
        (project.client && project.client.toLowerCase().includes(lowerQuery)) ||
        (project.description && project.description.toLowerCase().includes(lowerQuery)) ||
        (Array.isArray(project.techStack) && project.techStack.some(tech => tech.toLowerCase().includes(lowerQuery)))
      );
    }
  };

  // ============================================
  // MODULE EXPORTS (UMD pattern for compatibility)
  // ============================================

  /**
   * Initialize the module in browser environment.
   */
  if (typeof window !== 'undefined') {
    window.ProjectController = ProjectController;
    console.log('work-filter.js: Module loaded. Projects available:', PROJECTS.length);
  }

  // Export for Node/CommonJS environments
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      projects: PROJECTS,
      categories: CATEGORIES,
      ProjectController,
      filterByCategory,
      sortProjects,
      getFeaturedProjects
    };
  }

})();