import useSupabase from "../composables/useSupabase.js";
import { ref } from "vue";

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);

export default function useAuthUser() {
    const { supabase } = useSupabase();

    /**
     * Login with email and password
     */
    const login = async ({ email, password }) => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return user;
    };

    /**
     * Login with google, github, etc
     */
    const loginWithSocialProvider = async (token) => {
        const { user, error } = await supabase.auth.signInWithOtp({ provider });
        if (error) throw error;
        return user;
    };

    /**
     * Logout
     */
    const logout = async () => {
        const { error } = supabase.auth.signOut();
        if (error) throw error;
    };

    /**
     * Check if the user is logged in or not
     */
    const isLoggedIn = () => {
        return !!user.value;
    };

    /**
     * Register
     */
    const register = async ({ email, password, ...meta }) => {
        const { user, error } = await supabase.auth.signUp({ email, password ,options: { data: meta }});
        if (error) throw error;
        return user;
    };

    /**
     * Update user email, password, or meta data
     */
    const update = async (data) => {
        // const { user, error } = supabase.from('profiles').upsert(data)
        const { user, error } = await supabase.from('profiles').upsert(data)
        if (error) throw error;
        return user;
    };

    const getAvatar = async (path) => {
        return await supabase.storage.from('avatars').download(path)
    }

    const storeAvatar = async ({ filePath, file }) => {
        return await supabase.storage.from('avatars').upload(filePath, file)
    }

    const userProfile = async (id ) => {
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', id)
          .single()
        if (error) throw error;
        return data
    }

    return {
        user,
        login,
        loginWithSocialProvider,
        isLoggedIn,
        logout,
        register,
        update,
        getAvatar,
        storeAvatar,
        userProfile
    };
}
