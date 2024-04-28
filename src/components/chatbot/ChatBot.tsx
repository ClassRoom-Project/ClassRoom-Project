import { Bubble } from '@typebot.io/nextjs';

export default function ChatBot() {
  return (
    <Bubble
      typebot="my-typebot-l9i1nkq"
      previewMessage={{
        message: 'I have a question for you!',
        avatarUrl:
          'https://s3.typebot.io/public/workspaces/clvf2zyh5000kpw1x7bv8gs1a/typebots/clvf33sxf000vu57lhl9i1nkq/hostAvatar?v=1714052468645'
      }}
      theme={{ button: { backgroundColor: '#8074FF' } }}
    />
  );
}
