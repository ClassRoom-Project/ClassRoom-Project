// import { useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getSession } from 'next-auth/react';
// import useNewUserStore from '../authStore.ts/store';
// import { SessionUserType } from '@/types/user';

// // 세션 데이터를 가져오는 함수
// const fetchSessionData = async (): Promise<SessionUserType> => {
//   const session = await getSession();
//   if (!session || !session.user?.email) throw new Error("세션에서 이메일을 찾을 수 없습니다."); // 세션에서 이메일을 찾을 수 없으면 에러 발생
//   return {
//     email: session.user?.email,
//     name: session.user?.name || null,
//     image: session.user?.image || null,
//   };
// };

// 	export function useReadSession() {
// 		return useQuery<SessionUserType>({
// 			queryKey: ["session"],
// 			queryFn: fetchSessionData,
// 		});
// 	}

//   const {setNickname, setEmail, setProfileImage } = useNewUserStore();

//   useEffect(() => {
//     if (isSuccess && sessionData) {
//       setEmail(sessionData.user.email);
//       setNickname(sessionData.user.name); // `name`을 사용하거나, 세션 구조에 따라 적절한 속성 사용
//       setProfileImage(sessionData.user.image); // 프로필 이미지
//     }
//   }, [sessionData, isSuccess, setEmail, setNickname, setProfileImage]);

//   return (

//   );
// }

// export default MyComponent;
