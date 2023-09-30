import { useCallback, useRef, useState } from 'react';
import Spinner from '../../assets/Spinner';
import kit from '../../assets/kit.gif';
import Webcam from 'react-webcam';
import { Button } from '../Button';
import { dataURLtoFile } from '../../utils';

interface Props {
  img: File | undefined;
  updateImageFunc: (file: File | undefined) => void;
}

export default function Camera({ updateImageFunc }: Props) {
  const [waitStatus, setWaitStatus] = useState<'done' | 'loading' | 'error'>(
    'loading'
  );
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      const file = dataURLtoFile(imageSrc, 'photo.png');
      updateImageFunc(file);
    } else {
      updateImageFunc(undefined);
    }
  }, [webcamRef, updateImageFunc]);

  return (
    <>
      {waitStatus === 'loading' && (
        <span className="flex flex-col justify-center items-center gap-8 text-xl font-semibold text-black font-inter absolute">
          <Spinner />
          <h2>Жду доступа к вебкамере</h2>
        </span>
      )}

      {waitStatus === 'error' && (
        <span className="flex flex-col justify-center items-center gap-8 text-2xl font-semibold text-black font-inter absolute">
          <h2>У меня нет доступа к вебкамере...</h2>
          <img src={kit} alt={'kotik'} />
        </span>
      )}

      <span>
        <Webcam
          className="rounded-xl"
          width={700}
          height={1200}
          audio={false}
          ref={webcamRef}
          onUserMedia={() => {
            setWaitStatus('done');
          }}
          onUserMediaError={() => {
            setWaitStatus('error');
          }}
          screenshotFormat="image/jpeg"
          imageSmoothing={true}
        />

        {waitStatus === 'done' && (
          <span className="mt-12 flex flex-row items-center justify-center">
            <Button onClick={capture}>Сфотографировать</Button>
          </span>
        )}
      </span>
    </>
  );
}
