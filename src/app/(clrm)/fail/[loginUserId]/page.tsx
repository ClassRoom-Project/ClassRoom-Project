import Image from 'next/image';

export default function PaymentFail() {
  return (
    <main>
      <div id="info" className="box_section" style={{ width: '600px' }}>
        <Image
          width={100}
          height={100}
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="에러 이미지"
        />
        <h2>결제를 실패했어요</h2>
      </div>
    </main>
  );
}
