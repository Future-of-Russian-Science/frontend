import { useCallback, useRef, useState } from 'react';
import Spinner from '../../assets/Spinner';
import kit from '../../assets/kit.gif';
import Webcam from 'react-webcam';
import { Button } from '../Button';
import { dataURLtoFile } from '../../utils';
import { CheckResponse, sendImage } from '../../api/sendPhoto';
import Preview from './Preview';

export default function Camera() {
  const [webcamStatus, setWebcamStatus] = useState<
    'connected' | 'loading' | 'error'
  >('loading');
  const [verifyStatus, setVerifyStatus] = useState<
    CheckResponse[] | false | undefined | null
  >(null);
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<File | undefined>(undefined);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      const image = dataURLtoFile(imageSrc, 'photo.png');
      setImage(image);
    } else {
      setImage(undefined);
    }
  }, [webcamRef]);

  const verify = useCallback(async (image: File) => {
    setVerifyStatus(undefined);
    const response = await sendImage(image);
    setVerifyStatus(response);
  }, []);

  return (
    <>
      {webcamStatus === 'loading' && (
        <span className="flex flex-col justify-center items-center gap-8 text-2xl font-semibold text-black font-inter whitespace-pre-wrap text-center">
          <Spinner />
          <h2>Подгружаю изображение с вебкамеры...</h2>
        </span>
      )}

      {webcamStatus === 'error' && (
        <span className="flex flex-col justify-center items-center gap-8 text-2xl font-semibold text-black font-inter">
          <h2>У меня нет доступа к вебкамере...</h2>
          <img src={kit} alt={'kotik'} />
        </span>
      )}

      <div>
        {image ? (
          <Preview
            img={image}
            size="lg"
            verifyStatus={!verifyStatus ? verifyStatus : verifyStatus[0]}
          />
        ) : (
          <Webcam
            className="rounded-xl"
            width={700}
            height={1200}
            audio={false}
            ref={webcamRef}
            onUserMedia={() => {
              setWebcamStatus('connected');
            }}
            onUserMediaError={() => {
              setWebcamStatus('error');
            }}
            screenshotFormat="image/jpeg"
            imageSmoothing={true}
          />
        )}

        <div className="mt-4 flex flex-row items-center justify-center gap-6">
          {webcamStatus === 'connected' && !image && (
            <Button onClick={capture}>Сфотографировать</Button>
          )}

          {image && (
            <Button
              onClick={() => {
                setImage(undefined);
                setVerifyStatus(null);
              }}
            >
              Заново
            </Button>
          )}

          {image && (
            <Button
              onClick={() => {
                setVerifyStatus(null);
                verify(image);
              }}
            >
              Отправить
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
