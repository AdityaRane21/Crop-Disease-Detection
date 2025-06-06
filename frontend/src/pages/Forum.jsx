import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed

/**
 * Forum page component
 * Community discussion platform for users to share experiences and advice
 */
const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Categories for forum posts
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'general', name: 'General Discussion' },
    { id: 'support', name: 'Support & Encouragement' },
    { id: 'treatment', name: 'Treatment Experiences' },
    { id: 'research', name: 'Latest Research' },
    { id: 'caregivers', name: 'For Caregivers' }
  ];

  // Fetch forum posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('/api/forum-posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch forum posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching forum posts:', err);
        setError('Failed to load forum posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term and active category
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.preview.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Navigate to new post page
  const handleNewPost = () => {
    navigate('/forum/new-post');
  };

  // Sample forum data for development (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !posts.length && isLoading) {
      // Mock data for development
      const mockPosts = [
        {
          id: 1,
          title: "My experience with CBT therapy",
          category: "treatment",
          preview: "I've been doing CBT for about 3 months now, and wanted to share how it's been going...",
          author: {
            id: "user123",
            name: "JaneDoe",
            avatar: "/avatars/jane.jpg"
          },
          commentCount: 24,
          likeCount: 57,
          createdAt: "2025-02-15T14:23:00Z",
          isSticky: false
        },
        {
          id: 2,
          title: "Tips for supporting a loved one with anxiety",
          category: "caregivers",
          preview: "After 5 years of helping my partner through anxiety, here are some things I've learned...",
          author: {
            id: "user456",
            name: "SupportiveSam",
            avatar: "/avatars/sam.jpg"
          },
          commentCount: 31,
          likeCount: 122,
          createdAt: "2025-02-25T09:15:00Z",
          isSticky: true
        },
        {
          id: 3,
          title: "Recent study on mindfulness meditation effectiveness",
          category: "research",
          preview: "A new study published last month shows promising results for mindfulness practices...",
          author: {
            id: "user789",
            name: "ResearchRobin",
            avatar: "/avatars/robin.jpg"
          },
          commentCount: 17,
          likeCount: 43,
          createdAt: "2025-03-01T16:45:00Z",
          isSticky: false
        },
        {
          id: 4,
          title: "Introduction and my story",
          category: "general",
          preview: "Hello everyone, I'm new here and wanted to introduce myself and share my journey...",
          author: {
            id: "user101",
            name: "NewcomerNick",
            avatar: null
          },
          commentCount: 12,
          likeCount: 28,
          createdAt: "2025-03-03T11:30:00Z",
          isSticky: false
        },
        {
          id: 5,
          title: "Weekly check-in thread: How are you feeling today?",
          category: "support",
          preview: "Use this thread to share how you're doing, celebrate wins, or ask for support...",
          author: {
            id: "admin1",
            name: "Moderator",
            avatar: "/avatars/mod.jpg"
          },
          commentCount: 76,
          likeCount: 35,
          createdAt: "2025-03-05T08:00:00Z",
          isSticky: true
        }
      ];
      setPosts(mockPosts);
      setIsLoading(false);
    }
  }, [isLoading, posts.length]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
          <p className="text-gray-600">
            Join the conversation, share experiences, and support others on their journey.
          </p>
        </div>
        
        <button 
          onClick={handleNewPost}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New Post
        </button>
      </div>

      {/* Filters and search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search forum..."
              className="w-full p-3 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-3 py-2 rounded-md text-sm ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forum posts list */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {/* Sticky posts first */}
          {filteredPosts
            .filter(post => post.isSticky)
            .map(post => (
              <div 
                key={post.id} 
                className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-medium rounded">
                    Pinned
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {categories.find(cat => cat.id === post.category)?.name || post.category}
                  </span>
                </div>
                
                <Link to={`/forum/post/${post.id}`} className="block mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mb-4">{post.preview}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                      {post.author.avatar ? (
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-blue-500 text-white text-xs font-bold">
                          {post.author.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium">{post.author.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                      {post.commentCount}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      {post.likeCount}
                    </span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          
          {/* Regular posts */}
          {filteredPosts
            .filter(post => !post.isSticky)
            .map(post => (
              <div 
                key={post.id} 
                className="border border-gray-200 bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {categories.find(cat => cat.id === post.category)?.name || post.category}
                  </span>
                </div>
                
                <Link to={`/forum/post/${post.id}`} className="block mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mb-4">{post.preview}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                      {post.author.avatar ? (
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-blue-500 text-white text-xs font-bold">
                          {post.author.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium">{post.author.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                      {post.commentCount}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      {post.likeCount}
                    </span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or category filter</p>
          <div className="space-x-4">
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Reset filters
            </button>
            <button 
              onClick={handleNewPost}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Start a new discussion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;