import { createClient } from '@supabase/supabase-js';

// Get Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to convert table name to snake_case
const toSnakeCase = (str) => {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
};

// Create a Base44-compatible wrapper for entities
class EntityWrapper {
  constructor(tableName) {
    this.tableName = toSnakeCase(tableName);
  }

  // List entities with optional sorting and limit
  async list(sortBy = '-created_date', limit = 100) {
    const isDescending = sortBy.startsWith('-');
    const column = isDescending ? sortBy.substring(1) : sortBy;
    
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order(column, { ascending: !isDescending })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Filter entities by criteria
  async filter(criteria) {
    let query = supabase.from(this.tableName).select('*');

    // Apply filters
    Object.entries(criteria).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // Get a single entity by ID
  async get(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Create a new entity
  async create(entityData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(entityData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update an entity
  async update(id, updates) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update({ ...updates, updated_date: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete an entity
  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
}

// Authentication wrapper compatible with Base44
const authWrapper = {
  async me() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) throw new Error('Not authenticated');
    return user;
  },

  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }
    });
    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  },

  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { success: true };
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Functions wrapper for serverless functions
const functionsWrapper = {
  async invoke(functionName, args) {
    // For now, we'll implement functions client-side or as Edge Functions
    // This is a placeholder that can be extended
    console.warn(`Function ${functionName} called with args:`, args);
    
    // You can implement these as Supabase Edge Functions or client-side logic
    // Example: const { data, error } = await supabase.functions.invoke(functionName, { body: args });
    
    throw new Error(`Function ${functionName} not yet implemented. Please implement as Edge Function or client-side logic.`);
  }
};

// Integrations wrapper
const integrationsWrapper = {
  Core: {
    async UploadFile({ file }) {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from('practice-cards')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('practice-cards')
        .getPublicUrl(fileName);

      return { file_url: publicUrl };
    },

    async InvokeLLM() {
      // This should be implemented as an Edge Function that calls OpenAI
      // For now, return a placeholder
      console.warn('InvokeLLM called but not implemented');
      throw new Error('InvokeLLM needs to be implemented as an Edge Function');
    },

    async SendEmail() {
      // This should be implemented as an Edge Function
      console.warn('SendEmail called but not implemented');
      throw new Error('SendEmail needs to be implemented as an Edge Function');
    },

    async GenerateImage() {
      // This should be implemented as an Edge Function
      console.warn('GenerateImage called but not implemented');
      throw new Error('GenerateImage needs to be implemented as an Edge Function');
    }
  }
};

// Create entity proxies for all tables
const entityNames = [
  'PracticeCard',
  'DailyPractice',
  'Achievement',
  'CommunityPost',
  'UserProfile',
  'CommunityChallenge',
  'ChallengeParticipant',
  'BuddyConnection',
  'PersonalizedRecommendation',
  'StreakProtection',
  'FavoriteCard',
  'PostLike',
  'UserPreferences',
  'DailyCard',
  'BonusPull',
  'Message',
  'Endorsement',
  'UserLevel',
  'DailyChallenge',
  'CardInsight',
  'Badge',
  'GameScore',
  'ChallengePoints',
  'ChakraAchievement',
  'DailyReward',
  'Friend',
  'GameChallenge',
  'GlobalProgression',
  'FriendGift',
  'UnlockedContent',
  'CustomChallenge',
  'DailyPracticeSession',
  'GameReflection',
  'FriendStreak',
  'AIRecommendation',
  'GeneratedAffirmation',
  'UserCosmetics',
  'Group',
  'GroupMember',
  'PersonalizedChallenge',
  'SocialPost',
  'PostComment',
  'VibeagotchiState',
  'VibeagotchiEvolution',
  'NotificationQueue',
  'GameMastery',
  'WeeklyChallenge',
  'WeeklyChallengeProgress',
  'ActivityPulse'
];

const entities = {};
entityNames.forEach(name => {
  entities[name] = new EntityWrapper(name);
});

// Export a Base44-compatible client
export const base44 = {
  entities,
  auth: authWrapper,
  functions: functionsWrapper,
  integrations: integrationsWrapper
};

// Also export the raw supabase client for direct access if needed
export default supabase;
