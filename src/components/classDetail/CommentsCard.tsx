import { DetailCommentType } from '@/types/detailComment';
import mediumZoom from 'medium-zoom';
import Image from 'next/image';
import DefaultProfile from '../../assets/images/profile-image.png';

const CommentsCard = ({ comment }: { comment: DetailCommentType }) => {
  const zoom = mediumZoom({ background: '#00000073' });

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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    zoom.attach(e.currentTarget);
  };

  return (
    <div className="flex w-full flex-col justify-between gap-4 rounded-lg p-1 md:p-5 lg:flex-row">
      <div className="flex w-full flex-col">
        {/* 프로필  */}
        <div className="mb-2 flex items-center gap-2 md:mb-1 ">
          <div className=" flex items-center justify-center gap-2">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12">
              {comment.profile_image ? (
                <Image
                  src={comment.profile_image}
                  sizes="36px"
                  alt="Profile"
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  placeholder="empty"
                />
              ) : (
                <Image
                  src={DefaultProfile}
                  alt="Profile"
                  sizes="36px"
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  placeholder="empty"
                />
              )}
            </div>
            <h5 className="text-text-dart-gray text-sm font-semibold md:text-lg">{comment.nickname}</h5>
          </div>
          <div className="rating rating-sm">{Stars()}</div>
        </div>

        {/* 내용 */}
        <div className="flex h-full w-full  flex-col pl-1  sm:pl-[56px] ">
          <p className="mb-2 text-sm text-gray-800 sm:text-base">{comment.content}</p>
          <div className="mt-auto text-right text-xs text-gray-500 md:text-sm">
            {new Date(comment.create_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      {comment.comment_image ? (
        <div className="flex items-center rounded-xl pl-1.5 sm:pl-12 lg:justify-center lg:pl-0">
          <div className="image-container relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl md:h-48 md:w-48">
            <Image
              src={comment.comment_image}
              alt="uploaded image preview"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 160px, 192px"
              onLoad={handleImageLoad}
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
