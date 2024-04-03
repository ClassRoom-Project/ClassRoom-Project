// import { CreateNewUserType } from '@/types/authUser/authUserTypes';
// import { SupabaseClient } from '@supabase/supabase-js';
// import { createClient } from '@/utils/supabase/client';
// import { supabase } from '../../supabase/supabase';

// export const CustomAdapter = (supabaseClient: SupabaseClient) => {
//   return {
//     // 사용자 생성
//     async createNewUser(user: CreateNewUserType) {
//       const { data, error } = await supabaseClient.from('users').insert([
//         // 여기에 사용자 정보를 삽입합니다.
//         { email: user.email, nickname: user.nickname, profile_image: user.image }
//       ]);

//       if (error) throw new Error(`Creating user failed: ${error.message}`);
//       if (!data) throw new Error('No data returned from Supabase insert operation.');

//       return data[0];
//     },

//     // 이메일로 사용자 조회
//     async getUserByEmail(email: string) {
//       const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
//       if (error) throw new Error(`Getting user by email failed: ${error.message}`);
//       return data;
//     }
//   };
// };

// export default CustomAdapter;
