import { DetailCommentType } from '@/types/detailComment';
import Image from 'next/image';
import DefaultProfile from '../../assets/images/profile-image.png';

const CommentsCard = ({ comment }: { comment: DetailCommentType }) => {
  // console.log(comment);
  const Stars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <input
        key={star}
        type="radio"
        name={comment.comment_id}
        className="mask mask-star-2 bg-[#6C5FF7]"
        disabled
        checked={comment.star >= star}
      />
    ));
  };

  return (
    <div className="flex  w-full justify-between gap-4 rounded-lg p-5">
      <div className="w-full">
        {/* 프로필  */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center gap-2">
            {comment.profile_image ? (
              <Image src={comment.profile_image} alt="Profile" width={40} height={40} className="rounded-full border" />
            ) : (
              <Image src={DefaultProfile} alt="Profile" width={40} height={40} className="rounded-full border" />
            )}
            <h5 className="text-text-dart-gray text-lg  font-bold">{comment.nickname}</h5>
          </div>
          <div className="rating rating-sm">{Stars()}</div>
        </div>

        {/* 내용 */}
        <div className="ml-12 flex h-[76%] min-h-20 gap-2">
          <div className="flex w-full flex-col justify-between ">
            <p className="text-gray-800 ">{comment.content}</p>
            <div className="text-right text-sm text-gray-500">{new Date(comment.create_at).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {comment.comment_image ? (
          <div className="relative flex h-28 w-28 items-center justify-center xl:h-48 xl:w-48">
            <Image
              src={comment.comment_image}
              alt="uploaded image preview"
              fill
              className="h-full w-full rounded-xl border object-cover"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentsCard;
