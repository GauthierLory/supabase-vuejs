import useSupabase from "../composables/useSupabase.js";
import { ref } from "vue";

const user = ref(null);

export default function useAuthUser() {
    const { supabase } = useSupabase();

    const login = async ({ email, password }) => {
        const {  user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return user;
    };

    const register = async ({ email, password }) => {
        const { user, error } = await supabase.auth.signUp({ email, password } );
        if (error) throw error;
        return user;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    // const isLoggedIn = async () => {
    //     // console.log('!!user.value', !!user.value)
    //     const { data: { user } } = await supabase.auth.getUser()
    //     // return !!user.value;
    //     return user
    // };
    //
    // const userProfile = async ({ id }) => {
    //     let { data, error, status } = await supabase
    //       .from('profiles')
    //       .select(`username, website, avatar_url`)
    //       .eq('id', id)
    //       .single()
    //     if (error) throw error;
    //     return data
    // }

    return { user, login, logout, register}
}