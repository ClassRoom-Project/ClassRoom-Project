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
    <div className="flex  w-full flex-col justify-between gap-4 rounded-lg p-5 lg:flex-row">
      <div className="flex w-full flex-col">
        {/* 프로필  */}
        <div className="mb-1.5 flex items-center gap-2 md:mb-1 ">
          <div className=" flex items-center justify-center gap-2">
            <div className="relative h-9 w-9 sm:h-12 sm:w-12 ">
              {comment.profile_image ? (
                <Image
                  src={comment.profile_image}
                  alt="Profile"
                  fill={true}
                  className="rounded-full border"
                  objectFit="cover"
                />
              ) : (
                <Image
                  src={DefaultProfile}
                  alt="Profile"
                  fill={true}
                  className="rounded-full border"
                  objectFit="cover"
                />
              )}
            </div>
            <h5 className="text-text-dart-gray text-base font-semibold sm:text-lg">{comment.nickname}</h5>
          </div>
          <div className="rating rating-sm">{Stars()}</div>
        </div>

        {/* 내용 */}
        <div className="flex h-full w-full  flex-col pl-1  sm:pl-[56px] ">
          <p className="mb-2 text-sm text-gray-800 sm:text-base">{comment.content}</p>
          <div className="mt-auto text-right text-sm text-gray-500">
            {new Date(comment.create_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      {comment.comment_image ? (
        <div className="flex items-center pl-0 sm:pl-12 lg:justify-center lg:pl-0">
          <div className="relative flex h-48 w-48 items-center justify-center">
            <Image
              src={comment.comment_image}
              alt="uploaded image preview"
              fill
              className="h-full w-full rounded-xl border object-cover"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentsCard;
