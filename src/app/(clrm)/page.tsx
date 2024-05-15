'use client';
import MainPage from './main/page';
import { Bubble } from '@typebot.io/nextjs';

export default function clrmPage() {
  return (
    <>
      <MainPage />
      <Bubble
        typebot="my-typebot-l9i1nkq"
        previewMessage={{
          message: 'I have a question for you!',
          avatarUrl: 'https://app.typebot.io/typebots/clvf33sxf000vu57lhl9i1nkq/edit'
        }}
        theme={{ button: { backgroundColor: '#8074FF' } }}
      />
    </>
  );
}
